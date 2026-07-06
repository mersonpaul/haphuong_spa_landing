import { carePackages, formatVnd } from '@/data/packages';

/**
 * Compact landing-page teaser for the 6 treatment packages — full details
 * (therapy steps, gifts, commitments) live on /goi-lieu-trinh.
 */
export function PackagesTeaser() {
  return (
    <section id="goi-lieu-trinh" className="packages-teaser">
      <div className="section-intro">
        <p className="eyebrow">Gói liệu trình</p>
        <h2 className="section-h2">Chăm sóc theo liệu trình, hiệu quả dài lâu</h2>
        <p className="section-sub">
          Sức khỏe của mẹ cần được chăm sóc đều đặn — một liệu trình trọn vẹn luôn hiệu quả hơn 1 –
          2 buổi lẻ. Đặt gói để nhận giá tốt nhất cùng nhiều quà tặng kèm theo.
        </p>
      </div>
      <div className="packages-teaser__grid">
        {carePackages.map((pkg) => (
          <a key={pkg.id} href={`/goi-lieu-trinh#${pkg.id}`} className="pkg-mini">
            {pkg.featured && <span className="pkg-mini__flag">Được chọn nhiều nhất</span>}
            <span className="pkg-mini__group">
              {pkg.group === 'me-bau' ? 'Mẹ bầu' : 'Mẹ sau sinh'}
            </span>
            <span className="pkg-mini__name">{pkg.name}</span>
            <span className="pkg-mini__meta">
              {pkg.sessionMinutes} phút / buổi · {pkg.stepCount} bước trị liệu
            </span>
            <span className="pkg-mini__price">
              {pkg.singlePriceVnd ? 'Combo' : 'Gói'} {pkg.sessionCount} buổi —{' '}
              {formatVnd(pkg.packagePriceVnd)}
            </span>
          </a>
        ))}
      </div>
      <div className="packages-teaser__more">
        <a href="/goi-lieu-trinh" className="btn-primary">
          Xem chi tiết 6 gói liệu trình
        </a>
      </div>
    </section>
  );
}
