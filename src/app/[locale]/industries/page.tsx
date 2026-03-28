import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { industries } from "@/data/industries";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.industries.heading,
    description: dict.industries.subHeading,
    alternates: { canonical: `/${locale}/industries` },
  };
}

export default async function IndustriesPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const prefix = `/${locale}`;
  const loc = locale as Locale;

  return (
    <>
      <section className="section-dark pt-32 pb-20 lg:pt-40 lg:pb-28">
        <Container>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-logistics-orange" />
            <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
              {dict.nav.industries}
            </span>
          </div>
          <SectionHeading
            title={dict.industries.heading}
            subtitle={dict.industries.subHeading}
            dark
          />
        </Container>
      </section>

      <section className="section-light py-20 lg:py-28">
        <Container>
          <div className="space-y-8">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`${prefix}/industries/${industry.slug}`}
                className="group block p-8 lg:p-10 bg-white border border-border-light hover:border-logistics-orange/30 transition-all duration-300 hover:shadow-lg"
              >
                <h2 className="text-xl lg:text-2xl font-bold text-carbon-dark group-hover:text-logistics-orange transition-colors">
                  {industry.name[loc]}
                </h2>
                <p className="mt-3 text-sm text-text-muted leading-relaxed max-w-3xl">
                  {industry.description[loc]}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-logistics-orange">
                  {dict.common.learnMore}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

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
