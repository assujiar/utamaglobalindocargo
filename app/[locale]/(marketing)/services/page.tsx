import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { generatePageMetadata } from "@/lib/utils/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { CTABand } from "@/components/sections/CTABand";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { getLocalizedPath } from "@/lib/utils/routes";

const LOCALE: Locale = "en";

const content = {
  seo: {
    title: "Logistics Services | Distribution, Freight, Customs, Warehousing | UGC Logistics",
    description:
      "All UGC logistics services: domestic distribution, international freight, import & customs, blockspace & charter, 3PL warehousing, and project cargo.",
  },
  hero: {
    headline: "One Partner for All Your Supply Chain Needs",
    subline:
      "From domestic distribution across 34 provinces to international freight to 150+ countries. UGC Logistics manages your entire logistics chain through a single point of contact.",
  },
  serviceGrid: {
    heading: "Six Integrated Services",
    exploreLabel: "Learn More",
  },
  crossValue: {
    heading: "Why One Logistics Partner?",
    points: [
      "A single point of contact for all needs, no multi-vendor coordination overhead",
      "Coordinated schedules and documentation across services, reducing delay risks",
      "Consistent quality standards from first mile to last mile",
      "End-to-end visibility over all your cargo movements",
    ],
  },
  ctaBand: {
    heading: "Not Sure Which Service Fits Your Needs?",
    ctaLabel: "Talk to Our Team",
    trustLine: "We respond within 2 business hours.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  return generatePageMetadata({
    pageKey: "services",
    locale: LOCALE,
    title: content.seo.title,
    description: content.seo.description,
  });
}

function BreadcrumbSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://utamaglobalindocargo.com/en",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <>
      <BreadcrumbSchema />

      {/* Hero */}
      <section className="pt-8 pb-20 sm:pt-12 sm:pb-28 bg-[--color-bg-dark] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 right-1/4 w-[500px] h-[500px] rounded-full bg-[--color-primary] opacity-[0.04] blur-[160px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <Breadcrumb
            items={[
              { label: "Home", href: `/${LOCALE}` },
              { label: "Services" },
            ]}
          />
          <ScrollReveal>
            <div className="mt-8 max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-heading-xl sm:text-display-sm font-bold text-[--color-text-primary] mb-5 tracking-[-0.02em]">
                {content.hero.headline}
              </h1>
              <p className="text-lg sm:text-xl text-[--color-text-secondary] leading-relaxed">
                {content.hero.subline}
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom glow divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,70,0,0.12)] to-transparent" aria-hidden="true" />
      </section>

      {/* Service Grid */}
      <ServiceGrid
        locale={LOCALE}
        heading={content.serviceGrid.heading}
        exploreLabel={content.serviceGrid.exploreLabel}
      />

      {/* Cross-Service Value Statement */}
      <section className="py-20 sm:py-28 bg-[--color-bg-dark-elevated] relative">
        {/* Top glow divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,70,0,0.08)] to-transparent" aria-hidden="true" />

        <div className="mx-auto max-w-[720px] px-5 sm:px-10">
          <ScrollReveal>
            <p className="label-text text-[--color-primary] text-center mb-4">
              Advantage
            </p>
            <h2 className="text-heading-md sm:text-heading-lg font-bold text-[--color-text-primary] text-center mb-10 tracking-[-0.02em]">
              {content.crossValue.heading}
            </h2>
            <ul className="space-y-5">
              {content.crossValue.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 size-1.5 rounded-full bg-[--color-primary] shrink-0" />
                  <p className="text-[--color-text-secondary] leading-relaxed">
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Band */}
      <CTABand
        locale={LOCALE}
        heading={content.ctaBand.heading}
        ctaLabel={content.ctaBand.ctaLabel}
        ctaHref={getLocalizedPath("quote", LOCALE)}
        trustLine={content.ctaBand.trustLine}
      />
    </>
  );
}
