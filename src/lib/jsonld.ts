import { site } from '@/config/site';
import { allPriceItems } from '@/data/services';
import { faqItems } from '@/data/faq';
import type { PostMeta, PostFaq } from '@/lib/posts';

/**
 * JSON-LD builders — all schema blocks are server-rendered into the static
 * HTML so search engines and AI agents read them without executing JS.
 */

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: site.name,
    alternateName: site.alternateName,
    description:
      'Dịch vụ spa mẹ và bé tại spa và tại nhà: tắm bé, bơi float, vận động chuyên sâu cho bé, thông tắc tia sữa, kích sữa, massage sau sinh 60–120 phút, gội đầu và xông hơi tại nhà, trông bé theo giờ.',
    telephone: site.telephoneIntl,
    url: site.url,
    sameAs: [site.facebookUrl],
    image: `${site.url}/og-image.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Tòa A Masteri, Vinhomes Smart City, Tây Mỗ',
      addressLocality: 'Nam Từ Liêm',
      addressRegion: 'Hà Nội',
      addressCountry: 'VN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '17:30',
      },
    ],
    priceRange: '50.000đ – 180.000đ',
    currenciesAccepted: 'VND',
    areaServed: 'Vinhomes Smart City, Nam Từ Liêm, Hà Nội và khu vực lân cận',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Bảng giá dịch vụ Hà Phương Mom & Baby Care',
      itemListElement: allPriceItems.map((item) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: item.schemaName },
        price: String(item.priceVnd),
        priceCurrency: 'VND',
      })),
    },
  };
}

export function faqPageJsonLd(items: { question: string; answer: string }[] = faqItems) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function articleJsonLd(post: PostMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: `${site.url}${post.cover}`,
    datePublished: post.date,
    dateModified: post.updated,
    inLanguage: 'vi',
    author: { '@type': 'Organization', name: site.name, url: site.url },
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/bai-viet/${post.slug}`,
  };
}

export function articleFaqJsonLd(faq: PostFaq[]) {
  return faqPageJsonLd(faq.map((item) => ({ question: item.q, answer: item.a })));
}

export function blogListJsonLd(posts: PostMeta[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `Bài viết — ${site.name}`,
    url: `${site.url}/bai-viet`,
    inLanguage: 'vi',
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${site.url}/bai-viet/${post.slug}`,
      datePublished: post.date,
      dateModified: post.updated,
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Serialize for a <script type="application/ld+json"> tag (escape closing tags). */
export function jsonLdString(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
