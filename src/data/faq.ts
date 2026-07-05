/**
 * FAQ shown on the landing page. The FAQPage JSON-LD is generated from this
 * same array so the schema always matches the visible content verbatim
 * (Google penalizes mismatches).
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'Tắm bé và bơi float giá bao nhiêu?',
    answer:
      'Tắm bé 150.000đ/buổi lẻ — gói 10 buổi 1.200.000đ; bơi float 150.000đ/buổi. Thực hiện tại spa hoặc tại nhà theo lịch hẹn.',
  },
  {
    question: 'Thông tắc tia sữa có những mức dịch vụ nào?',
    answer:
      'Thông tắc tia sữa từ 350.000đ/buổi tuỳ tình trạng (cương sữa sinh lý, tắc sữa, tắc sữa viêm, kích sữa). Kỹ thuật viên đến tận nhà, thao tác không đau, hỗ trợ khẩn trong ngày.',
  },
  {
    question: 'Những dịch vụ nào làm tại nhà được?',
    answer:
      'Gội đầu 100.000đ, xông hơi 200.000đ, thông tắc tia sữa, massage sau sinh, trông bé ngày 85.000đ/giờ — đêm 150.000đ/giờ. Khu vực phục vụ: Vinhomes Smart City & khu vực lân cận (Hà Nội).',
  },
  {
    question: 'Massage cho mẹ có những gói nào?',
    answer:
      'Các gói 60 – 120 phút, từ 300.000đ mỗi buổi — phù hợp cả mẹ bầu và mẹ sau sinh.',
  },
  {
    question: 'Đặt lịch bằng cách nào?',
    answer:
      'Gọi hotline 0987 475 822, nhắn Zalo, nhắn tin fanpage Facebook hoặc điền form đặt lịch — spa xác nhận trong khoảng 15 phút (8:00 – 17:30 hằng ngày).',
  },
];
