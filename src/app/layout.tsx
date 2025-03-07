import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tk1024.net",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className}`}>
        <div className="flex flex-col lg:flex-row w-full">
          <div className="w-full lg:w-[280px] lg:min-h-screen bg-indigo-700 lg:fixed lg:left-0 lg:top-0 lg:bottom-0">
            <Header />
          </div>
          <div className="flex-1 lg:p-10 p-4 w-full box-border overflow-x-auto lg:ml-[280px]">
            {children}
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
