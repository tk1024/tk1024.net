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
        <div className="grid grid-cols-[280px_1fr]">
          <div className="min-h-screen bg-indigo-700">
            <Header />
          </div>
          <div className="col-auto p-10 w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
