"use client";

import { useRef, useEffect } from "react";
import Container from "@/components/ui/Container";
import TextReveal from "@/components/ui/TextReveal";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerReveal";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import type { Dictionary } from "@/i18n/dictionaries/type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HowItWorksProps {
  dict: Dictionary;
}

// Unique number animations per step
const numberAnimations = [
  { from: { y: 40, opacity: 0 }, to: { y: 0, opacity: 1 } },
  { from: { scale: 0, opacity: 0 }, to: { scale: 1, opacity: 1 } },
  { from: { rotation: 180, opacity: 0 }, to: { rotation: 0, opacity: 1 } },
  { from: { y: -40, opacity: 0 }, to: { y: 0, opacity: 1 } },
  { from: { scale: 1.8, opacity: 0 }, to: { scale: 1, opacity: 1 } },
];

// Unique text animations per step
const textAnimations = [
  { from: { y: 30, opacity: 0 }, to: { y: 0, opacity: 1 } },
  { from: { x: -30, opacity: 0 }, to: { x: 0, opacity: 1 } },
  { from: { y: 40, opacity: 0 }, to: { y: 0, opacity: 1 } },
  { from: { x: 30, opacity: 0 }, to: { x: 0, opacity: 1 } },
  { from: { y: -25, opacity: 0 }, to: { y: 0, opacity: 1 } },
];

export default function HowItWorks({ dict }: HowItWorksProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      const line = lineRef.current;
      if (!track || !section) return;

      gsap.set(track, { visibility: "visible" });

      const steps = gsap.utils.toArray<HTMLElement>(".process-step", track);
      const getScrollDist = () => track.scrollWidth - window.innerWidth + 60;
      const getEndDist = () => track.scrollWidth;

      // Main horizontal scroll
      const scrollTween = gsap.to(track, {
        x: () => -getScrollDist(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.6,
          end: () => "+=" + getEndDist(),
          invalidateOnRefresh: true,
        },
      });

      // Progress line grows with scroll
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              scrub: true,
              end: () => "+=" + getEndDist(),
            },
          }
        );
      }

      // Per-step unique animations
      steps.forEach((step, i) => {
        const number = step.querySelector(".step-number") as HTMLElement;
        const text = step.querySelector(".step-text") as HTMLElement;

        if (number) {
          const anim = numberAnimations[i % numberAnimations.length];
          gsap.fromTo(number, anim.from, {
            ...anim.to,
            scrollTrigger: {
              trigger: step,
              containerAnimation: scrollTween,
              start: "left 85%",
              end: "left 55%",
              scrub: true,
            },
          });
        }

        if (text) {
          const anim = textAnimations[i % textAnimations.length];
          gsap.fromTo(text, anim.from, {
            ...anim.to,
            scrollTrigger: {
              trigger: step,
              containerAnimation: scrollTween,
              start: "left 80%",
              end: "left 50%",
              scrub: true,
            },
          });
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="bg-white relative overflow-hidden">
      {/* Chapter marker */}
      <div className="absolute top-8 right-6 lg:right-16 text-[10rem] lg:text-[16rem] font-black text-carbon-dark/[0.02] leading-none select-none pointer-events-none">
        02
      </div>

      {/* Diagonal corner ornament */}
      <div className="absolute bottom-0 right-0 w-[160px] h-[160px] overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-logistics-orange/[0.04] to-transparent" />
      </div>

      <div ref={sectionRef} className="py-20 lg:py-28">
        <Container>
          <AnimateOnScroll>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-logistics-orange animate-line-grow" />
              <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
                {dict.services.process}
              </span>
            </div>
          </AnimateOnScroll>

          <TextReveal
            as="h2"
            variant="clip"
            className="text-3xl md:text-4xl lg:text-5xl font-black text-carbon-dark tracking-tight leading-[1.1]"
          >
            {dict.howItWorks.heading}
          </TextReveal>

          <AnimateOnScroll delay={0.15}>
            <p className="mt-4 text-base md:text-lg text-text-muted leading-relaxed max-w-2xl">
              {dict.howItWorks.subHeading}
            </p>
          </AnimateOnScroll>
        </Container>

        {/* Mobile: stagger grid */}
        <Container className="lg:hidden">
          <div className="mt-14 relative">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8" stagger={0.1}>
              {dict.howItWorks.steps.map((step, i) => (
                <StaggerItem key={i}>
                  <div className="relative group">
                    <div className="relative z-10 w-16 h-16 bg-carbon-dark text-white flex items-center justify-center font-black text-lg mb-5 group-hover:bg-logistics-orange transition-colors duration-300 hover-ring-pulse">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-base font-bold text-carbon-dark mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </Container>

        {/* Desktop: horizontal scroll timeline */}
        <div className="hidden lg:block mt-14 relative">
          {/* Progress line (behind the steps) */}
          <div
            ref={lineRef}
            className="absolute top-8 left-0 right-0 h-[2px] bg-logistics-orange/30 origin-left"
            style={{ transform: "scaleX(0)" }}
          />

          <div
            ref={trackRef}
            className="flex gap-12 invisible"
            style={{ paddingLeft: "max(2rem, calc((100vw - 80rem) / 2 + 2rem))", paddingRight: "6rem" }}
          >
            {dict.howItWorks.steps.map((step, i) => (
              <div key={i} className="process-step w-[320px] flex-shrink-0 relative">
                {/* Step connector dot */}
                <div className="absolute top-[30px] left-[30px] w-3 h-3 bg-logistics-orange rounded-full z-20 opacity-60" />

                <div className="step-number relative z-10 w-16 h-16 bg-carbon-dark text-white flex items-center justify-center font-black text-lg mb-5 group-hover:bg-logistics-orange transition-colors duration-300">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="step-text">
                  <h3 className="text-base font-bold text-carbon-dark mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
