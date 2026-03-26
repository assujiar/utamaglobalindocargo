import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { generatePageMetadata } from "@/lib/utils/seo";
import {
  QuoteHero,
  QuoteForm,
  QuoteTrustBar,
} from "@/components/sections/QuotePageSections";
import { services } from "@/lib/content/services";

const content = {
  seo: {
    title:
      "Request a Quote | Free Consultation for Your Logistics Needs | UGC Logistics",
    description:
      "Get a customized logistics quote from UGC Logistics. Domestic distribution, international freight, customs clearance, warehousing, and more. Response within 2 business hours.",
  },
  hero: {
    headline: "Get Your Custom Logistics Quote",
    subline:
      "Tell us about your shipment and our team will respond with a tailored proposal within 2 business hours. No commitment required.",
    stepIndicator: "Free Consultation",
  },
  fields: {
    name: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    company: "Company Name (optional)",
    service: "Select a Service",
    origin: "Origin City / Port",
    destination: "Destination City / Port",
    cargoType: "Cargo Type (e.g. Electronics, Textiles)",
    weight: "Estimated Weight (kg)",
    details:
      "Additional details: special handling, timeline, volume, or any other requirements...",
    submit: "Submit Quote Request",
  },
  successHeading: "Request Received",
  successMessage:
    "Thank you for reaching out. Our logistics team will review your requirements and get back to you within 2 business hours with a customized proposal.",
  trustItems: [
    { icon: "🔒", text: "Your data is secure" },
    { icon: "⚡", text: "Response within 2 hours" },
    { icon: "📋", text: "Free consultation" },
  ] as const,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  return generatePageMetadata({
    pageKey: "quote",
    locale,
    title: content.seo.title,
    description: content.seo.description,
  });
}

export default async function RequestQuotePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  if (locale !== "en") notFound();

  const { service: preselectedService } = await searchParams;

  const serviceOptions = services.map((s) => ({
    key: s.key,
    name: s.name_en,
  }));

  return (
    <>
      <QuoteHero
        headline={content.hero.headline}
        subline={content.hero.subline}
        stepIndicator={content.hero.stepIndicator}
      />
      <QuoteForm
        locale={locale}
        services={serviceOptions}
        preselectedService={preselectedService}
        fields={content.fields}
        successHeading={content.successHeading}
        successMessage={content.successMessage}
      />
      <QuoteTrustBar items={content.trustItems} />
    </>
  );
}
