import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { notFound } from "next/navigation";
import HeroSection from "@/components/home/HeroSection";
import TrustStrip from "@/components/home/TrustStrip";
import WhyUGC from "@/components/home/WhyUGC";
import ServicesOverview from "@/components/home/ServicesOverview";
import HowItWorks from "@/components/home/HowItWorks";
import ProofSection from "@/components/home/ProofSection";
import IndustriesTeaser from "@/components/home/IndustriesTeaser";
import SecondaryCTA from "@/components/home/SecondaryCTA";
import JsonLd from "@/components/seo/JsonLd";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://utamaglobalindocargo.com";
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@utamaglobalindocargo.com";
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "UGC Logistics (Utama Globalindo Cargo)",
    legalName: "PT Utama Globalindo Cargo",
    url: siteUrl,
    description: dict.metadata.description,
    email: contactEmail,
    ...(contactPhone ? { telephone: contactPhone } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressRegion: "DKI Jakarta",
      addressCountry: "ID",
    },
    areaServed: [
      { "@type": "Country", name: "Indonesia" },
    ],
    knowsAbout: [
      "Freight Forwarding",
      "Domestic Distribution",
      "International Freight",
      "Customs Brokerage",
      "Warehousing",
      "Project Cargo",
      "Charter Services",
    ],
    serviceType: [
      "Domestic Distribution",
      "International Freight Forwarding",
      "Import Door-to-Door",
      "Customs Brokerage",
      "Warehousing & Fulfillment",
      "Project Cargo & Special Handling",
      "Blocspace & Charter",
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <HeroSection locale={locale as Locale} dict={dict} />
      <TrustStrip locale={locale as Locale} />
      <WhyUGC locale={locale as Locale} dict={dict} />
      <ServicesOverview locale={locale as Locale} dict={dict} />
      <HowItWorks dict={dict} />
      <ProofSection locale={locale as Locale} dict={dict} />
      <IndustriesTeaser locale={locale as Locale} dict={dict} />
      <SecondaryCTA locale={locale as Locale} dict={dict} />
    </>
  );
}
