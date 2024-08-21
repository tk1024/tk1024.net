import { getPostMetadata, getSinglePostMetadata } from "@/getPostMetadata";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";

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

const components = { p: (props) => <p className={`my-8`} {...props} /> };

export default function Post({ params }: Props) {
  const { content, frontMatter } = getSinglePostMetadata(params.slug);

  return (
    <article>
      <div className="my-6 mb-16">
        <h1 className="text-4xl">{frontMatter.title}</h1>
        <div className="my-1 text-gray-600 text-sm">Published {frontMatter.date}</div>
      </div>
      <MDXRemote source={content} components={components} />
    </article>
  );
}
