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
      'Tắm bé 150.000đ/buổi lẻ - gói 10 buổi 1.200.000đ; bơi float 150.000đ/buổi. Thực hiện tại spa hoặc tại nhà theo lịch hẹn.',
  },
  {
    question: 'Thông tắc tia sữa có những mức dịch vụ nào?',
    answer:
      'Thông tắc tia sữa từ 350.000đ/buổi tuỳ tình trạng (cương sữa sinh lý, tắc sữa, tắc sữa viêm, kích sữa). Kỹ thuật viên đến tận nhà, thao tác không đau, hỗ trợ khẩn trong ngày.',
  },
  {
    question: 'Những dịch vụ nào làm tại nhà được?',
    answer:
      'Gội đầu 100.000đ, xông hơi 200.000đ, thông tắc tia sữa, massage sau sinh, trông bé ngày 85.000đ/giờ - đêm 150.000đ/giờ. Khu vực phục vụ: Vinhomes Smart City & khu vực lân cận (Hà Nội).',
  },
  {
    question: 'Massage cho mẹ có những gói nào?',
    answer:
      'Có 3 gói massage bầu: Khỏe Mạnh 60 phút (lẻ 355.000đ - combo 10 buổi 2.850.000đ), Quyến Rũ 90 phút (lẻ 565.000đ - combo 4.650.000đ), Hạnh Phúc 120 phút (lẻ 765.000đ - combo 6.665.000đ). Mẹ sau sinh có 3 gói trọn liệu trình từ 3.600.000đ, kèm cam kết và quà tặng.',
  },
  {
    question: 'Đặt lịch bằng cách nào?',
    answer:
      'Gọi hotline 0987 475 822, nhắn Zalo, nhắn tin fanpage Facebook hoặc điền form đặt lịch - spa xác nhận trong khoảng 15 phút (8:00 - 17:30 hằng ngày).',
  },
];
