"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CounterAnimation } from "@/components/motion/CounterAnimation";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { TextRevealByLine } from "@/components/motion/TextRevealByLine";
import { ParallaxDepth } from "@/components/motion/ParallaxDepth";
import { ScrollDrivenText } from "@/components/motion/ScrollDrivenText";
import { FloatingOrb } from "@/components/motion/FloatingOrb";
import { ScrollCharReveal } from "@/components/motion/ScrollCharReveal";
import { ScrollPattern } from "@/components/motion/ScrollPattern";
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
        <div className="absolute inset-0 grain-overlay pointer-events-none" aria-hidden="true" />

        {/* Scroll-driven oversized text */}
        <ScrollDrivenText
          text={serviceName.toUpperCase()}
          className="absolute top-[40%] -translate-y-1/2 z-[1]"
          speed={0.35}
          direction="left"
        />

        {/* Floating orb */}
        <FloatingOrb
          className="absolute bottom-[10%] right-[-8%] z-[1]"
          size={400}
          color="rgba(255, 70, 0, 0.1)"
          speed={0.25}
          scale={{ from: 0.7, to: 1.1 }}
          opacity={{ from: 0.3, to: 0.7 }}
        />

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
              stagger={0.06}
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

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[--color-primary] via-[rgba(255,70,0,0.1)] to-transparent opacity-30" aria-hidden="true" />
      </section>

      {/* ── 2. Service Overview (light contrast break) ── */}
      <section className="py-24 sm:py-36 bg-[#FAF7F2]" style={{ color: 'var(--color-text-primary-light)' }}>
        <div className="mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <ScrollReveal className="md:col-span-8">
              <div
                className="prose prose-lg max-w-none leading-relaxed [&_p]:mb-5 [&_a]:text-[--color-primary] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[--color-primary-dark]"
                dangerouslySetInnerHTML={{ __html: overview }}
              />
            </ScrollReveal>
            <div className="md:col-span-3 md:col-start-10">
              <ScrollReveal delay={100}>
                <div className="border-l-2 border-[--color-primary] pl-6">
                  <h3 className="label-text text-[--color-primary-dark] mb-5">
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

      {/* ── 3. Capability Breakdown (dark elevated) ── */}
      <section className="py-28 sm:py-40 section-elevated relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-[rgba(255,255,255,0.06)]" aria-hidden="true" />
        <ScrollPattern variant="dots" count={10} speed={0.07} />

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <div className="mb-14 sm:mb-20">
            <ScrollCharReveal
              as="h2"
              className="text-heading-xl sm:text-display-sm font-bold text-[--color-text-primary] tracking-[-0.03em]"
              colorFrom="rgba(245,245,245,0.15)"
              colorTo="rgba(245,245,245,1)"
              yOffset={25}
            >
              {isId ? "Cakupan Layanan" : "Service Scope"}
            </ScrollCharReveal>
          </div>

          {/* Capabilities — rows with border separators */}
          <div>
            {capabilities.map((cap, i) => (
              <ParallaxDepth key={i} speed={0.02 + i * 0.01} direction="up" scrubSmooth={0.5}>
              <motion.div
                className="grid grid-cols-12 gap-4 sm:gap-8 items-baseline py-6 sm:py-8 border-b border-[rgba(255,255,255,0.06)] first:border-t"
                initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: i * 0.06 }}
              >
                <div className="col-span-12 sm:col-span-4">
                  <h3 className="text-base sm:text-lg font-semibold text-[--color-text-primary]">
                    {cap.title}
                  </h3>
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <p className="text-sm text-[--color-text-secondary] leading-relaxed">
                    {cap.description}
                  </p>
                </div>
                <div className="col-span-12 sm:col-span-2 sm:text-right">
                  {cap.metric && (
                    <span className="inline-block text-xs font-medium text-[--color-primary] bg-[rgba(255,70,0,0.10)] px-2.5 py-1 rounded-full">
                      {cap.metric}
                    </span>
                  )}
                </div>
              </motion.div>
              </ParallaxDepth>
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
      <section
        className="py-28 sm:py-40 bg-[#0C0604] relative overflow-hidden"
        style={{ backgroundImage: 'radial-gradient(ellipse at 30% 60%, rgba(255,70,0,0.05) 0%, transparent 60%)' }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,70,0,0.08)] to-transparent" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          {/* Stats — massive numbers horizontal */}
          <div className="flex flex-wrap gap-x-16 gap-y-12 mb-24">
            {detail.stats.map((stat, i) => (
              <ParallaxDepth key={stat.label_en} speed={0.04 + i * 0.02} direction="up" scrubSmooth={0.4}>
              <motion.div
                className="relative"
                initial={prefersReduced ? undefined : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              >
                <div className="stat-number gradient-text-vivid leading-none" style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}>
                  <CounterAnimation target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-3 text-xs text-[--color-text-muted] tracking-wide uppercase">
                  {isId ? stat.label_id : stat.label_en}
                </p>
              </motion.div>
              </ParallaxDepth>
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
        variant="immersive"
      />
    </GSAPProvider>
  );
}

export { ServiceDetailPage, type ServiceDetailPageProps };
