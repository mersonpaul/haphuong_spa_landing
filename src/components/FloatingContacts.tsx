import { site } from '@/config/site';
import { PhoneIcon } from '@/components/icons';

export function FloatingContacts() {
  return (
    <div className="floating-contacts">
      <a
        href={site.facebookUrl}
        target="_blank"
        rel="noopener"
        aria-label="Nhắn tin Facebook"
        title="Facebook"
        className="floating-contacts__fb"
      >
        f
      </a>
      <a
        href={site.zaloHref}
        target="_blank"
        rel="noopener"
        aria-label="Nhắn Zalo"
        title="Zalo"
        className="floating-contacts__zalo"
      >
        Z
      </a>
      <a href={site.telHref} aria-label="Gọi điện thoại" title="Gọi ngay" className="floating-contacts__phone">
        <PhoneIcon size={20} />
      </a>
    </div>
  );
}
