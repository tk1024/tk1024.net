"use client";

import Link from "next/link";
import { useState } from "react";
import { AiBadge } from "@/components/AiBadge";

interface Post {
  slug: string;
  meta: {
    [key: string]: any;
  };
}

export const PostList = ({ posts }: { posts: Post[] }) => {
  const [hideAI, setHideAI] = useState(false);
  const hasAIPosts = posts.some((p) => p.meta.isAI);

  const latestPost = posts[0];
  const olderPosts = posts.slice(1);

  const filteredOlderPosts = hideAI
    ? olderPosts.filter((p) => !p.meta.isAI)
    : olderPosts;

  const showLatest = latestPost && (!hideAI || !latestPost.meta.isAI);

  return (
    <>
      {/* Latest post featured */}
      {showLatest && (
        <section className="mb-12">
          <div className="editorial-divider mb-6">Latest</div>
          <Link
            href={`/post/${latestPost.slug}`}
            className="group block bg-white rounded-xl p-6 lg:p-8 border border-cream-300 hover:border-forest/20 hover:shadow-sm transition-all duration-300"
          >
            <div className="accent-bar">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-serif text-2xl lg:text-3xl text-ink group-hover:text-forest transition-colors duration-200 leading-snug">
                  {latestPost.meta.title}
                </h2>
                {latestPost.meta.isAI && <AiBadge />}
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-ink-faint">
              <time dateTime={latestPost.meta.date}>{latestPost.meta.date}</time>
              {latestPost.meta.author && (
                <>
                  <span className="text-cream-300">·</span>
                  <span>{latestPost.meta.author}</span>
                </>
              )}
            </div>
            {latestPost.meta.description && (
              <p className="mt-3 text-ink-light text-sm leading-relaxed line-clamp-2">
                {latestPost.meta.description}
              </p>
            )}
          </Link>
        </section>
      )}

      {/* Archive with filter */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="editorial-divider flex-1">Archive</div>
          {hasAIPosts && (
            <button
              onClick={() => setHideAI(!hideAI)}
              className="ml-4 flex items-center gap-2 text-xs text-ink-faint hover:text-ink-light transition-colors duration-200 flex-shrink-0"
            >
              <span
                className={`relative inline-block w-8 h-[18px] rounded-full transition-colors duration-200 ${
                  hideAI ? "bg-forest" : "bg-cream-300"
                }`}
              >
                <span
                  className={`absolute top-[2px] left-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    hideAI ? "translate-x-[14px]" : ""
                  }`}
                />
              </span>
              <span>AI記事を非表示</span>
            </button>
          )}
        </div>
        <div className="stagger">
          {filteredOlderPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/post/${post.slug}`}
              className="post-card group block py-5 px-1"
            >
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl text-ink group-hover:text-forest transition-colors duration-200 leading-snug">
                  {post.meta.title}
                </h2>
                {post.meta.isAI && <AiBadge />}
              </div>
              <div className="mt-1.5 flex items-center gap-2 text-sm text-ink-faint">
                <time dateTime={post.meta.date}>{post.meta.date}</time>
                {post.meta.author && (
                  <>
                    <span className="text-cream-300">·</span>
                    <span>{post.meta.author}</span>
                  </>
                )}
              </div>
            </Link>
          ))}
          {filteredOlderPosts.length === 0 && (
            <p className="text-sm text-ink-faint py-4">表示できる記事がありません</p>
          )}
        </div>
      </section>
    </>
  );
};