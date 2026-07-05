import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { getAllPostMeta } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostMeta();
  const latestUpdate = posts.reduce(
    (latest, post) => (post.updated > latest ? post.updated : latest),
    '2026-01-01',
  );

  return [
    {
      url: site.url,
      lastModified: latestUpdate,
      changeFrequency: 'monthly',
      priority: 1,
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
