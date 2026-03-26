import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { generatePageMetadata } from "@/lib/utils/seo";
import { LegalPageSection } from "@/components/sections/LegalPageSection";

const content = {
  seo: {
    title: "Terms of Service | UGC Logistics",
    description: "Terms and conditions governing the use of UGC Logistics services and website.",
  },
  title: "Terms of Service",
  lastUpdated: "Last updated: March 2026",
  sections: [
    {
      heading: "1. Service Agreement",
      body: `<p>By engaging PT Utama Globalindo Cargo ("UGC Logistics") for freight forwarding, customs clearance, warehousing, or related logistics services, you agree to these terms. UGC Logistics operates as a freight forwarder and logistics service provider acting as an intermediary.</p>`,
    },
    {
      heading: "2. Client Responsibilities",
      body: `<p>Clients agree to provide accurate cargo information, ensure proper documentation for customs clearance, comply with all applicable laws, and notify UGC Logistics of hazardous or sensitive cargo prior to booking. Failure to provide accurate information may result in delays or additional charges.</p>`,
    },
    {
      heading: "3. Liability and Insurance",
      body: `<p>Our liability for loss or damage is limited to the terms of applicable transport conventions. We strongly recommend comprehensive cargo insurance, which UGC Logistics can arrange upon request. We are not liable for force majeure events. Claims must be submitted in writing within 14 days of delivery.</p>`,
    },
    {
      heading: "4. Website Terms and Dispute Resolution",
      body: `<p>Use of this website is governed by Indonesian law. Service rates and transit times are subject to confirmation at booking. Disputes shall be resolved through good-faith negotiation, or referred to arbitration in Jakarta under BANI rules. Contact us at <a href="mailto:services@ugc.co.id">services@ugc.co.id</a>.</p>`,
    },
  ],
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return generatePageMetadata({ pageKey: "terms", locale: locale as Locale, title: content.seo.title, description: content.seo.description });
}

export default async function TermsOfServicePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <main>
      <LegalPageSection title={content.title} lastUpdated={content.lastUpdated} content={content.sections} variant="terms" />
    </main>
  );
}
