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
      <section className="pt-8 pb-16 sm:pt-12 sm:pb-20 bg-[--color-bg-light]">
        <div className="mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <Breadcrumb items={breadcrumbItems} />
          <ScrollReveal>
            <div className="mt-6 max-w-3xl">
              <span className="inline-block font-mono text-sm font-medium text-[--color-primary] mb-3">
                {service.number}
              </span>
              <h1 className="font-serif text-heading-xl sm:text-display-sm font-bold text-[--color-text-primary] mb-4">
                {serviceName}
              </h1>
              <p className="text-lg sm:text-xl text-[--color-text-secondary] leading-relaxed">
                {serviceTagline}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 2. Service Overview ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <ScrollReveal className="md:col-span-7">
              <div
                className="prose prose-lg max-w-none text-[--color-text-secondary] leading-relaxed [&_p]:mb-5 [&_a]:text-[--color-primary] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[--color-primary-dark]"
                dangerouslySetInnerHTML={{ __html: overview }}
              />
            </ScrollReveal>
            <div className="md:col-span-5 md:pl-8">
              <ScrollReveal delay={100}>
                <div className="border border-[--color-border] rounded-lg p-6 bg-[--color-bg-light]">
                  <h3 className="text-sm font-semibold text-[--color-text-primary] uppercase tracking-wider mb-4">
                    {isId ? "Ringkasan Layanan" : "Service Summary"}
                  </h3>
                  <ul className="space-y-3">
                    {capabilities.slice(0, 4).map((cap, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 rounded-full bg-[--color-primary] shrink-0" />
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
      <section className="py-16 sm:py-20 bg-[--color-bg-light]">
        <div className="mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <ScrollReveal>
            <h2 className="text-heading-md sm:text-heading-lg font-bold text-[--color-text-primary] text-center mb-10 sm:mb-14">
              {isId ? "Kapabilitas Kami" : "Our Capabilities"}
            </h2>
          </ScrollReveal>
          <StaggeredReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="border border-[--color-border] rounded-md p-5 sm:p-6 bg-white"
              >
                <h3 className="text-base font-semibold text-[--color-text-primary] mb-2">
                  {cap.title}
                </h3>
                <p className="text-sm text-[--color-text-secondary] leading-relaxed mb-3">
                  {cap.description}
                </p>
                {cap.metric && (
                  <span className="inline-block text-xs font-medium text-[--color-primary] bg-[--color-primary]/10 px-2.5 py-1 rounded-full">
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
      <section className="py-20 sm:py-24 bg-[--color-bg-dark]">
        <div className="mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          {/* Stats */}
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-6 mb-14">
              {detail.stats.map((stat) => (
                <div key={stat.label_en} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-[--color-text-inverse]">
                    <CounterAnimation
                      target={stat.value}
                      suffix={stat.suffix}
                      className="text-[--color-text-inverse]"
                    />
                  </div>
                  <p className="mt-2 text-sm text-[--color-text-secondary] leading-snug">
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
              className="bg-[--color-bg-dark] border-white/10 [&_blockquote]:text-[--color-text-inverse] [&_span.text-\\[--color-text-secondary\\]]:text-white/60"
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
