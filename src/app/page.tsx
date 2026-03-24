import type { Metadata } from "next";
import { getPostMetadata } from "@/getPostMetadata";
import { PostList } from "@/components/PostList";
import { WebSiteJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "TypeScript・React・Next.js の技術ブログ",
  description:
    "TypeScript、React、Next.js を中心に、フロントエンド開発の実践知、比較メモ、調査結果をまとめています。",
};

export default function Home() {
  const posts = getPostMetadata();

  return (
    <div className="animate-fade-in">
      <WebSiteJsonLd />
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

      <PostList posts={posts} />
    </div>
  );
}