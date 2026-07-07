import type { Metadata } from 'next';
import { site } from '@/config/site';
import type { ServicePageContent } from '@/data/servicePages';

/** Shared Metadata builder for the standalone service pages. */
export function buildServicePageMetadata(page: ServicePageContent): Metadata {
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: `${page.metaTitle} - ${site.name}`,
      description: page.metaDescription,
      url: `/${page.slug}`,
      type: 'website',
      locale: 'vi_VN',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: site.name }],
    },
  };
}
