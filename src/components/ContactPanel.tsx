import Image from 'next/image';
import { site } from '@/config/site';
import { PhoneIcon } from '@/components/icons';

export function ContactPanel() {
  return (
    <div id="lien-he" className="contact-panel">
      <h2 className="contact-panel__title">Liên hệ nhanh</h2>
      <a href={site.telHref} className="contact-card contact-card--phone">
        <span className="contact-card__icon" style={{ background: 'var(--accent-bg)' }}>
          <PhoneIcon size={20} stroke="#B05F70" />
        </span>
        <span style={{ lineHeight: 1.4 }}>
          <span className="contact-card__label">Gọi điện thoại — nhanh nhất</span>
          <span className="contact-card__value">{site.hotline}</span>
        </span>
      </a>
      <a href={site.zaloHref} target="_blank" rel="noopener" className="contact-card contact-card--zalo">
        <span className="contact-card__icon" style={{ background: '#E5EEFB' }}>
          <Image src="/images/icons/zalo.png" alt="" width={30} height={30} />
        </span>
        <span style={{ lineHeight: 1.4 }}>
          <span className="contact-card__label">Nhắn Zalo — gửi ảnh, hỏi giá</span>
          <span className="contact-card__value">zalo.me/{site.hotlineDigits}</span>
        </span>
      </a>
      <a href={site.facebookUrl} target="_blank" rel="noopener" className="contact-card contact-card--facebook">
        <span className="contact-card__icon" style={{ background: '#E5EEFB' }}>
          <Image src="/images/icons/facebook.png" alt="" width={28} height={28} />
        </span>
        <span style={{ lineHeight: 1.4 }}>
          <span className="contact-card__label">Facebook — xem ảnh thật mỗi ngày</span>
          <span className="contact-card__value" style={{ fontSize: 16 }}>
            {site.facebookLabel}
          </span>
        </span>
      </a>
      <div className="contact-info">
        <p>
          <strong>Giờ mở cửa</strong> {site.gioMoCuaNgan}
        </p>
        <p>
          <strong>Khu vực</strong> {site.khuVuc}
        </p>
        <p>
          <strong>Địa chỉ</strong> {site.diaChi}
        </p>
      </div>
    </div>
  );
}
