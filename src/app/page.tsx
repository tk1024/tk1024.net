import type { Metadata } from "next";
import { getPostMetadata } from "@/getPostMetadata";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TypeScript・React・Next.js の技術ブログ",
  description:
    "TypeScript、React、Next.js を中心に、フロントエンド開発の実践知、比較メモ、調査結果をまとめています。",
};

export default function Home() {
  const posts = getPostMetadata();
  const latestPost = posts[0];
  const olderPosts = posts.slice(1);

  return (
    <div className="animate-fade-in">
      {/* Hero / Introduction */}
      <section className="mb-14">
        <h1 className="font-serif text-4xl lg:text-5xl tracking-tight text-ink leading-tight">
          Writing about<br />
          <span className="text-forest">frontend craft</span>
        </h1>
        <p className="mt-4 text-ink-light text-base leading-relaxed max-w-lg">
          TypeScript、React、Next.js を中心に、フロントエンド開発の実践知や比較メモをまとめています。
        </p>
      </section>

      {/* Latest post featured */}
      {latestPost && (
        <section className="mb-12">
          <div className="editorial-divider mb-6">Latest</div>
          <Link
            href={`/post/${latestPost.slug}`}
            className="group block bg-white rounded-xl p-6 lg:p-8 border border-cream-300 hover:border-forest/20 hover:shadow-sm transition-all duration-300"
          >
            <div className="accent-bar">
              <h2 className="font-serif text-2xl lg:text-3xl text-ink group-hover:text-forest transition-colors duration-200 leading-snug">
                {latestPost.meta.title}
              </h2>
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

      {/* Older posts */}
      {olderPosts.length > 0 && (
        <section>
          <div className="editorial-divider mb-6">Archive</div>
          <div className="stagger">
            {olderPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/post/${post.slug}`}
                className="post-card group block py-5 px-1"
              >
                <h2 className="font-serif text-xl text-ink group-hover:text-forest transition-colors duration-200 leading-snug">
                  {post.meta.title}
                </h2>
                <div className="mt-1.5 flex items-center gap-2 text-sm text-ink-faint">
                  <time dateTime={post.meta.date}>{post.meta.date}</time>
                  {post.meta.author && (
                    <>
                      <span className="text-cream-300">·</span>
                      <span>
                        {post.meta.author}
                        {post.meta.isAI && " (AI)"}
                      </span>
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}