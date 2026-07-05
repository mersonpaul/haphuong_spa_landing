/**
 * Central site configuration — single source of truth for contact info.
 * Update values here; every component, JSON-LD block and llms.txt reads from this file.
 */
export const site = {
  name: 'Hà Phương Mom & Baby Care',
  shortName: 'Hà Phương',
  alternateName: 'Hà Phương Baby Care',
  tagline: 'Nâng niu mẹ, ôm ấp bé — tại spa & tận nhà',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://haphuong-spa.pages.dev',

  hotline: '0987 475 822',
  hotlineDigits: '0987475822',
  telHref: 'tel:0987475822',
  telephoneIntl: '+84-987-475-822',
  zaloHref: 'https://zalo.me/0987475822',
  facebookUrl: 'https://www.facebook.com/haphuongbabycare/',
  facebookLabel: 'fb.com/haphuongbabycare',

  diaChi: 'Tòa A Masteri, Vinhomes Smart City, Tây Mỗ, Nam Từ Liêm, Hà Nội',
  khuVuc: 'Vinhomes Smart City & khu vực lân cận (Hà Nội)',
  gioMoCua: '8:00 – 19:00, cả Thứ 7 & Chủ nhật · Trông bé buổi tối theo hẹn',
  gioMoCuaNgan: '8:00 – 19:00, cả T7 & CN',

  description:
    'Hà Phương Mom & Baby Care — dịch vụ spa mẹ và bé: tắm bé 60.000đ, bơi float 75.000đ, thông tắc tia sữa từ 120.000đ, massage sau sinh 60–120 phút từ 90.000đ, gội & xông hơi tại nhà, trông bé theo giờ. Đặt lịch qua điện thoại, Zalo hoặc Facebook.',
} as const;
