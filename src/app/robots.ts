import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

// GEO requirement: allow every crawler including AI agents
// (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot...).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
