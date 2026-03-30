"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import TextReveal from "@/components/ui/TextReveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerReveal";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/type";
import { services } from "@/data/services";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ServicesOverviewProps {
  locale: Locale;
  dict: Dictionary;
}

const iconMap: Record<string, React.ReactNode> = {
  truck: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  globe: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  customs: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
    </svg>
  ),
  warehouse: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0 0 20.25 9.35m-16.5 0a3.004 3.004 0 0 1-.621-4.72l4.071-4.071A1.5 1.5 0 0 1 8.26 0h7.48a1.5 1.5 0 0 1 1.06.44l4.071 4.071a3 3 0 0 1-.621 4.72" />
    </svg>
  ),
  crane: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
    </svg>
  ),
  ship: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
  ),
};

// Per-card animation configs (each unique)
const cardAnimations = [
  { from: { scale: 0.75, opacity: 0 }, to: { scale: 1, opacity: 1 } },
  { from: { y: 80, rotation: 5, opacity: 0 }, to: { y: 0, rotation: 0, opacity: 1 } },
  { from: { xPercent: 40, opacity: 0 }, to: { xPercent: 0, opacity: 1 } },
  { from: { y: -60, rotation: -3, opacity: 0 }, to: { y: 0, rotation: 0, opacity: 1 } },
  { from: { scale: 0.85, y: 50, opacity: 0 }, to: { scale: 1, y: 0, opacity: 1 } },
  { from: { xPercent: -30, skewX: 6, opacity: 0 }, to: { xPercent: 0, skewX: 0, opacity: 1 } },
];

export default function ServicesOverview({ locale, dict }: ServicesOverviewProps) {
  const prefix = `/${locale}`;
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const cards = gsap.utils.toArray<HTMLElement>(".service-card", track);

      // Reveal track after GSAP sets initial states
      gsap.set(track, { visibility: "visible" });

      // Main horizontal scroll with pin
      const scrollTween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 60),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.8,
          end: () => "+=" + (track.scrollWidth - window.innerWidth + 200),
          invalidateOnRefresh: true,
        },
      });

      // Per-card unique animations triggered by horizontal position
      cards.forEach((card, i) => {
        const anim = cardAnimations[i % cardAnimations.length];
        gsap.fromTo(card, anim.from, {
          ...anim.to,
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: "left 90%",
            end: "left 55%",
            scrub: true,
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  const renderCard = (service: (typeof services)[number]) => (
    <Link
      href={`${prefix}/services/${service.slug}`}
      className="group block p-8 bg-white border border-border-light hover:border-logistics-orange/30 transition-all duration-300 h-full hover-lift"
    >
      <div className="w-12 h-12 bg-logistics-orange/10 text-logistics-orange flex items-center justify-center mb-5 group-hover:bg-logistics-orange group-hover:text-white transition-colors duration-300">
        {iconMap[service.icon]}
      </div>
      <h3 className="text-lg font-bold text-carbon-dark mb-3 group-hover:text-logistics-orange transition-colors">
        {service.name[locale]}
      </h3>
      <p className="text-sm text-text-muted leading-relaxed">
        {service.shortDescription[locale]}
      </p>
      <div className="mt-5 flex items-center gap-2 text-sm font-bold text-logistics-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {dict.common.learnMore}
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );

  return (
    <section className="section-light relative overflow-hidden">
      {/* Chapter marker */}
      <div className="absolute top-8 left-6 lg:left-16 text-[10rem] lg:text-[16rem] font-black text-carbon-dark/[0.02] leading-none select-none pointer-events-none">
        03
      </div>

      {/* Dot grid ornament */}
      <div className="absolute top-0 right-0 w-32 h-32 ornament-dots" />

      <div ref={sectionRef} className="py-20 lg:py-28">
        <Container>
          <AnimateOnScroll>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-logistics-orange animate-line-grow" />
              <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
                {dict.nav.services}
              </span>
            </div>
          </AnimateOnScroll>

          <TextReveal
            as="h2"
            variant="clip"
            className="text-3xl md:text-4xl lg:text-5xl font-black text-carbon-dark tracking-tight leading-[1.1]"
          >
            {dict.servicesOverview.heading}
          </TextReveal>

          <AnimateOnScroll delay={0.15}>
            <p className="mt-4 text-base md:text-lg text-text-muted leading-relaxed max-w-2xl">
              {dict.servicesOverview.subHeading}
            </p>
          </AnimateOnScroll>
        </Container>

        {/* Mobile: stagger grid */}
        <Container className="lg:hidden">
          <StaggerContainer className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.08}>
            {services.map((service) => (
              <StaggerItem key={service.slug}>
                {renderCard(service)}
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateOnScroll delay={0.3}>
            <div className="mt-12 text-center">
              <Link
                href={`${prefix}/services`}
                className="inline-flex items-center gap-3 border border-carbon-dark text-carbon-dark px-8 py-4 font-bold text-sm uppercase tracking-wider hover:bg-carbon-dark hover:text-white transition-colors"
              >
                {dict.servicesOverview.cta}
              </Link>
            </div>
          </AnimateOnScroll>
        </Container>

        {/* Desktop: horizontal scroll track */}
        <div
          ref={trackRef}
          className="hidden lg:flex gap-8 mt-14 invisible"
          style={{ paddingLeft: "max(2rem, calc((100vw - 80rem) / 2 + 2rem))", paddingRight: "4rem" }}
        >
          {services.map((service) => (
            <div key={service.slug} className="service-card w-[380px] flex-shrink-0">
              {renderCard(service)}
            </div>
          ))}

          {/* CTA as final element in scroll */}
          <div className="service-card flex items-center justify-center w-[300px] flex-shrink-0">
            <Link
              href={`${prefix}/services`}
              className="inline-flex items-center gap-3 border border-carbon-dark text-carbon-dark px-8 py-4 font-bold text-sm uppercase tracking-wider hover:bg-carbon-dark hover:text-white transition-colors whitespace-nowrap"
            >
              {dict.servicesOverview.cta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
