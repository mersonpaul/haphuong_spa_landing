/**
 * POST /api/booking — Cloudflare Pages Function.
 * The Next.js site is exported as static HTML; this function is the only
 * dynamic endpoint. It validates the booking request and forwards it to a
 * webhook and/or Telegram, both configured via Pages secrets
 * (`wrangler pages secret put <NAME> --project-name haphuong-spa`):
 *   - BOOKING_WEBHOOK_URL  (optional) generic JSON webhook
 *   - BOT_TOKEN + OWNER_CHAT_ID  (optional) Telegram notification —
 *     same secret names as the spa-bot Worker (dainv_spa_manager)
 * With nothing configured the request is only logged (visible in Pages logs).
 */

interface Env {
  BOOKING_WEBHOOK_URL?: string;
  BOT_TOKEN?: string;
  OWNER_CHAT_ID?: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

interface BookingPayload {
  name: string;
  phone: string;
  service: string;
  date: string;
  note: string;
}

// NOTE: must stay in sync with bookingServiceOptions in src/data/services.ts.
const ALLOWED_SERVICES = new Set([
  'Tắm bé / Float',
  'Thông tắc tia sữa',
  'Massage cho mẹ',
  'Gội đầu tại nhà',
  'Xông hơi tại nhà',
  'Trông bé tại nhà',
  'Tư vấn thêm',
]);

const VN_PHONE_REGEX = /^(0|\+84)\d{9,10}$/;
const MAX_BODY_BYTES = 10_000;

// Best-effort in-memory rate limit (per isolate): 5 requests / 10 minutes / IP.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const rateBuckets = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string, now: number): boolean {
  const bucket = rateBuckets.get(ip);
  if (!bucket || now - bucket.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateBuckets.set(ip, { count: 1, windowStart: now });
    return false;
  }
  bucket.count += 1;
  if (rateBuckets.size > 5000) rateBuckets.clear();
  return bucket.count > RATE_LIMIT_MAX;
}

function sanitizeText(value: unknown, maxLength: number): string {
  return String(value ?? '')
    .replace(/<[^>]*>/g, '')
    .replace(/[\r\n]+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function json(body: object, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

function validate(raw: Record<string, unknown>): { payload?: BookingPayload; error?: string } {
  const name = sanitizeText(raw.name, 100);
  const phone = sanitizeText(raw.phone, 20).replace(/[\s.\-()]/g, '');
  const service = sanitizeText(raw.service, 50);
  const date = sanitizeText(raw.date, 10);
  const note = sanitizeText(raw.note, 500);

  if (!name) return { error: 'missing_name' };
  if (!VN_PHONE_REGEX.test(phone)) return { error: 'invalid_phone' };
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) return { error: 'invalid_date' };

  return {
    payload: {
      name,
      phone,
      service: ALLOWED_SERVICES.has(service) ? service : 'Tư vấn thêm',
      date,
      note,
    },
  };
}

async function forwardWebhook(url: string, payload: BookingPayload): Promise<boolean> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, source: 'haphuong-spa-website' }),
  });
  return response.ok;
}

async function forwardTelegram(token: string, chatId: string, payload: BookingPayload): Promise<boolean> {
  const lines = [
    'Đặt lịch mới từ website Hà Phương Spa',
    `Họ tên: ${payload.name}`,
    `SĐT: ${payload.phone}`,
    `Dịch vụ: ${payload.service}`,
    payload.date ? `Ngày mong muốn: ${payload.date}` : null,
    payload.note ? `Ghi chú: ${payload.note}` : null,
  ].filter(Boolean);

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: lines.join('\n') }),
  });
  return response.ok;
}

export const onRequestPost = async (context: PagesContext): Promise<Response> => {
  const { request, env } = context;

  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
  if (isRateLimited(ip, Date.now())) {
    return json({ ok: false, error: 'rate_limited' }, 429);
  }

  const bodyText = await request.text();
  if (bodyText.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: 'body_too_large' }, 413);
  }

  let raw: Record<string, unknown>;
  try {
    raw = JSON.parse(bodyText) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  // Honeypot: bots fill the hidden "website" field — accept silently, do nothing.
  if (typeof raw.website === 'string' && raw.website.trim() !== '') {
    return json({ ok: true });
  }

  const { payload, error } = validate(raw);
  if (!payload) {
    return json({ ok: false, error }, 400);
  }

  const deliveries: Promise<boolean>[] = [];
  if (env.BOOKING_WEBHOOK_URL) {
    deliveries.push(forwardWebhook(env.BOOKING_WEBHOOK_URL, payload));
  }
  if (env.BOT_TOKEN && env.OWNER_CHAT_ID) {
    deliveries.push(forwardTelegram(env.BOT_TOKEN, env.OWNER_CHAT_ID, payload));
  }

  if (deliveries.length === 0) {
    // No channel configured yet — log so the booking is still visible in Pages logs.
    console.log('[booking] no delivery channel configured', JSON.stringify(payload));
    return json({ ok: true });
  }

  try {
    const results = await Promise.allSettled(deliveries);
    const anyDelivered = results.some(
      (result) => result.status === 'fulfilled' && result.value === true,
    );
    if (!anyDelivered) {
      console.error('[booking] all delivery channels failed', JSON.stringify(results));
      return json({ ok: false, error: 'delivery_failed' }, 502);
    }
  } catch (deliveryError) {
    console.error('[booking] delivery error', deliveryError);
    return json({ ok: false, error: 'delivery_failed' }, 502);
  }

  return json({ ok: true });
};
