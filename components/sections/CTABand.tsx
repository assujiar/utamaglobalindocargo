"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Locale } from "@/lib/i18n/config";

interface CTABandProps {
  locale: Locale;
  heading: string;
  ctaLabel: string;
  ctaHref: string;
  trustLine: string;
  className?: string;
}

function CTABand({
  heading,
  ctaLabel,
  ctaHref,
  trustLine,
  className,
}: CTABandProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !orbRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const tween = gsap.fromTo(
      orbRef.current,
      { y: 60 },
      {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      },
    );

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "py-28 sm:py-36 text-center relative overflow-hidden",
        className,
      )}
      style={{
        background: "linear-gradient(135deg, #09090B 0%, #1a0a00 30%, #09090B 60%, #0d0502 100%)",
      }}
    >
      {/* Animated gradient orbs with GSAP parallax */}
      <div ref={orbRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-[--color-primary] opacity-[0.12] blur-[200px] animate-[glow-pulse-intense_4s_ease-in-out_infinite]" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[--color-accent-warm] opacity-[0.08] blur-[160px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[--color-accent-coral] opacity-[0.06] blur-[140px]" />
      </div>

      {/* Giant watermark icon */}
      <div className="absolute top-1/2 right-[5%] -translate-y-1/2 pointer-events-none" aria-hidden="true">
        <Send className="size-[200px] sm:size-[320px] text-[--color-primary] opacity-[0.03] rotate-[-15deg]" strokeWidth={0.5} />
      </div>

      {/* Grain overlay */}
      <div className="absolute inset-0 grain-overlay pointer-events-none" aria-hidden="true" />

      {/* Top glow divider */}
      <div className="absolute top-0 left-0 right-0 glow-divider-full" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
        <SplitTextReveal
          as="h2"
          type="words"
          stagger={0.05}
          className="text-heading-lg sm:text-heading-xl font-bold gradient-text-vivid mb-6 tracking-[-0.03em]"
        >
          {heading}
        </SplitTextReveal>

        <ScrollReveal delay={200}>
          <p className="text-base sm:text-lg text-[--color-text-secondary] mb-12 max-w-xl mx-auto leading-relaxed">
            {trustLine}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <MagneticElement strength={0.25}>
            <Button href={ctaHref} size="lg">
              {ctaLabel}
            </Button>
          </MagneticElement>
        </ScrollReveal>
      </div>
    </section>
  );
}

export { CTABand, type CTABandProps };
