import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FaqAccordion from "@/components/faq/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.faq.heading,
    description: dict.faq.subHeading,
    alternates: { canonical: `/${locale}/faq` },
  };
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const prefix = `/${locale}`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />

      <section className="section-dark pt-32 pb-20 lg:pt-40 lg:pb-28">
        <Container>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-logistics-orange" />
            <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
              FAQ
            </span>
          </div>
          <SectionHeading
            title={dict.faq.heading}
            subtitle={dict.faq.subHeading}
            dark
          />
        </Container>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="max-w-3xl mx-auto">
            <FaqAccordion items={dict.faq.items} />
          </div>
        </Container>
      </section>

      <section className="section-dark py-20 lg:py-28">
        <Container className="text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            {dict.faq.ctaHeading}
          </h2>
          <Link
            href={`${prefix}/contact`}
            className="mt-8 inline-flex items-center gap-3 bg-logistics-orange text-white px-8 py-4 font-bold text-sm uppercase tracking-wider hover:bg-logistics-orange/90 transition-colors"
          >
            {dict.faq.ctaButton}
          </Link>
        </Container>
      </section>
    </>
  );
}
