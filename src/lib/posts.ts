import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

/**
 * Blog content layer - reads markdown files from content/bai-viet at build time.
 * Everything is resolved during `next build` (SSG); nothing runs on the client.
 */

const CONTENT_DIR = path.join(process.cwd(), 'content', 'bai-viet');
const COVERS_DIR = path.join(process.cwd(), 'public', 'images', 'bai-viet');

export const POSTS_PER_PAGE = 20;

export const BLOG_CATEGORIES = [
  'Sữa mẹ',
  'Tắm bé & Float',
  'Mẹ sau sinh',
  'Chọn dịch vụ',
  'Mẹ bầu',
] as const;

export interface PostFaq {
  q: string;
  a: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  category: string;
  /** Public path of the vector cover, e.g. /images/bai-viet/<slug>.png */
  cover: string;
  date: string;
  updated: string;
  author: string;
  /** Local path of the downloaded real photo (only some articles have one) */
  photo: string | null;
  photoAlt: string | null;
  photoCredit: string | null;
  faq: PostFaq[];
}

export interface Post extends PostMeta {
  /** Rendered HTML body */
  html: string;
}

function toIsoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? '').slice(0, 10);
}

/**
 * Cover resolution: prefer the vector illustration PNG when it exists,
 * otherwise fall back to the downloaded real photo (newer articles ship
 * with a Pexels photo only).
 */
function resolveCover(slug: string): string {
  if (fs.existsSync(path.join(COVERS_DIR, `${slug}.png`))) {
    return `/images/bai-viet/${slug}.png`;
  }
  return `/images/bai-viet/photos/${slug}.jpg`;
}

function parseMeta(slug: string, data: Record<string, unknown>): PostMeta {
  const hasPhoto = typeof data.photo === 'string' && data.photo.length > 0;
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
    category: String(data.category ?? BLOG_CATEGORIES[3]),
    cover: resolveCover(slug),
    date: toIsoDate(data.date),
    updated: toIsoDate(data.updated ?? data.date),
    author: String(data.author ?? 'Hà Phương Mom & Baby Care'),
    // Remote Pexels URLs were downloaded at handoff time to public/images/bai-viet/photos.
    photo: hasPhoto ? `/images/bai-viet/photos/${slug}.jpg` : null,
    photoAlt: hasPhoto ? String(data.photoAlt ?? '') : null,
    photoCredit: hasPhoto ? String(data.photoCredit ?? '') : null,
    faq: Array.isArray(data.faq)
      ? data.faq.map((item) => {
          const entry = item as Record<string, unknown>;
          return { q: String(entry.q ?? ''), a: String(entry.a ?? '') };
        })
      : [],
  };
}

export function getAllPostMeta(): PostMeta[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((file) => file.endsWith('.md'));
  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
    const { data } = matter(raw);
    return parseMeta(slug, data);
  });
  // Newest first
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Insert the real photo (when the article has one) before the first <h2> so it
 * sits between the quick answer and the article body.
 */
function injectPhoto(html: string, meta: PostMeta): string {
  // Skip when the photo already serves as the cover (would duplicate it)
  if (!meta.photo || meta.photo === meta.cover) return html;
  const figure =
    `<figure class="article-photo">` +
    `<img src="${meta.photo}" alt="${meta.photoAlt ?? ''}" width="1200" height="800" loading="lazy" />` +
    (meta.photoCredit ? `<figcaption>${meta.photoCredit}</figcaption>` : '') +
    `</figure>`;
  const firstH2 = html.indexOf('<h2');
  if (firstH2 === -1) return html + figure;
  return html.slice(0, firstH2) + figure + html.slice(firstH2);
}

/**
 * Build-time guard: articles are repo-owned markdown, but reject raw HTML that
 * could smuggle scripts if content is ever pasted from an external source.
 */
function assertSafeMarkdown(slug: string, content: string): void {
  const dangerous = /<\s*(script|iframe|object|embed)\b|\bon\w+\s*=/i;
  if (dangerous.test(content)) {
    throw new Error(`Unsafe raw HTML detected in content/bai-viet/${slug}.md`);
  }
}

export function getPost(slug: string): Post {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.md`), 'utf8');
  const { data, content } = matter(raw);
  assertSafeMarkdown(slug, content);
  const meta = parseMeta(slug, data as Record<string, unknown>);
  const html = injectPhoto(marked.parse(content, { async: false }) as string, meta);
  return { ...meta, html };
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

export function formatDateVi(iso: string): string {
  const [year, month, day] = iso.split('-');
  return `${day}/${month}/${year}`;
}
