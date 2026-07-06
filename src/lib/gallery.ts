import fs from 'fs';
import path from 'path';
import { imageSize } from 'image-size';

/**
 * Build-time gallery loader. Photos live in public/images/gallery/ - drop new
 * .webp/.jpg/.png files there and rebuild; no code change needed.
 * Currently served from Cloudflare Pages itself; if the collection grows the
 * same list can point at R2 by swapping the URL prefix.
 */

export interface GalleryPhoto {
  src: string;
  width: number;
  height: number;
  alt: string;
}

const GALLERY_DIR = path.join(process.cwd(), 'public', 'images', 'gallery');
const IMAGE_EXTENSIONS = new Set(['.webp', '.jpg', '.jpeg', '.png', '.avif']);

export function getGalleryPhotos(): GalleryPhoto[] {
  if (!fs.existsSync(GALLERY_DIR)) return [];

  return fs
    .readdirSync(GALLERY_DIR)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    // Zalo/phone exports carry an increasing id in the name - newest first
    .sort((a, b) => b.localeCompare(a))
    .map((file, index) => {
      const buffer = fs.readFileSync(path.join(GALLERY_DIR, file));
      const { width, height } = imageSize(buffer);
      if (!width || !height) {
        throw new Error(`Cannot read dimensions of gallery image: ${file}`);
      }
      return {
        src: `/images/gallery/${file}`,
        width,
        height,
        alt: `Hình ảnh thực tế tại Ha Phuong Mom & Baby Care (${index + 1})`,
      };
    });
}
