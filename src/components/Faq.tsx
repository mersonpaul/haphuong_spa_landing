import { faqItems } from '@/data/faq';
import { ChevronIcon } from '@/components/icons';

export function Faq() {
  return (
    <section id="hoi-dap" className="faq">
      <div className="section-intro" style={{ marginBottom: 36, maxWidth: 'none' }}>
        <p className="eyebrow">Hỏi đáp</p>
        <h2 className="section-h2" style={{ marginBottom: 0 }}>
          Câu hỏi thường gặp
        </h2>
      </div>
      <div className="faq__list">
        {faqItems.map((item) => (
          <details key={item.question} className="faq-item">
            <summary>
              {item.question}
              <ChevronIcon />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
