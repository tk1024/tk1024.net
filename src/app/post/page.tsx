import { getPostMetadata } from "@/getPostMetadata";
import Link from "next/link";

interface Props {
  title: string;
}

const posts = getPostMetadata();

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
