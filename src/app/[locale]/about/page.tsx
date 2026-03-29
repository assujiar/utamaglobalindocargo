import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import TrustStrip from "@/components/home/TrustStrip";
import JsonLd from "@/components/seo/JsonLd";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.about.heading,
    description: dict.about.subHeading,
    alternates: {
      canonical: `/${locale}/about`,
      languages: { id: "/id/about", en: "/en/about" },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const prefix = `/${locale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Organization",
      name: "UGC Logistics (Utama Globalindo Cargo)",
      description: dict.about.missionText,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jakarta",
        addressCountry: "ID",
      },
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="section-dark pt-32 pb-20 lg:pt-40 lg:pb-28">
        <Container>
          <Breadcrumb
            items={[
              { label: dict.breadcrumb.home, href: prefix },
              { label: dict.nav.about },
            ]}
          />
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-logistics-orange" />
            <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
              {dict.nav.about}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] max-w-3xl">
            {dict.about.heading}
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/50 leading-relaxed max-w-2xl">
            {dict.about.subHeading}
          </p>
        </Container>
      </section>

      {/* Trust strip */}
      <TrustStrip locale={locale as Locale} />

      {/* Mission + Story */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-carbon-dark tracking-tight mb-6">
                {dict.about.missionHeading}
              </h2>
              <p className="text-base text-text-muted leading-relaxed">
                {dict.about.missionText}
              </p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-carbon-dark tracking-tight mb-6">
                {dict.about.storyHeading}
              </h2>
              <p className="text-base text-text-muted leading-relaxed">
                {dict.about.storyText}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Operational Profile */}
      <section className="section-light py-20 lg:py-28">
        <Container>
          <h2 className="text-2xl md:text-3xl font-black text-carbon-dark tracking-tight mb-10">
            {dict.about.operationalHeading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border-light">
            {dict.about.operationalItems.map((item, i) => (
              <div key={i} className="bg-white p-6 lg:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-light mb-2">
                  {item.label}
                </p>
                <p className="text-base font-bold text-carbon-dark">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <h2 className="text-2xl md:text-3xl font-black text-carbon-dark tracking-tight mb-12">
            {dict.about.valuesHeading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border-light">
            {dict.about.values.map((value, i) => (
              <div key={i} className="bg-white p-8 lg:p-10">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-10 h-10 bg-carbon-dark text-white flex items-center justify-center font-bold text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-carbon-dark mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="section-light py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-carbon-dark tracking-tight mb-6">
                {dict.about.teamHeading}
              </h2>
              <p className="text-base text-text-muted leading-relaxed">
                {dict.about.teamText}
              </p>
            </div>
            <div className="bg-carbon-dark/5 aspect-[4/3] flex items-center justify-center border border-border-light">
              <div className="text-center px-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-carbon-dark/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-text-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                </div>
                <p className="text-sm text-text-light">
                  {dict.about.teamPlaceholder}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Brand tagline */}
      <section className="section-dark py-16 lg:py-20">
        <Container className="text-center">
          <p className="text-2xl md:text-3xl lg:text-4xl font-black text-white italic tracking-tight">
            &ldquo;We Care What We Deliver&rdquo;
          </p>
          <p className="mt-3 text-sm text-white/30 uppercase tracking-widest">
            PT Utama Globalindo Cargo
          </p>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 lg:py-28">
        <Container className="text-center">
          <h2 className="text-3xl md:text-4xl font-black text-carbon-dark tracking-tight">
            {dict.about.ctaHeading}
          </h2>
          <p className="mt-4 text-text-muted max-w-xl mx-auto">
            {dict.about.ctaText}
          </p>
          <Link
            href={`${prefix}/contact`}
            className="mt-8 inline-flex items-center gap-3 bg-logistics-orange text-white px-8 py-4 font-bold text-sm uppercase tracking-wider hover:bg-logistics-orange/90 transition-colors"
          >
            {dict.about.ctaButton}
          </Link>
        </Container>
      </section>
    </>
  );
}
