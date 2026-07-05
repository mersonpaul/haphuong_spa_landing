import { site } from '@/config/site';
import { PhoneIcon } from '@/components/icons';

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a href="/" className="logo">
          <span className="logo__mark">HP</span>
          <span className="logo__text">
            <span className="logo__name">Hà Phương</span>
            <span className="logo__sub">Mom &amp; Baby Care</span>
          </span>
        </a>
        <nav aria-label="Điều hướng chính" className="main-nav">
          <a href="/#dich-vu">Dịch vụ</a>
          <a href="/#bang-gia">Bảng giá</a>
          <a href="/#cam-nhan">Cảm nhận</a>
          <a href="/bai-viet">Bài viết</a>
          <a href="/#hoi-dap">Hỏi đáp</a>
          <a href="/#lien-he">Liên hệ</a>
        </nav>
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
