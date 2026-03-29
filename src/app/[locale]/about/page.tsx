import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import Container from "@/components/ui/Container";
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
    alternates: { canonical: `/${locale}/about` },
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

      {/* Mission */}
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

      {/* Values */}
      <section className="section-light py-20 lg:py-28">
        <Container>
          <h2 className="text-2xl md:text-3xl font-black text-carbon-dark tracking-tight mb-12">
            {dict.about.valuesHeading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dict.about.values.map((value, i) => (
              <div key={i} className="p-8 bg-white border border-border-light">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-carbon-dark text-white flex items-center justify-center font-bold text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-lg font-bold text-carbon-dark">
                    {value.title}
                  </h3>
                </div>
                <p className="text-sm text-text-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team placeholder */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-carbon-dark tracking-tight mb-6">
                {locale === "id" ? "Tim Kami" : "Our Team"}
              </h2>
              <p className="text-base text-text-muted leading-relaxed">
                {locale === "id"
                  ? "Tim operasional UGC Logistics terdiri dari profesional logistik dengan pengalaman di freight forwarding, customs brokerage, dan warehouse management. Setiap klien mendapat dedicated coordinator yang memahami kebutuhan spesifik industri mereka."
                  : "The UGC Logistics operations team consists of logistics professionals experienced in freight forwarding, customs brokerage, and warehouse management. Each client gets a dedicated coordinator who understands the specific needs of their industry."}
              </p>
            </div>
            <div className="bg-surface-light aspect-[4/3] flex items-center justify-center">
              {/* [PLACEHOLDER: Replace with actual team photo when available] */}
              <p className="text-sm text-text-light text-center px-8">
                {locale === "id"
                  ? "[Foto tim akan ditambahkan setelah sesi pemotretan]"
                  : "[Team photo to be added after photo session]"}
              </p>
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
