import { bookingServiceOptions } from '@/data/services';

/**
 * Content for the 4 standalone SEO service pages. Each page targets one
 * keyword cluster + the local modifier (Vinhomes Smart City / Vinsmart).
 * Prices must stay in sync with data/services.ts and data/packages.ts -
 * do not invent numbers here.
 *
 * The FAQ arrays double as the FAQPage JSON-LD source so the schema always
 * matches the visible text verbatim.
 */

export interface ServicePageSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Rendered as a numbered list (process steps) */
  steps?: string[];
}

export interface ServicePageFaqItem {
  question: string;
  answer: string;
}

export interface ServicePagePriceRow {
  label: string;
  price: string;
}

export interface ServicePageOffer {
  name: string;
  priceVnd: number;
}

export interface ServicePageContent {
  /** URL segment, e.g. "tam-be" -> /tam-be */
  slug: string;
  /** Value preselected in the booking form's service <select> */
  bookingService: (typeof bookingServiceOptions)[number];
  badge: string;
  h1: string;
  intro: string[];
  image: { src: string; alt: string; width: number; height: number };
  priceTitle: string;
  priceSubtitle: string;
  priceRows: ServicePagePriceRow[];
  priceNote?: string;
  sections: ServicePageSection[];
  faq: ServicePageFaqItem[];
  /** Slugs of related /bai-viet articles (titles resolved at build time) */
  relatedSlugs: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** JSON-LD Service fields */
  serviceName: string;
  serviceType: string;
  offers: ServicePageOffer[];
}

export const servicePages: ServicePageContent[] = [
  {
    slug: 'tam-be',
    bookingService: 'Tắm bé / Float',
    badge: 'Tại spa · Tại nhà',
    h1: 'Tắm bé tại nhà và tại spa ở Vinhomes Smart City',
    intro: [
      'Kỹ thuật viên Hà Phương tắm và massage cho bé sơ sinh đến 24 tháng bằng thảo dược lành tính - thực hiện ngay tại nhà mẹ trong khu Vinhomes Smart City (cư dân quen gọi Vin Smart) và Tây Mỗ, Đại Mỗ, Nam Từ Liêm, hoặc tại spa ở tòa West A, Masteri West Heights.',
      'Giá niêm yết 150.000đ/buổi lẻ, gói 10 buổi 1.200.000đ (120.000đ/buổi), gói 30 buổi tại nhà chỉ 3.000.000đ (100.000đ/buổi) - không phụ phí di chuyển trong khu vực phục vụ.',
    ],
    image: {
      src: '/images/tam-be.png',
      alt: 'Kỹ thuật viên tắm bé sơ sinh tại nhà ở Vinhomes Smart City',
      width: 900,
      height: 520,
    },
    priceTitle: 'Bảng giá tắm bé',
    priceSubtitle: 'Sơ sinh - 24 tháng, tại spa hoặc tại nhà',
    priceRows: [
      { label: 'Tắm bé buổi lẻ', price: '150.000đ / buổi' },
      { label: 'Tắm bé gói 10 buổi', price: '1.200.000đ' },
      { label: 'Tắm bé gói 30 buổi - tại nhà', price: '3.000.000đ' },
      { label: 'Bơi thủy liệu (float) tại spa', price: '150.000đ / buổi' },
    ],
    priceNote:
      'Giá niêm yết, không phát sinh. Đặt buổi lẻ trải nghiệm trước; gói 10 buổi còn 120.000đ/buổi, gói 30 buổi tại nhà chỉ còn 100.000đ/buổi.',
    sections: [
      {
        heading: 'Một buổi tắm bé của Hà Phương có gì?',
        paragraphs: [
          'Mỗi buổi kéo dài khoảng 30-45 phút, theo trình tự chuẩn mà kỹ thuật viên được đào tạo bài bản:',
        ],
        steps: [
          'Kiểm tra thân nhiệt, tình trạng da và rốn của bé trước khi tắm',
          'Massage kích thích lưu thông máu, giúp bé thư giãn và tiêu hóa tốt',
          'Tắm bằng nước ấm 37-38 độ C trong phòng kín gió, dùng thảo dược dịu nhẹ cho da non',
          'Vệ sinh rốn, mắt, mũi, tai đúng kỹ thuật y tế',
          'Ủ ấm, mặc đồ và dặn dò mẹ những điểm cần theo dõi trong ngày',
        ],
      },
      {
        heading: 'Tắm tại nhà hay tại spa?',
        paragraphs: [
          'Tắm bé tại nhà phù hợp với mẹ mới sinh chưa tiện ra ngoài, hoặc những ngày trời lạnh, mưa gió - kỹ thuật viên mang đồ nghề đến tận căn hộ, mẹ chỉ cần chuẩn bị khăn và quần áo sạch cho bé. Tắm tại spa phù hợp khi mẹ muốn kết hợp cho bé bơi thủy liệu (float) trong bể chuyên dụng.',
          'Hai hình thức cùng một mức giá 150.000đ/buổi, cùng một quy trình - mẹ chọn theo lịch sinh hoạt của gia đình.',
        ],
      },
      {
        heading: 'Vì sao mẹ ở Vinhomes Smart City chọn Hà Phương?',
        bullets: [
          'Spa nằm ngay tòa West A, Masteri West Heights - kỹ thuật viên di chuyển trong nội khu rất nhanh, đặt lịch linh hoạt cả Thứ 7 và Chủ nhật',
          'Chuyên viên có chứng chỉ chăm sóc mẹ và bé, thao tác nhẹ nhàng, đúng kỹ thuật',
          'Thảo dược nguồn gốc thiên nhiên, an toàn cho làn da non của bé',
          'Mẹ quan sát trực tiếp từng bước và được hướng dẫn lại cách tắm, vệ sinh rốn cho bé',
      ],
      },
    ],
    faq: [
      {
        question: 'Tắm bé tại nhà ở Vinhomes Smart City giá bao nhiêu?',
        answer:
          'Tắm bé tại nhà của Hà Phương Mom & Baby Care giá 150.000đ/buổi; gói 10 buổi 1.200.000đ (120.000đ/buổi); gói 30 buổi tại nhà 3.000.000đ - chỉ 100.000đ/buổi. Không phụ phí di chuyển trong khu Vinhomes Smart City và Tây Mỗ, Đại Mỗ, Nam Từ Liêm.',
      },
      {
        question: 'Bé mấy ngày tuổi thì dùng dịch vụ tắm bé được?',
        answer:
          'Ngay từ khi bé về nhà sau sinh. Kỹ thuật viên được đào tạo chăm sóc cả bé chưa rụng rốn: tắm tránh làm ướt rốn, vệ sinh và thay băng rốn đúng kỹ thuật y tế, đồng thời theo dõi các dấu hiệu bất thường trên da bé.',
      },
      {
        question: 'Một buổi tắm bé kéo dài bao lâu, mẹ cần chuẩn bị gì?',
        answer:
          'Khoảng 30-45 phút gồm massage, tắm thảo dược và vệ sinh rốn, mắt, mũi, tai. Tắm tại nhà mẹ chỉ cần chuẩn bị khăn, quần áo sạch và chậu tắm nếu có - kỹ thuật viên mang theo nhiệt kế, thảo dược và dụng cụ vệ sinh.',
      },
      {
        question: 'Đặt lịch tắm bé thế nào?',
        answer:
          'Gọi hoặc nhắn Zalo 0987 475 822, nhắn fanpage Facebook, hoặc điền form đặt lịch trên trang này - Hà Phương xác nhận trong khoảng 15 phút (8:00 - 17:30, cả Thứ 7 và Chủ nhật).',
      },
    ],
    relatedSlugs: [
      'quy-trinh-buoi-tam-be-tai-nha',
      'tam-be-so-sinh-dung-cach',
      'tam-be-tai-nha-hay-tai-spa-nen-chon-gi',
      'be-ngu-ngon-sau-tam',
    ],
    metaTitle: 'Tắm bé tại nhà Vinhomes Smart City - 150.000đ/buổi',
    metaDescription:
      'Dịch vụ tắm bé tại nhà và tại spa ở Vinhomes Smart City, Tây Mỗ, Nam Từ Liêm: 150.000đ/buổi, gói 10 buổi 1.200.000đ, gói 30 buổi chỉ 100.000đ/buổi tại nhà. Kỹ thuật viên có chứng chỉ, tắm thảo dược, vệ sinh rốn cho bé sơ sinh. Hotline/Zalo 0987 475 822.',
    keywords: [
      'tắm bé tại nhà',
      'tắm bé Vinhomes Smart City',
      'tắm bé Vinsmart',
      'dịch vụ tắm bé sơ sinh',
      'tắm bé Tây Mỗ Nam Từ Liêm',
    ],
    serviceName: 'Tắm bé tại nhà và tại spa',
    serviceType: 'Tắm và massage cho bé sơ sinh',
    offers: [
      { name: 'Tắm bé buổi lẻ', priceVnd: 150000 },
      { name: 'Tắm bé gói 10 buổi', priceVnd: 1200000 },
      { name: 'Tắm bé gói 30 buổi tại nhà', priceVnd: 3000000 },
    ],
  },
  {
    slug: 'boi-thuy-lieu-cho-be',
    bookingService: 'Tắm bé / Float',
    badge: 'Tại spa',
    h1: 'Bơi thủy liệu (Floating Baby) cho bé tại Vinhomes Smart City',
    intro: [
      'Bơi thủy liệu - còn gọi là bơi float - là hoạt động cho bé 2-24 tháng thả nổi và đạp nước trong bể riêng với phao đỡ chuyên dụng, nước ấm 32-34 độ C, kỹ thuật viên giám sát 1 kèm 1 suốt buổi.',
      'Tại Hà Phương, buổi bơi thủy liệu giá 150.000đ - mức giá thuộc nhóm dễ tiếp cận nhất tại Hà Nội. Spa nằm ở tòa West A, Masteri West Heights, ngay trong khu Vinhomes Smart City (Vin Smart), Nam Từ Liêm.',
    ],
    image: {
      src: '/images/bai-viet/boi-float-cho-be.png',
      alt: 'Bé bơi thủy liệu với phao chuyên dụng trong làn nước ấm tại spa Vinhomes Smart City',
      width: 900,
      height: 560,
    },
    priceTitle: 'Bảng giá bơi thủy liệu',
    priceSubtitle: 'Bé 2 - 24 tháng, thực hiện tại spa',
    priceRows: [
      { label: 'Bơi thủy liệu (float) buổi lẻ', price: '150.000đ / buổi' },
      { label: 'Tắm bé kèm buổi bơi', price: '150.000đ / buổi' },
      { label: 'Tắm bé gói 10 buổi', price: '1.200.000đ' },
    ],
    priceNote:
      'Nhiều mẹ đặt combo tắm bé + bơi thủy liệu trong cùng một buổi để bé được vận động rồi tắm sạch, về nhà ăn ngon ngủ sâu.',
    sections: [
      {
        heading: 'Bơi thủy liệu là gì, khác gì bơi thường?',
        paragraphs: [
          'Bơi thủy liệu không phải học bơi. Bé được đeo phao đỡ cổ hoặc nách đúng kích cỡ, thả nổi tự do trong bể nước ấm - môi trường gần giống túi ối quen thuộc. Không bị trọng lực cản, bé thoải mái đạp chân, quơ tay, xoay người - vận động toàn thân mà xương khớp non nớt không phải chịu tải.',
          'Mỗi bé một bể riêng, nước thay mới từng lượt - không dùng chung bể lớn như hồ bơi thông thường.',
        ],
      },
      {
        heading: 'Lợi ích của bơi thủy liệu với bé',
        bullets: [
          'Vận động toàn thân sớm: tăng sức mạnh cơ, hỗ trợ các mốc lẫy, bò, ngồi',
          'Kích thích giác quan và hệ tiền đình qua cảm giác nổi, áp lực nước',
          'Hỗ trợ tiêu hóa, giảm đầy hơi táo bón nhờ áp lực nước massage nhẹ vùng bụng',
          'Giải phóng năng lượng: sau buổi bơi bé thường bú ngon và ngủ sâu hơn rõ rệt',
        ],
      },
      {
        heading: 'Buổi bơi thủy liệu diễn ra thế nào?',
        steps: [
          'Kiểm tra thân nhiệt và sức khỏe tổng quát của bé trước buổi bơi',
          'Khởi động bằng vài động tác massage nhẹ để bé làm quen',
          'Bé bơi 15-20 phút trong nước ấm 32-34 độ C, kỹ thuật viên giám sát sát bên liên tục',
          'Tắm thảo dược sạch người ngay sau khi bơi',
          'Ủ ấm, mặc đồ và trao đổi với mẹ về phản ứng của bé trong buổi',
        ],
      },
      {
        heading: 'An toàn là ưu tiên số một',
        bullets: [
          'Kỹ thuật viên không rời mắt khỏi bé trong suốt buổi bơi - nguyên tắc bắt buộc',
          'Phao chuyên dụng chọn đúng cỡ theo cân nặng và tháng tuổi',
          'Bể riêng từng bé, vệ sinh và thay nước sau mỗi lượt',
          'Dừng buổi bơi ngay khi bé mệt, quấy khóc hoặc có dấu hiệu lạnh',
        ],
      },
    ],
    faq: [
      {
        question: 'Bé mấy tháng tuổi thì bơi thủy liệu được?',
        answer:
          'Bé bơi thủy liệu được từ khi rốn rụng và khô hẳn (thường sau 2-4 tuần tuổi) đến khoảng 24 tháng. Mỗi buổi 15-20 phút trong nước ấm 32-34 độ C, luôn có kỹ thuật viên giám sát 1 kèm 1.',
      },
      {
        question: 'Bơi thủy liệu cho bé ở Vinhomes Smart City giá bao nhiêu?',
        answer:
          'Buổi bơi thủy liệu (float) tại Hà Phương Mom & Baby Care giá 150.000đ/buổi, thực hiện tại spa ở tòa West A, Masteri West Heights, Vinhomes Smart City, Nam Từ Liêm, Hà Nội. Nhiều mẹ đặt kèm buổi tắm bé 150.000đ để bé bơi xong được tắm sạch luôn.',
      },
      {
        question: 'Bơi thủy liệu có làm tại nhà được không?',
        answer:
          'Bơi float cần bể chuyên dụng và nguồn nước ấm ổn định 32-34 độ C nên thực hiện tại spa. Riêng dịch vụ tắm và massage bé thì Hà Phương làm tại nhà trong khu Vinhomes Smart City và Tây Mỗ, Đại Mỗ, Nam Từ Liêm.',
      },
      {
        question: 'Bao lâu nên cho bé bơi thủy liệu một lần?',
        answer:
          'Phổ biến nhất là 1-2 buổi mỗi tuần, duy trì đều đặn. Kỹ thuật viên sẽ tư vấn tần suất phù hợp theo tháng tuổi, thể trạng và phản ứng của từng bé sau vài buổi đầu.',
      },
    ],
    relatedSlugs: [
      'boi-float-cho-be',
      'chon-noi-boi-thuy-lieu-cho-be',
      'van-dong-chuyen-sau-cho-be',
      'tummy-time-tap-nam-sap-cho-be',
    ],
    metaTitle: 'Bơi thủy liệu (Float) cho bé tại Vinhomes Smart City - 150.000đ/buổi',
    metaDescription:
      'Bơi thủy liệu (floating baby) cho bé 2-24 tháng tại Vinhomes Smart City, Nam Từ Liêm: 150.000đ/buổi, bể riêng từng bé, nước ấm 32-34 độ C, giám sát 1 kèm 1. Đặt lịch Zalo 0987 475 822.',
    keywords: [
      'bơi thủy liệu cho bé',
      'float cho bé',
      'bơi thủy liệu Vinhomes Smart City',
      'bơi float cho trẻ sơ sinh',
      'bơi thủy liệu Hà Nội',
    ],
    serviceName: 'Bơi thủy liệu (Floating Baby) cho bé',
    serviceType: 'Bơi thủy liệu cho trẻ sơ sinh và trẻ nhỏ',
    offers: [{ name: 'Bơi thủy liệu (float) buổi lẻ', priceVnd: 150000 }],
  },
  {
    slug: 'massage-bau',
    bookingService: 'Massage cho mẹ',
    badge: 'Tại spa · Tại nhà',
    h1: 'Massage bầu Nhật Bản tại Vinhomes Smart City, Nam Từ Liêm',
    intro: [
      'Đau lưng, phù chân, chuột rút, mất ngủ - thai kỳ càng lớn càng nặng nề. Massage bầu Nhật Bản của Hà Phương giúp mẹ giảm đau nhức mỏi, lưu thông máu và ngủ sâu hơn, với kỹ thuật viên có chứng chỉ chăm sóc mẹ bầu.',
      'Mẹ chọn buổi lẻ từ 355.000đ hoặc combo 10 buổi từ 2.850.000đ - thực hiện tại spa ở tòa West A, Masteri West Heights hoặc ngay tại nhà trong khu Vinhomes Smart City (Vin Smart) và Tây Mỗ, Đại Mỗ, Nam Từ Liêm.',
    ],
    image: {
      src: '/images/massage.png',
      alt: 'Massage bầu Nhật Bản thư giãn cho mẹ tại spa Vinhomes Smart City',
      width: 900,
      height: 520,
    },
    priceTitle: 'Bảng giá massage bầu',
    priceSubtitle: '3 gói theo thời lượng, buổi lẻ hoặc combo 10 buổi',
    priceRows: [
      { label: 'Mẹ Bầu Khỏe Mạnh 60 phút - buổi lẻ', price: '355.000đ' },
      { label: 'Mẹ Bầu Khỏe Mạnh - combo 10 buổi', price: '2.850.000đ' },
      { label: 'Mẹ Bầu Quyến Rũ 90 phút - buổi lẻ', price: '565.000đ' },
      { label: 'Mẹ Bầu Quyến Rũ - combo 10 buổi', price: '4.650.000đ' },
      { label: 'Mẹ Bầu Hạnh Phúc 120 phút - buổi lẻ', price: '765.000đ' },
      { label: 'Mẹ Bầu Hạnh Phúc - combo 10 buổi', price: '6.665.000đ' },
    ],
    priceNote:
      'Combo nào cũng kèm quà tặng: gói Khỏe Mạnh tặng 5 buổi gội đầu tại spa (hoặc 3 buổi chăm sóc da mặt tại nhà); gói Quyến Rũ và Hạnh Phúc tặng thêm 2 buổi massage bầu cùng 5-10 buổi gội đầu.',
    sections: [
      {
        heading: 'Massage bầu giúp gì cho mẹ?',
        bullets: [
          'Giảm đau mỏi lưng, hông, cổ vai gáy - những vùng chịu tải nhiều nhất khi bụng lớn dần',
          'Ngâm chân và trị liệu chân giảm phù nề, căng cơ, chuột rút về đêm',
          'Thư giãn thần kinh, giảm stress, tạo giấc ngủ sâu hiếm hoi của thai kỳ',
          'Gói 90 và 120 phút chăm sóc thêm da mặt theo bí quyết cung đình Huế, hỗ trợ phòng rạn da',
        ],
      },
      {
        heading: 'Vì sao gọi là massage bầu Nhật Bản?',
        paragraphs: [
          'Phương pháp Nhật Bản đặc trưng bởi thao tác chậm, lực êm và sâu, kết hợp thảo dược thiên nhiên. Mẹ nằm nghiêng với hệ gối chuyên dụng đỡ bụng và lưng - tư thế an toàn cho thai nhi, kỹ thuật viên tuyệt đối tránh tác động vùng bụng.',
          'Mỗi buổi theo trình tự chuẩn 7-22 bước tùy gói: thăm khám đánh giá tình trạng đau mỏi, ngâm chân thảo dược, nằm muối thảo dược, trị liệu từng vùng cổ vai gáy - lưng hông - chân - tay, kết thúc bằng trị liệu vùng đầu giúp mẹ ngủ ngon.',
        ],
      },
      {
        heading: 'Ba gói cho mẹ lựa chọn',
        bullets: [
          'Mẹ Bầu Khỏe Mạnh (60 phút, 7 bước): tập trung trị đau nhức mỏi toàn thân và giảm phù nề - lựa chọn nền tảng cho mọi mẹ bầu',
          'Mẹ Bầu Quyến Rũ (90 phút, 16 bước): thêm liệu trình chăm sóc da mặt chuyên sâu bằng thảo dược theo bí quyết cung đình Huế',
          'Mẹ Bầu Hạnh Phúc (120 phút, 22 bước): toàn diện nhất - da mặt có thêm điện di tinh chất, lăn đá ngũ hành, cùng hỗ trợ phòng và điều trị rạn da',
        ],
      },
      {
        heading: 'Khi nào mẹ bầu nên massage, khi nào cần hỏi bác sĩ?',
        paragraphs: [
          'Thời điểm phù hợp nhất là từ tam cá nguyệt thứ hai (tuần 13 trở đi), khi thai kỳ đã ổn định. Trong 3 tháng đầu hoặc khi mẹ có tình trạng đặc biệt - dọa sinh non, tiền sản giật, nhau tiền đạo, huyết áp bất thường - mẹ nên hỏi ý kiến bác sĩ sản khoa trước khi đặt lịch. Kỹ thuật viên luôn hỏi tuần thai và tình trạng sức khỏe để điều chỉnh lực, tư thế cho an toàn.',
        ],
      },
    ],
    faq: [
      {
        question: 'Bầu mấy tháng thì massage được?',
        answer:
          'An toàn và phù hợp nhất là từ tháng thứ 4 (tam cá nguyệt thứ hai) khi thai kỳ đã ổn định. Ba tháng đầu hoặc mẹ có tình trạng đặc biệt (dọa sinh non, tiền sản giật, nhau tiền đạo) nên hỏi ý kiến bác sĩ trước. Kỹ thuật viên Hà Phương điều chỉnh lực và tư thế theo tuần thai của từng mẹ.',
      },
      {
        question: 'Massage bầu ở Vinhomes Smart City giá bao nhiêu?',
        answer:
          'Hà Phương Mom & Baby Care có 3 gói massage bầu Nhật Bản: Khỏe Mạnh 60 phút (lẻ 355.000đ - combo 10 buổi 2.850.000đ), Quyến Rũ 90 phút (lẻ 565.000đ - combo 4.650.000đ), Hạnh Phúc 120 phút (lẻ 765.000đ - combo 6.665.000đ), kèm quà tặng theo gói. Thực hiện tại spa tòa West A Masteri West Heights hoặc tại nhà.',
      },
      {
        question: 'Massage bầu tại nhà có được không?',
        answer:
          'Được. Kỹ thuật viên mang giường gấp, gối chuyên dụng và thảo dược đến tận căn hộ - phục vụ khu Vinhomes Smart City và Tây Mỗ, Đại Mỗ, Nam Từ Liêm. Chất lượng buổi massage tại nhà giống tại spa, mẹ không phải di chuyển.',
      },
      {
        question: 'Massage bầu nằm tư thế nào cho an toàn?',
        answer:
          'Mẹ nằm nghiêng (ưu tiên nghiêng trái) với hệ gối chuyên dụng đỡ bụng, lưng và kê chân; một số bước thực hiện ở tư thế ngồi. Kỹ thuật viên không tác động trực tiếp vùng bụng và tránh các huyệt nhạy cảm với thai kỳ.',
      },
    ],
    relatedSlugs: [
      'massage-bau-co-an-toan-khong',
      'dau-lung-khi-mang-thai-cach-giam',
      'chuan-bi-gi-truoc-buoi-massage-xong-hoi-tai-nha',
      'massage-sau-sinh-giam-dau',
    ],
    metaTitle: 'Massage bầu Nhật Bản tại Vinhomes Smart City - buổi lẻ từ 355.000đ',
    metaDescription:
      'Massage bầu Nhật Bản tại spa và tại nhà ở Vinhomes Smart City, Nam Từ Liêm: gói 60/90/120 phút, buổi lẻ từ 355.000đ, combo 10 buổi từ 2.850.000đ kèm quà tặng. Giảm đau lưng, phù chân, mất ngủ thai kỳ. Zalo 0987 475 822.',
    keywords: [
      'massage bầu',
      'massage bầu tại nhà',
      'massage bầu Vinhomes Smart City',
      'massage cho bà bầu Hà Nội',
      'massage bầu Nam Từ Liêm',
    ],
    serviceName: 'Massage bầu Nhật Bản',
    serviceType: 'Massage trị liệu cho mẹ bầu',
    offers: [
      { name: 'Massage bầu Khỏe Mạnh 60 phút - buổi lẻ', priceVnd: 355000 },
      { name: 'Massage bầu Khỏe Mạnh - combo 10 buổi', priceVnd: 2850000 },
      { name: 'Massage bầu Quyến Rũ 90 phút - buổi lẻ', priceVnd: 565000 },
      { name: 'Massage bầu Quyến Rũ - combo 10 buổi', priceVnd: 4650000 },
      { name: 'Massage bầu Hạnh Phúc 120 phút - buổi lẻ', priceVnd: 765000 },
      { name: 'Massage bầu Hạnh Phúc - combo 10 buổi', priceVnd: 6665000 },
    ],
  },
  {
    slug: 'thong-tac-tia-sua',
    bookingService: 'Thông tắc tia sữa',
    badge: 'Tại nhà',
    h1: 'Thông tắc tia sữa tại nhà ở Vinhomes Smart City, Nam Từ Liêm',
    intro: [
      'Ngực căng cứng, đau nhức, sữa không ra - tắc tia sữa không chờ được đến mai. Kỹ thuật viên Hà Phương đến tận nhà hỗ trợ khẩn trong ngày, massage thông tia không đau, không dùng thuốc, để mẹ cho bé bú lại ngay.',
      'Spa nằm ngay tòa West A, Masteri West Heights nên di chuyển trong khu Vinhomes Smart City (Vin Smart) và Tây Mỗ, Đại Mỗ, Nam Từ Liêm rất nhanh. Giá từ 350.000đ/buổi tùy tình trạng, báo rõ trước khi làm.',
    ],
    image: {
      src: '/images/tia-sua.png',
      alt: 'Dịch vụ thông tắc tia sữa tại nhà cho mẹ sau sinh ở Vinhomes Smart City',
      width: 900,
      height: 520,
    },
    priceTitle: 'Bảng giá thông tắc tia sữa',
    priceSubtitle: 'Hỗ trợ khẩn trong ngày, tại nhà',
    priceRows: [
      { label: 'Cương sữa sinh lý, tắc sữa non', price: 'từ 350.000đ / buổi' },
      { label: 'Tắc tia sữa, tắc sữa viêm', price: 'báo giá theo tình trạng' },
      { label: 'Kích sữa, gọi sữa về', price: 'tư vấn qua hotline' },
    ],
    priceNote:
      'Kỹ thuật viên thăm khám và báo giá rõ ràng trước khi thực hiện - không phát sinh thêm trong buổi.',
    sections: [
      {
        heading: 'Khi nào mẹ cần thông tắc tia sữa?',
        bullets: [
          'Ngực căng cứng, sờ thấy cục cứng, đau tăng dần',
          'Sữa ra nhỏ giọt hoặc không ra dù ngực đầy',
          'Bé bú không đỡ, hút máy không ra sữa',
          'Bắt đầu ớn lạnh, sốt nhẹ - dấu hiệu cần xử lý ngay trong 24-48 giờ trước khi tiến triển thành viêm tuyến vú',
        ],
      },
      {
        heading: 'Buổi thông tắc tia sữa diễn ra thế nào?',
        steps: [
          'Thăm khám bầu ngực, xác định vị trí và mức độ tắc',
          'Chườm ấm làm mềm mô ngực, giãn ống dẫn sữa',
          'Massage day theo tia bằng kỹ thuật không đau, làm tan dần điểm tắc',
          'Vắt và hút thông sữa ứ đọng, kiểm tra tia sữa chảy đều',
          'Cho bé bú lại ngay tại buổi để duy trì thông tia',
          'Hướng dẫn mẹ cách chườm, massage và cho bú đúng khớp ngậm để phòng tái tắc',
        ],
      },
      {
        heading: 'Vì sao mẹ ở Vinhomes Smart City gọi Hà Phương?',
        bullets: [
          'Hỗ trợ khẩn trong ngày, cả Thứ 7 và Chủ nhật - tắc sữa luôn được ưu tiên xếp lịch sớm nhất',
          'Spa ngay trong khu đô thị nên kỹ thuật viên có mặt nhanh, mẹ không phải bế con chờ lâu',
          'Massage đúng tia, không đau, không xâm lấn, không dùng thuốc - an toàn cho nguồn sữa',
          'Hướng dẫn phòng tái tắc miễn phí sau buổi làm',
        ],
      },
      {
        heading: 'Trường hợp nào mẹ nên đi viện thay vì gọi spa?',
        paragraphs: [
          'Nếu mẹ sốt cao trên 38,5 độ C kéo dài, vùng ngực sưng đỏ nóng rát kèm mệt lả, hoặc đã hình thành ổ áp xe (siêu âm thấy ổ mủ) - mẹ cần khám bác sĩ chuyên khoa ngay. Massage thông tia phù hợp với cương sữa và tắc tia giai đoạn sớm; áp xe vú là chỉ định y khoa, không xử lý tại nhà được.',
        ],
      },
    ],
    faq: [
      {
        question: 'Tắc tia sữa bao lâu thì nguy hiểm?',
        answer:
          'Nếu sau 24-48 giờ tự xử lý (chườm ấm, cho bú, hút sữa) mà ngực vẫn căng cứng đau và bắt đầu sốt, nguy cơ tiến triển thành viêm tuyến vú rất cao. Mẹ nên gọi hỗ trợ sớm - xử lý ở giai đoạn đầu nhẹ nhàng, nhanh và ít đau hơn nhiều.',
      },
      {
        question: 'Thông tắc tia sữa tại nhà ở Vinhomes Smart City giá bao nhiêu?',
        answer:
          'Dịch vụ thông tắc tia sữa tại nhà của Hà Phương Mom & Baby Care từ 350.000đ/buổi tùy tình trạng (cương sữa sinh lý, tắc sữa non, tắc sữa, tắc sữa viêm, kích sữa). Kỹ thuật viên thăm khám và báo giá rõ trước khi làm, phục vụ Vinhomes Smart City và Tây Mỗ, Đại Mỗ, Nam Từ Liêm.',
      },
      {
        question: 'Bao lâu thì kỹ thuật viên có mặt?',
        answer:
          'Hà Phương hỗ trợ khẩn trong ngày, ưu tiên ca tắc sữa. Spa nằm ngay tòa West A, Masteri West Heights nên với các căn hộ trong khu Vinhomes Smart City, kỹ thuật viên thường có mặt rất nhanh sau khi xác nhận lịch - kể cả cuối tuần.',
      },
      {
        question: 'Thông tắc tia sữa có đau không, có phải dùng thuốc không?',
        answer:
          'Không. Kỹ thuật viên massage day theo tia bằng kỹ thuật không đau, kết hợp chườm ấm - hoàn toàn không xâm lấn, không dùng thuốc, không ảnh hưởng nguồn sữa. Mẹ cho bé bú lại được ngay trong buổi.',
      },
    ],
    relatedSlugs: [
      'quy-trinh-thong-tac-tia-sua-tai-nha',
      'dau-hieu-tac-tia-sua',
      'tac-tia-sua-bao-lau-thi-nguy-hiem',
      'cach-phong-tac-tia-sua',
    ],
    metaTitle: 'Thông tắc tia sữa tại nhà Vinhomes Smart City - hỗ trợ trong ngày',
    metaDescription:
      'Thông tắc tia sữa tại nhà ở Vinhomes Smart City, Tây Mỗ, Nam Từ Liêm: hỗ trợ khẩn trong ngày, massage không đau, không dùng thuốc, từ 350.000đ/buổi. Bé bú lại ngay. Hotline/Zalo 0987 475 822.',
    keywords: [
      'thông tắc tia sữa',
      'thông tắc tia sữa tại nhà',
      'thông tắc tia sữa Vinhomes Smart City',
      'tắc tia sữa Nam Từ Liêm',
      'thông tia sữa Hà Nội',
    ],
    serviceName: 'Thông tắc tia sữa tại nhà',
    serviceType: 'Thông tắc tia sữa và hỗ trợ nuôi con bằng sữa mẹ',
    offers: [{ name: 'Thông tắc tia sữa (từ)', priceVnd: 350000 }],
  },
];

export function getServicePage(slug: string): ServicePageContent {
  const page = servicePages.find((item) => item.slug === slug);
  if (!page) {
    throw new Error(`Unknown service page slug: ${slug}`);
  }
  return page;
}
