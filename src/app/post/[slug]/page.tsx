import React from "react";
import { BlogTags } from "@/components/BlogTags";
import { SpeakerdeckEmbed } from "@/components/SpeakerdeckEmbed/inedx";
import { getPostMetadata, getSinglePostMetadata } from "@/getPostMetadata";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styles from "./style.module.css";
import { YouTubeEmbed } from "@/components/YouTubeEmbed/inedx";
import remarkGfm from "remark-gfm";

import type { Metadata } from 'next';
import { use } from 'react';

// Using temporary synchronous access mode for backward compatibility

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const postData = getSinglePostMetadata(resolvedParams.slug);

  const metadata: Metadata = {
    title: postData.frontMatter.title,
    description: postData.frontMatter.description,
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

  return (
    <div className="">
      <article>
        <div className="my-6 mb-16">
          <h1 className="lg:text-4xl text-2xl leading-snug">
            {frontMatter.title}
          </h1>
          <div className="my-1 text-gray-600 text-sm">
            Published {frontMatter.date}
          </div>
          <div className="my-4">
            <BlogTags tags={frontMatter.tags} />
          </div>
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
    </div>
  );
}
