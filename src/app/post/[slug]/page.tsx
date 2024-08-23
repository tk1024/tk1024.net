import { BlogTags } from "@/components/BlogTags";
import { getPostMetadata, getSinglePostMetadata } from "@/getPostMetadata";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styles from "./style.module.css";

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

const components = {
  h2: (props: any) => <h2 className="text-3xl mt-16" {...props} />,
  h3: (props: any) => <h3 className="text-2xl mt-8" {...props} />,
  a: (props: any) => <a className="text-indigo-700 underline" {...props} />,
  blockquote: (props: any) => {
    return (
      <blockquote className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
        {props.children}
      </blockquote>
    );
  },
  p: (props: any) => {
    return <p className={`my-8`} {...props} />;
  },
  code: (props: any) => {
    if (/language-/.test(props.className)) {
      return (
        <SyntaxHighlighter showLineNumbers={true} style={monokaiSublime}>
          {props.children}
        </SyntaxHighlighter>
      );
    }

    return <code className={`inline-block text-indigo-800 rounded-md border px-1 my-0.5 border-indigo-100 bg-indigo-50`} {...props} />;
  },
};

export default function Post({ params }: Props) {
  const { content, frontMatter } = getSinglePostMetadata(params.slug);

  return (
    <div className="max-w-screen-md">
      <article>
        <div className="my-6 mb-16">
          <h1 className="text-4xl leading-snug">{frontMatter.title}</h1>
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
