# Hà Phương Mom & Baby Care — Landing Page

Landing page tĩnh (tiếng Việt) cho spa mẹ & bé, tối ưu SEO + GEO. Live tại:
**https://haphuong-spa.pages.dev**

## Kiến trúc

- **Next.js 14 (App Router, TypeScript)** — `output: 'export'` → toàn bộ trang là **HTML tĩnh thuần** (view-source thấy đầy đủ giá, FAQ, JSON-LD; AI agent/crawler đọc không cần JS).
- **Cloudflare Pages** hosting. Endpoint động duy nhất `POST /api/booking` chạy bằng **Pages Function** (`functions/api/booking.ts`) — cùng repo, cùng deploy.
- Không database — booking forward qua webhook/Telegram (cấu hình env, xem bên dưới).

## Cấu trúc

```
src/
  app/            # layout, page (landing), bai-viet/, robots.ts, sitemap.ts, llms.txt/
  components/     # Header, Hero, Services, PriceTable, WhyUs, Testimonials,
                  # Faq, BookingForm (client), ContactPanel, Footer, FloatingContacts
  config/site.ts  # ★ MỌI thông tin liên hệ (hotline, Zalo, FB, địa chỉ) sửa TẠI ĐÂY
  data/           # 17 dịch vụ + giá, FAQ, cảm nhận (nguồn: handoff docs/content.md)
  lib/            # posts.ts (đọc markdown blog), jsonld.ts (schema builders)
content/bai-viet/ # 20 bài viết markdown (frontmatter: title/description/faq[]...)
public/images/    # ảnh mock landing + covers blog (thay ảnh thật giữ nguyên tên file)
functions/api/    # Cloudflare Pages Function: POST /api/booking
```

## Vận hành

```bash
npm install
npm run dev      # dev server localhost:3000 (không có /api/booking — dùng wrangler pages dev)
npm run build    # build static ra out/
npm run deploy   # build + wrangler pages deploy (cần wrangler login)
```

### Thêm / sửa bài viết
1. Thêm file `content/bai-viet/<slug>.md` (copy frontmatter từ bài có sẵn) + cover `public/images/bai-viet/<slug>.png` (900×560).
2. `npm run deploy`. Sitemap, blog index, JSON-LD tự cập nhật.

### Thay ảnh thật của spa
Ghi đè file trong `public/images/` (giữ nguyên tên + tỉ lệ khung): `hero.png` (1100×1000), `tam-be.png`, `tia-sua.png`, `massage.png` (900×520), `goi-dau.png`, `xong-nha.png`, `trong-tre.png` (700×420). Chạy lại deploy.

### Nhận thông báo booking
Vào Cloudflare Dashboard → Pages → haphuong-spa → Settings → Environment variables, đặt một trong hai (hoặc cả hai):
- `BOOKING_WEBHOOK_URL` — webhook nhận JSON `{name, phone, service, date, note}` (Google Sheet Apps Script / Zapier / n8n...)
- `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` — bot Telegram nhắn thẳng vào nhóm/chat.

Chưa cấu hình thì booking chỉ ghi log (Pages → Functions logs); form vẫn báo thành công cho khách.
Chống spam: honeypot field + rate-limit 5 request/10 phút/IP.

## SEO / GEO checklist (đã implement)

- ✅ SSG 100% — giá viết dạng text cạnh tên dịch vụ, curl thấy đầy đủ nội dung
- ✅ JSON-LD: `HealthAndBeautyBusiness` (17 Offer) + `FAQPage` (khớp nguyên văn FAQ hiển thị) trên trang chủ; `Article` + `FAQPage` + `BreadcrumbList` mỗi bài viết; `Blog` + `ItemList` trang danh sách
- ✅ `robots.txt` allow tất cả bot (GPTBot, ClaudeBot, PerplexityBot... không chặn)
- ✅ `sitemap.xml` 22 URL (landing + blog index + 20 bài, lastmod theo `updated`)
- ✅ `/llms.txt` — tóm tắt markdown cho AI agent: NAP, 17 dịch vụ + giá, FAQ, links bài viết
- ✅ Semantic HTML: 1 h1/trang, section h2, landmark, `<details>` FAQ (nội dung trong DOM), `<figure>/<blockquote>` quote
- ✅ Fonts Prata + Be Vietnam Pro subset vietnamese qua next/font (self-host, swap)
- ✅ og-image 1200×630, metadata + canonical đầy đủ, lang="vi"

### Khi có domain riêng
1. Cloudflare Pages → Custom domains → thêm domain.
2. Đặt env `NEXT_PUBLIC_SITE_URL=https://domain-moi` khi build (hoặc sửa fallback trong `src/config/site.ts`) rồi deploy lại — canonical/sitemap/JSON-LD tự đổi theo.
3. Trỏ Google Business Profile + Facebook về domain (entity consistency).
