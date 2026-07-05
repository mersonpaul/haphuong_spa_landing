/**
 * Source of truth for the 6 service cards and the full 17-service price list.
 * Content is copied verbatim from the handoff (docs/content.md) — do not invent
 * services or prices here.
 */

export interface ServiceCard {
  id: string;
  name: string;
  badge: 'Spa · Tại nhà' | 'Tại nhà' | 'Tại spa';
  description: string;
  priceLabel: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
}

export const serviceCards: ServiceCard[] = [
  {
    id: 'tam-be',
    name: 'Tắm & Massage bé',
    badge: 'Spa · Tại nhà',
    description:
      'Tắm thảo dược dịu nhẹ kết hợp massage thư giãn cho bé — kích thích phát triển, giúp bé ăn ngon ngủ sâu.',
    priceLabel: 'Buổi lẻ 150.000đ · Gói 10 buổi 1.200.000đ',
    image: '/images/tam-be.png',
    imageAlt: 'Minh hoạ bé bơi float trong làn nước ấm',
    imageWidth: 900,
    imageHeight: 520,
  },
  {
    id: 'float',
    name: 'Floating Baby — Bơi Thuỷ Liệu',
    badge: 'Tại spa',
    description:
      'Bé thả nổi thư giãn trong làn nước ấm với phao chuyên dụng — kích thích giác quan, hỗ trợ tiêu hoá, bé vận động toàn thân và ngủ sâu hơn sau mỗi buổi bơi.',
    priceLabel: '150.000đ / buổi',
    image: '/images/bai-viet/boi-float-cho-be.png',
    imageAlt: 'Minh hoạ bé bơi float thuỷ liệu trong làn nước ấm tại spa',
    imageWidth: 900,
    imageHeight: 560,
  },
  {
    id: 'tia-sua',
    name: 'Thông Tắc Tia Sữa',
    badge: 'Tại nhà',
    description:
      'Xử lý cương sữa sinh lý, tắc sữa non, tắc sữa viêm và kích sữa — massage không đau, hỗ trợ khẩn trong ngày để mẹ cho bé bú lại ngay.',
    priceLabel: 'Từ 350.000đ / buổi',
    image: '/images/tia-sua.png',
    imageAlt: 'Minh hoạ giọt sữa mẹ',
    imageWidth: 900,
    imageHeight: 520,
  },
  {
    id: 'massage',
    name: 'Massage Cho Mẹ',
    badge: 'Spa · Tại nhà',
    description:
      'Gói 60 – 120 phút giúp mẹ giảm đau mỏi vai gáy, lưng hông và ngủ ngon hơn.',
    priceLabel: 'Từ 300.000đ / buổi',
    image: '/images/massage.png',
    imageAlt: 'Minh hoạ hoa sen thư giãn',
    imageWidth: 900,
    imageHeight: 520,
  },
  {
    id: 'goi-dau',
    name: 'Gội Đầu Tại Nhà',
    badge: 'Tại nhà',
    description:
      'Gội dưỡng sinh thảo dược kết hợp massage đầu — cổ — vai ngay tại nhà, mẹ ở cữ vẫn được thư giãn mà không phải ra ngoài.',
    priceLabel: '100.000đ / buổi',
    image: '/images/goi-dau.png',
    imageAlt: 'Minh hoạ gội đầu thảo dược',
    imageWidth: 700,
    imageHeight: 420,
  },
  {
    id: 'xong-nha',
    name: 'Xông Hơi Tại Nhà',
    badge: 'Tại nhà',
    description:
      'Chuyên viên mang lều xông và thảo dược đến tận nhà, giúp mẹ sau sinh thải độc, ấm người, nhanh phục hồi.',
    priceLabel: '200.000đ / buổi',
    image: '/images/xong-nha.png',
    imageAlt: 'Minh hoạ lều xông hơi sau sinh',
    imageWidth: 700,
    imageHeight: 420,
  },
  {
    id: 'trong-tre',
    name: 'Trông Bé Tại Nhà',
    badge: 'Tại nhà',
    description:
      'Cô trông bé có nghiệp vụ, lý lịch rõ ràng — nhận theo giờ ban ngày hoặc buổi tối, để mẹ yên tâm nghỉ ngơi, việc riêng.',
    priceLabel: 'Ngày 85.000đ / giờ · Tối 150.000đ / giờ',
    image: '/images/trong-tre.png',
    imageAlt: 'Minh hoạ đồ chơi treo nôi của bé',
    imageWidth: 700,
    imageHeight: 420,
  },
];

export interface PriceItem {
  /** Internal service code DV01–DV17 */
  code: string;
  name: string;
  /** Display price, e.g. "60.000đ" or "50.000đ / giờ" */
  priceLabel: string;
  /** Numeric price in VND for JSON-LD Offer */
  priceVnd: number;
  /** Service name used in JSON-LD (self-contained, brand-friendly) */
  schemaName: string;
}

export interface PriceGroup {
  title: string;
  subtitle: string;
  items: PriceItem[];
}

export const priceGroups: PriceGroup[] = [
  {
    title: 'Bé yêu',
    subtitle: 'Sơ sinh – 24 tháng · giá / buổi',
    items: [
      { code: 'DV01', name: 'Tắm bé (buổi lẻ)', priceLabel: '150.000đ', priceVnd: 150000, schemaName: 'Tắm bé (buổi lẻ)' },
      { code: 'DV01G', name: 'Tắm bé — gói 10 buổi', priceLabel: '1.200.000đ', priceVnd: 1200000, schemaName: 'Tắm bé — gói 10 buổi' },
      { code: 'DV02', name: 'Bơi float', priceLabel: '150.000đ', priceVnd: 150000, schemaName: 'Bơi float cho bé' },
    ],
  },
  {
    title: 'Massage cho mẹ',
    subtitle: 'Bầu & sau sinh · giá / buổi',
    items: [
      { code: 'DV03', name: 'Gói 60 – 120 phút', priceLabel: 'từ 300.000đ', priceVnd: 300000, schemaName: 'Massage mẹ 60–120 phút' },
    ],
  },
  {
    title: 'Sữa mẹ',
    subtitle: 'Hỗ trợ khẩn trong ngày · giá / buổi',
    items: [
      { code: 'DV04', name: 'Thông tắc tia sữa', priceLabel: 'từ 350.000đ', priceVnd: 350000, schemaName: 'Thông tắc tia sữa' },
    ],
  },
  {
    title: 'Tại nhà',
    subtitle: 'Chuyên viên đến tận nơi',
    items: [
      { code: 'DV05', name: 'Gội đầu', priceLabel: '100.000đ / buổi', priceVnd: 100000, schemaName: 'Gội đầu tại nhà' },
      { code: 'DV06', name: 'Xông hơi', priceLabel: '200.000đ / buổi', priceVnd: 200000, schemaName: 'Xông hơi tại nhà' },
      { code: 'DV07', name: 'Trông bé ngày', priceLabel: '85.000đ / giờ', priceVnd: 85000, schemaName: 'Trông bé ban ngày (theo giờ)' },
      { code: 'DV08', name: 'Trông bé đêm', priceLabel: '150.000đ / giờ', priceVnd: 150000, schemaName: 'Trông bé buổi đêm (theo giờ)' },
    ],
  },
];

/** All services flattened — used by JSON-LD OfferCatalog and llms.txt */
export const allPriceItems: PriceItem[] = priceGroups.flatMap((group) => group.items);

/**
 * Options shown in the booking form's service <select>.
 * NOTE: must stay in sync with ALLOWED_SERVICES in functions/api/booking.ts
 * (the Pages Function lives outside the Next build graph).
 */
export const bookingServiceOptions = [
  'Tắm bé / Float',
  'Thông tắc tia sữa',
  'Massage cho mẹ',
  'Gội đầu tại nhà',
  'Xông hơi tại nhà',
  'Trông bé tại nhà',
  'Tư vấn thêm',
] as const;
