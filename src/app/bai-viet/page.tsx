import type { Metadata } from 'next';
import { BlogIndexView } from '@/components/BlogIndexView';
import { getAllPostMeta, POSTS_PER_PAGE } from '@/lib/posts';
import { site } from '@/config/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Bài viết chăm sóc mẹ & bé',
  description:
    'Cẩm nang chăm sóc mẹ và bé của Ha Phuong Mom & Baby Care: tắc tia sữa, tắm bé sơ sinh, bơi float, massage sau sinh, ở cữ khoa học, chọn dịch vụ tại nhà — kèm bảng giá minh bạch.',
  alternates: { canonical: '/bai-viet' },
  openGraph: {
    title: `Bài viết chăm sóc mẹ & bé — ${site.name}`,
    description:
      'Cẩm nang chăm sóc mẹ và bé: sữa mẹ, tắm bé & float, mẹ sau sinh, chọn dịch vụ tại nhà.',
    url: '/bai-viet',
    type: 'website',
    locale: 'vi_VN',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: site.name }],
  },
};

export default function BlogIndexPage() {
  const allPosts = getAllPostMeta();
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));

  return (
    <BlogIndexView posts={allPosts.slice(0, POSTS_PER_PAGE)} currentPage={1} totalPages={totalPages} />
  );
}
