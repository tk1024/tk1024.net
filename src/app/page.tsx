import { getPostMetadata } from "@/getPostMetadata";
import Link from "next/link";

interface Props {
  title: string;
}

const posts = getPostMetadata();

export default function Home() {
  return (
    <article>
      <h1 className="my-6 mb-16 text-4xl">Posts</h1>
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/post/${post.slug}`}
          className="block py-4"
        >
          <h2 className="text-2xl">{post.meta.title}</h2>
          <time className="text-sm text-gray-600" dateTime={post.meta.date}>
            {post.meta.date}
          </time>
        </Link>
      ))}
    </article>
  );
}
