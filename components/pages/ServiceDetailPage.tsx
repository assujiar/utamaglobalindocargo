"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CounterAnimation } from "@/components/motion/CounterAnimation";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { GSAPProvider } from "@/components/motion/GSAPProvider";
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
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroContentY = useTransform(heroScroll, [0, 0.5], [0, -50]);
  const heroContentOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);

  const serviceName = isId ? service.name_id : service.name_en;
  const serviceTagline = isId ? service.tagline_id : service.tagline_en;
  const overview = isId ? detail.overview_id : detail.overview_en;
  const servicesPath = isId ? "layanan" : "services";
  const servicesLabel = isId ? "Layanan" : "Services";
  const homeLabel = isId ? "Beranda" : "Home";
  const quoteHref = `/${locale}/${isId ? "minta-penawaran" : "request-quote"}?service=${service.key}`;

  const breadcrumbItems = [
    { label: homeLabel, href: `/${locale}` },
    { label: servicesLabel, href: `/${locale}/${servicesPath}` },
    { label: serviceName },
  ];

  const processSteps = detail.process.map((step) => ({
    number: step.number,
    title: isId ? step.title_id : step.title_en,
    description: isId ? step.description_id : step.description_en,
  }));

  const faqItems = detail.faq.map((item) => ({
    question: isId ? item.question_id : item.question_en,
    answer: isId ? item.answer_id : item.answer_en,
  }));

  const capabilities = detail.capabilities.map((cap) => ({
    title: isId ? cap.title_id : cap.title_en,
    description: isId ? cap.description_id : cap.description_en,
    metric: isId ? cap.metric_id : cap.metric_en,
  }));

  return (
    <GSAPProvider>
      {/* ── 1. Hero ── */}
      <section
        ref={heroRef}
        className="relative flex min-h-[50vh] flex-col justify-end pb-20 sm:pb-28 section-dark overflow-hidden"
      >
        {/* Ambient blur circles */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="blur-circle absolute w-[50vw] h-[50vw] top-[-15%] right-[-10%] opacity-[0.08]" />
          <div className="blur-circle-warm absolute w-[30vw] h-[30vw] bottom-[-5%] left-[-5%] opacity-[0.04]" />
        </div>
        <div className="absolute inset-0 grain-overlay pointer-events-none" aria-hidden="true" />

        <motion.div
          className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10 w-full"
          style={prefersReduced ? undefined : { y: heroContentY, opacity: heroContentOpacity }}
        >
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-8 max-w-3xl">
            <motion.span
              className="label-text text-[--color-primary] mb-4 block"
              initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {service.number}
            </motion.span>
            <SplitTextReveal
              as="h1"
              type="words"
              stagger={0.05}
              className="text-display-sm sm:text-display-md font-bold text-[--color-text-primary] mb-5 tracking-[-0.03em]"
            >
              {serviceName}
            </SplitTextReveal>
            <motion.p
              className="text-lg sm:text-xl text-[--color-text-secondary] leading-relaxed max-w-2xl"
              initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              {serviceTagline}
            </motion.p>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 glow-divider-full" aria-hidden="true" />
      </section>

      {/* ── 2. Service Overview ── */}
      <section className="py-24 sm:py-32 section-dark">
        <div className="mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            <ScrollReveal className="md:col-span-7">
              <div
                className="prose prose-lg prose-invert max-w-none text-[--color-text-secondary] leading-relaxed [&_p]:mb-5 [&_a]:text-[--color-primary] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[--color-accent-warm]"
                dangerouslySetInnerHTML={{ __html: overview }}
              />
            </ScrollReveal>
            <div className="md:col-span-5 md:pl-4">
              <ScrollReveal delay={100}>
                <div className="card-elevated !p-6">
                  <h3 className="label-text text-[--color-primary] mb-5">
                    {isId ? "Ringkasan Layanan" : "Service Summary"}
                  </h3>
                  <ul className="space-y-3.5">
                    {capabilities.slice(0, 4).map((cap, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-2 size-1.5 rounded-full bg-[--color-primary] shrink-0 shadow-[0_0_6px_rgba(255,70,0,0.4)]" />
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
      <section className="py-28 sm:py-36 section-elevated relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="blur-circle absolute w-[45vw] h-[45vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06]" />
        </div>
        <div className="absolute top-0 left-0 right-0 glow-divider-full" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <ScrollReveal>
            <p className="label-text text-[--color-primary] mb-4">
              {isId ? "Kapabilitas" : "Capabilities"}
            </p>
            <h2 className="text-heading-lg sm:text-heading-xl font-bold text-[--color-text-primary] mb-14 sm:mb-20 tracking-[-0.03em]">
              {isId ? "Cakupan Layanan" : "Service Scope"}
            </h2>
          </ScrollReveal>

          {/* Capability cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="card-elevated card-shine h-full">
                  <h3 className="relative z-10 text-base font-semibold text-[--color-text-primary] mb-2">
                    {cap.title}
                  </h3>
                  <p className="relative z-10 text-sm text-[--color-text-secondary] leading-relaxed mb-3">
                    {cap.description}
                  </p>
                  {cap.metric && (
                    <span className="relative z-10 inline-block text-xs font-medium text-[--color-primary] bg-[rgba(255,70,0,0.10)] px-2.5 py-1 rounded-full">
                      {cap.metric}
                    </span>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. How It Works ── */}
      <ProcessFlow
        heading={isId ? "Alur Kerja Kami" : "How We Work"}
        steps={processSteps}
      />

      {/* ── 5. Proof (Stats + Client Story) ── */}
      <section className="py-28 sm:py-36 section-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="blur-circle absolute w-[40vw] h-[40vw] top-[10%] right-[-10%] opacity-[0.06]" />
        </div>
        <div className="absolute top-0 left-0 right-0 glow-divider-full" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <ScrollReveal>
            <p className="label-text text-[--color-primary] mb-6">
              {isId ? "Rekam Jejak" : "Track Record"}
            </p>
          </ScrollReveal>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 mb-20">
            {detail.stats.map((stat, i) => (
              <ScrollReveal key={stat.label_en} delay={i * 80}>
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-28 h-28 rounded-full bg-[--color-primary] opacity-[0.06] blur-[50px] pointer-events-none" aria-hidden="true" />
                  <div className="relative stat-number text-5xl sm:text-6xl md:text-[72px] gradient-text-vivid">
                    <CounterAnimation target={stat.value} suffix={stat.suffix} />
                  </div>
                  <motion.div
                    className="mt-4 mb-3 h-px w-10 bg-gradient-to-r from-[--color-primary] to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.1 }}
                    style={{ transformOrigin: "left" }}
                  />
                  <p className="label-text text-[--color-text-secondary]">
                    {isId ? stat.label_id : stat.label_en}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Client Story */}
          <div className="max-w-2xl">
            <ClientStoryCard story={detail.clientStory} locale={locale} />
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ── */}
      <FAQSection
        heading={isId ? "Pertanyaan yang Sering Diajukan" : "Frequently Asked Questions"}
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
        heading={isId ? "Diskusikan Kebutuhan Anda" : "Discuss Your Requirements"}
        ctaLabel={
          isId
            ? `Minta Penawaran untuk ${serviceName}`
            : `Request a Quote for ${serviceName}`
        }
        ctaHref={quoteHref}
        trustLine={
          isId
            ? "Tim kami merespons dalam 2 jam kerja."
            : "Our team responds within 2 business hours."
        }
      />
    </GSAPProvider>
  );
}

export { ServiceDetailPage, type ServiceDetailPageProps };
