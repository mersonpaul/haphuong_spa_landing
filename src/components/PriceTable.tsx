import { priceGroups } from '@/data/services';

export function PriceTable() {
  return (
    <section id="bang-gia" className="prices">
      <div className="section-intro" style={{ maxWidth: 560, marginBottom: 42 }}>
        <p className="eyebrow">Bảng giá</p>
        <h2 className="section-h2" style={{ marginBottom: 12 }}>
          Giá niêm yết, không phát sinh
        </h2>
        <p className="section-sub" style={{ fontSize: 15.5 }}>
          Đặt theo buổi lẻ, không ép gói dài hạn.
        </p>
      </div>
      <div className="prices__grid">
        {priceGroups.map((group) => (
          <div key={group.title} className="price-group">
            <h3 className="price-group__title">{group.title}</h3>
            <p className="price-group__sub">{group.subtitle}</p>
            <ul>
              {group.items.map((item) => (
                <li key={item.code} className="price-row">
                  <span>{item.name}</span>
                  <span className="price-row__dots" aria-hidden="true" />
                  <span className="price-row__price">{item.priceLabel}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
