import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroller from "@/components/layout/SmoothScroller";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ConsoleEasterEgg from "@/components/layout/ConsoleEasterEgg";
import JsonLd from "@/components/layout/JsonLd";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111",
};

export const metadata: Metadata = {
  title: {
    default: "Utama Global Indo Cargo — Solusi Logistik Korporat B2B",
    template: "%s | Utama Global Indo Cargo",
  },
  description:
    "Platform logistik korporat B2B berkinerja tinggi untuk solusi pengiriman, pergudangan, kepabeanan, dan manajemen rantai pasok tingkat eksekutif di Asia Pasifik.",
  keywords: [
    "logistik B2B",
    "freight forwarding Indonesia",
    "supply chain management",
    "warehouse management",
    "customs brokerage",
    "manajemen rantai pasok",
    "kargo Indonesia",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Utama Global Indo Cargo",
    title: "Utama Global Indo Cargo — Seni Mendikte Waktu & Jarak",
    description:
      "Infrastruktur logistik korporat untuk presisi rantai pasok tingkat eksekutif.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Utama Global Indo Cargo — Solusi Logistik Korporat B2B",
    description:
      "Sinkronisasi Resolusi Pasokan Asimetris — presisi rantai pasok tingkat eksekutif.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <head>
        <JsonLd />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Header />
        <SmoothScroller>{children}</SmoothScroller>
        <Footer />
        <ConsoleEasterEgg />
      </body>
    </html>
  );
}
