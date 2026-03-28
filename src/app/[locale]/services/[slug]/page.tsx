import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { services, getServiceBySlug } from "@/data/services";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/seo/JsonLd";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.name[locale],
    description: service.shortDescription[locale],
    alternates: { canonical: `/${locale}/services/${slug}` },
  };
}

export function generateStaticParams() {
  return services.flatMap((s) => [
    { locale: "id", slug: s.slug },
    { locale: "en", slug: s.slug },
  ]);
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const dict = await getDictionary(locale as Locale);
  const prefix = `/${locale}`;
  const loc = locale as Locale;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name[loc],
    description: service.description[loc],
    provider: {
      "@type": "Organization",
      name: "UGC Logistics (Utama Globalindo Cargo)",
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="section-dark pt-32 pb-16 lg:pt-40 lg:pb-24">
        <Container>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-logistics-orange" />
            <Link
              href={`${prefix}/services`}
              className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em] hover:text-white transition-colors"
            >
              {dict.nav.services}
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
            {service.name[loc]}
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/50 leading-relaxed max-w-3xl">
            {service.description[loc]}
          </p>
        </Container>
      </section>

      {/* Sub-services */}
      <section className="section-light py-20 lg:py-28">
        <Container>
          <h2 className="text-2xl md:text-3xl font-black text-carbon-dark tracking-tight mb-10">
            {dict.services.subServices}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.subServices.map((sub) => (
              <div
                key={sub.name[loc]}
                className="p-8 bg-white border border-border-light"
              >
                <h3 className="text-lg font-bold text-carbon-dark mb-3">
                  {sub.name[loc]}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {sub.description[loc]}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <h2 className="text-2xl md:text-3xl font-black text-carbon-dark tracking-tight mb-10">
            {dict.services.process}
          </h2>
          <div className="space-y-6">
            {service.process[loc].map((step, i) => (
              <div key={i} className="flex items-start gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-carbon-dark text-white flex items-center justify-center font-bold text-sm">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-base text-text-muted pt-2">{step}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Best for */}
      <section className="section-light py-20 lg:py-28">
        <Container>
          <h2 className="text-2xl md:text-3xl font-black text-carbon-dark tracking-tight mb-8">
            {dict.services.bestFor}
          </h2>
          <ul className="space-y-4">
            {service.bestFor[loc].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-logistics-orange rotate-45 mt-2" />
                <span className="text-base text-text-muted">{item}</span>
              </li>
            ))}
          </ul>
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
