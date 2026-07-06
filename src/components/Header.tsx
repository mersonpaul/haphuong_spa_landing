import Image from 'next/image';
import { site } from '@/config/site';
import { PhoneIcon } from '@/components/icons';
import { MainNav } from '@/components/MainNav';

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a href="/" className="logo">
          <span className="logo__mark">
            <Image
              src="/images/logo-mark.png"
              alt={`Logo ${site.name}`}
              width={36}
              height={36}
              priority
              className="logo__mark-img"
            />
          </span>
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
