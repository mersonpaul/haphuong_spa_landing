import Image from 'next/image';
import { serviceCards } from '@/data/services';

export function Services() {
  return (
    <section id="dich-vu" className="services">
      <div className="section-intro">
        <p className="eyebrow">Dịch vụ</p>
        <h2 className="section-h2">Chăm sóc trọn vẹn cho hai mẹ con</h2>
        <p className="section-sub">
          Thực hiện tại spa hoặc ngay tại nhà bạn — linh hoạt theo lịch của mẹ, giá niêm yết rõ
          ràng.
        </p>
      </div>
      <div className="services__grid">
        {serviceCards.map((service) => (
          <article key={service.id} aria-label={`Dịch vụ ${service.name}`} className="service-card">
            <Image
              src={service.image}
              alt={service.imageAlt}
              width={service.imageWidth}
              height={service.imageHeight}
              loading="lazy"
              className="service-card__image"
            />
            <div className="service-card__body">
              <div className="service-card__head">
                <h3 className="service-card__name">{service.name}</h3>
                <span className={`badge ${service.badge === 'Tại nhà' ? 'badge--blush' : 'badge--sage'}`}>
                  {service.badge}
                </span>
              </div>
              <p className="service-card__desc">{service.description}</p>
              <p className="service-card__price">{service.priceLabel}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
