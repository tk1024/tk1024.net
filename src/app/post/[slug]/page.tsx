import React from "react";
import { BlogTags } from "@/components/BlogTags";
import { SpeakerdeckEmbed } from "@/components/SpeakerdeckEmbed/inedx";
import { getPostMetadata, getSinglePostMetadata } from "@/getPostMetadata";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styles from "./style.module.css";
import { YouTubeEmbed } from "@/components/YouTubeEmbed/inedx";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const props = getSinglePostMetadata(params.slug);

  const metadata: Metadata = {
    title: props.frontMatter.title,
    description: props.frontMatter.description,
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
  h2: (props: MDXComponentProps) => (
    <h2 className="lg:text-3xl text-2xl mt-16 max-w-3xl my-4 underline underline-offset-8" {...props} />
  ),
  h3: (props: MDXComponentProps) => (
    <h3 className="lg:text-2xl text-xl mt-8 max-w-3xl my-4" {...props} />
  ),
  a: (props: MDXComponentProps & { href?: string }) => <a className="text-indigo-700 underline" {...props} />,
  img: (props: MDXComponentProps & { src?: string; alt?: string }) => <img className="w-full" {...props} />,
  blockquote: (props: MDXComponentProps) => {
    return (
      <blockquote className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 max-w-3xl">
        {props.children}
      </blockquote>
    );
  },
  ul: (props: MDXComponentProps) => {
    return <ul className="list-disc list-inside my-4" {...props} />;
  },
  li: (props: MDXComponentProps) => {
    return <li className="my-2" {...props} />;
  },
  p: (props: MDXComponentProps) => {
    return <p className={`my-8 max-w-3xl leading-8`} {...props} />;
  },
  code: (props: MDXComponentProps) => {
    if (props.className && /language-/.test(props.className)) {
      return (
        <div
          className={`${styles.syntaxHighlighter} lg:-mx-10 -mx-4 overflow-x-auto`}
        >
          <SyntaxHighlighter showLineNumbers={true} language="tsx" style={monokaiSublime}>
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
  SpeakerdeckEmbed: SpeakerdeckEmbed,
  YouTubeEmbed: YouTubeEmbed,
};

export default function Post({ params }: Props) {
  const { content, frontMatter } = getSinglePostMetadata(params.slug);

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
        <div className={styles.root}>
          <MDXRemote source={content} components={components} />
        </div>
      </article>
    </div>
  );
}
