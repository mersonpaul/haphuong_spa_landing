import { site } from '@/config/site';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <span className="site-footer__mark">HP</span>
          <span>
            <span className="site-footer__name">Ha Phuong Mom &amp; Baby Care</span>
            <span className="site-footer__tagline">{site.tagline}</span>
          </span>
        </div>
        <nav aria-label="Liên kết cuối trang" className="site-footer__nav">
          <a href="/#dich-vu">Dịch vụ</a>
          <a href="/bai-viet">Bài viết</a>
          <a href="/#hoi-dap">Hỏi đáp</a>
          <a href={site.facebookUrl} target="_blank" rel="noopener">
            Facebook
          </a>
        </nav>
        <p className="site-footer__meta">
          {site.diaChi} · Hotline <a href={site.telHref}>{site.hotline}</a> · © 2026 Ha Phuong Mom
          &amp; Baby Care
        </p>
      </div>
    </footer>
  );
}
