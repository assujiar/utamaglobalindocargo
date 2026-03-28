import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UGC Logistics (Utama Globalindo Cargo)",
  description: "Freight Forwarding & Logistics Indonesia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
