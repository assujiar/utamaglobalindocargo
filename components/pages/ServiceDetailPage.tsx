"use client";

import { useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Truck, Globe, FileCheck, Plane, Warehouse, Container, Layers, Award } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CounterAnimation } from "@/components/motion/CounterAnimation";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { GSAPProvider } from "@/components/motion/GSAPProvider";
import { ProcessFlow } from "@/components/sections/ProcessFlow";
import { FAQSection } from "@/components/sections/FAQSection";
import { ClientStoryCard } from "@/components/sections/ClientStoryCard";
import { RecirculationModule } from "@/components/sections/RecirculationModule";
import { CTABand } from "@/components/sections/CTABand";
import type { Locale } from "@/lib/i18n/config";
import type { ServiceData, ServiceDetail } from "@/lib/content/services";

const serviceIconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  Truck, Globe, FileCheck, Plane, Warehouse, Container,
};

interface ServiceDetailPageProps {
  locale: Locale;
  service: ServiceData;
  detail: ServiceDetail;
}

function ServiceDetailPage({ locale, service, detail }: ServiceDetailPageProps) {
  const isId = locale === "id";
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const ServiceIcon = serviceIconMap[service.icon];

  // Hero parallax: content fades + scales on scroll
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroContentY = useTransform(heroScroll, [0, 0.5], [0, -60]);
  const heroContentOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);
  const heroBgY = useTransform(heroScroll, [0, 1], [0, 100]);

  // Localized values
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

  // 3D tilt for capability cards
  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    el.style.transform = `perspective(800px) rotateX(${(y - 0.5) * -8}deg) rotateY(${(x - 0.5) * 8}deg) scale3d(1.02, 1.02, 1.02)`;
    el.style.setProperty("--mouse-x", `${x * 100}%`);
    el.style.setProperty("--mouse-y", `${y * 100}%`);
  }, [prefersReduced]);

  const handleCardMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  return (
    <GSAPProvider>
      {/* ── 1. Hero ── */}
      <section ref={heroRef} className="pt-8 pb-24 sm:pt-12 sm:pb-32 bg-[--color-bg-dark] relative overflow-hidden min-h-[50vh] flex flex-col justify-end">
        {/* Giant watermark service icon */}
        {ServiceIcon && (
          <div className="absolute top-[10%] right-[-5%] pointer-events-none" aria-hidden="true">
            <ServiceIcon className="size-[250px] sm:size-[400px] md:size-[500px] text-[--color-primary] opacity-[0.03]" strokeWidth={0.4} />
          </div>
        )}

        {/* Gradient mesh with parallax */}
        {!prefersReduced ? (
          <motion.div className="absolute inset-0 pointer-events-none" style={{ y: heroBgY }} aria-hidden="true">
            <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full bg-[--color-primary] opacity-[0.15] blur-[160px]" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[--color-accent-warm] opacity-[0.08] blur-[140px]" />
          </motion.div>
        ) : (
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full bg-[--color-primary] opacity-[0.10] blur-[160px]" />
          </div>
        )}

        {/* Grain */}
        <div className="absolute inset-0 grain-overlay pointer-events-none" aria-hidden="true" />

        <motion.div
          className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10 w-full"
          style={prefersReduced ? undefined : { y: heroContentY, opacity: heroContentOpacity }}
        >
          <Breadcrumb items={breadcrumbItems} />
          <motion.div
            className="mt-8 max-w-3xl"
            initial={prefersReduced ? undefined : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-text text-[--color-primary] mb-4 block">
              {service.number}
            </span>
            <h1 className="font-display text-heading-xl sm:text-display-sm font-bold gradient-text-vivid mb-5 tracking-[-0.03em]">
              {serviceName}
            </h1>
            <p className="text-lg sm:text-xl text-[--color-text-secondary] leading-relaxed max-w-2xl">
              {serviceTagline}
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom glow divider */}
        <div className="absolute bottom-0 left-0 right-0 glow-divider-full" aria-hidden="true" />
      </section>

      {/* ── 2. Service Overview ── */}
      <section className="py-24 sm:py-32 bg-[--color-bg-dark] relative">
        <div className="absolute inset-0 dot-grid-subtle pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <ScrollReveal className="md:col-span-7">
              <div
                className="prose prose-lg prose-invert max-w-none text-[--color-text-secondary] leading-relaxed [&_p]:mb-5 [&_a]:text-[--color-primary] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[--color-accent-warm]"
                dangerouslySetInnerHTML={{ __html: overview }}
              />
            </ScrollReveal>
            <div className="md:col-span-5 md:pl-8">
              <ScrollReveal delay={100}>
                <div className="glass-tinted p-6">
                  <h3 className="label-text text-[--color-primary] mb-5">
                    {isId ? "Ringkasan Layanan" : "Service Summary"}
                  </h3>
                  <ul className="space-y-3.5">
                    {capabilities.slice(0, 4).map((cap, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-2 size-1.5 rounded-full bg-[--color-primary] shrink-0 shadow-[0_0_8px_rgba(255,70,0,0.4)]" />
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
      <section className="py-28 sm:py-36 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #111113 0%, #09090B 100%)" }}
      >
        {/* Watermark */}
        <div className="absolute bottom-[5%] left-[-3%] pointer-events-none" aria-hidden="true">
          <Layers className="size-[220px] sm:size-[350px] text-[--color-primary] opacity-[0.02] rotate-12" strokeWidth={0.5} />
        </div>

        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[--color-primary] opacity-[0.05] blur-[180px]" />
        </div>
        <div className="absolute top-0 left-0 right-0 glow-divider-full" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <p className="label-text text-[--color-primary] text-center mb-4">
            {isId ? "Kapabilitas" : "Capabilities"}
          </p>
          <SplitTextReveal
            as="h2"
            type="words"
            stagger={0.06}
            className="text-heading-md sm:text-heading-lg font-bold gradient-text text-center mb-14 sm:mb-20 tracking-[-0.02em]"
          >
            {isId ? "Cakupan Layanan" : "Service Scope"}
          </SplitTextReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                className="glass-dark card-shine p-5 sm:p-6 [transition:transform_200ms_ease-out,border-color_300ms,box-shadow_300ms,background_300ms] hover:border-[rgba(255,70,0,0.30)] hover:shadow-[0_0_50px_rgba(255,70,0,0.12)] hover:bg-[rgba(255,255,255,0.07)]"
                initial={prefersReduced ? undefined : { opacity: 0, y: 50, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <h3 className="relative z-10 text-base font-semibold text-[--color-text-primary] mb-2">
                  {cap.title}
                </h3>
                <p className="relative z-10 text-sm text-[--color-text-secondary] leading-relaxed mb-3">
                  {cap.description}
                </p>
                {cap.metric && (
                  <span className="relative z-10 inline-block text-xs font-medium text-[--color-primary] bg-[rgba(255,70,0,0.10)] px-2.5 py-1 rounded-full shadow-[0_0_12px_rgba(255,70,0,0.10)]">
                    {cap.metric}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. How It Works (ProcessFlow) ── */}
      <ProcessFlow
        heading={isId ? "Alur Kerja Kami" : "How We Work"}
        steps={processSteps}
      />

      {/* ── 5. Proof (Stats + Client Story) ── */}
      <section className="py-28 sm:py-36 bg-[--color-bg-dark] relative overflow-hidden">
        {/* Watermark */}
        <div className="absolute top-[10%] right-[-2%] pointer-events-none" aria-hidden="true">
          <Award className="size-[200px] sm:size-[320px] text-[--color-accent-warm] opacity-[0.02] -rotate-12" strokeWidth={0.5} />
        </div>
        <div className="absolute inset-0 radial-burst pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 grain-overlay pointer-events-none" aria-hidden="true" />
        <div className="absolute top-0 left-0 right-0 glow-divider-full" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          {/* Stats */}
          <ScrollReveal>
            <p className="label-text text-[--color-primary] text-center mb-6">
              {isId ? "Rekam Jejak" : "Track Record"}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-8 mb-20">
            {detail.stats.map((stat, i) => (
              <motion.div
                key={stat.label_en}
                className="relative text-center"
                initial={prefersReduced ? undefined : { opacity: 0, scale: 0.5, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: i * 0.12 }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-[--color-primary] opacity-[0.10] blur-[50px] pointer-events-none" aria-hidden="true" />
                <div className="relative stat-number text-5xl sm:text-6xl md:text-[72px] gradient-text-vivid">
                  <CounterAnimation target={stat.value} suffix={stat.suffix} />
                </div>
                <motion.div
                  className="mx-auto mt-3 mb-3 h-0.5 bg-gradient-to-r from-transparent via-[--color-primary] to-transparent"
                  initial={prefersReduced ? { width: 40 } : { width: 0 }}
                  whileInView={{ width: 40 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 + i * 0.1 }}
                />
                <p className="relative label-text text-[--color-text-secondary]">
                  {isId ? stat.label_id : stat.label_en}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Client Story */}
          <div className="max-w-2xl mx-auto">
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
