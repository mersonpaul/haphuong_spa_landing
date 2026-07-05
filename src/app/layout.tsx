import type { Metadata } from 'next';
import { Prata, Be_Vietnam_Pro } from 'next/font/google';
import { site } from '@/config/site';
import './globals.css';

const prata = Prata({
  weight: '400',
  subsets: ['vietnamese', 'latin'],
  display: 'swap',
  variable: '--font-heading',
});

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['400', '500', '600', '700'],
  subsets: ['vietnamese', 'latin'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      'Ha Phuong Mom & Baby Care — Tắm bé & Float, Thông tắc tia sữa, Massage sau sinh, Chăm sóc tại nhà',
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: 'Ha Phuong Mom & Baby Care — Spa mẹ và bé, chăm sóc tại nhà',
    description:
      'Tắm bé & float, thông tắc tia sữa, massage sau sinh, gội & xông hơi, trông bé tại nhà. Đặt lịch qua điện thoại, Zalo, Facebook.',
    type: 'website',
    locale: 'vi_VN',
    siteName: site.name,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: site.name }],
  },
  robots: { index: true, follow: true },
  other: { 'format-detection': 'telephone=yes' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${prata.variable} ${beVietnamPro.variable}`}>
      <body>{children}</body>
    </html>
  );
}
