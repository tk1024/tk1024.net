import { getPostMetadata } from "@/getPostMetadata";
import Link from "next/link";

export default function Home() {
  const posts = getPostMetadata();
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
          <div className="text-sm text-gray-600">
            <time dateTime={post.meta.date}>
              {post.meta.date}
            </time>
            {post.meta.author && (
              <span>
                {" · "}
                {post.meta.author}
                {post.meta.isAI && " (AI)"}
              </span>
            )}
          </div>
        </Link>
      ))}
    </article>
  );
}
