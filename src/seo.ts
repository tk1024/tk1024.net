const siteName = "tk1024.net";

const defaultDescription =
  "TypeScript、React、Next.js を中心に、フロントエンド開発の実践知や比較メモをまとめる技術ブログ。";

const stripMdxSyntax = (value: string) =>
  value
    .replace(/^---[\s\S]*?---/, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/^#+\s+/gm, "")
    .replace(/[*_~>-]/g, " ")
    .replace(/\|/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const trimDescription = (value: string, maxLength = 140) => {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trim()}…`;
};

export const siteMetadata = {
  siteName,
  defaultDescription,
};

export const getPostDescription = (
  description: string | undefined,
  content: string,
) => {
  const normalizedDescription = description?.trim();

  if (normalizedDescription) {
    return trimDescription(normalizedDescription);
  }

  return trimDescription(stripMdxSyntax(content));
};
