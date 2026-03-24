import { siteUrl } from "@/site";
import { siteMetadata } from "@/seo";

export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteMetadata.siteName,
    url: siteUrl,
    description: siteMetadata.defaultDescription,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BlogPostingJsonLd({
  title,
  description,
  date,
  slug,
  author,
  tags,
}: {
  title: string;
  description: string;
  date: string;
  slug: string;
  author?: string;
  tags?: string[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: date,
    url: `${siteUrl}/post/${slug}`,
    image: `${siteUrl}/post/${slug}/opengraph-image`,
    author: {
      "@type": "Person",
      name: author ?? "tk1024",
    },
    publisher: {
      "@type": "Organization",
      name: siteMetadata.siteName,
      url: siteUrl,
    },
    ...(tags && tags.length > 0 ? { keywords: tags.join(", ") } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
