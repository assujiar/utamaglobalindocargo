import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { generatePageMetadata } from "@/lib/utils/seo";
import { getLocalizedPath } from "@/lib/utils/routes";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { Hero } from "@/components/sections/Hero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { StatsBar } from "@/components/sections/StatsBar";
import { ClientStoryFeatured } from "@/components/sections/ClientStoryFeatured";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { CTABand } from "@/components/sections/CTABand";
import {
  ValuePropSection,
  VelocityMarquee,
  EditorialSection,
} from "@/components/sections/HomeMotionSections";

// ─── Bilingual content ───

const content = {
  id: {
    hero: {
      headline: "Ketepatan Waktu Bukan Opsi. Itu Standar Kami.",
      subline:
        "Freight forwarding, kepabeanan, pergudangan, dan distribusi dalam satu pengelolaan terpadu. Satu mitra strategis untuk seluruh kebutuhan logistik perusahaan Anda.",
      ctaLabel: "Konsultasi Kebutuhan Anda",
    },
    valueProp:
      "Sejak 1995, kami menjadi perpanjangan tim logistik ratusan perusahaan Indonesia. Bukan sekadar penyedia jasa, melainkan mitra operasional yang memahami bahwa setiap keterlambatan pengiriman berdampak langsung pada bisnis Anda.",
    serviceGrid: {
      heading: "Solusi untuk Setiap Kebutuhan Rantai Pasok",
      exploreLabel: "Selengkapnya",
    },
    metrics: [
      { value: "150+", label: "Negara Tujuan" },
      { value: "34", label: "Provinsi" },
      { value: "25+", label: "Tahun" },
      { value: "6", label: "Layanan" },
    ],
    proof: {
      badgesLabel: "Tersertifikasi WCA dan IATA",
    },
    editorial: {
      heading: "34 Provinsi, Satu Sistem Terpadu",
      description:
        "Klien kami mendistribusikan ke seluruh Indonesia setiap hari. Darat, laut, dan udara dengan pelacakan real-time di setiap titik perjalanan.",
      ctaLabel: "Lihat Cara Kerjanya",
    },
    ctaBand: {
      heading: "Ada Kebutuhan Pengiriman yang Perlu Didiskusikan?",
      ctaLabel: "Hubungi Tim Kami",
      trustLine: "Tim kami merespons dalam 2 jam kerja dengan penanganan langsung.",
    },
    seo: {
      title: "UGC Logistics | Freight Forwarder & Ekspedisi Terpercaya Sejak 1995",
      description:
        "PT Utama Globalindo Cargo: jasa freight forwarding, kepabeanan, distribusi domestik, dan pergudangan di Indonesia. Melayani 150+ negara dan 34 provinsi.",
    },
  },
  en: {
    hero: {
      headline: "On-Time Delivery Is Not Optional. It Is Our Standard.",
      subline:
        "Freight forwarding, customs clearance, warehousing, and distribution under one integrated management. One strategic partner for your entire logistics operation.",
      ctaLabel: "Discuss Your Requirements",
    },
    valueProp:
      "Since 1995, we have served as the logistics arm of hundreds of Indonesian companies. Not simply a service provider, but an operational partner who understands that every delayed shipment has a direct impact on your business.",
    serviceGrid: {
      heading: "Solutions for Every Supply Chain Requirement",
      exploreLabel: "Learn More",
    },
    metrics: [
      { value: "150+", label: "Countries" },
      { value: "34", label: "Provinces" },
      { value: "25+", label: "Years" },
      { value: "6", label: "Services" },
    ],
    proof: {
      badgesLabel: "WCA and IATA certified",
    },
    editorial: {
      heading: "34 Provinces, One Integrated System",
      description:
        "Our clients distribute across Indonesia every day. Land, sea, and air with real-time tracking at every point of the journey.",
      ctaLabel: "See How It Works",
    },
    ctaBand: {
      heading: "Have a Shipping Requirement to Discuss?",
      ctaLabel: "Speak with Our Team",
      trustLine: "Our team responds within 2 business hours with direct, personal handling.",
    },
    seo: {
      title: "UGC Logistics | Trusted Freight Forwarder Since 1995",
      description:
        "PT Utama Globalindo Cargo: freight forwarding, customs clearance, domestic distribution, and warehousing in Indonesia. Serving 150+ countries and 34 provinces.",
    },
  },
} as const;

// ─── SEO Metadata ───

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const c = content[locale as Locale];

  return generatePageMetadata({
    pageKey: "home",
    locale: locale as Locale,
    title: c.seo.title,
    description: c.seo.description,
  });
}

// ─── JSON-LD Schemas ───

function OrganizationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "UGC Logistics",
    legalName: "PT Utama Globalindo Cargo",
    url: "https://utamaglobalindocargo.com",
    foundingDate: "1995",
    description:
      "Indonesian freight forwarding and logistics company serving domestic distribution, international freight, customs clearance, warehousing, and project cargo.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressCountry: "ID",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "services@ugc.co.id",
      telephone: "+62-812-8459-6614",
      contactType: "sales",
      availableLanguage: ["Indonesian", "English"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function LocalBusinessSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "UGC Logistics | PT Utama Globalindo Cargo",
    url: "https://utamaglobalindocargo.com",
    telephone: "+62-812-8459-6614",
    email: "services@ugc.co.id",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressRegion: "DKI Jakarta",
      addressCountry: "ID",
    },
    priceRange: "$$",
    openingHours: "Mo-Fr 08:00-17:00",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─── Page Component ───

export default async function HomePage({
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
      <OrganizationSchema />
      <LocalBusinessSchema />

      {/* Header */}
      <Header locale={typedLocale} dictionary={dict} />

      {/* 1. Hero */}
      <Hero
        locale={typedLocale}
        headline={c.hero.headline}
        subline={c.hero.subline}
        ctaLabel={c.hero.ctaLabel}
        ctaHref={getLocalizedPath("quote", typedLocale)}
      />

      {/* 2. Value Proposition + Metrics (GSAP: TextRevealByLine, MagneticElement) */}
      <ValuePropSection
        locale={typedLocale}
        valueProp={c.valueProp}
        metrics={c.metrics}
      />

      {/* 3. Velocity Marquee (GSAP: ScrollVelocityText) */}
      <VelocityMarquee locale={typedLocale} />

      {/* 4. Service Grid */}
      <ServiceGrid
        locale={typedLocale}
        heading={c.serviceGrid.heading}
        exploreLabel={c.serviceGrid.exploreLabel}
      />

      {/* 5. Proof Section (Stats) */}
      <StatsBar locale={typedLocale} badgesLabel={c.proof.badgesLabel} />

      {/* 6. Featured Client Story */}
      <ClientStoryFeatured locale={typedLocale} />

      {/* 6.5. Testimonials Carousel */}
      <TestimonialsCarousel locale={typedLocale} />

      {/* 7. Editorial Spotlight */}
      <EditorialSection
        locale={typedLocale}
        heading={c.editorial.heading}
        description={c.editorial.description}
        ctaLabel={c.editorial.ctaLabel}
      />

      {/* 8. CTA Band */}
      <CTABand
        locale={typedLocale}
        heading={c.ctaBand.heading}
        ctaLabel={c.ctaBand.ctaLabel}
        ctaHref={getLocalizedPath("quote", typedLocale)}
        trustLine={c.ctaBand.trustLine}
      />

      {/* Footer */}
      <Footer locale={typedLocale} dictionary={dict} />

      {/* Mobile Bottom Bar */}
      <MobileBottomBar locale={typedLocale} dictionary={dict} />
    </>
  );
}
