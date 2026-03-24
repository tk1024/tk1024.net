import type { Metadata } from "next";
import { Crimson_Pro, Outfit, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Analytics } from "@vercel/analytics/react";
import { siteUrl } from "@/site";
import { siteMetadata } from "@/seo";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson-pro",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteMetadata.siteName,
    template: `%s | ${siteMetadata.siteName}`,
  },
  description: siteMetadata.defaultDescription,
  metadataBase: new URL(siteUrl),
  openGraph: {
    siteName: siteMetadata.siteName,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${crimsonPro.variable} ${outfit.variable} ${notoSansJP.variable} font-sans flex flex-col min-h-screen paper-texture`}
      >
        <Header />
        <main className="flex-1 w-full max-w-3xl mx-auto px-5 lg:px-8 py-10">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}