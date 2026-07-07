import { site } from '@/config/site';
import { allPriceItems } from '@/data/services';
import { carePackages, formatVnd } from '@/data/packages';
import { faqItems } from '@/data/faq';
import type { PostMeta, PostFaq } from '@/lib/posts';
import type { ServicePageContent } from '@/data/servicePages';

/**
 * JSON-LD builders - all schema blocks are server-rendered into the static
 * HTML so search engines and AI agents read them without executing JS.
 */

/**
 * Localities listed for local SEO - includes the colloquial "Vin Smart"
 * variant residents actually search for alongside the official name.
 */
export const AREA_SERVED = [
  'Vinhomes Smart City (Vin Smart)',
  'Masteri West Heights',
  'Tây Mỗ',
  'Đại Mỗ',
  'Nam Từ Liêm',
  'Hà Nội',
];

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    '@id': `${site.url}/#business`,
    name: site.name,
    alternateName: site.alternateName,
    description:
      'Dịch vụ spa mẹ và bé tại spa và tại nhà: tắm bé, bơi float, thông tắc tia sữa, gói liệu trình massage bầu và phục hồi sau sinh, gội đầu và xông hơi tại nhà, trông bé theo giờ.',
    telephone: site.telephoneIntl,
    url: site.url,
    sameAs: [site.facebookUrl],
    image: `${site.url}/og-image.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Tòa West A, Masteri West Heights, Vinhomes Smart City, Tây Mỗ',
      addressLocality: 'Nam Từ Liêm',
      addressRegion: 'Hà Nội',
      addressCountry: 'VN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    hasMap: site.googleMapsUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '17:30',
      },
    ],
    priceRange: '85.000đ - 7.350.000đ',
    currenciesAccepted: 'VND',
    areaServed: AREA_SERVED,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Bảng giá dịch vụ Ha Phuong Mom & Baby Care',
      itemListElement: [...serviceOffers(), ...packageOffers()],
    },
  };
}

function serviceOffers() {
  return allPriceItems.map((item) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: item.schemaName },
    price: String(item.priceVnd),
    priceCurrency: 'VND',
  }));
}

function packageOffers() {
  return carePackages.flatMap((pkg) => {
    const offers = [];
    if (pkg.singlePriceVnd) {
      offers.push({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `Gói ${pkg.name} - buổi lẻ ${pkg.sessionMinutes} phút`,
        },
        price: String(pkg.singlePriceVnd),
        priceCurrency: 'VND',
      });
    }
    offers.push({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: `Gói ${pkg.name} - ${pkg.sessionCount} buổi (${pkg.sessionMinutes} phút/buổi)`,
        description: pkg.description,
      },
      price: String(pkg.packagePriceVnd),
      priceCurrency: 'VND',
      url: `${site.url}/goi-lieu-trinh#${pkg.id}`,
    });
    return offers;
  });
}

/** OfferCatalog for the dedicated /goi-lieu-trinh page. */
export function packagesCatalogJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: `Gói liệu trình chăm sóc mẹ bầu & sau sinh - ${site.name}`,
    url: `${site.url}/goi-lieu-trinh`,
    itemListElement: carePackages.map((pkg) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: `Gói ${pkg.name}`,
        description: `${pkg.description} ${pkg.sessionCount} buổi, ${pkg.sessionMinutes} phút/buổi, ${pkg.stepCount} bước trị liệu - ${formatVnd(pkg.packagePriceVnd)}.${pkg.gift ? ` Tặng: ${pkg.gift}.` : ''}${pkg.commitment ? ` ${pkg.commitment}.` : ''}`,
        provider: { '@id': `${site.url}/#business` },
      },
      price: String(pkg.packagePriceVnd),
      priceCurrency: 'VND',
      url: `${site.url}/goi-lieu-trinh#${pkg.id}`,
    })),
  };
}

/** Service schema for the standalone service pages (/tam-be, /massage-bau, ...). */
export function serviceJsonLd(page: ServicePageContent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.serviceName,
    serviceType: page.serviceType,
    description: page.metaDescription,
    url: `${site.url}/${page.slug}`,
    provider: { '@id': `${site.url}/#business` },
    areaServed: AREA_SERVED,
    offers: page.offers.map((offer) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: offer.name },
      price: String(offer.priceVnd),
      priceCurrency: 'VND',
    })),
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
    author: { '@type': 'Organization', '@id': `${site.url}/#business`, name: site.name, url: site.url },
    publisher: { '@type': 'Organization', '@id': `${site.url}/#business`, name: site.name, url: site.url },
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
    name: `Bài viết - ${site.name}`,
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
