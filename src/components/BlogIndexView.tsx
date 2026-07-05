import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingContacts } from '@/components/FloatingContacts';
import { BlogList } from '@/components/BlogList';
import { Pagination } from '@/components/Pagination';
import { formatDateVi, BLOG_CATEGORIES, type PostMeta } from '@/lib/posts';
import { blogListJsonLd, breadcrumbJsonLd, jsonLdString } from '@/lib/jsonld';
import { site } from '@/config/site';

interface BlogIndexViewProps {
  posts: PostMeta[];
  currentPage: number;
  totalPages: number;
}

/** Shared rendering for /bai-viet and /bai-viet/trang/[page] */
export function BlogIndexView({ posts, currentPage, totalPages }: BlogIndexViewProps) {
  const formattedDates = Object.fromEntries(
    posts.map((post) => [post.slug, formatDateVi(post.updated)]),
  );
  const pageUrl =
    currentPage === 1 ? `${site.url}/bai-viet` : `${site.url}/bai-viet/trang/${currentPage}`;

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
              { name: 'Bài viết', url: pageUrl },
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
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </main>
      <Footer />
      <FloatingContacts />
    </>
  );
}
