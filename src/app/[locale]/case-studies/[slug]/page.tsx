import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { caseStudies } from "@/data/caseStudies";
import { getServiceBySlug } from "@/data/services";
import { getIndustryBySlug } from "@/data/industries";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";

type Props = { params: Promise<{ locale: string; slug: string }> };

function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((cs) => cs.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return {};
  return {
    title: cs.title[locale],
    description: cs.challenge[locale],
    alternates: {
      canonical: `/${locale}/case-studies/${slug}`,
      languages: {
        id: `/id/case-studies/${slug}`,
        en: `/en/case-studies/${slug}`,
      },
    },
  };
}

export function generateStaticParams() {
  return caseStudies.flatMap((cs) => [
    { locale: "id", slug: cs.slug },
    { locale: "en", slug: cs.slug },
  ]);
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const dict = await getDictionary(locale as Locale);
  const prefix = `/${locale}`;
  const loc = locale as Locale;

  const relatedService = getServiceBySlug(cs.service);
  const relatedIndustry = getIndustryBySlug(cs.industry);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title[loc],
    description: cs.challenge[loc],
    publisher: {
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
          <Breadcrumb
            items={[
              { label: dict.breadcrumb.home, href: prefix },
              { label: dict.nav.caseStudies, href: `${prefix}/case-studies` },
              { label: cs.title[loc] },
            ]}
          />
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-logistics-orange" />
            <Link
              href={`${prefix}/case-studies`}
              className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em] hover:text-white transition-colors"
            >
              {dict.nav.caseStudies}
            </Link>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.05] max-w-3xl">
            {cs.title[loc]}
          </h1>

          <div className="mt-6 flex flex-wrap gap-3">
            {relatedIndustry && (
              <Link
                href={`${prefix}/industries/${relatedIndustry.slug}`}
                className="text-xs font-bold uppercase tracking-wider text-white/40 border border-white/10 px-3 py-1 hover:border-white/30 transition-colors"
              >
                {relatedIndustry.name[loc]}
              </Link>
            )}
            {relatedService && (
              <Link
                href={`${prefix}/services/${relatedService.slug}`}
                className="text-xs font-bold uppercase tracking-wider text-white/40 border border-white/10 px-3 py-1 hover:border-white/30 transition-colors"
              >
                {relatedService.name[loc]}
              </Link>
            )}
          </div>

          {/* Disclaimer */}
          <p className="mt-6 text-xs text-white/20">
            {dict.caseStudies.disclaimer}
          </p>
        </Container>
      </section>

      {/* Content */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="max-w-3xl mx-auto space-y-16">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-logistics-orange mb-4">
                {dict.common.challengeLabel}
              </h2>
              <p className="text-base md:text-lg text-text-muted leading-relaxed">
                {cs.challenge[loc]}
              </p>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-logistics-orange mb-4">
                {dict.common.solutionLabel}
              </h2>
              <p className="text-base md:text-lg text-text-muted leading-relaxed">
                {cs.solution[loc]}
              </p>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-logistics-orange mb-4">
                {dict.common.outcomeLabel}
              </h2>
              <p className="text-base md:text-lg text-text-muted leading-relaxed">
                {cs.result[loc]}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Related links */}
      <section className="section-light py-16">
        <Container>
          <div className="flex flex-wrap gap-4">
            {relatedService && (
              <Link
                href={`${prefix}/services/${relatedService.slug}`}
                className="text-sm font-bold text-carbon-dark border border-border-light px-5 py-3 hover:border-logistics-orange/30 hover:text-logistics-orange transition-colors"
              >
                {dict.industries.relevantServices}: {relatedService.name[loc]}
              </Link>
            )}
            {relatedIndustry && (
              <Link
                href={`${prefix}/industries/${relatedIndustry.slug}`}
                className="text-sm font-bold text-carbon-dark border border-border-light px-5 py-3 hover:border-logistics-orange/30 hover:text-logistics-orange transition-colors"
              >
                {dict.nav.industries}: {relatedIndustry.name[loc]}
              </Link>
            )}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-dark py-20 lg:py-28">
        <Container className="text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            {dict.caseStudies.ctaHeading}
          </h2>
          <Link
            href={`${prefix}/contact`}
            className="mt-8 inline-flex items-center gap-3 bg-logistics-orange text-white px-8 py-4 font-bold text-sm uppercase tracking-wider hover:bg-logistics-orange/90 transition-colors"
          >
            {dict.caseStudies.ctaButton}
          </Link>
        </Container>
      </section>
    </>
  );
}
