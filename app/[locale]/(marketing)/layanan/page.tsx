import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { generatePageMetadata } from "@/lib/utils/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { CTABand } from "@/components/sections/CTABand";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { getLocalizedPath } from "@/lib/utils/routes";

const LOCALE: Locale = "id";

const content = {
  seo: {
    title: "Layanan Logistik Lengkap | Distribusi, Freight, Kepabeanan, Pergudangan | UGC Logistics",
    description:
      "Seluruh layanan logistik UGC: distribusi domestik, freight internasional, import & kepabeanan, blockspace & charter, pergudangan 3PL, dan project cargo.",
  },
  hero: {
    headline: "Satu Mitra untuk Seluruh Kebutuhan Rantai Pasok Anda",
    subline:
      "Dari distribusi domestik ke 34 provinsi hingga freight internasional ke 150+ negara. UGC Logistics mengelola seluruh rantai logistik Anda dengan satu titik kontak.",
  },
  serviceGrid: {
    heading: "Enam Layanan Terintegrasi",
    exploreLabel: "Pelajari Lebih Lanjut",
  },
  crossValue: {
    heading: "Mengapa Satu Mitra Logistik?",
    points: [
      "Satu titik kontak untuk seluruh kebutuhan, tidak perlu koordinasi antar vendor",
      "Jadwal dan dokumentasi terkoordinasi antar layanan, mengurangi risiko keterlambatan",
      "Standar kualitas konsisten dari pengiriman pertama hingga terakhir",
      "Visibilitas end-to-end atas seluruh pergerakan barang Anda",
    ],
  },
  ctaBand: {
    heading: "Belum Yakin Layanan Mana yang Tepat?",
    ctaLabel: "Konsultasi dengan Tim Kami",
    trustLine: "Kami merespons dalam 2 jam kerja.",
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
        name: "Beranda",
        item: "https://utamaglobalindocargo.com/id",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Layanan",
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
              { label: "Beranda", href: `/${LOCALE}` },
              { label: "Layanan" },
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
              Keunggulan
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
