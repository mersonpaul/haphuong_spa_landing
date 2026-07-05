import type { Metadata } from 'next';
import { BlogIndexView } from '@/components/BlogIndexView';
import { getAllPostMeta, POSTS_PER_PAGE } from '@/lib/posts';
import { site } from '@/config/site';

export const dynamic = 'force-static';
export const dynamicParams = false;

function totalPageCount(): number {
  return Math.max(1, Math.ceil(getAllPostMeta().length / POSTS_PER_PAGE));
}

export function generateStaticParams() {
  const total = totalPageCount();
  // Page 1 lives at /bai-viet; only pages 2+ render here.
  return Array.from({ length: Math.max(0, total - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export function generateMetadata({ params }: { params: { page: string } }): Metadata {
  const page = Number(params.page);
  return {
    title: `Bài viết chăm sóc mẹ & bé — Trang ${page}`,
    description: `Trang ${page} — cẩm nang chăm sóc mẹ và bé của ${site.name}: sữa mẹ, tắm bé, phục hồi sau sinh, chọn dịch vụ tại nhà.`,
    alternates: { canonical: `/bai-viet/trang/${page}` },
  };
}

export default function BlogIndexPagedPage({ params }: { params: { page: string } }) {
  const page = Number(params.page);
  const allPosts = getAllPostMeta();
  const totalPages = totalPageCount();
  const start = (page - 1) * POSTS_PER_PAGE;

  return (
    <BlogIndexView
      posts={allPosts.slice(start, start + POSTS_PER_PAGE)}
      currentPage={page}
      totalPages={totalPages}
    />
  );
}
