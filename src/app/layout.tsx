import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";

export const metadata: Metadata = {
  title: {
    default: "UGC Logistics (Utama Globalindo Cargo)",
    template: "%s | UGC Logistics",
  },
  description: "Freight Forwarding & Logistics Indonesia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="antialiased" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <SmoothScroll>
          <ScrollProgress />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
