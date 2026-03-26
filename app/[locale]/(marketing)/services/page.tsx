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
    headline: "You Focus on Sales. We Handle the Shipping.",
    subline:
      "Every business has different logistics challenges. Some need to reach remote Papua, others import raw materials from China. Tell us your situation, and we will find the right solution.",
  },
  serviceGrid: {
    heading: "Pick What You Need",
    exploreLabel: "Learn More",
  },
  crossValue: {
    heading: "Why Deal with Five Vendors When One Will Do?",
    points: [
      "One number, one contact person. No more calling different vendors for a single shipment",
      "Schedules sync automatically across services. Cargo clears the port, goes to warehouse, ships out. Seamlessly",
      "When something goes wrong, one person takes ownership. No finger-pointing between parties",
      "Track all your cargo movements from one dashboard, not five different platforms",
    ],
  },
  ctaBand: {
    heading: "Not Sure Where to Start?",
    ctaLabel: "Tell Us What You Need",
    trustLine: "Free consultation. Our team responds within 2 business hours.",
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
      <section className="pt-8 pb-24 sm:pt-12 sm:pb-32 bg-[--color-bg-dark] relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-intense pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 grain-overlay pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <Breadcrumb
            items={[
              { label: "Home", href: `/${LOCALE}` },
              { label: "Services" },
            ]}
          />
          <ScrollReveal>
            <div className="mt-8 max-w-3xl mx-auto text-center">
              <h1 className="font-display text-heading-xl sm:text-display-sm font-bold gradient-text-vivid mb-5 tracking-[-0.03em]">
                {content.hero.headline}
              </h1>
              <p className="text-lg sm:text-xl text-[--color-text-secondary] leading-relaxed">
                {content.hero.subline}
              </p>
            </div>
          </ScrollReveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0 glow-divider-full" aria-hidden="true" />
      </section>

      {/* Service Grid */}
      <ServiceGrid
        locale={LOCALE}
        heading={content.serviceGrid.heading}
        exploreLabel={content.serviceGrid.exploreLabel}
      />

      {/* Cross-Service Value Statement */}
      <section className="py-24 sm:py-32 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #09090B 0%, #0f0805 50%, #09090B 100%)" }}
      >
        <div className="absolute top-0 left-0 right-0 glow-divider-full" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 right-0 w-[400px] h-[600px] rounded-full bg-[--color-primary] opacity-[0.06] blur-[160px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[720px] px-5 sm:px-10">
          <ScrollReveal>
            <p className="label-text text-[--color-primary] text-center mb-4">
              Advantage
            </p>
            <h2 className="text-heading-md sm:text-heading-lg font-bold gradient-text text-center mb-12 tracking-[-0.02em]">
              {content.crossValue.heading}
            </h2>
            <ul className="space-y-5">
              {content.crossValue.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 size-2 rounded-full bg-[--color-primary] shrink-0 shadow-[0_0_10px_rgba(255,70,0,0.4)]" />
                  <p className="text-[--color-text-secondary] leading-relaxed text-lg">
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
