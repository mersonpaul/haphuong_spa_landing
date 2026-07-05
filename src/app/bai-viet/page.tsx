import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingContacts } from '@/components/FloatingContacts';
import { BlogList } from '@/components/BlogList';
import { getAllPostMeta, formatDateVi, BLOG_CATEGORIES } from '@/lib/posts';
import { blogListJsonLd, breadcrumbJsonLd, jsonLdString } from '@/lib/jsonld';
import { site } from '@/config/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Bài viết chăm sóc mẹ & bé',
  description:
    'Cẩm nang chăm sóc mẹ và bé của Hà Phương Mom & Baby Care: tắc tia sữa, tắm bé sơ sinh, bơi float, massage sau sinh, ở cữ khoa học, chọn dịch vụ tại nhà — kèm bảng giá minh bạch.',
  alternates: { canonical: '/bai-viet' },
  openGraph: {
    title: `Bài viết chăm sóc mẹ & bé — ${site.name}`,
    description:
      'Cẩm nang chăm sóc mẹ và bé: sữa mẹ, tắm bé & float, mẹ sau sinh, chọn dịch vụ tại nhà.',
    type: 'website',
    locale: 'vi_VN',
  },
};

export default function BlogIndexPage() {
  const posts = getAllPostMeta();
  const formattedDates = Object.fromEntries(
    posts.map((post) => [post.slug, formatDateVi(post.updated)]),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(blogListJsonLd(posts)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbJsonLd([
              { name: 'Trang chủ', url: site.url },
              { name: 'Bài viết', url: `${site.url}/bai-viet` },
            ]),
          ),
        }}
      />
      <Header />
      <main>
        <section className="blog-hero">
          <p className="eyebrow">Cẩm nang mẹ &amp; bé</p>
          <h1 className="section-h2" style={{ fontSize: 'clamp(30px, 6vw, 42px)' }}>
            Bài viết chăm sóc mẹ &amp; bé
          </h1>
          <p className="section-sub" style={{ maxWidth: 640, margin: '0 auto' }}>
            Kinh nghiệm thực tế từ kỹ thuật viên Hà Phương: sữa mẹ, tắm bé, phục hồi sau sinh và
            cách chọn dịch vụ tại nhà an toàn.
          </p>
        </section>
        <BlogList posts={posts} categories={BLOG_CATEGORIES} formattedDates={formattedDates} />
      </main>
      <Footer />
      <FloatingContacts />
    </>
  );
}
