'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { PostMeta } from '@/lib/posts';

const ALL = 'Tất cả';

interface BlogListProps {
  posts: PostMeta[];
  categories: readonly string[];
  formattedDates: Record<string, string>;
}

/**
 * Category filter + post grid. All 20 cards are server-rendered into the
 * static HTML (SEO/GEO); the filter only toggles visibility client-side.
 */
export function BlogList({ posts, categories, formattedDates }: BlogListProps) {
  const [active, setActive] = useState<string>(ALL);

  return (
    <>
      <div className="blog-filter" role="group" aria-label="Lọc theo chủ đề">
        {[ALL, ...categories].map((category) => (
          <button
            key={category}
            type="button"
            className={`blog-chip${active === category ? ' blog-chip--active' : ''}`}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="blog-grid">
        {posts.map((post) => (
          <a
            key={post.slug}
            href={`/bai-viet/${post.slug}`}
            className="post-card"
            style={active !== ALL && post.category !== active ? { display: 'none' } : undefined}
          >
            <Image
              src={post.cover}
              alt={post.title}
              width={900}
              height={560}
              loading="lazy"
              className="post-card__image"
            />
            <span className="post-card__body">
              <span className="post-card__chip">{post.category}</span>
              <span className="post-card__title">{post.title}</span>
              <span className="post-card__desc">{post.description}</span>
              <span className="post-card__date">
                Cập nhật {formattedDates[post.slug] ?? post.updated}
              </span>
            </span>
          </a>
        ))}
      </div>
    </>
  );
}
