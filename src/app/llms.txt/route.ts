import { site } from '@/config/site';
import { priceGroups } from '@/data/services';
import { faqItems } from '@/data/faq';
import { getAllPostMeta } from '@/lib/posts';

// /llms.txt — one-page markdown summary for AI agents (GEO).
export const dynamic = 'force-static';

export function GET(): Response {
  const posts = getAllPostMeta();

  const priceSection = priceGroups
    .map((group) => {
      const rows = group.items
        .map((item) => `- ${item.schemaName}: ${item.priceLabel}`)
        .join('\n');
      return `### ${group.title} (${group.subtitle})\n${rows}`;
    })
    .join('\n\n');

  const faqSection = faqItems
    .map((item) => `**${item.question}**\n${item.answer}`)
    .join('\n\n');

  const postsSection = posts
    .map((post) => `- [${post.title}](${site.url}/bai-viet/${post.slug})`)
    .join('\n');

  const body = `# ${site.name}

> ${site.tagline}. ${site.description}

## Thông tin liên hệ (NAP)
- Tên: ${site.name} (${site.alternateName})
- Hotline: ${site.hotline} (${site.telephoneIntl})
- Zalo: ${site.zaloHref}
- Facebook: ${site.facebookUrl}
- Địa chỉ: ${site.diaChi}
- Khu vực phục vụ tại nhà: ${site.khuVuc}
- Giờ mở cửa: ${site.gioMoCua}
- Website: ${site.url}

## Bảng giá 17 dịch vụ (niêm yết, VND)

${priceSection}

## Câu hỏi thường gặp

${faqSection}

## Bài viết hướng dẫn chăm sóc mẹ & bé

${postsSection}

## Tài nguyên cho AI agent
- Toàn văn mọi bài viết + thông tin doanh nghiệp trong một file: ${site.url}/llms-full.txt
- Sitemap: ${site.url}/sitemap.xml
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
