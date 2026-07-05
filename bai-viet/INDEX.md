# Blog SEO/GEO — Hà Phương Mom & Baby Care

20 bài viết markdown + 20 ảnh cover (900×560, `images/<slug>.png`). Frontmatter YAML mỗi bài: `title, slug, description, keywords[], category, cover, date, updated, author, faq[]` (faq = nguồn cho JSON-LD FAQPage).

## Danh sách bài (4 cụm chủ đề)

**Sữa mẹ**
| slug | title |
|---|---|
| dau-hieu-tac-tia-sua | Dấu hiệu tắc tia sữa và cách xử lý ngay tại nhà trong 24 giờ đầu |
| tac-tia-sua-bao-lau-thi-nguy-hiem | Tắc tia sữa bao lâu thì nguy hiểm? Mốc 24 — 48 — 72 giờ |
| cach-phong-tac-tia-sua | 7 cách phòng tắc tia sữa hiệu quả cho mẹ mới sinh |
| kich-sua-dung-cach | Kích sữa đúng cách: lịch hút, massage và những hiểu lầm |
| cuong-sua-sinh-ly | Cương sữa sinh lý sau sinh: phân biệt với tắc tia sữa |

**Tắm bé & Float**
| slug | title |
|---|---|
| tam-be-so-sinh-dung-cach | Tắm bé sơ sinh đúng cách: quy trình 9 bước an toàn |
| boi-float-cho-be | Bơi float cho bé: lợi ích thật, độ tuổi và an toàn |
| van-dong-chuyen-sau-cho-be | Vận động chuyên sâu cho bé 0–12 tháng |
| cham-soc-ron-tre-so-sinh | Chăm sóc rốn trẻ sơ sinh đúng chuẩn |
| be-ngu-ngon-sau-tam | Vì sao bé ngủ ngon hơn sau khi tắm và massage? |

**Mẹ sau sinh**
| slug | title |
|---|---|
| xong-hoi-sau-sinh | Xông hơi sau sinh: lợi ích, thời điểm an toàn, 5 lưu ý |
| massage-sau-sinh-giam-dau | Massage sau sinh: giải pháp đau lưng, mỏi vai gáy |
| o-cu-khoa-hoc | Ở cữ khoa học: giữ gì, bỏ gì? |
| goi-dau-duong-sinh-sau-sinh | Gội đầu dưỡng sinh cho mẹ ở cữ |
| giam-stress-sau-sinh | Dấu hiệu stress, baby blues và cách thư giãn |

**Chọn dịch vụ**
| slug | title |
|---|---|
| chon-dich-vu-trong-be-tai-nha | Chọn dịch vụ trông bé tại nhà: 6 tiêu chí an toàn |
| lich-cham-soc-be-thang-dau | Lịch chăm sóc mẹ và bé tháng đầu sau sinh |
| spa-me-va-be-la-gi | Spa mẹ và bé là gì? Ai nên dùng, dùng khi nào |
| chi-phi-cham-soc-me-be | Chi phí chăm sóc mẹ và bé tại nhà ở Hà Nội 2026 |
| cau-hoi-thuong-gap-cham-soc-tai-nha | 10 câu hỏi thường gặp khi đặt dịch vụ tại nhà |

## Tích hợp vào Next.js (cho Claude Code)

1. Đặt folder này vào `content/bai-viet/` (md) và `public/images/bai-viet/` (png) — hoặc giữ nguyên cấu trúc, đọc bằng glob.
2. Route SSG:
   - `/bai-viet` — trang danh sách (generateStaticParams không cần; đọc toàn bộ frontmatter, sort theo `date` giảm dần, filter theo `category` — 4 chip: Sữa mẹ / Tắm bé & Float / Mẹ sau sinh / Chọn dịch vụ).
   - `/bai-viet/[slug]` — `generateStaticParams` từ danh sách slug; parse frontmatter bằng `gray-matter`, render md bằng `remark`/`next-mdx-remote` (KHÔNG dùng client fetch — phải SSR/SSG để SEO).
3. `generateMetadata` mỗi bài: `title`, `description`, openGraph (og:image = cover), `alternates.canonical = /bai-viet/<slug>`.
4. JSON-LD mỗi bài (server-rendered trong page): block `Article` (headline/description/datePublished/dateModified/author=Organization) + block `FAQPage` build từ `faq[]` frontmatter — **nguyên văn khớp phần "Câu hỏi thường gặp" hiển thị**.
5. Trang danh sách: JSON-LD `Blog` + `ItemList` các bài.
6. `sitemap.xml`: thêm 20 URL `/bai-viet/<slug>` với `lastmod = updated`.
7. Nav & footer: thêm link "Bài viết" → `/bai-viet` (đã có trong design reference).
8. Giọng văn khi viết thêm bài: xưng "Hà Phương", gọi khách là "mẹ", không emoji, giá dạng `60.000đ`, mỗi bài mở đầu bằng đoạn **Trả lời nhanh:** (GEO — trả lời trực tiếp câu hỏi của title).
9. Cuối bài sức khoẻ giữ dòng miễn trừ: *"Bài viết mang tính tham khảo, không thay thế chẩn đoán y khoa."*

## Design tham chiếu
- Trang danh sách: `Bài viết.dc.html` (hero nhỏ + chip lọc + grid card 3 cột).
- Trang bài: `Bài viết chi tiết.dc.html` (breadcrumb, chip, H1 Prata, meta, cover bo 20px, body 760px, FAQ card, CTA nền #B05F70, footer).
- Token: nền #FAF4EC, chữ #3F3237, accent #B05F70, card #FFFDFA viền #EFE3D9, chip nền #F6E7E6, font Prata + Be Vietnam Pro.

## Ảnh thật (Pexels)
4 bài có frontmatter `photo` (URL images.pexels.com, giấy phép Pexels — miễn phí thương mại, không cần ghi nguồn): tam-be-so-sinh-dung-cach, kich-sua-dung-cach, spa-me-va-be-la-gi, lich-cham-soc-be-thang-dau (+ `photoAlt`, `photoCredit`).
Khi build production: TẢI các ảnh này về `public/images/bai-viet/photos/<slug>.jpg` và trỏ src local (không hotlink CDN ngoài — tránh phụ thuộc + tối ưu next/image). Ảnh minh hoạ vector (`images/<slug>.png`) vẫn là cover chính của mọi bài.
