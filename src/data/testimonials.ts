/** Testimonials — placeholder quotes from the handoff, replace with real reviews when available. */
export interface Testimonial {
  quote: string;
  name: string;
  caption: string;
  initial: string;
  /** Avatar colors */
  bg: string;
  color: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      '“Tắc tia sữa 3 ngày, đau phát sốt. Gọi 8 giờ tối mà 9 giờ chị kỹ thuật viên đã có mặt tại nhà, làm xong nhẹ cả người. Biết ơn lắm!”',
    name: 'Chị Thu Hà',
    caption: 'Mẹ bé Sóc, 2 tháng',
    initial: 'H',
    bg: '#F0DCDC',
    color: '#B05F70',
  },
  {
    quote:
      '“Bé nhà mình mê bơi float ở đây, lần nào về cũng ngủ một mạch. Các cô nhẹ nhàng, phòng ốc sạch và thơm mùi thảo dược.”',
    name: 'Chị Minh Anh',
    caption: 'Mẹ bé Cam, 5 tháng',
    initial: 'M',
    bg: '#E9F0E8',
    color: '#5F8168',
  },
];
