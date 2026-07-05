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
      'Tắm bé 60.000đ/buổi, bơi float 75.000đ/buổi, vận động chuyên sâu cho bé 100.000đ/buổi. Thực hiện tại spa hoặc tại nhà theo lịch hẹn.',
  },
  {
    question: 'Thông tắc tia sữa có những mức dịch vụ nào?',
    answer:
      'Cương sữa sinh lý & tắc sữa non 120.000đ, tắc sữa 150.000đ, tắc sữa viêm 180.000đ, kích sữa 120.000đ mỗi buổi. Kỹ thuật viên đến tận nhà, thao tác không đau, hỗ trợ khẩn trong ngày.',
  },
  {
    question: 'Những dịch vụ nào làm tại nhà được?',
    answer:
      'Gội đầu 70.000đ, xông hơi 100.000đ (chỉ 50.000đ khi kèm buổi massage), thông tắc tia sữa, massage sau sinh, trông bé ngày 50.000đ/giờ — tối 70.000đ/giờ. Khu vực phục vụ: Vinhomes Smart City & khu vực lân cận (Hà Nội).',
  },
  {
    question: 'Massage cho mẹ có những gói nào?',
    answer:
      'Các gói 60 / 70 / 90 / 100 / 120 phút, từ 90.000đ đến 150.000đ mỗi buổi — phù hợp cả mẹ bầu và mẹ sau sinh.',
  },
  {
    question: 'Đặt lịch bằng cách nào?',
    answer:
      'Gọi hotline 0987 475 822, nhắn Zalo, nhắn tin fanpage Facebook hoặc điền form đặt lịch — spa xác nhận trong khoảng 15 phút (8:00 – 17:30 hằng ngày).',
  },
];
