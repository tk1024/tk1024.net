import React from "react";
import { AiBadge } from "@/components/AiBadge";
import { BlogTags } from "@/components/BlogTags";
import { SpeakerdeckEmbed } from "@/components/SpeakerdeckEmbed/inedx";
import { getPostMetadata, getSinglePostMetadata } from "@/getPostMetadata";
import { getPostDescription } from "@/seo";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import SyntaxHighlighter from "react-syntax-highlighter";
import { githubGist } from "react-syntax-highlighter/dist/esm/styles/hljs";
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
      const hljsLang = lang === 'tsx' || lang === 'typescript' ? 'typescript'
        : lang === 'jsx' ? 'javascript'
        : lang;
      return (
        <div
          className={`${styles.syntaxHighlighter} lg:-mx-8 -mx-5 not-prose`}
        >
          <SyntaxHighlighter
            showLineNumbers={false}
            wrapLongLines={true}
            language={hljsLang}
            style={githubGist}
            customStyle={{
              padding: '1.25rem 1.5rem',
              fontSize: '0.875rem',
              counterReset: 'line',
              background: '#f4f1ec',
              borderTop: '1px solid #e8e5e0',
              borderBottom: '1px solid #e8e5e0',
            }}
          >
            {(props.children?.toString() || '').replace(/\n+$/, "")}
          </SyntaxHighlighter>
        </div>
      );
    }

    return (
      <code
        className="inline-block text-forest-dark bg-cream-200 rounded border border-cream-300 px-1.5 py-0.5 my-0.5 text-sm"
        {...props}
      />
    );
  },
  table: (props: MDXComponentProps) => (
    <div className="overflow-x-auto my-8 rounded-lg border border-cream-300">
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
    <div className="animate-fade-in">
      <article>
        {/* Article header */}
        <header className="mb-10 pb-8 border-b border-cream-300">
          <div className="mb-4 flex items-center gap-3">
            <BlogTags tags={frontMatter.tags} />
            {frontMatter.isAI && <AiBadge />}
          </div>
          <h1 className="font-serif text-3xl lg:text-4xl leading-snug tracking-tight text-ink">
            {frontMatter.title}
          </h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-ink-faint">
            <time dateTime={frontMatter.date}>{frontMatter.date}</time>
            {frontMatter.author && (
              <>
                <span className="text-cream-300">·</span>
                <span>{frontMatter.author}</span>
              </>
            )}
          </div>
          {frontMatter.isAI && (
            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50/70 px-4 py-3 text-amber-800 text-sm leading-relaxed flex gap-3">
              <span className="text-3xl leading-none flex-shrink-0 self-center">🤖</span>
              <div>
                <p className="font-medium">この記事はAIとの対話をAIがまとめたメモです</p>
                <p className="mt-1 text-amber-700/80 text-xs">内容の正確性については十分ご注意ください。</p>
              </div>
            </div>
          )}
        </header>

        {/* Article body */}
        <div className={`${styles.root} prose prose-lg prose-editorial max-w-none`}>
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

      {/* Prev / Next navigation */}
      {(newerPost || olderPost) && (
        <nav className="mt-14 pt-8 border-t border-cream-300">
          <div className="grid grid-cols-2 gap-4">
            {olderPost ? (
              <Link
                href={`/post/${olderPost.slug}`}
                className="group rounded-xl border border-cream-300 bg-white px-5 py-4 hover:border-forest/20 hover:shadow-sm transition-all duration-200"
              >
                <span className="text-xs text-ink-faint">← 前の記事</span>
                <p className="font-serif text-sm text-ink group-hover:text-forest mt-1.5 leading-snug transition-colors duration-200">
                  {olderPost.meta.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {newerPost ? (
              <Link
                href={`/post/${newerPost.slug}`}
                className="group rounded-xl border border-cream-300 bg-white px-5 py-4 hover:border-forest/20 hover:shadow-sm transition-all duration-200 text-right"
              >
                <span className="text-xs text-ink-faint">次の記事 →</span>
                <p className="font-serif text-sm text-ink group-hover:text-forest mt-1.5 leading-snug transition-colors duration-200">
                  {newerPost.meta.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      )}

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-10 pt-8 border-t border-cream-300">
          <div className="editorial-divider mb-6">関連記事</div>
          <div className="space-y-1">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/post/${post.slug}`}
                className="post-card group block py-4 px-1"
              >
                <p className="font-serif text-base text-ink group-hover:text-forest leading-snug transition-colors duration-200">
                  {post.meta.title}
                </p>
                <time className="text-xs text-ink-faint mt-1 block" dateTime={post.meta.date}>
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