import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Analytics } from "@vercel/analytics/react";
import { siteUrl } from "@/site";
import { siteMetadata } from "@/seo";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className}`}>
        <div className="grid lg:grid-cols-[280px_1fr] md:grid-cols-1">
          <div className="lg:min-h-screen bg-indigo-700">
            <Header />
          </div>
          <div className="col-auto lg:p-10 p-4 w-full box-border overflow-x-auto flex flex-col min-h-screen">
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
