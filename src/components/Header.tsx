import { site } from '@/config/site';
import { PhoneIcon } from '@/components/icons';
import { MainNav } from '@/components/MainNav';

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a href="/" className="logo">
          <span className="logo__mark">HP</span>
          <span className="logo__text">
            <span className="logo__name">Ha Phuong</span>
            <span className="logo__sub">Mom &amp; Baby Care</span>
          </span>
        </a>
        <MainNav />
        <div className="header-actions">
          <a href={site.telHref} className="header-hotline">
            <PhoneIcon />
            {site.hotline}
          </a>
          <a href="/#dat-lich" className="btn-primary btn-header">
            Đặt lịch
          </a>
        </div>
      </div>
    </header>
  );
}
