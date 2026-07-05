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
      'Tắm thảo dược dịu nhẹ, bơi float thư giãn và bài vận động chuyên sâu — kích thích phát triển vận động, giúp bé ăn ngon ngủ sâu.',
    priceLabel: 'Tắm bé 60.000đ · Float 75.000đ / buổi',
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
    priceLabel: '75.000đ / buổi',
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
    priceLabel: 'Từ 120.000đ / buổi',
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
      'Gói 60 – 120 phút giúp mẹ giảm đau mỏi vai gáy, lưng hông và ngủ ngon hơn. Đặt kèm xông hơi tại nhà chỉ thêm 50.000đ.',
    priceLabel: '90.000đ – 150.000đ / buổi',
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
    priceLabel: '70.000đ / buổi',
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
    priceLabel: '100.000đ / buổi · 50.000đ khi kèm massage',
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
    priceLabel: 'Ngày 50.000đ / giờ · Tối 70.000đ / giờ',
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
      { code: 'DV01', name: 'Tắm bé', priceLabel: '60.000đ', priceVnd: 60000, schemaName: 'Tắm bé' },
      { code: 'DV02', name: 'Bơi float', priceLabel: '75.000đ', priceVnd: 75000, schemaName: 'Bơi float cho bé' },
      { code: 'DV03', name: 'Vận động chuyên sâu', priceLabel: '100.000đ', priceVnd: 100000, schemaName: 'Vận động chuyên sâu cho bé' },
    ],
  },
  {
    title: 'Massage cho mẹ',
    subtitle: 'Bầu & sau sinh · giá / buổi',
    items: [
      { code: 'DV04', name: '60 phút', priceLabel: '90.000đ', priceVnd: 90000, schemaName: 'Massage mẹ 60 phút' },
      { code: 'DV05', name: '70 phút', priceLabel: '100.000đ', priceVnd: 100000, schemaName: 'Massage mẹ 70 phút' },
      { code: 'DV06', name: '90 phút', priceLabel: '120.000đ', priceVnd: 120000, schemaName: 'Massage mẹ 90 phút' },
      { code: 'DV07', name: '100 phút', priceLabel: '130.000đ', priceVnd: 130000, schemaName: 'Massage mẹ 100 phút' },
      { code: 'DV08', name: '120 phút', priceLabel: '150.000đ', priceVnd: 150000, schemaName: 'Massage mẹ 120 phút' },
    ],
  },
  {
    title: 'Sữa mẹ',
    subtitle: 'Hỗ trợ khẩn trong ngày · giá / buổi',
    items: [
      { code: 'DV09', name: 'Cương sữa sinh lý, tắc sữa non', priceLabel: '120.000đ', priceVnd: 120000, schemaName: 'Cương sữa sinh lý, tắc sữa non' },
      { code: 'DV10', name: 'Tắc sữa', priceLabel: '150.000đ', priceVnd: 150000, schemaName: 'Thông tắc tia sữa' },
      { code: 'DV11', name: 'Tắc sữa viêm', priceLabel: '180.000đ', priceVnd: 180000, schemaName: 'Tắc sữa viêm' },
      { code: 'DV17', name: 'Kích sữa', priceLabel: '120.000đ', priceVnd: 120000, schemaName: 'Kích sữa' },
    ],
  },
  {
    title: 'Tại nhà',
    subtitle: 'Chuyên viên đến tận nơi',
    items: [
      { code: 'DV12', name: 'Gội đầu', priceLabel: '70.000đ / buổi', priceVnd: 70000, schemaName: 'Gội đầu tại nhà' },
      { code: 'DV13', name: 'Xông hơi', priceLabel: '100.000đ / buổi', priceVnd: 100000, schemaName: 'Xông hơi tại nhà' },
      { code: 'DV16', name: 'Xông kèm massage', priceLabel: '50.000đ / buổi', priceVnd: 50000, schemaName: 'Xông hơi tại nhà kèm buổi massage' },
      { code: 'DV14', name: 'Trông bé ngày', priceLabel: '50.000đ / giờ', priceVnd: 50000, schemaName: 'Trông bé ban ngày (theo giờ)' },
      { code: 'DV15', name: 'Trông bé tối', priceLabel: '70.000đ / giờ', priceVnd: 70000, schemaName: 'Trông bé buổi tối (theo giờ)' },
    ],
  },
];

/** All 17 services flattened — used by JSON-LD OfferCatalog and llms.txt */
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
