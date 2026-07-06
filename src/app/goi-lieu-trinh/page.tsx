import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingContacts } from '@/components/FloatingContacts';
import { BookingSection } from '@/components/BookingSection';
import { PackageCard } from '@/components/PackageCard';
import { carePackages, packageGroups } from '@/data/packages';
import { packagesCatalogJsonLd, breadcrumbJsonLd, jsonLdString } from '@/lib/jsonld';
import { site } from '@/config/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Gói liệu trình chăm sóc mẹ bầu & sau sinh',
  description:
    'Gói liệu trình của Ha Phuong Mom & Baby Care: massage bầu Nhật Bản combo 10 buổi từ 2.850.000đ, phục hồi sau sinh Đả Thông Kinh Lạc 3.600.000đ, Da Trắng Dáng Thon 5.900.000đ, Sau Sinh Hạnh Phúc VIP 7.350.000đ — cam kết giảm 5–26cm, nhiều quà tặng kèm theo.',
  alternates: { canonical: '/goi-lieu-trinh' },
  openGraph: {
    title: `Gói liệu trình chăm sóc mẹ bầu & sau sinh — ${site.name}`,
    description:
      'Massage bầu Nhật Bản combo 10 buổi, phục hồi sau sinh trọn liệu trình — cam kết hiệu quả, nhiều quà tặng.',
    url: '/goi-lieu-trinh',
    type: 'website',
    locale: 'vi_VN',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: site.name }],
  },
};

export default function PackagesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(packagesCatalogJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbJsonLd([
              { name: 'Trang chủ', url: site.url },
              { name: 'Gói liệu trình', url: `${site.url}/goi-lieu-trinh` },
            ]),
          ),
        }}
      />
      <Header />
      <main>
        <section className="packages-page">
          <div className="section-intro">
            <p className="eyebrow">Gói liệu trình</p>
            <h1 className="packages-page__h1">Chăm sóc theo liệu trình, hiệu quả dài lâu</h1>
            <p className="section-sub">
              Sức khỏe của mẹ cần được chăm sóc đều đặn — một liệu trình trọn vẹn luôn hiệu quả hơn
              1 – 2 buổi lẻ. Đặt gói để nhận giá tốt nhất cùng nhiều quà tặng kèm theo.
            </p>
          </div>

          {packageGroups.map((group) => (
            <div key={group.id} className="pkg-group">
              <div className="pkg-group__head">
                <h2 className="pkg-group__title">{group.title}</h2>
                <span className="pkg-group__sub">{group.subtitle}</span>
                <span className="pkg-group__rule" />
              </div>
              <div className="pkg-grid">
                {carePackages
                  .filter((pkg) => pkg.group === group.id)
                  .map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} />
                  ))}
              </div>
            </div>
          ))}

          <p className="packages-page__note">
            Chưa chọn được gói phù hợp? Gọi{' '}
            <a href={site.telHref} className="packages-page__tel">
              {site.hotline}
            </a>{' '}
            — {site.shortName} tư vấn theo tình trạng của mẹ. Tất cả các gói đặt lịch linh hoạt{' '}
            {site.gioMoCuaNgan}.
          </p>
        </section>
        <BookingSection />
      </main>
      <Footer />
      <FloatingContacts />
    </>
  );
}
