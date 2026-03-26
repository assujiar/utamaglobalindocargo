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
import { CTABand } from "@/components/sections/CTABand";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";

// ─── Bilingual content ───

const content = {
  id: {
    hero: {
      headline: "Menggerakkan Niaga Indonesia Melintasi Samudera dan Kepulauan",
      subline:
        "Freight forwarding, kepabeanan, pergudangan, dan distribusi yang dikelola oleh satu mitra yang memahami kompleksitas logistik Indonesia.",
      ctaLabel: "Diskusikan Kebutuhan Anda",
    },
    valueProp:
      "Sejak 1995, menghubungkan bisnis Indonesia ke pasar global dengan presisi kelas enterprise dan responsivitas mitra yang berdedikasi.",
    serviceGrid: {
      heading: "Satu Mitra untuk Seluruh Kebutuhan Rantai Pasok Anda",
      exploreLabel: "Jelajahi",
    },
    proof: {
      badgesLabel: "Anggota resmi WCA dan IATA",
    },
    editorial: {
      heading: "Layanan Unggulan",
      description:
        "Jaringan distribusi terintegrasi menjangkau 34 provinsi. Darat, laut, dan udara dengan pelacakan real-time.",
      ctaLabel: "Pelajari Lebih Lanjut",
    },
    ctaBand: {
      heading: "Siap Mengirim?",
      ctaLabel: "Minta Penawaran Gratis",
      trustLine: "Kami merespons dalam 2 jam kerja.",
    },
    seo: {
      title: "UGC Logistics | Freight Forwarder & Ekspedisi Terpercaya Sejak 1995",
      description:
        "PT Utama Globalindo Cargo: jasa freight forwarding, kepabeanan, distribusi domestik, dan pergudangan di Indonesia. Melayani 150+ negara dan 34 provinsi.",
    },
  },
  en: {
    hero: {
      headline: "Moving Indonesia's Commerce Across Oceans and Islands",
      subline:
        "Freight forwarding, customs clearance, warehousing, and distribution managed by one partner who understands the complexity of Indonesian logistics.",
      ctaLabel: "Discuss Your Requirements",
    },
    valueProp:
      "Since 1995, connecting Indonesian businesses to global markets with enterprise-grade precision and the responsiveness of a dedicated partner.",
    serviceGrid: {
      heading: "One Partner for All Your Supply Chain Needs",
      exploreLabel: "Explore",
    },
    proof: {
      badgesLabel: "Official WCA and IATA member",
    },
    editorial: {
      heading: "Featured Service",
      description:
        "Integrated distribution network reaching 34 provinces. Land, sea, and air with real-time tracking.",
      ctaLabel: "Learn More",
    },
    ctaBand: {
      heading: "Ready to Move?",
      ctaLabel: "Request a Free Quote",
      trustLine: "We respond within 2 business hours.",
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

      {/* 2. Value Proposition Strip with visual metrics */}
      <section className="py-24 sm:py-32 bg-[--color-bg-dark] relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-subtle pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[--color-accent-warm] opacity-[0.05] blur-[160px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <ScrollReveal>
            <p className="text-xl sm:text-2xl md:text-3xl text-[--color-text-secondary] text-center max-w-3xl mx-auto leading-relaxed font-light mb-16">
              {c.valueProp}
            </p>
          </ScrollReveal>

          {/* Visual metric cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🌏", value: "150+", label: typedLocale === "id" ? "Negara Tujuan" : "Countries" },
              { icon: "🏝️", value: "34", label: typedLocale === "id" ? "Provinsi" : "Provinces" },
              { icon: "📦", value: "25+", label: typedLocale === "id" ? "Tahun" : "Years" },
              { icon: "✈️", value: "6", label: typedLocale === "id" ? "Layanan" : "Services" },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="glass-dark p-4 sm:p-5 text-center">
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <span className="stat-number text-2xl sm:text-3xl gradient-text block">{item.value}</span>
                  <span className="label-text text-[--color-text-secondary] text-[10px] mt-1 block">{item.label}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Service Grid */}
      <ServiceGrid
        locale={typedLocale}
        heading={c.serviceGrid.heading}
        exploreLabel={c.serviceGrid.exploreLabel}
      />

      {/* 4. Proof Section (Stats + Client Story) */}
      <section className="py-28 sm:py-36 bg-[--color-bg-dark] relative overflow-hidden">
        <div className="absolute inset-0 radial-burst pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 grain-overlay pointer-events-none" aria-hidden="true" />
        <div className="absolute top-0 left-0 right-0 glow-divider-full" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          {/* Stats */}
          <StatsBar locale={typedLocale} className="mb-20" />

          {/* Badges area */}
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="label-text text-[--color-text-secondary]">
                {c.proof.badgesLabel}
              </p>
            </div>
          </ScrollReveal>

          {/* Featured Client Story */}
          <div className="flex justify-center">
            <ClientStoryFeatured locale={typedLocale} />
          </div>
        </div>
      </section>

      {/* 5. Featured Editorial / Service Spotlight */}
      <section className="py-28 sm:py-36 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #09090B 0%, #0f0805 50%, #09090B 100%)" }}
      >
        <div className="absolute top-0 left-0 right-0 glow-divider-full" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[--color-primary] opacity-[0.06] blur-[180px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <ScrollReveal>
            <div className="glass-tinted p-10 sm:p-14 max-w-2xl mx-auto text-center">
              <p className="label-text text-[--color-primary] mb-4">
                {typedLocale === "id" ? "Spotlight" : "Spotlight"}
              </p>
              <h2 className="text-heading-md sm:text-heading-lg font-bold gradient-text mb-5 tracking-[-0.02em]">
                {c.editorial.heading}
              </h2>
              <p className="text-[--color-text-secondary] mb-8 leading-relaxed text-lg">
                {c.editorial.description}
              </p>
              <Button
                href={getLocalizedPath("services", typedLocale)}
                variant="secondary"
              >
                {c.editorial.ctaLabel}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. CTA Band */}
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
