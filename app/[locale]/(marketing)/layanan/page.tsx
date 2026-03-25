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
    title: "Layanan Logistik Lengkap — Distribusi, Freight, Kepabeanan, Pergudangan — UGC Logistics",
    description:
      "Seluruh layanan logistik UGC: distribusi domestik, freight internasional, import & kepabeanan, blockspace & charter, pergudangan 3PL, dan project cargo.",
  },
  hero: {
    headline: "Satu Mitra untuk Seluruh Kebutuhan Rantai Pasok Anda",
    subline:
      "Dari distribusi domestik ke 34 provinsi hingga freight internasional ke 150+ negara — UGC Logistics mengelola seluruh rantai logistik Anda dengan satu titik kontak.",
  },
  serviceGrid: {
    heading: "Enam Layanan Terintegrasi",
    exploreLabel: "Pelajari Lebih Lanjut",
  },
  crossValue: {
    heading: "Mengapa Satu Mitra Logistik?",
    points: [
      "Satu titik kontak untuk seluruh kebutuhan — tidak perlu koordinasi antar vendor",
      "Jadwal dan dokumentasi terkoordinasi antar layanan — mengurangi risiko keterlambatan",
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
      <section className="pt-8 pb-16 sm:pt-12 sm:pb-20 bg-[--color-bg-light]">
        <div className="mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <Breadcrumb
            items={[
              { label: "Beranda", href: `/${LOCALE}` },
              { label: "Layanan" },
            ]}
          />
          <ScrollReveal>
            <div className="mt-6 max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-heading-xl sm:text-display-sm font-bold text-[--color-text-primary] mb-4">
                {content.hero.headline}
              </h1>
              <p className="text-lg sm:text-xl text-[--color-text-secondary] leading-relaxed">
                {content.hero.subline}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Service Grid */}
      <ServiceGrid
        locale={LOCALE}
        heading={content.serviceGrid.heading}
        exploreLabel={content.serviceGrid.exploreLabel}
      />

      {/* Cross-Service Value Statement */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-[720px] px-5 sm:px-10">
          <ScrollReveal>
            <h2 className="text-heading-md sm:text-heading-lg font-bold text-[--color-text-primary] text-center mb-8">
              {content.crossValue.heading}
            </h2>
            <ul className="space-y-4">
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
