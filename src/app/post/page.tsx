import type { Metadata } from "next";
import { getPostMetadata } from "@/getPostMetadata";
import Link from "next/link";

const posts = getPostMetadata();

export const metadata: Metadata = {
  title: "記事一覧",
  description:
    "tk1024.net に掲載している TypeScript、React、Next.js などの技術記事一覧です。",
};

export default function Home() {
  return (
    <div className="animate-fade-in">
      <h1 className="font-serif text-3xl tracking-tight text-ink mb-8">記事一覧</h1>
      <div className="stagger">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/post/${post.slug}`}
            className="post-card group block py-5 px-1"
          >
            <h2 className="font-serif text-xl text-ink group-hover:text-forest transition-colors duration-200 leading-snug">
              {post.meta.title}
            </h2>
            <div className="mt-1.5 text-sm text-ink-faint">
              <time dateTime={post.meta.date}>{post.meta.date}</time>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}