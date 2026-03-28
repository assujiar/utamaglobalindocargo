import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { industries, getIndustryBySlug } from "@/data/industries";
import { getServiceBySlug } from "@/data/services";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/seo/JsonLd";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return {
    title: industry.name[locale],
    description: industry.description[locale],
    alternates: { canonical: `/${locale}/industries/${slug}` },
  };
}

export function generateStaticParams() {
  return industries.flatMap((i) => [
    { locale: "id", slug: i.slug },
    { locale: "en", slug: i.slug },
  ]);
}

export default async function IndustryDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const dict = await getDictionary(locale as Locale);
  const prefix = `/${locale}`;
  const loc = locale as Locale;

  const relatedServices = industry.relevantServices
    .map(getServiceBySlug)
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${industry.name[loc]} - UGC Logistics`,
    description: industry.description[loc],
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="section-dark pt-32 pb-16 lg:pt-40 lg:pb-24">
        <Container>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-logistics-orange" />
            <Link
              href={`${prefix}/industries`}
              className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em] hover:text-white transition-colors"
            >
              {dict.nav.industries}
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
            {industry.name[loc]}
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/50 leading-relaxed max-w-3xl">
            {industry.description[loc]}
          </p>
        </Container>
      </section>

      {/* Challenge */}
      <section className="section-light py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-carbon-dark tracking-tight mb-6">
                {dict.industries.challenge}
              </h2>
              <p className="text-base text-text-muted leading-relaxed">
                {industry.challenge[loc]}
              </p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-carbon-dark tracking-tight mb-6">
                {dict.industries.solution}
              </h2>
              <p className="text-base text-text-muted leading-relaxed">
                {industry.solution[loc]}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Related services */}
      {relatedServices.length > 0 && (
        <section className="bg-white py-20 lg:py-28">
          <Container>
            <h2 className="text-2xl md:text-3xl font-black text-carbon-dark tracking-tight mb-10">
              {dict.servicesOverview.heading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedServices.map((service) =>
                service ? (
                  <Link
                    key={service.slug}
                    href={`${prefix}/services/${service.slug}`}
                    className="group p-8 border border-border-light hover:border-logistics-orange/30 transition-all"
                  >
                    <h3 className="text-lg font-bold text-carbon-dark group-hover:text-logistics-orange transition-colors">
                      {service.name[loc]}
                    </h3>
                    <p className="mt-2 text-sm text-text-muted leading-relaxed">
                      {service.shortDescription[loc]}
                    </p>
                  </Link>
                ) : null
              )}
            </div>
          </Container>
        </section>
      )}

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
            {dict.industries.cta}
          </Link>
        </Container>
      </section>
    </>
  );
}
