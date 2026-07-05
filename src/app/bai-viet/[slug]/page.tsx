import type { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingContacts } from '@/components/FloatingContacts';
import { ChevronIcon } from '@/components/icons';
import { getAllSlugs, getPost, formatDateVi } from '@/lib/posts';
import { articleJsonLd, articleFaqJsonLd, breadcrumbJsonLd, jsonLdString } from '@/lib/jsonld';
import { site } from '@/config/site';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/bai-viet/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      locale: 'vi_VN',
      publishedTime: post.date,
      modifiedTime: post.updated,
      images: [{ url: post.cover, width: 900, height: 560, alt: post.title }],
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(articleJsonLd(post)) }}
      />
      {post.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(articleFaqJsonLd(post.faq)) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbJsonLd([
              { name: 'Trang chủ', url: site.url },
              { name: 'Bài viết', url: `${site.url}/bai-viet` },
              { name: post.title, url: `${site.url}/bai-viet/${post.slug}` },
            ]),
          ),
        }}
      />
      <Header />
      <main>
        <article className="article">
          <p className="breadcrumb">
            <a href="/">Trang chủ</a> · <a href="/bai-viet">Bài viết</a> · {post.category}
          </p>
          <span className="article__chip">{post.category}</span>
          <h1>{post.title}</h1>
          <p className="article__meta">
            {site.shortName} · Đăng {formatDateVi(post.date)} · Cập nhật {formatDateVi(post.updated)}
          </p>
          <Image
            src={post.cover}
            alt={post.title}
            width={900}
            height={560}
            priority
            className="article__cover"
          />
          <div className="article-body" dangerouslySetInnerHTML={{ __html: post.html }} />

          {post.faq.length > 0 && (
            <section className="article-faq" aria-label="Câu hỏi thường gặp">
              <h2>Câu hỏi thường gặp</h2>
              <div className="faq__list">
                {post.faq.map((item) => (
                  <details key={item.q} className="faq-item">
                    <summary>
                      {item.q}
                      <ChevronIcon />
                    </summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <aside className="article-cta">
            <h2>Cần Hà Phương hỗ trợ tận nhà?</h2>
            <p>
              Tắm bé 60.000đ, thông tắc tia sữa từ 120.000đ, massage sau sinh từ 90.000đ — phục vụ
              tại spa &amp; tại nhà khu vực {site.khuVuc}. Spa xác nhận lịch trong 15 phút
              (8:00 – 19:00).
            </p>
            <div className="article-cta__actions">
              <a href={site.telHref} className="article-cta__btn">
                Gọi {site.hotline}
              </a>
              <a href={site.zaloHref} target="_blank" rel="noopener" className="article-cta__btn article-cta__btn--ghost">
                Nhắn Zalo
              </a>
              <a href="/#dat-lich" className="article-cta__btn article-cta__btn--ghost">
                Đặt lịch trên web
              </a>
            </div>
          </aside>

          <a href="/bai-viet" className="article__back">
            ← Xem tất cả bài viết
          </a>
        </article>
      </main>
      <Footer />
      <FloatingContacts />
    </>
  );
}
