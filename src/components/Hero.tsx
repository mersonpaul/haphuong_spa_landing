import Image from 'next/image';
import { site } from '@/config/site';
import { ClockIcon, HeartIcon } from '@/components/icons';

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__blob-1" aria-hidden="true" />
      <div className="hero__blob-2" aria-hidden="true" />
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">Ha Phuong Mom &amp; Baby Care · Tại spa &amp; tận nhà</p>
          <h1>
            Nâng niu mẹ,
            <br />
            ôm ấp bé.
          </h1>
          <p className="hero__desc">
            Tắm bé &amp; bơi float, thông tắc tia sữa, massage sau sinh, gội đầu — xông hơi và
            trông bé ngay tại nhà bạn. Chăm sóc bằng đôi tay chuyên môn và sự dịu dàng của người
            thân.
          </p>
          <div className="hero__ctas">
            <a href="#dat-lich" className="btn-primary">
              Đặt lịch hẹn
            </a>
            <a href={site.zaloHref} target="_blank" rel="noopener" className="btn-outline btn-outline--zalo">
              <Image src="/images/icons/zalo.png" alt="" width={40} height={40} />
              Nhắn Zalo
            </a>
            <a href={site.facebookUrl} target="_blank" rel="noopener" className="btn-outline btn-outline--facebook">
              <Image src="/images/icons/facebook.png" alt="" width={26} height={26} />
              Facebook
            </a>
          </div>
          <p className="hero__hours">
            <ClockIcon />
            Mở cửa {site.gioMoCua}
          </p>
        </div>
        <div className="hero__media">
          <Image
            src="/images/hero.png"
            alt="Không gian chăm sóc mẹ và bé tại Hà Phương Mom và Baby Care"
            width={1100}
            height={1000}
            priority
            className="hero__image"
          />
          <div className="hero__card">
            <span className="hero__card-icon">
              <HeartIcon />
            </span>
            <span>
              <span className="hero__card-title">Tắm bé 150.000đ / buổi</span>
              <span className="hero__card-sub">Gói 10 buổi chỉ 1.200.000đ · tại spa hoặc tại nhà</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
