import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { servicePages } from '@/data/servicePages';
import { getAllPostMeta, POSTS_PER_PAGE } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostMeta();
  const latestUpdate = posts.reduce(
    (latest, post) => (post.updated > latest ? post.updated : latest),
    '2026-01-01',
  );
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const pagedUrls = Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
    url: `${site.url}/bai-viet/trang/${index + 2}`,
    lastModified: latestUpdate,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    ...pagedUrls,
    {
      url: site.url,
      lastModified: latestUpdate,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${site.url}/goi-lieu-trinh`,
      lastModified: latestUpdate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...servicePages.map((page) => ({
      url: `${site.url}/${page.slug}`,
      lastModified: latestUpdate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    {
      url: `${site.url}/hinh-anh`,
      lastModified: latestUpdate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${site.url}/bai-viet`,
      lastModified: latestUpdate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${site.url}/bai-viet/${post.slug}`,
      lastModified: post.updated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
