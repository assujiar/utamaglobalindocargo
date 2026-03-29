import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { caseStudies } from "@/data/caseStudies";
import { industries } from "@/data/industries";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SectionHeading from "@/components/ui/SectionHeading";
import CaseStudyFilter from "@/components/case-studies/CaseStudyFilter";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.caseStudies.heading,
    description: dict.caseStudies.subHeading,
    alternates: {
      canonical: `/${locale}/case-studies`,
      languages: { id: "/id/case-studies", en: "/en/case-studies" },
    },
  };
}

export default async function CaseStudiesPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const prefix = `/${locale}`;
  const loc = locale as Locale;

  const industriesForFilter = industries.map((ind) => ({
    slug: ind.slug,
    name: ind.name[loc],
  }));

  const casesForClient = caseStudies.map((cs) => ({
    slug: cs.slug,
    title: cs.title[loc],
    industry: cs.industry,
    service: cs.service,
    challenge: cs.challenge[loc],
    solution: cs.solution[loc],
    result: cs.result[loc],
    isPlaceholder: cs.isPlaceholder,
  }));

  return (
    <>
      <section className="section-dark pt-32 pb-20 lg:pt-40 lg:pb-28">
        <Container>
          <Breadcrumb
            items={[
              { label: dict.breadcrumb.home, href: prefix },
              { label: dict.nav.caseStudies },
            ]}
          />
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-logistics-orange" />
            <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
              {dict.nav.caseStudies}
            </span>
          </div>
          <SectionHeading
            title={dict.caseStudies.heading}
            subtitle={dict.caseStudies.subHeading}
            dark
          />
          <p className="mt-4 text-xs text-white/25 max-w-xl">
            {dict.caseStudies.disclaimer}
          </p>
        </Container>
      </section>

      <section className="section-light py-20 lg:py-28">
        <Container>
          <CaseStudyFilter
            cases={casesForClient}
            industries={industriesForFilter}
            filterAllLabel={dict.caseStudies.filterAll}
            challengeLabel={dict.common.challengeLabel}
            solutionLabel={dict.common.solutionLabel}
            resultLabel={dict.common.outcomeLabel}
          />
        </Container>
      </section>

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
