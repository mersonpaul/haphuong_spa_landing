/**
 * Central site configuration — single source of truth for contact info.
 * Update values here; every component, JSON-LD block and llms.txt reads from this file.
 */
export const site = {
  name: 'Ha Phuong Mom & Baby Care',
  /** Narrative voice in Vietnamese copy keeps the accented form */
  shortName: 'Hà Phương',
  alternateName: 'Ha Phuong Baby Care',
  tagline: 'Nâng niu mẹ, ôm ấp bé — tại spa & tận nhà',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://haphuong-spa.pages.dev',

  hotline: '0987 475 822',
  hotlineDigits: '0987475822',
  telHref: 'tel:0987475822',
  telephoneIntl: '+84-987-475-822',
  zaloHref: 'https://zalo.me/0987475822',
  facebookUrl: 'https://www.facebook.com/haphuongbabycare/',
  facebookLabel: 'fb.com/haphuongbabycare',

  diaChi: 'Tòa West A, Masteri West Heights, Vinhomes Smart City, Tây Mỗ, Nam Từ Liêm, Hà Nội',
  /** GPS pin — must match the Google Business Profile pin exactly */
  geo: { latitude: 21.0077734, longitude: 105.7394727 },
  googleMapsUrl: 'https://www.google.com/maps?q=21.0077734,105.7394727',
  /** Directions from the visitor's current location (Google Maps fills the origin) */
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=21.0077734,105.7394727',
  khuVuc: 'Vinhomes Smart City & khu vực lân cận (Hà Nội)',
  gioMoCua: '8:00 – 17:30, cả Thứ 7 & Chủ nhật · Trông bé buổi tối theo hẹn',
  gioMoCuaNgan: '8:00 – 17:30, cả T7 & CN',

  description:
    'Ha Phuong Mom & Baby Care — dịch vụ spa mẹ và bé: tắm bé 150.000đ/buổi (gói 10 buổi 1.200.000đ), bơi float 150.000đ, thông tắc tia sữa từ 350.000đ, massage mẹ từ 300.000đ, gội & xông hơi tại nhà, trông bé theo giờ. Đặt lịch qua điện thoại, Zalo hoặc Facebook.',
} as const;
