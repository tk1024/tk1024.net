import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getPostMetadata, getSinglePostMetadata } from "@/getPostMetadata";
import { siteName } from "@/site";

export const alt = siteName;
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};
export const dynamic = "force-static";

export function generateStaticParams() {
  return getPostMetadata().map((post) => ({
    slug: post.slug,
  }));
}

const notoSansJpRegular = readFile(
  path.join(
    process.cwd(),
    "node_modules",
    "@fontsource",
    "noto-sans-jp",
    "files",
    "noto-sans-jp-japanese-400-normal.woff",
  ),
);

const notoSansJpBold = readFile(
  path.join(
    process.cwd(),
    "node_modules",
    "@fontsource",
    "noto-sans-jp",
    "files",
    "noto-sans-jp-japanese-700-normal.woff",
  ),
);

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getSinglePostMetadata(slug);
  const [regularFontData, boldFontData] = await Promise.all([
    notoSansJpRegular,
    notoSansJpBold,
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: 44,
          background:
            "linear-gradient(135deg, #eef2ff 0%, #ffffff 48%, #e0e7ff 100%)",
          color: "#1f2937",
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: 32,
            border: "3px solid #312e81",
            backgroundColor: "rgba(255,255,255,0.9)",
            boxShadow: "0 18px 48px rgba(49, 46, 129, 0.14)",
            padding: "42px 48px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#4338ca",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 16,
                height: 16,
                borderRadius: 9999,
                backgroundColor: "#4338ca",
              }}
            />
            {siteName}
          </div>

          <div
            style={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              fontSize: 68,
              lineHeight: 1.2,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              whiteSpace: "pre-wrap",
            }}
          >
            {post.frontMatter.title}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#4b5563",
              fontSize: 26,
            }}
          >
            <div
              style={{
                display: "flex",
                maxWidth: 860,
              }}
            >
              {post.frontMatter.description}
            </div>
            <div
              style={{
                display: "flex",
                flexShrink: 0,
                marginLeft: 24,
                color: "#3730a3",
                fontWeight: 700,
              }}
            >
              /post/{slug}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Noto Sans JP",
          data: regularFontData,
          style: "normal",
          weight: 400,
        },
        {
          name: "Noto Sans JP",
          data: boldFontData,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
