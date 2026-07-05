# Ha Phuong Mom & Baby Care — Landing Page

Static Vietnamese landing page + blog for a mom & baby spa, optimized for SEO and GEO (Generative Engine Optimization). Live at:
**https://haphuongcare.pages.dev**

## Architecture

- **Next.js 14 (App Router, TypeScript)** with `output: 'export'` — every page is **pre-rendered static HTML** (view-source shows all prices, FAQ and JSON-LD; AI crawlers read content without executing JS).
- Hosted on **Cloudflare Pages**. The only dynamic endpoint, `POST /api/booking`, runs as a **Pages Function** (`functions/api/booking.ts`) in the same repo and deployment.
- No database — bookings are forwarded to Telegram and/or a webhook (configured via secrets, see below).

## Project structure

```
src/
  app/            # layout, landing page, bai-viet/ (blog + pagination),
                  # robots.ts, sitemap.ts, llms.txt/
  components/     # Header, Hero, Services, WhyUs, Testimonials, Faq,
                  # BookingForm (client), DatePicker (client), MainNav (client),
                  # ContactPanel, Footer, FloatingContacts, BlogList, Pagination
  config/site.ts  # ★ ALL contact info, GPS pin, hours — edit HERE only
  data/           # services + prices, FAQ, testimonials (single source of truth)
  lib/            # posts.ts (markdown blog loader), jsonld.ts (schema builders),
                  # phone.ts (VN phone validation/formatting)
content/bai-viet/ # 50 markdown articles (frontmatter: title/description/faq[]/photo...)
public/images/    # landing illustrations, blog covers, downloaded real photos
functions/api/    # Cloudflare Pages Function: POST /api/booking
```

## Operations

```bash
npm install
npm run dev      # Next dev server (no /api/booking — use wrangler pages dev)
npm run build    # static export to out/
npm run deploy   # build + wrangler pages deploy (requires wrangler login)
npx wrangler pages dev --port 4002   # full local preview incl. booking API
```

### Adding / editing blog posts
1. Add `content/bai-viet/<slug>.md` (copy frontmatter from an existing post). Cover resolution: `public/images/bai-viet/<slug>.png` if present, otherwise the real photo at `public/images/bai-viet/photos/<slug>.jpg`.
2. `npm run deploy`. Blog index, pagination (20 posts/page), sitemap and JSON-LD update automatically.

### Replacing placeholder images
Overwrite files in `public/images/` keeping the same file names and aspect ratios, then redeploy.

### Booking notifications
Secrets (same names as the spa-bot Worker project):

```bash
npx wrangler pages secret put BOT_TOKEN --project-name haphuongcare      # Telegram bot token (@BotFather)
npx wrangler pages secret put OWNER_CHAT_ID --project-name haphuongcare # owner chat/channel id
```

Optional `BOOKING_WEBHOOK_URL` receives JSON `{name, phone, service, date, note}`.
Without any channel configured, bookings are only logged (Pages → Functions logs).
Anti-spam: hidden honeypot field + best-effort per-IP rate limit. Secrets apply from the next deployment.

## SEO / GEO checklist (implemented)

- ✅ 100% static HTML — prices written as plain text next to service names
- ✅ JSON-LD: `HealthAndBeautyBusiness` (offers, `GeoCoordinates`, `hasMap`, opening hours) + `FAQPage` matching visible FAQ verbatim on the landing page; `Article` + `FAQPage` + `BreadcrumbList` per blog post; `Blog` list schema on the index
- ✅ `robots.txt` allows all crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot)
- ✅ `sitemap.xml` (landing + blog index + paginated pages + 50 posts, lastmod from frontmatter)
- ✅ `/llms.txt` — one-page markdown summary for AI agents: NAP, services + prices, FAQ, article links
- ✅ Semantic HTML: one `h1` per page, section `h2`s, landmarks, `<details>` FAQ, `<figure>/<blockquote>` quotes
- ✅ Prata + Be Vietnam Pro (vietnamese subset) self-hosted via `next/font`
- ✅ 1200×630 og-image, canonical URLs, `lang="vi"`
- ✅ Lighthouse (production): Performance 94 · SEO 100 · Best Practices 100 · A11y 97

## Custom domain

1. Cloudflare Pages → Custom domains → add the domain.
2. Set `NEXT_PUBLIC_SITE_URL=https://new-domain` at build time (or change the fallback in `src/config/site.ts`) and redeploy — canonical/sitemap/JSON-LD follow automatically.
3. Point Google Business Profile + Facebook to the domain (entity consistency).

## Notes

- Business data (name, hotline, Zalo, Facebook, address, GPS pin, hours) lives only in `src/config/site.ts`.
- Booking form: only the phone number is required; Vietnamese numbers are validated and auto-formatted client + server side.
- Blog article prices are being synced to the new package-based price list (owner's menu pending).
