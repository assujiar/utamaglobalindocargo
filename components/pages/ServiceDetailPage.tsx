"use client";

import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggeredReveal } from "@/components/motion/StaggeredReveal";
import { CounterAnimation } from "@/components/motion/CounterAnimation";
import { ProcessFlow } from "@/components/sections/ProcessFlow";
import { FAQSection } from "@/components/sections/FAQSection";
import { ClientStoryCard } from "@/components/sections/ClientStoryCard";
import { RecirculationModule } from "@/components/sections/RecirculationModule";
import { CTABand } from "@/components/sections/CTABand";
import type { Locale } from "@/lib/i18n/config";
import type { ServiceData, ServiceDetail } from "@/lib/content/services";

interface ServiceDetailPageProps {
  locale: Locale;
  service: ServiceData;
  detail: ServiceDetail;
}

function ServiceDetailPage({ locale, service, detail }: ServiceDetailPageProps) {
  const isId = locale === "id";

  // Localized values
  const serviceName = isId ? service.name_id : service.name_en;
  const serviceTagline = isId ? service.tagline_id : service.tagline_en;
  const overview = isId ? detail.overview_id : detail.overview_en;
  const servicesPath = isId ? "layanan" : "services";
  const servicesLabel = isId ? "Layanan" : "Services";
  const homeLabel = isId ? "Beranda" : "Home";
  const quoteHref = `/${locale}/${isId ? "minta-penawaran" : "request-quote"}?service=${service.key}`;

  // Breadcrumb
  const breadcrumbItems = [
    { label: homeLabel, href: `/${locale}` },
    { label: servicesLabel, href: `/${locale}/${servicesPath}` },
    { label: serviceName },
  ];

  // Process steps (localized)
  const processSteps = detail.process.map((step) => ({
    number: step.number,
    title: isId ? step.title_id : step.title_en,
    description: isId ? step.description_id : step.description_en,
  }));

  // FAQ items (localized)
  const faqItems = detail.faq.map((item) => ({
    question: isId ? item.question_id : item.question_en,
    answer: isId ? item.answer_id : item.answer_en,
  }));

  // Capability cards (localized)
  const capabilities = detail.capabilities.map((cap) => ({
    title: isId ? cap.title_id : cap.title_en,
    description: isId ? cap.description_id : cap.description_en,
    metric: isId ? cap.metric_id : cap.metric_en,
  }));

  return (
    <>
      {/* ── 1. Hero ── */}
      <section className="pt-8 pb-20 sm:pt-12 sm:pb-28 bg-[--color-bg-dark] relative overflow-hidden">
        {/* Ambient glow orbs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[--color-primary] opacity-[0.04] blur-[180px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[--color-accent-warm] opacity-[0.03] blur-[140px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <Breadcrumb items={breadcrumbItems} />
          <ScrollReveal>
            <div className="mt-8 max-w-3xl">
              <span className="label-text text-[--color-primary] mb-4 block">
                {service.number}
              </span>
              <h1 className="font-serif text-heading-xl sm:text-display-sm font-bold text-[--color-text-primary] mb-5 tracking-[-0.02em]">
                {serviceName}
              </h1>
              <p className="text-lg sm:text-xl text-[--color-text-secondary] leading-relaxed max-w-2xl">
                {serviceTagline}
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom glow divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,70,0,0.12)] to-transparent" aria-hidden="true" />
      </section>

      {/* ── 2. Service Overview ── */}
      <section className="py-20 sm:py-28 bg-[--color-bg-dark]">
        <div className="mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <ScrollReveal className="md:col-span-7">
              <div
                className="prose prose-lg prose-invert max-w-none text-[--color-text-secondary] leading-relaxed [&_p]:mb-5 [&_a]:text-[--color-primary] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[--color-accent-warm]"
                dangerouslySetInnerHTML={{ __html: overview }}
              />
            </ScrollReveal>
            <div className="md:col-span-5 md:pl-8">
              <ScrollReveal delay={100}>
                <div className="glass-dark p-6">
                  <h3 className="label-text text-[--color-primary] mb-5">
                    {isId ? "Ringkasan Layanan" : "Service Summary"}
                  </h3>
                  <ul className="space-y-3.5">
                    {capabilities.slice(0, 4).map((cap, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-2 size-1.5 rounded-full bg-[--color-primary] shrink-0" />
                        <span className="text-sm text-[--color-text-secondary]">
                          {cap.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Capability Breakdown ── */}
      <section className="py-20 sm:py-28 bg-[--color-bg-dark-elevated] relative">
        {/* Top glow divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,70,0,0.10)] to-transparent" aria-hidden="true" />

        <div className="mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <ScrollReveal>
            <p className="label-text text-[--color-primary] text-center mb-4">
              {isId ? "Kapabilitas" : "Capabilities"}
            </p>
            <h2 className="text-heading-md sm:text-heading-lg font-bold text-[--color-text-primary] text-center mb-12 sm:mb-16 tracking-[-0.02em]">
              {isId ? "Apa yang Kami Tawarkan" : "What We Offer"}
            </h2>
          </ScrollReveal>
          <StaggeredReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="glass-dark p-5 sm:p-6 transition-all duration-300 hover:border-[rgba(255,70,0,0.20)] hover:shadow-[0_0_30px_rgba(255,70,0,0.06)]"
              >
                <h3 className="text-base font-semibold text-[--color-text-primary] mb-2">
                  {cap.title}
                </h3>
                <p className="text-sm text-[--color-text-secondary] leading-relaxed mb-3">
                  {cap.description}
                </p>
                {cap.metric && (
                  <span className="inline-block text-xs font-medium text-[--color-primary] bg-[rgba(255,70,0,0.08)] px-2.5 py-1 rounded-full">
                    {cap.metric}
                  </span>
                )}
              </div>
            ))}
          </StaggeredReveal>
        </div>
      </section>

      {/* ── 4. How It Works (ProcessFlow) ── */}
      <ProcessFlow
        heading={isId ? "Bagaimana Prosesnya" : "How It Works"}
        steps={processSteps}
      />

      {/* ── 5. Proof (Stats + Client Story) ── */}
      <section className="py-24 sm:py-32 bg-[--color-bg-dark] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[--color-primary] opacity-[0.03] blur-[160px]" />
        </div>

        {/* Top glow divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,70,0,0.12)] to-transparent" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          {/* Stats */}
          <ScrollReveal>
            <p className="label-text text-[--color-primary] text-center mb-4">
              {isId ? "Data & Bukti" : "Data & Proof"}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-6 mb-16">
              {detail.stats.map((stat) => (
                <div key={stat.label_en} className="text-center">
                  <div className="stat-number text-4xl sm:text-5xl md:text-[56px] text-[--color-text-inverse]">
                    <CounterAnimation
                      target={stat.value}
                      suffix={stat.suffix}
                    />
                  </div>
                  <p className="mt-3 label-text text-[--color-text-secondary]">
                    {isId ? stat.label_id : stat.label_en}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Client Story */}
          <div className="max-w-2xl mx-auto">
            <ClientStoryCard
              story={detail.clientStory}
              locale={locale}
            />
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ── */}
      <FAQSection
        heading={isId ? "Pertanyaan Umum" : "Frequently Asked Questions"}
        items={faqItems}
      />

      {/* ── 7. Recirculation ── */}
      <RecirculationModule
        locale={locale}
        relatedServiceKeys={detail.relatedServices}
        quoteHref={quoteHref}
        quoteLabel={
          isId
            ? `Minta Penawaran untuk ${serviceName}`
            : `Request a Quote for ${serviceName}`
        }
        relatedHeading={isId ? "Layanan Terkait" : "Related Services"}
        insightPlaceholder={
          isId
            ? "Artikel terkait akan tersedia segera."
            : "Related articles coming soon."
        }
      />

      {/* ── 8. CTA Band ── */}
      <CTABand
        locale={locale}
        heading={isId ? "Siap Mengirim?" : "Ready to Ship?"}
        ctaLabel={
          isId
            ? `Minta Penawaran untuk ${serviceName}`
            : `Request a Quote for ${serviceName}`
        }
        ctaHref={quoteHref}
        trustLine={
          isId
            ? "Kami merespons dalam 2 jam kerja."
            : "We respond within 2 business hours."
        }
      />
    </>
  );
}

export { ServiceDetailPage, type ServiceDetailPageProps };
