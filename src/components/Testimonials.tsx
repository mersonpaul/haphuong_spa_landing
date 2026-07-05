import { testimonials } from '@/data/testimonials';

export function Testimonials() {
  return (
    <section id="cam-nhan" className="testimonials">
      <div className="section-intro" style={{ marginBottom: 42, maxWidth: 'none' }}>
        <p className="eyebrow">Cảm nhận</p>
        <h2 className="section-h2" style={{ marginBottom: 0 }}>
          Các mẹ nói về Hà Phương
        </h2>
      </div>
      <div className="testimonials__grid">
        {testimonials.map((item) => (
          <figure key={item.name} className="quote-card">
            <blockquote>{item.quote}</blockquote>
            <figcaption>
              <span className="quote-card__avatar" style={{ background: item.bg, color: item.color }}>
                {item.initial}
              </span>
              <span style={{ lineHeight: 1.3 }}>
                <span className="quote-card__name">{item.name}</span>
                <span className="quote-card__caption">{item.caption}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
