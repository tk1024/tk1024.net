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
        <div className="flex flex-col lg:flex-row min-h-screen">
          <div className="w-full lg:w-[280px] bg-indigo-700 lg:fixed lg:inset-y-0 lg:left-0 lg:z-10">
            <Header />
          </div>
          <div className="w-full lg:pl-[280px] lg:p-10 p-4 box-border overflow-x-auto">
            {children}
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
