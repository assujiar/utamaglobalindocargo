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
    default: "Utama Globalindo Cargo — Barang Anda, Urusan Kami",
    template: "%s | Utama Globalindo Cargo",
  },
  description:
    "Partner logistik untuk perusahaan yang serius soal pengiriman, pergudangan, kepabeanan, dan rantai pasok. Berbasis di Jakarta, beroperasi di Asia Pasifik.",
  keywords: [
    "logistik B2B Indonesia",
    "freight forwarding Jakarta",
    "supply chain management",
    "warehouse management",
    "customs brokerage Indonesia",
    "jasa pengiriman korporat",
    "kargo Indonesia",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Utama Globalindo Cargo",
    title: "Utama Globalindo Cargo — Barang Anda, Urusan Kami",
    description:
      "Partner logistik untuk perusahaan yang tidak mau pusing soal pengiriman. Jakarta — Asia Pasifik.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Utama Globalindo Cargo — Barang Anda, Urusan Kami",
    description:
      "Partner logistik untuk perusahaan yang serius. Pergudangan, freight, bea cukai, rantai pasok.",
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
