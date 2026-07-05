/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: every page is pre-rendered to plain HTML (SEO/GEO requirement).
  // The booking API is served by a Cloudflare Pages Function in /functions.
  output: 'export',
  trailingSlash: false,
  images: {
    // Cloudflare Pages has no Next image optimizer; images are pre-sized PNGs.
    unoptimized: true,
  },
};

export default nextConfig;
