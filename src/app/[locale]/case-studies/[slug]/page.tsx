import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { caseStudies } from "@/data/caseStudies";
import { getServiceBySlug } from "@/data/services";
import { getIndustryBySlug } from "@/data/industries";
import Container from "@/components/ui/Container";
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
    alternates: { canonical: `/${locale}/case-studies/${slug}` },
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

  const challengeLabel = loc === "id" ? "Tantangan" : "Challenge";
  const solutionLabel = loc === "id" ? "Solusi" : "Solution";
  const resultLabel = loc === "id" ? "Hasil" : "Result";
  const relatedLabel = loc === "id" ? "Layanan Terkait" : "Related Service";
  const industryLabel = loc === "id" ? "Industri" : "Industry";

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
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-logistics-orange" />
            <Link
              href={`${prefix}/case-studies`}
              className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em] hover:text-white transition-colors"
            >
              {dict.nav.caseStudies}
            </Link>
          </div>

          {cs.isPlaceholder && (
            <span className="inline-block mb-4 text-[10px] uppercase tracking-wider text-logistics-orange/60 bg-logistics-orange/10 px-2 py-1">
              Placeholder
            </span>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.05] max-w-3xl">
            {cs.title[loc]}
          </h1>

          <div className="mt-6 flex flex-wrap gap-3">
            {relatedIndustry && (
              <Link
                href={`${prefix}/industries/${relatedIndustry.slug}`}
                className="text-xs font-bold uppercase tracking-wider text-white/40 border border-white/10 px-3 py-1 hover:border-white/30 transition-colors"
              >
                {industryLabel}: {relatedIndustry.name[loc]}
              </Link>
            )}
            {relatedService && (
              <Link
                href={`${prefix}/services/${relatedService.slug}`}
                className="text-xs font-bold uppercase tracking-wider text-white/40 border border-white/10 px-3 py-1 hover:border-white/30 transition-colors"
              >
                {relatedLabel}: {relatedService.name[loc]}
              </Link>
            )}
          </div>
        </Container>
      </section>

      {/* Content sections */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="max-w-3xl mx-auto space-y-16">
            {/* Challenge */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-logistics-orange mb-4">
                {challengeLabel}
              </h2>
              <p className="text-base md:text-lg text-text-muted leading-relaxed">
                {cs.challenge[loc]}
              </p>
            </div>

            {/* Solution */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-logistics-orange mb-4">
                {solutionLabel}
              </h2>
              <p className="text-base md:text-lg text-text-muted leading-relaxed">
                {cs.solution[loc]}
              </p>
            </div>

            {/* Result */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-logistics-orange mb-4">
                {resultLabel}
              </h2>
              <p className="text-base md:text-lg text-text-muted leading-relaxed">
                {cs.result[loc]}
              </p>
            </div>
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
