import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { generatePageMetadata } from "@/lib/utils/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { CTABand } from "@/components/sections/CTABand";
import { ServicesHero, CrossValueSection } from "@/components/sections/ServicesPageSections";
import { getLocalizedPath } from "@/lib/utils/routes";

const content = {
  id: {
    seo: {
      title: "Layanan Logistik Lengkap | Distribusi, Freight, Kepabeanan, Pergudangan | UGC Logistics",
      description:
        "Seluruh layanan logistik UGC: distribusi domestik, freight internasional, import & kepabeanan, blockspace & charter, pergudangan 3PL, dan project cargo.",
    },
    hero: {
      headline: "Enam Layanan Terintegrasi, Satu Mitra Strategis",
      subline:
        "Setiap perusahaan memiliki tantangan logistik yang berbeda. Distribusi ke 34 provinsi, impor bahan baku lintas negara, atau pengiriman kargo proyek berskala besar. Sampaikan kebutuhan Anda, kami rancang solusinya.",
    },
    breadcrumb: [
      { label: "Beranda", href: "/id" },
      { label: "Layanan" },
    ],
    serviceGrid: {
      heading: "Layanan Sesuai Kebutuhan Anda",
      exploreLabel: "Selengkapnya",
    },
    crossValue: {
      label: "Keunggulan",
      heading: "Keunggulan Satu Mitra Logistik Terpadu",
      points: [
        "Satu kontak person untuk seluruh kebutuhan. Tanpa koordinasi silang antar vendor yang memperlambat proses",
        "Jadwal antar layanan tersinkronisasi otomatis. Kargo dari pelabuhan langsung masuk gudang dan terdistribusi",
        "Satu pihak yang bertanggung jawab penuh. Setiap kendala ditangani langsung, tanpa eskalasi berbelit",
        "Visibilitas menyeluruh atas seluruh pergerakan barang Anda dari satu sistem terpadu",
      ],
    },
    ctaBand: {
      heading: "Belum Yakin Layanan Mana yang Tepat?",
      ctaLabel: "Konsultasi dengan Tim Kami",
      trustLine: "Konsultasi tanpa biaya. Tim kami merespons dalam 2 jam kerja.",
    },
  },
  en: {
    seo: {
      title: "Logistics Services | Distribution, Freight, Customs, Warehousing | UGC Logistics",
      description:
        "All UGC logistics services: domestic distribution, international freight, import & customs, blockspace & charter, 3PL warehousing, and project cargo.",
    },
    hero: {
      headline: "Six Integrated Services, One Strategic Partner",
      subline:
        "Every company faces distinct logistics challenges. Distribution across 34 provinces, cross-border raw material imports, or large-scale project cargo. Share your requirements, and we will design the solution.",
    },
    breadcrumb: [
      { label: "Home", href: "/en" },
      { label: "Services" },
    ],
    serviceGrid: {
      heading: "Services Tailored to Your Requirements",
      exploreLabel: "Learn More",
    },
    crossValue: {
      label: "Advantage",
      heading: "The Advantage of a Single Logistics Partner",
      points: [
        "One contact person for all requirements. No cross-vendor coordination slowing down your operations",
        "Schedules synchronize automatically across services. Cargo clears the port, enters the warehouse, and ships out seamlessly",
        "Full accountability under one roof. Every issue is resolved directly, without multi-party escalation",
        "Complete visibility over all cargo movements through a single integrated system",
      ],
    },
    ctaBand: {
      heading: "Not Sure Which Service Fits Your Needs?",
      ctaLabel: "Consult with Our Team",
      trustLine: "Complimentary consultation. Our team responds within 2 business hours.",
    },
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const typedLocale = locale as Locale;
  const c = content[typedLocale];

  return generatePageMetadata({
    pageKey: "services",
    locale: typedLocale,
    title: c.seo.title,
    description: c.seo.description,
  });
}

export default async function LayananPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);
  const c = content[typedLocale];

  return (
    <>
      <Header locale={typedLocale} dictionary={dict} />

      <ServicesHero
        headline={c.hero.headline}
        subline={c.hero.subline}
        breadcrumbItems={c.breadcrumb}
      />

      <ServiceGrid
        locale={typedLocale}
        heading={c.serviceGrid.heading}
        exploreLabel={c.serviceGrid.exploreLabel}
      />

      <CrossValueSection
        label={c.crossValue.label}
        heading={c.crossValue.heading}
        points={c.crossValue.points}
      />

      <CTABand
        locale={typedLocale}
        heading={c.ctaBand.heading}
        ctaLabel={c.ctaBand.ctaLabel}
        ctaHref={getLocalizedPath("quote", typedLocale)}
        trustLine={c.ctaBand.trustLine}
      />

      <Footer locale={typedLocale} dictionary={dict} />
    </>
  );
}
