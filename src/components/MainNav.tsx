'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Main navigation with a persistent active state: the clicked item stays
 * highlighted, and scrolling updates the highlight to the section in view.
 */

interface NavLink {
  href: string;
  id: string;
  label: string;
}

const LINKS: NavLink[] = [
  { href: '/#dich-vu', id: 'dich-vu', label: 'Dịch vụ' },
  { href: '/#cam-nhan', id: 'cam-nhan', label: 'Cảm nhận' },
  { href: '/bai-viet', id: 'bai-viet', label: 'Bài viết' },
  { href: '/#hoi-dap', id: 'hoi-dap', label: 'Hỏi đáp' },
  { href: '/#lien-he', id: 'lien-he', label: 'Liên hệ' },
];

/** Landing sections tracked by the scrollspy, in page order */
const SECTION_IDS = ['dich-vu', 'cam-nhan', 'hoi-dap', 'lien-he'];

export function MainNav() {
  const pathname = usePathname();
  const isBlogPage = pathname.startsWith('/bai-viet');
  const [active, setActive] = useState<string | null>(null);

  // Anchor scrolling must clear the sticky header, whose height changes as it
  // wraps on smaller screens — measure it instead of guessing breakpoints.
  useEffect(() => {
    function applyScrollPadding() {
      const header = document.querySelector<HTMLElement>('.site-header');
      if (header) {
        document.documentElement.style.scrollPaddingTop = `${header.offsetHeight + 10}px`;
      }
    }
    applyScrollPadding();
    window.addEventListener('resize', applyScrollPadding);
    return () => window.removeEventListener('resize', applyScrollPadding);
  }, []);

  useEffect(() => {
    if (isBlogPage) {
      setActive('bai-viet');
      return;
    }

    let frame = 0;
    function update() {
      frame = 0;
      const header = document.querySelector<HTMLElement>('.site-header');
      const offset = (header?.offsetHeight ?? 80) + 140;
      let current: string | null = null;
      for (const id of SECTION_IDS) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }
      setActive(current);
    }
    function handleScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [isBlogPage]);

  return (
    <nav aria-label="Điều hướng chính" className="main-nav">
      {LINKS.map((link) => (
        <a
          key={link.id}
          href={link.href}
          className={active === link.id ? 'active' : undefined}
          aria-current={active === link.id ? 'true' : undefined}
          onClick={() => setActive(link.id)}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
