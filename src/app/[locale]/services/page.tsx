import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { services } from "@/data/services";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/seo/JsonLd";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.services.landing.heading,
    description: dict.services.landing.subHeading,
    alternates: {
      canonical: `/${locale}/services`,
      languages: { id: "/id/services", en: "/en/services" },
    },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const prefix = `/${locale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "Organization",
      name: "UGC Logistics (Utama Globalindo Cargo)",
    },
    name: dict.services.landing.heading,
    description: dict.services.landing.subHeading,
    areaServed: { "@type": "Country", name: "Indonesia" },
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
              { label: dict.nav.services },
            ]}
          />
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-logistics-orange" />
            <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
              {dict.nav.services}
            </span>
          </div>
          <SectionHeading
            title={dict.services.landing.heading}
            subtitle={dict.services.landing.subHeading}
            dark
          />
        </Container>
      </section>

      {/* Service categories */}
      <section className="section-light py-20 lg:py-28">
        <Container>
          <div className="space-y-6">
            {services.map((service, i) => (
              <Link
                key={service.slug}
                href={`${prefix}/services/${service.slug}`}
                className="group flex flex-col lg:flex-row items-start gap-8 p-8 lg:p-10 bg-white border border-border-light hover:border-logistics-orange/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-carbon-dark text-white flex items-center justify-center font-black text-xl group-hover:bg-logistics-orange transition-colors duration-300">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl lg:text-2xl font-bold text-carbon-dark group-hover:text-logistics-orange transition-colors">
                    {service.name[locale as Locale]}
                  </h2>
                  <p className="mt-3 text-sm text-text-muted leading-relaxed max-w-2xl">
                    {service.description[locale as Locale]}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.subServices.map((sub) => (
                      <span
                        key={sub.name[locale as Locale]}
                        className="text-xs bg-surface-light text-text-muted px-3 py-1"
                      >
                        {sub.name[locale as Locale]}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0 self-center hidden lg:block">
                  <svg
                    className="w-6 h-6 text-text-light group-hover:text-logistics-orange transition-all group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-dark py-20 lg:py-28">
        <Container className="text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            {dict.secondaryCta.heading}
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            {dict.secondaryCta.subHeading}
          </p>
          <Link
            href={`${prefix}/contact`}
            className="mt-8 inline-flex items-center gap-3 bg-logistics-orange text-white px-8 py-4 font-bold text-sm uppercase tracking-wider hover:bg-logistics-orange/90 transition-colors"
          >
            {dict.services.cta}
          </Link>
        </Container>
      </section>
    </>
  );
}
