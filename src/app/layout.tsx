import type { Metadata } from "next";
import "./globals.css";
import SmoothScroller from "@/components/layout/SmoothScroller";

export const metadata: Metadata = {
  title: "Utama Global Indo Cargo — Solusi Logistik Korporat B2B",
  description:
    "Platform logistik korporat B2B berkinerja tinggi untuk solusi pengiriman dan manajemen rantai pasok tingkat eksekutif.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <SmoothScroller>{children}</SmoothScroller>
      </body>
    </html>
  );
}
