import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingContacts } from '@/components/FloatingContacts';
import { BookingSection } from '@/components/BookingSection';
import { ChevronIcon, ClockIcon } from '@/components/icons';
import { getAllPostMeta, type PostMeta } from '@/lib/posts';
import { serviceJsonLd, faqPageJsonLd, breadcrumbJsonLd, jsonLdString } from '@/lib/jsonld';
import { site } from '@/config/site';
import type { ServicePageContent } from '@/data/servicePages';

/**
 * Full-page layout shared by the 4 standalone service pages.
 * Everything renders server-side (SSG) - related article titles are
 * resolved from the markdown content at build time.
 */
export function ServicePageScreen({ page }: { page: ServicePageContent }) {
  const allPosts = getAllPostMeta();
  const relatedPosts = page.relatedSlugs
    .map((slug) => allPosts.find((post) => post.slug === slug))
    .filter((post): post is PostMeta => Boolean(post));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(serviceJsonLd(page)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(faqPageJsonLd(page.faq)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbJsonLd([
              { name: 'Trang chủ', url: site.url },
              { name: page.serviceName, url: `${site.url}/${page.slug}` },
            ]),
          ),
        }}
      />
      <Header />
      <main>
        <section className="service-page">
          <p className="breadcrumb">
            <a href="/">Trang chủ</a> · <a href="/#dich-vu">Dịch vụ</a> · {page.serviceName}
          </p>

          <div className="service-page__hero">
            <div>
              <span className={`badge ${page.badge === 'Tại nhà' ? 'badge--blush' : 'badge--sage'}`}>
                {page.badge}
              </span>
              <h1 className="service-page__h1">{page.h1}</h1>
              {page.intro.map((paragraph) => (
                <p key={paragraph} className="service-page__intro">
                  {paragraph}
                </p>
              ))}
              <div className="service-page__ctas">
                <a href="#dat-lich" className="btn-primary">
                  Đặt lịch hẹn
                </a>
                <a href={site.telHref} className="btn-outline">
                  Gọi {site.hotline}
                </a>
                <a
                  href={site.zaloHref}
                  target="_blank"
                  rel="noopener"
                  className="btn-outline btn-outline--zalo"
                >
                  Nhắn Zalo
                </a>
              </div>
              <p className="service-page__hours">
                <ClockIcon />
                Mở cửa {site.gioMoCua}
              </p>
            </div>
            <figure className="service-page__media">
              <Image
                src={page.image.src}
                alt={page.image.alt}
                width={page.image.width}
                height={page.image.height}
                priority
                className="service-page__image"
              />
            </figure>
          </div>

          <div className="service-page__grid">
            <aside className="price-group service-page__prices" aria-label={page.priceTitle}>
              <h2 className="price-group__title">{page.priceTitle}</h2>
              <p className="price-group__sub">{page.priceSubtitle}</p>
              <ul className="service-page__price-list">
                {page.priceRows.map((row) => (
                  <li key={row.label} className="price-row">
                    <span>{row.label}</span>
                    <span className="price-row__dots" />
                    <span className="price-row__price">{row.price}</span>
                  </li>
                ))}
              </ul>
              {page.priceNote && <p className="service-page__price-note">{page.priceNote}</p>}
            </aside>

            <div>
              {page.sections.map((section) => (
                <section key={section.heading} className="service-page__section">
                  <h2>{section.heading}</h2>
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                  {section.steps && (
                    <ol>
                      {section.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  )}
                </section>
              ))}
            </div>
          </div>

          <section className="service-page__faq" aria-label="Câu hỏi thường gặp">
            <h2>Câu hỏi thường gặp</h2>
            <div className="faq__list">
              {page.faq.map((item) => (
                <details key={item.question} className="faq-item">
                  <summary>
                    {item.question}
                    <ChevronIcon />
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {relatedPosts.length > 0 && (
            <section className="service-page__related" aria-label="Bài viết liên quan">
              <h2>Bài viết liên quan</h2>
              <ul>
                {relatedPosts.map((post) => (
                  <li key={post.slug}>
                    <a href={`/bai-viet/${post.slug}`}>{post.title}</a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </section>
        <BookingSection defaultService={page.bookingService} />
      </main>
      <Footer />
      <FloatingContacts />
    </>
  );
}
