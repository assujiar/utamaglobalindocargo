import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/contact/ContactForm";
import JsonLd from "@/components/seo/JsonLd";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.contact.heading,
    description: dict.contact.subHeading,
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "Organization",
      name: "UGC Logistics (Utama Globalindo Cargo)",
      email: "info@utamaglobalindocargo.com",
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

      <section className="section-dark pt-32 pb-8 lg:pt-40 lg:pb-12">
        <Container>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-logistics-orange" />
            <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
              {dict.nav.contact}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
            {dict.contact.heading}
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/50 leading-relaxed max-w-2xl">
            {dict.contact.subHeading}
          </p>
        </Container>
      </section>

      <section className="section-dark pb-20 lg:pb-28">
        <Container>
          <ContactForm dict={dict} />
        </Container>
      </section>
    </>
  );
}
