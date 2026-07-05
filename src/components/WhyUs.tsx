import { StarIcon, LeafIcon, HomeIcon } from '@/components/icons';

const reasons = [
  {
    icon: <StarIcon />,
    title: 'Chuyên viên có chứng chỉ',
    description: 'Đào tạo bài bản về chăm sóc mẹ sau sinh và sơ sinh, thao tác nhẹ nhàng, đúng kỹ thuật.',
  },
  {
    icon: <LeafIcon />,
    title: 'Thảo dược lành tính',
    description: 'Sản phẩm nguồn gốc thiên nhiên, an toàn cho làn da non của bé và mẹ đang cho con bú.',
  },
  {
    icon: <HomeIcon />,
    title: 'Tận nhà, 7 ngày / tuần',
    description: 'Đặt lịch linh hoạt cả cuối tuần; hầu hết dịch vụ thực hiện ngay tại nhà bạn.',
  },
];

export function WhyUs() {
  return (
    <section className="why" aria-label="Vì sao chọn Hà Phương">
      <div className="why__inner">
        {reasons.map((reason) => (
          <div key={reason.title} className="why__item">
            <span className="why__icon">{reason.icon}</span>
            <h3 className="why__title">{reason.title}</h3>
            <p className="why__desc">{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
