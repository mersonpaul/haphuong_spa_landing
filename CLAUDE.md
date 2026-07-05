# CLAUDE.md — Hà Phương Mom & Baby Care Landing Page
(File này là toàn bộ handoff: hướng dẫn + spec + nội dung + SEO/GEO. Design tham chiếu: mở `design-reference.html` bằng browser.)

## PHẦN 0 — NHIỆM VỤ & KIẾN TRÚC

Bạn (Claude Code) sẽ implement website này như MỘT service Node.js duy nhất.

## Yêu cầu kiến trúc (bắt buộc)
- **1 service duy nhất: Next.js 14+ (App Router, React, TypeScript)** — kiêm cả frontend lẫn backend. KHÔNG tách backend riêng.
- **SSR/SSG bắt buộc**: trang chủ render tĩnh (SSG) hoặc SSR — toàn bộ nội dung, bảng giá, FAQ, JSON-LD phải có sẵn trong HTML server trả về (view-source thấy đầy đủ chữ). Đây là yêu cầu số 1 vì mục tiêu SEO + GEO (AI agent đọc không chạy JS).
- Form đặt lịch → API route `POST /api/booking` trong chính Next.js (validate, lưu/forward — xem docs/seo-geo.md §Booking).
- Deploy target: Vercel (hoặc VPS chạy `next start`). Không dùng DB nếu chưa cần — booking gửi email/webhook là đủ.

## Thứ tự đọc
1. `README.md` — tổng quan handoff
2. `docs/design-spec.md` — design tokens, layout, component chi tiết
3. `docs/content.md` — toàn bộ copy tiếng Việt + bảng giá 17 dịch vụ (nguồn sự thật)
4. `docs/seo-geo.md` — meta, JSON-LD, checklist SEO/GEO, spec API booking
5. `design-reference.html` — file HTML thiết kế gốc + ảnh minh hoạ (mở bằng browser để đối chiếu pixel)

## Quy tắc
- Tái tạo đúng thiết kế trong `design-reference.html` bằng React/Next — KHÔNG copy nguyên file HTML.
- Nội dung lấy nguyên văn từ `docs/content.md`. Không bịa thêm dịch vụ/giá.
- Thông tin liên hệ tập trung trong `src/config/site.ts`: hotline 0987 475 822 · zalo https://zalo.me/0987475822 · facebook https://www.facebook.com/haphuongbabycare/ · địa chỉ Vinhomes Smart City, Tây Mỗ, Nam Từ Liêm, Hà Nội.
- Ảnh trong `(ảnh mock đã nhúng sẵn dạng data-URL trong design-reference.html)` là mock tạm — dùng `next/image`, đặt sẵn chỗ để chủ spa thay ảnh thật (giữ đúng kích thước khung).
- Fonts: Prata (heading) + Be Vietnam Pro (body) qua `next/font/google`, subset `vietnamese`.
- Lighthouse mục tiêu: Performance ≥ 90, SEO = 100. Kiểm tra JSON-LD bằng Google Rich Results Test.


---

## PHẦN 1 — TỔNG QUAN HANDOFF

## Overview
Landing page một trang (tiếng Việt) giới thiệu dịch vụ spa mẹ & bé: tắm bé & float, thông tắc tia sữa, massage cho mẹ, gội đầu/xông hơi tại nhà, trông bé tại nhà. Mục tiêu: kéo khách đặt lịch qua điện thoại / Zalo / Facebook / form, đồng thời tối ưu SEO và GEO (AI agent đọc được nội dung).

## About the Design Files
File trong `design-reference.html` là **bản thiết kế tham chiếu viết bằng HTML** (prototype thể hiện giao diện + hành vi), KHÔNG phải production code. Nhiệm vụ: **tái tạo thiết kế này trong một app Next.js (React) duy nhất, SSR/SSG** theo yêu cầu trong `CLAUDE.md`.

Mở `design-reference.html` trực tiếp bằng browser để xem bản thiết kế hoàn chỉnh.

## Fidelity
**High-fidelity**: màu, chữ, khoảng cách, bo góc, shadow, copy là final — tái tạo pixel-perfect. Giá trị chính xác trong `docs/design-spec.md`.

## Screens / Sections (1 trang, thứ tự từ trên xuống)
1. **Header** (sticky) — logo HP, nav anchor (Dịch vụ / Bảng giá / Cảm nhận / Hỏi đáp / Liên hệ), hotline, nút "Đặt lịch"
2. **Hero** — eyebrow thương hiệu, H1 "Nâng niu mẹ, ôm ấp bé.", mô tả, 3 CTA (Đặt lịch / Zalo / Facebook), giờ mở cửa, ảnh lớn bo 36px + card nổi "Tắm bé chỉ từ 60.000đ"
3. **Dịch vụ** — 6 card (ảnh 225px + tên + badge nơi thực hiện + mô tả + giá)
4. **Bảng giá** — 4 nhóm card: Bé yêu / Massage cho mẹ / Sữa mẹ / Tại nhà (17 dịch vụ, dòng có leader dots)
5. **Vì sao chọn** — nền sage #E9F0E8, 3 cột icon + tiêu đề + mô tả
6. **Cảm nhận** — 2 quote card
7. **Hỏi đáp (FAQ)** — 5 câu, accordion `<details>`
8. **Đặt lịch & Liên hệ** — nền #F6E7E6; trái: form (họ tên, SĐT, dịch vụ, ngày, ghi chú → màn xác nhận); phải: 3 card liên hệ (Gọi / Zalo / Facebook) + khối giờ mở cửa, khu vực, địa chỉ
9. **Footer** — nền #3F3237, logo, nav, hotline, copyright
10. **Nút liên hệ nổi** — góc phải-dưới, 3 nút tròn 48px: Facebook, Zalo, Gọi

## Interactions & Behavior
- Anchor scroll mượt (`scroll-behavior: smooth`), header sticky nền mờ `backdrop-filter: blur(10px)`
- Hover: link → #B05F70; nút chính #B05F70 → #9A4E5F; card liên hệ đổi màu viền theo kênh (Zalo #0068FF, FB #1877F2); nút nổi scale 1.08
- Load: hero fade-up 0.7s ease (cột phải trễ 0.15s)
- FAQ: `<details>/<summary>`, chevron xoay 180° khi mở (transition .25s)
- Form: submit → validate họ tên + SĐT không rỗng; lỗi hiện dòng đỏ #B4453A; thành công → thay form bằng màn xác nhận (icon check, nhắc lại tên/SĐT/dịch vụ/ngày, nút "Đặt thêm lịch khác" reset)
- Links: `tel:<số>`, `https://zalo.me/<số>`, Facebook mở tab mới `rel="noopener"`

## State Management
- Form: name, phone, service, date, note, sent, error (React state cục bộ)
- Config site (hotline, facebookUrl, diaChi, khuVuc) tập trung tại `src/config/site.ts`

## Design Tokens
Xem `docs/design-spec.md` (bảng đầy đủ). Chính: nền #FAF4EC, chữ #3F3237, accent #B05F70, card #FFFDFA, viền #EFE3D9; Prata + Be Vietnam Pro.

## Assets
`(ảnh mock đã nhúng sẵn dạng data-URL trong design-reference.html)*.png` — 7 ảnh minh hoạ pastel vẽ canvas (mock). Sẽ được thay bằng ảnh thật của spa; giữ nguyên khung kích thước.

## Files
- `design-reference.html` — thiết kế gốc (mở bằng browser)
- Ảnh trong design-reference.html là mock tạm (data-URL) — extract nếu cần placeholder, sẽ thay bằng ảnh thật của spa


---

## PHẦN 2 — DESIGN SPEC

## 1. Design tokens

### Màu
| Token | Hex | Dùng cho |
|---|---|---|
| bg | #FAF4EC | nền trang |
| surface | #FFFDFA | card, form, header logo text |
| ink | #3F3237 | chữ chính, nền footer |
| ink-soft | #6E5F63 | body text phụ |
| ink-muted | #8A7A7E | caption, label phụ |
| accent | #B05F70 | CTA, giá, link hover, eyebrow |
| accent-hover | #9A4E5F | hover nút chính |
| accent-bg | #F0DCDC | avatar/logo nền hồng |
| blush | #F6E7E6 | nền section Đặt lịch, badge "Tại nhà" |
| sage-bg | #E9F0E8 | nền section Vì sao, badge "Spa · Tại nhà" |
| sage | #5F8168 / #7E9B79 | icon, chữ badge xanh |
| sage-text | #5C6B5C | body trên nền sage |
| border | #EFE3D9 | viền card |
| border-input | #E3D5CE | viền input |
| dots | #DCC9BE | leader dots bảng giá |
| error | #B4453A | thông báo lỗi form |
| zalo | #0068FF · facebook #1877F2 | nút kênh chat |
| footer-text | #E8DDD8 · muted #B7A6A4 | chữ footer |

### Typography (Google Fonts, subset vietnamese)
- Heading: **Prata** 400 — H1 54/1.15, H2 38/1.2, H3 card 22, H3 nhóm giá 19-20
- Body: **Be Vietnam Pro** — 400/500/600/700; body 14.5–17px, line-height 1.65–1.75
- Eyebrow: 13px, 600, letter-spacing .18em, uppercase, màu accent
- Giá: 15px, 600, màu accent

### Spacing & shape
- Container: max-width 1160px, padding ngang 24px
- Section padding dọc: 60–84px
- Card radius: 22–24px (form 28px, hero image 36px, input 12px, contact card 18px, FAQ 16px)
- Nút: pill 999px; primary padding 15px 30px; header 11px 22px
- Shadow card: `0 14px 40px rgba(63,50,55,.06)`; form: `.08`; card nổi hero: `.12`
- Gap grid: 20–24px

## 2. Layout chi tiết
- **Header**: sticky top-0, z-50, nền `rgba(250,244,236,.92)` + blur 10px, viền dưới border. Flex: logo | nav (margin-left auto, gap 22px, 14.5px/500) | hotline + nút Đặt lịch.
- **Hero**: grid `repeat(auto-fit,minmax(420px,1fr))` gap 52px, padding 64/24/84. Hai blob tròn trang trí mờ (#F6E7E6 phải-trên 560px, #E9F0E8 trái-dưới 420px, position absolute, overflow hidden). Ảnh phải cao 470px bo 36px; card nổi absolute left:-26px bottom:34px.
- **Dịch vụ**: grid `auto-fit minmax(330px,1fr)` gap 24. Card = ảnh 225px (object-fit cover) + phần chữ padding 24/26. Hàng tiêu đề: H3 + badge (12px/600, pill, đẩy phải). Giá margin-top:auto để chân card thẳng hàng.
- **Bảng giá**: grid `auto-fit minmax(255px,1fr)` gap 20, `align-items:start`. Dòng giá: flex baseline, tên + `<span>` flex:1 border-bottom 1px dotted + giá 600 nowrap.
- **Vì sao chọn**: full-bleed nền sage-bg; bên trong grid 3 cột `minmax(280px,1fr)` gap 38, padding dọc 62. Icon tròn 46px nền surface.
- **Cảm nhận**: grid 2 cột `minmax(320px,1fr)`, max-width 940 giữa. Card 30/32, quote 15.5/1.75, avatar chữ cái 40px tròn.
- **FAQ**: max-width 760 giữa; mỗi item `<details>` card padding 18/22; summary flex, chevron SVG cuối (xoay khi open).
- **Đặt lịch**: full-bleed nền blush; grid `auto-fit minmax(380px,1fr)` gap 30 align-start. Form grid 2 cột gap 15 (ghi chú + nút span 2). Input: padding 13/16, nền #FAF6F0, focus viền accent + nền surface.
- **Footer**: nền ink; flex wrap space-between, padding 44/24/36.
- **Nút nổi**: fixed right 20 bottom 20, cột gap 10, 3 nút tròn 48px (FB, Zalo, Gọi) shadow màu tương ứng.

## 3. Responsive (đã implement trong prototype — giữ đúng hành vi)
- Grid dùng `repeat(auto-fit, minmax(min(Npx,100%),1fr))` → tự xuống 1 cột, không tràn ngang ở 390px
- Font co giãn: H1 `clamp(36px,7vw,54px)`, H2 `clamp(29px,5.5vw,38px)`
- Nav anchor trong header: 1 dòng, `flex-wrap:nowrap; overflow-x:auto` (ẩn scrollbar) — trên mobile cuộn ngang, KHÔNG xuống dòng, không hamburger
- `@media (max-width:640px)`: form đặt lịch chuyển 1 cột
- Nút liên hệ nổi (FB/Zalo/Gọi) giữ nguyên trên mobile — kênh chuyển đổi chính; hit target ≥ 44px
- Xem thử mobile: mở file design bằng browser, thu cửa sổ ~400px

## 4. Icons
SVG stroke inline (stroke-width 1.8–2, round cap/join): điện thoại, đồng hồ, trái tim, sao, lá, nhà, check. Zalo = chữ "Z" trong khối bo, Facebook = chữ "f" serif — thay bằng logo chính thức nếu có license asset.


---

## PHẦN 3 — NỘI DUNG (NGUỒN SỰ THẬT)

## Thương hiệu
- Tên: **Hà Phương Mom & Baby Care** (gọi tắt: Hà Phương)
- Tagline: Nâng niu mẹ, ôm ấp bé — tại spa & tận nhà
- Facebook: https://www.facebook.com/haphuongbabycare/
- Hotline: **0987 475 822**
- Zalo: https://zalo.me/0987475822
- Địa chỉ: Vinhomes Smart City, Tây Mỗ, Nam Từ Liêm, Hà Nội
- Khu vực phục vụ tại nhà: Vinhomes Smart City & khu vực lân cận (Hà Nội)
- Giờ mở cửa: 8:00 – 19:00, cả Thứ 7 & Chủ nhật · Trông bé buổi tối theo hẹn

## Hero
- Eyebrow: HÀ PHƯƠNG MOM & BABY CARE · TẠI SPA & TẬN NHÀ
- H1: Nâng niu mẹ,\nôm ấp bé.
- Mô tả: Tắm bé & bơi float, thông tắc tia sữa, massage sau sinh, gội đầu — xông hơi và trông bé ngay tại nhà bạn. Chăm sóc bằng đôi tay chuyên môn và sự dịu dàng của người thân.
- CTA: [Đặt lịch hẹn] [Nhắn Zalo] [Facebook]
- Card nổi trên ảnh: **Tắm bé chỉ từ 60.000đ** / Float 75.000đ · tại spa hoặc tại nhà

## Section Dịch vụ
- Eyebrow: DỊCH VỤ — H2: Chăm sóc trọn vẹn cho hai mẹ con
- Sub: Thực hiện tại spa hoặc ngay tại nhà bạn — linh hoạt theo lịch của mẹ, giá niêm yết rõ ràng.

| # | Tên card | Badge | Mô tả | Giá hiển thị | Ảnh |
|---|---|---|---|---|---|
| 1 | Tắm Bé & Float | Spa · Tại nhà | Tắm thảo dược dịu nhẹ, bơi float thư giãn và bài vận động chuyên sâu — kích thích phát triển vận động, giúp bé ăn ngon ngủ sâu. | Tắm bé 60.000đ · Float 75.000đ / buổi | tam-be.png |
| 2 | Thông Tắc Tia Sữa | Tại nhà | Xử lý cương sữa sinh lý, tắc sữa non, tắc sữa viêm và kích sữa — massage không đau, hỗ trợ khẩn trong ngày để mẹ cho bé bú lại ngay. | Từ 120.000đ / buổi | tia-sua.png |
| 3 | Massage Cho Mẹ | Spa · Tại nhà | Gói 60 – 120 phút giúp mẹ giảm đau mỏi vai gáy, lưng hông và ngủ ngon hơn. Đặt kèm xông hơi tại nhà chỉ thêm 50.000đ. | 90.000đ – 150.000đ / buổi | massage.png |
| 4 | Gội Đầu Tại Nhà | Tại nhà | Gội dưỡng sinh thảo dược kết hợp massage đầu — cổ — vai ngay tại nhà, mẹ ở cữ vẫn được thư giãn mà không phải ra ngoài. | 70.000đ / buổi | goi-dau.png |
| 5 | Xông Hơi Tại Nhà | Tại nhà | Chuyên viên mang lều xông và thảo dược đến tận nhà, giúp mẹ sau sinh thải độc, ấm người, nhanh phục hồi. | 100.000đ / buổi · 50.000đ khi kèm massage | xong-nha.png |
| 6 | Trông Bé Tại Nhà | Tại nhà | Cô trông bé có nghiệp vụ, lý lịch rõ ràng — nhận theo giờ ban ngày hoặc buổi tối, để mẹ yên tâm nghỉ ngơi, việc riêng. | Ngày 50.000đ / giờ · Tối 70.000đ / giờ | trong-tre.png |

## Bảng giá đầy đủ (17 dịch vụ — mã nội bộ DV01–17)
- Eyebrow: BẢNG GIÁ — H2: Giá niêm yết, không phát sinh — Sub: Đặt theo buổi lẻ, không ép gói dài hạn.

**Nhóm Bé yêu** (Sơ sinh – 24 tháng · giá/buổi)
- DV01 Tắm bé — 60.000đ
- DV02 Bơi float — 75.000đ
- DV03 Vận động chuyên sâu — 100.000đ

**Nhóm Massage cho mẹ** (Bầu & sau sinh · giá/buổi)
- DV04 60 phút — 90.000đ
- DV05 70 phút — 100.000đ
- DV06 90 phút — 120.000đ
- DV07 100 phút — 130.000đ
- DV08 120 phút — 150.000đ

**Nhóm Sữa mẹ** (Hỗ trợ khẩn trong ngày · giá/buổi)
- DV09 Cương sữa sinh lý, tắc sữa non — 120.000đ
- DV10 Tắc sữa — 150.000đ
- DV11 Tắc sữa viêm — 180.000đ
- DV17 Kích sữa — 120.000đ

**Nhóm Tại nhà**
- DV12 Gội đầu — 70.000đ / buổi
- DV13 Xông hơi — 100.000đ / buổi
- DV16 Xông kèm massage — 50.000đ / buổi
- DV14 Trông bé ngày — 50.000đ / giờ
- DV15 Trông bé tối — 70.000đ / giờ

## Vì sao chọn (nền sage)
1. **Chuyên viên có chứng chỉ** — Đào tạo bài bản về chăm sóc mẹ sau sinh và sơ sinh, thao tác nhẹ nhàng, đúng kỹ thuật.
2. **Thảo dược lành tính** — Sản phẩm nguồn gốc thiên nhiên, an toàn cho làn da non của bé và mẹ đang cho con bú.
3. **Tận nhà, 7 ngày / tuần** — Đặt lịch linh hoạt cả cuối tuần; hầu hết dịch vụ thực hiện ngay tại nhà bạn.

## Cảm nhận (2 quote — placeholder, thay bằng review thật khi có)
1. "Tắc tia sữa 3 ngày, đau phát sốt. Gọi 8 giờ tối mà 9 giờ chị kỹ thuật viên đã có mặt tại nhà, làm xong nhẹ cả người. Biết ơn lắm!" — Chị Thu Hà, mẹ bé Sóc, 2 tháng
2. "Bé nhà mình mê bơi float ở đây, lần nào về cũng ngủ một mạch. Các cô nhẹ nhàng, phòng ốc sạch và thơm mùi thảo dược." — Chị Minh Anh, mẹ bé Cam, 5 tháng

## FAQ (hiển thị + JSON-LD FAQPage phải khớp nguyên văn)
1. **Tắm bé và bơi float giá bao nhiêu?** — Tắm bé 60.000đ/buổi, bơi float 75.000đ/buổi, vận động chuyên sâu cho bé 100.000đ/buổi. Thực hiện tại spa hoặc tại nhà theo lịch hẹn.
2. **Thông tắc tia sữa có những mức dịch vụ nào?** — Cương sữa sinh lý & tắc sữa non 120.000đ, tắc sữa 150.000đ, tắc sữa viêm 180.000đ, kích sữa 120.000đ mỗi buổi. Kỹ thuật viên đến tận nhà, thao tác không đau, hỗ trợ khẩn trong ngày.
3. **Những dịch vụ nào làm tại nhà được?** — Gội đầu 70.000đ, xông hơi 100.000đ (chỉ 50.000đ khi kèm buổi massage), thông tắc tia sữa, massage sau sinh, trông bé ngày 50.000đ/giờ — tối 70.000đ/giờ. Khu vực phục vụ: Vinhomes Smart City & khu vực lân cận (Hà Nội).
4. **Massage cho mẹ có những gói nào?** — Các gói 60 / 70 / 90 / 100 / 120 phút, từ 90.000đ đến 150.000đ mỗi buổi — phù hợp cả mẹ bầu và mẹ sau sinh.
5. **Đặt lịch bằng cách nào?** — Gọi hotline 0987 475 822, nhắn Zalo, nhắn tin fanpage Facebook hoặc điền form đặt lịch — spa xác nhận trong khoảng 15 phút (8:00 – 19:00 hằng ngày).

## Đặt lịch & Liên hệ
- Form: H2 "Đặt lịch hẹn" — sub "Để lại thông tin, chúng tôi gọi lại xác nhận trong 15 phút."
- Fields: Họ tên mẹ / Số điện thoại / Dịch vụ (select: Tắm bé / Float, Thông tắc tia sữa, Massage cho mẹ, Gội đầu tại nhà, Xông hơi tại nhà, Trông bé tại nhà, Tư vấn thêm) / Ngày mong muốn / Ghi chú (placeholder: "Ví dụ: bé 3 tháng, muốn làm tại nhà buổi sáng...")
- Lỗi validate: "Vui lòng nhập họ tên và số điện thoại để spa gọi lại xác nhận."
- Xác nhận: "Đã nhận yêu cầu!" + "Cảm ơn mẹ {tên}. Hà Phương sẽ gọi số {SĐT} trong 15 phút để xác nhận lịch {dịch vụ}{ vào ngày dd/mm/yyyy}." + nút "Đặt thêm lịch khác"
- Liên hệ nhanh: Gọi điện thoại — nhanh nhất / Nhắn Zalo — gửi ảnh, hỏi giá / Facebook — xem ảnh thật mỗi ngày
- Footer: © 2026 Hà Phương Mom & Baby Care

## Giọng văn
Ấm áp, gần gũi như người thân, xưng "Hà Phương" — gọi khách là "mẹ". Không dùng emoji. Số tiền định dạng `60.000đ`.


---

## PHẦN 4 — SEO + GEO SPEC

Mục tiêu: Google index tốt VÀ AI agent (ChatGPT, Claude, Perplexity, Google AI Overviews) trích dẫn được tên, dịch vụ, giá, cách liên hệ.

## 1. Nguyên tắc SSR (lý do chọn Next.js)
- Toàn bộ nội dung (bảng giá 17 dịch vụ, FAQ, NAP) phải nằm trong HTML server trả về. `curl <url>` phải thấy đầy đủ chữ — không được phụ thuộc client-side JS.
- Trang chủ dùng SSG (`export const dynamic = 'force-static'`) — nhanh + cacheable. Chỉ `/api/booking` là dynamic.

## 2. Metadata (Next.js Metadata API)
```
title: "Hà Phương Mom & Baby Care — Tắm bé & Float, Thông tắc tia sữa, Massage sau sinh, Chăm sóc tại nhà"
description: "Hà Phương Mom & Baby Care — dịch vụ spa mẹ và bé: tắm bé 60.000đ, bơi float 75.000đ, thông tắc tia sữa từ 120.000đ, massage sau sinh 60–120 phút từ 90.000đ, gội & xông hơi tại nhà, trông bé theo giờ. Đặt lịch qua điện thoại, Zalo hoặc Facebook."
openGraph: title/description tương tự, type: website, locale: vi_VN, og:image 1200×630 (tạo từ hero + logo)
lang: "vi" trên <html>
canonical: domain chính thức khi có
```

## 3. JSON-LD (2 block, đặt trong <head>, server-rendered)
Block 1 — LocalBusiness (`@type: HealthAndBeautyBusiness`): name "Hà Phương Mom & Baby Care", alternateName "Hà Phương Baby Care", description, telephone "+84-987-475-822", url + sameAs [facebook], openingHoursSpecification Mo–Su 08:00–19:00, priceRange "50.000đ – 180.000đ", currenciesAccepted VND, areaServed "Vinhomes Smart City, Nam Từ Liêm, Hà Nội và khu vực lân cận", address PostalAddress {streetAddress: "Vinhomes Smart City, Tây Mỗ", addressLocality: "Nam Từ Liêm", addressRegion: "Hà Nội", addressCountry: "VN"}, hasOfferCatalog: 17 Offer — mỗi Offer = itemOffered Service {name} + price (số, VND) đúng theo docs/content.md.
Block 2 — FAQPage: 5 Question/Answer NGUYÊN VĂN khớp FAQ hiển thị trên trang (Google phạt nếu schema ≠ nội dung nhìn thấy).

Bản JSON-LD hoàn chỉnh đã viết sẵn trong `design-reference.html` (2 thẻ `<script type="application/ld+json">`) — copy ra và thay giá trị TODO.

## 4. Semantic HTML (đã áp dụng trong design, giữ nguyên khi port)
- Đúng 1 `<h1>`; mỗi section 1 `<h2>`; dịch vụ/nhóm giá là `<h3>`; landmark `<header>/<main>/<footer>/<nav>`; card dịch vụ dùng `<article>`; FAQ dùng `<details>/<summary>` (nội dung câu trả lời vẫn có trong DOM khi đóng); quote dùng `<figure>/<blockquote>`.
- Ảnh có `alt` mô tả tiếng Việt. Link liên hệ là `<a href="tel:">`, `<a href="https://zalo.me/...">`.

## 5. Checklist GEO (Generative Engine Optimization)
- [ ] Giá viết cạnh tên dịch vụ dạng text thường (KHÔNG render giá bằng JS/ảnh) — AI trích được "tắm bé 60.000đ"
- [ ] FAQ trả lời trọn vẹn, tự đứng một mình (mỗi answer nhắc lại tên thương hiệu/dịch vụ + giá)
- [ ] NAP (tên, địa chỉ, SĐT) xuất hiện dạng text ở footer + section liên hệ, nhất quán với Facebook page
- [ ] `robots.txt`: Allow tất cả, KHÔNG chặn GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot
- [ ] `sitemap.xml` (next-sitemap hoặc route handler)
- [ ] Tạo `/llms.txt`: tóm tắt 1 trang markdown — tên, mô tả, danh sách 17 dịch vụ + giá, giờ, kênh liên hệ, khu vực
- [ ] Từ khoá tự nhiên trong heading/mô tả: "spa mẹ và bé", "tắm bé tại nhà", "thông tắc tia sữa", "massage sau sinh", "trông bé theo giờ" + "Nam Từ Liêm", "Vinhomes Smart City", "Hà Nội" (SEO local)
- [ ] Google Business Profile + Facebook trỏ về website khi live (entity consistency)

## 6. Performance
- `next/font/google`: Prata + Be Vietnam Pro, subset `["vietnamese","latin"]`, display swap
- `next/image` cho mọi ảnh (mock trong design-reference/images), width/height rõ ràng, lazy dưới fold, hero `priority`
- Không CSS framework nặng; CSS Modules hoặc Tailwind đều được — miễn token đúng design-spec
- Mục tiêu: LCP < 2.5s, CLS < 0.1, Lighthouse SEO 100

## 7. API Booking (`POST /api/booking`)
- Body: `{ name: string, phone: string, service: string, date?: string, note?: string }`
- Validate: name/phone bắt buộc; phone regex VN `^(0|\+84)\d{9,10}$`; sanitize note
- Xử lý (chọn 1, cấu hình qua env): gửi email (Resend/Nodemailer) HOẶC webhook (Google Sheet/Telegram/Zalo OA). Chống spam: rate-limit theo IP + honeypot field ẩn.
- Response: `{ ok: true }` → UI hiện màn xác nhận như design.

## 8. Cấu trúc gợi ý
```
src/
  app/(layout.tsx, page.tsx, api/booking/route.ts, robots.ts, sitemap.ts, llms.txt/route.ts)
  components/ (Header, Hero, ServiceCard, PriceTable, WhyUs, Testimonials, Faq, BookingForm, ContactPanel, Footer, FloatingContacts)
  config/site.ts   ← hotline, facebookUrl, diaChi, khuVuc, gioMoCua (mọi TODO_ ở đây)
  data/services.ts ← 17 dịch vụ + nhóm + giá (nguồn: docs/content.md)
```
