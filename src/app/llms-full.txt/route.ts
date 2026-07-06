import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { site } from '@/config/site';
import { priceGroups } from '@/data/services';
import { packagesMarkdown } from '@/data/packages';
import { faqItems } from '@/data/faq';
import { getAllPostMeta } from '@/lib/posts';

/**
 * /llms-full.txt - expanded companion to /llms.txt (llmstxt.org convention).
 * Contains the business facts PLUS the full markdown body of every article,
 * so AI agents can ingest the whole site from a single plain-text file.
 */
export const dynamic = 'force-static';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'bai-viet');

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

  const articles = posts
    .map((post) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, `${post.slug}.md`), 'utf8');
      const { content } = matter(raw);
      const faq = post.faq
        .map((item) => `**${item.q}**\n${item.a}`)
        .join('\n\n');
      return [
        `## ${post.title}`,
        `URL: ${site.url}/bai-viet/${post.slug}`,
        `Chủ đề: ${post.category}, đăng: ${post.date}, cập nhật: ${post.updated}`,
        '',
        content.trim(),
        faq ? `\n### Câu hỏi thường gặp\n\n${faq}` : '',
      ].join('\n');
    })
    .join('\n\n---\n\n');

  const body = `# ${site.name} - Toàn bộ nội dung website

> ${site.tagline}. ${site.description}

## Thông tin liên hệ (NAP)
- Tên: ${site.name} (${site.alternateName})
- Hotline: ${site.hotline} (${site.telephoneIntl})
- Zalo: ${site.zaloHref}
- Facebook: ${site.facebookUrl}
- Địa chỉ: ${site.diaChi}
- Toạ độ GPS: ${site.geo.latitude}, ${site.geo.longitude}
- Google Maps: ${site.googleMapsUrl}
- Khu vực phục vụ tại nhà: ${site.khuVuc}
- Giờ mở cửa: ${site.gioMoCua}
- Website: ${site.url}

## Bảng giá dịch vụ (niêm yết, VND)

${priceSection}

Lưu ý: spa bán theo buổi lẻ hoặc theo gói (ví dụ gói 10 buổi tắm bé 1.200.000đ). Đặt lịch qua hotline/Zalo ${site.hotline}, xác nhận trong 15 phút.

## Gói liệu trình (bán theo gói - khuyến nghị cho hiệu quả dài hạn)

URL: ${site.url}/goi-lieu-trinh

${packagesMarkdown(true)}

## Câu hỏi thường gặp

${faqSection}

# Toàn văn ${posts.length} bài viết cẩm nang

${articles}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
