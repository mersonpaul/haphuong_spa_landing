import { ChevronIcon } from '@/components/icons';
import { formatVnd, type CarePackage } from '@/data/packages';

/**
 * One treatment-package card: prices (package price emphasized), gift,
 * commitment and a <details> accordion with the full step-by-step therapy —
 * kept in the DOM when closed so search engines and AI agents can read it.
 */
export function PackageCard({ pkg }: { pkg: CarePackage }) {
  return (
    <article
      id={pkg.id}
      aria-label={`Gói ${pkg.name}`}
      className={`pkg-card${pkg.featured ? ' pkg-card--featured' : ''}`}
    >
      {pkg.featured && <span className="pkg-card__flag">Được chọn nhiều nhất</span>}
      <h3 className="pkg-card__name">{pkg.name}</h3>
      <p className="pkg-card__meta">
        {pkg.sessionMinutes} phút / buổi · {pkg.therapyCount} liệu trình · {pkg.stepCount} bước trị
        liệu
      </p>
      <p className="pkg-card__desc">{pkg.description}</p>

      <div className="pkg-card__pricing">
        {pkg.singlePriceVnd && (
          <div className="pkg-price-row pkg-price-row--single">
            <span>Buổi lẻ</span>
            <span className="pkg-price-row__dots" />
            <span className="pkg-price-row__value">{formatVnd(pkg.singlePriceVnd)}</span>
          </div>
        )}
        <div className="pkg-price-row">
          <span className="pkg-price-row__label">
            {pkg.singlePriceVnd ? 'Combo' : 'Gói'} {pkg.sessionCount} buổi
          </span>
          <span className="pkg-price-row__dots" />
          <span className="pkg-price-row__price">{formatVnd(pkg.packagePriceVnd)}</span>
        </div>
        <p className="pkg-card__per-session">{pkg.perSessionLabel}</p>
      </div>

      {pkg.gift && (
        <p className="pkg-card__gift">
          <strong>Tặng:</strong> {pkg.gift}
        </p>
      )}
      {pkg.commitment && <p className="pkg-card__commit">{pkg.commitment}</p>}

      <details className="pkg-card__details">
        <summary>
          Chi tiết liệu trình ({pkg.stepCount} bước)
          <ChevronIcon />
        </summary>
        <div className="pkg-card__details-body">
          {pkg.therapies.map((therapy) => (
            <div key={therapy.title}>
              <h4>{therapy.title}</h4>
              <ol>
                {therapy.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          ))}
          {pkg.effects.length > 0 && (
            <div>
              <h4>Hiệu quả liệu trình</h4>
              <ul>
                {pkg.effects.map((effect) => (
                  <li key={effect}>{effect}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </details>

      <a
        href="/#dat-lich"
        className={`pkg-card__cta${pkg.featured ? ' pkg-card__cta--solid' : ''}`}
      >
        Đặt gói này
      </a>
    </article>
  );
}
