import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroller from "@/components/layout/SmoothScroller";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ConsoleEasterEgg from "@/components/layout/ConsoleEasterEgg";
import JsonLd from "@/components/layout/JsonLd";

const SITE_URL = "https://utamaglobalindocargo.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Utama Globalindo Cargo | Freight Forwarding & Logistics Indonesia",
    template: "%s | Utama Globalindo Cargo",
  },
  description:
    "Freight forwarding, customs brokerage, warehousing, dan project cargo untuk perusahaan yang membutuhkan partner logistik terpercaya. Jakarta, Indonesia.",
  keywords: [
    "freight forwarding Indonesia",
    "customs brokerage Jakarta",
    "logistics company Indonesia",
    "warehouse fulfillment",
    "project cargo",
    "international shipping",
    "supply chain Indonesia",
    "import door to door",
    "ekspedisi kargo",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Utama Globalindo Cargo",
    title: "Utama Globalindo Cargo | Freight Forwarding & Logistics Indonesia",
    description:
      "Freight forwarding, customs brokerage, warehousing, dan project cargo. Jakarta, Indonesia.",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Utama Globalindo Cargo — Freight Forwarding & Logistics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Utama Globalindo Cargo | Freight Forwarding & Logistics",
    description:
      "Domestic & international freight, customs, warehousing, project cargo. Jakarta, Indonesia.",
    images: [`${SITE_URL}/og-image.png`],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
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
        {/* Skip to content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-logistics-orange focus:text-white focus:font-bold focus:text-sm"
        >
          Langsung ke konten utama
        </a>
        <Header />
        <SmoothScroller>
          <main id="main-content">{children}</main>
        </SmoothScroller>
        <Footer />
        <ConsoleEasterEgg />
      </body>
    </html>
  );
}
