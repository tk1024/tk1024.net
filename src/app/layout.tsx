import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

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
        <div className="grid lg:grid-cols-[280px_1fr] md:grid-cols-1">
          <div className="lg:min-h-screen bg-indigo-700">
            <Header />
          </div>
          <div className="col-auto lg:p-10 p-4 w-full box-border">{children}</div>
        </div>
      </body>
    </html>
  );
}
