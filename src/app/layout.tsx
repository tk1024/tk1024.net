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
        <div className="min-h-screen flex flex-col lg:flex-row">
          <aside className="w-full bg-indigo-700 lg:fixed lg:top-0 lg:left-0 lg:bottom-0 lg:w-[280px] lg:z-10">
            <Header />
          </aside>
          <main className="w-full p-4 lg:p-10 lg:ml-[280px] box-border overflow-x-auto">
            {children}
          </main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
