import type { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingContacts } from '@/components/FloatingContacts';
import { getGalleryPhotos } from '@/lib/gallery';
import { breadcrumbJsonLd, jsonLdString } from '@/lib/jsonld';
import { site } from '@/config/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Hình ảnh thực tế tại spa',
  description:
    'Hình ảnh thực tế tại Ha Phuong Mom & Baby Care: bé bơi float, tắm bé, massage cho mẹ và không gian spa — cập nhật từ hoạt động hằng ngày.',
  alternates: { canonical: '/hinh-anh' },
  openGraph: {
    title: `Hình ảnh thực tế — ${site.name}`,
    description: 'Bé bơi float, tắm bé, massage cho mẹ và không gian spa qua ảnh chụp thực tế.',
    url: '/hinh-anh',
    type: 'website',
    locale: 'vi_VN',
  },
};

export default function GalleryPage() {
  const photos = getGalleryPhotos();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString({
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: `Hình ảnh thực tế — ${site.name}`,
            url: `${site.url}/hinh-anh`,
            publisher: { '@id': `${site.url}/#business` },
            image: photos.map((photo) => `${site.url}${photo.src}`),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbJsonLd([
              { name: 'Trang chủ', url: site.url },
              { name: 'Hình ảnh', url: `${site.url}/hinh-anh` },
            ]),
          ),
        }}
      />
      <Header />
      <main>
        <section className="gallery-page">
          <div className="section-intro">
            <p className="eyebrow">Hình ảnh</p>
            <h1 className="packages-page__h1">Khoảnh khắc thực tế tại {site.shortName}</h1>
            <p className="section-sub">
              Ảnh chụp từ hoạt động hằng ngày: bé bơi float, tắm bé, chăm sóc mẹ — cập nhật thường
              xuyên. Xem thêm ảnh mỗi ngày trên{' '}
              <a href={site.facebookUrl} target="_blank" rel="noopener">
                Facebook của spa
              </a>
              .
            </p>
          </div>
          <div className="gallery-grid">
            {photos.map((photo) => (
              <figure key={photo.src} className="gallery-item">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  className="gallery-item__img"
                />
              </figure>
            ))}
          </div>
          {photos.length === 0 && (
            <p className="packages-page__note">Ảnh đang được cập nhật — quay lại sau mẹ nhé.</p>
          )}
        </section>
      </main>
      <Footer />
      <FloatingContacts />
    </>
  );
}
