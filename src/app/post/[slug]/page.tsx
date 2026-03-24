import React from "react";
import { BlogTags } from "@/components/BlogTags";
import { SpeakerdeckEmbed } from "@/components/SpeakerdeckEmbed/inedx";
import { getPostMetadata, getSinglePostMetadata } from "@/getPostMetadata";
import { getPostDescription } from "@/seo";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styles from "./style.module.css";
import { YouTubeEmbed } from "@/components/YouTubeEmbed/inedx";
import remarkGfm from "remark-gfm";

import type { Metadata } from 'next';
import { use } from 'react';
import { siteUrl } from "@/site";
import { siteMetadata } from "@/seo";

// Using temporary synchronous access mode for backward compatibility

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const postData = getSinglePostMetadata(resolvedParams.slug);
  const imageUrl = new URL(
    `/post/${resolvedParams.slug}/opengraph-image`,
    siteUrl,
  ).toString();

  const metadata: Metadata = {
    title: postData.frontMatter.title,
    description: getPostDescription(
      postData.frontMatter.description,
      postData.content,
    ),
    openGraph: {
      siteName: siteMetadata.siteName,
      title: postData.frontMatter.title,
      description: getPostDescription(
        postData.frontMatter.description,
        postData.content,
      ),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${postData.frontMatter.title} | ${siteMetadata.siteName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: postData.frontMatter.title,
      description: getPostDescription(
        postData.frontMatter.description,
        postData.content,
      ),
      images: [imageUrl],
    },
  };

  return metadata;
}

export const generateStaticParams = async () => {
  return getPostMetadata().map((post) => ({
    slug: post.slug,
  }));
};

interface MDXComponentProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

const components = {
  code: (props: MDXComponentProps) => {
    if (props.className && /language-/.test(props.className)) {
      const lang = props.className.replace(/language-/, '');
      // hljs doesn't recognize "tsx"/"jsx" as registered languages (only as aliases),
      // causing fallback to auto-detection which can misparse comments.
      // Map to registered language names to ensure proper highlighting.
      const hljsLang = lang === 'tsx' || lang === 'typescript' ? 'typescript'
        : lang === 'jsx' ? 'javascript'
        : lang;
      return (
        <div
          className={`${styles.syntaxHighlighter} lg:-mx-10 -mx-4 not-prose`}
        >
          <SyntaxHighlighter
            showLineNumbers={false}
            wrapLongLines={true}
            language={hljsLang}
            style={monokaiSublime}
            customStyle={{ padding: '1.25rem', fontSize: '0.9rem', counterReset: 'line' }}
          >
            {(props.children?.toString() || '').replace(/\n+$/, "")}
          </SyntaxHighlighter>
        </div>
      );
    }

    return (
      <code
        className={`inline-block text-indigo-800 rounded-md border px-1 my-0.5 border-indigo-100 bg-indigo-50`}
        {...props}
      />
    );
  },
  table: (props: MDXComponentProps) => (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full" {...props} />
    </div>
  ),
  SpeakerdeckEmbed: SpeakerdeckEmbed,
  YouTubeEmbed: YouTubeEmbed,
};

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const { content, frontMatter } = getSinglePostMetadata(resolvedParams.slug);

  const allPosts = getPostMetadata();
  const currentIndex = allPosts.findIndex((p) => p.slug === resolvedParams.slug);
  const newerPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const olderPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const currentTags: string[] = frontMatter.tags ?? [];
  const relatedPosts = currentTags.length > 0
    ? allPosts
        .filter((p) => p.slug !== resolvedParams.slug)
        .map((p) => ({
          ...p,
          matchCount: (p.meta.tags ?? []).filter((t: string) => currentTags.includes(t)).length,
        }))
        .filter((p) => p.matchCount > 0)
        .sort((a, b) => b.matchCount - a.matchCount)
        .slice(0, 3)
    : [];

  return (
    <div className="">
      <article>
        <div className="my-6 mb-12">
          <h1 className="lg:text-4xl text-2xl leading-snug">
            {frontMatter.title}
          </h1>
          <div className="my-1 text-gray-600 text-sm">
            Published {frontMatter.date}
            {frontMatter.author && (
              <span>
                {" · by "}
                {frontMatter.author}
                {frontMatter.isAI && " 🤖"}
              </span>
            )}
          </div>
          <div className="my-4">
            <BlogTags tags={frontMatter.tags} />
          </div>
          {frontMatter.isAI && (
            <div className="my-8 rounded-lg border-2 border-amber-400 bg-amber-50 px-4 py-3 text-amber-800 text-sm font-medium">
              この記事はAIによって作成されています。内容の正確性については十分ご注意ください。
            </div>
          )}
        </div>
        <div className={`${styles.root} prose prose-lg max-w-none prose-indigo prose-a:text-indigo-700`}>
          <MDXRemote
            source={content}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>
      </article>

      {(newerPost || olderPost) && (
        <nav className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            {olderPost ? (
              <Link
                href={`/post/${olderPost.slug}`}
                className="group rounded-lg border border-gray-200 px-4 py-3 hover:border-indigo-300 hover:bg-indigo-50 transition-colors duration-200"
              >
                <span className="text-xs text-gray-400">← 前の記事</span>
                <p className="text-sm text-gray-700 group-hover:text-indigo-700 mt-1 leading-snug transition-colors duration-200">
                  {olderPost.meta.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {newerPost ? (
              <Link
                href={`/post/${newerPost.slug}`}
                className="group rounded-lg border border-gray-200 px-4 py-3 hover:border-indigo-300 hover:bg-indigo-50 transition-colors duration-200 text-right"
              >
                <span className="text-xs text-gray-400">次の記事 →</span>
                <p className="text-sm text-gray-700 group-hover:text-indigo-700 mt-1 leading-snug transition-colors duration-200">
                  {newerPost.meta.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      )}

      {relatedPosts.length > 0 && (
        <section className="mt-10 pt-8 border-t border-gray-200">
          <h2 className="text-sm font-bold text-gray-500 mb-4">関連記事</h2>
          <div className="space-y-2">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/post/${post.slug}`}
                className="group block rounded-lg border border-gray-200 px-4 py-3 hover:border-indigo-300 hover:bg-indigo-50 transition-colors duration-200"
              >
                <p className="text-sm text-gray-700 group-hover:text-indigo-700 leading-snug transition-colors duration-200">
                  {post.meta.title}
                </p>
                <time className="text-xs text-gray-400 mt-1 block" dateTime={post.meta.date}>
                  {post.meta.date}
                </time>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
