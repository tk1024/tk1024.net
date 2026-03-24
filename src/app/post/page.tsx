import type { Metadata } from "next";
import { getPostMetadata } from "@/getPostMetadata";
import Link from "next/link";

interface Props {
  title: string;
}

const posts = getPostMetadata();

export const metadata: Metadata = {
  title: "記事一覧",
  description:
    "tk1024.net に掲載している TypeScript、React、Next.js などの技術記事一覧です。",
};

export default function Home() {
  return (
    <article>
      <h1>Posts</h1>
      {posts.map((post) => (
        <Link key={post.slug} href={`/post/${post.slug}`}>
          {post.meta.title}
        </Link>
      ))}
    </article>
  );
}
