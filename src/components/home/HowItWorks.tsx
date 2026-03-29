"use client";

import Container from "@/components/ui/Container";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import type { Dictionary } from "@/i18n/dictionaries/type";

interface HowItWorksProps {
  dict: Dictionary;
}

export default function HowItWorks({ dict }: HowItWorksProps) {
  return (
    <section className="bg-white py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle chapter marker */}
      <div className="absolute top-8 right-6 lg:right-16 text-[10rem] lg:text-[16rem] font-black text-carbon-dark/[0.02] leading-none select-none pointer-events-none">
        02
      </div>

      <Container>
        <AnimateOnScroll>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-logistics-orange" />
            <span className="text-logistics-orange text-xs font-bold uppercase tracking-[0.3em]">
              {dict.services.process}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-carbon-dark tracking-tight leading-[1.1]">
            {dict.howItWorks.heading}
          </h2>
          <p className="mt-4 text-base md:text-lg text-text-muted leading-relaxed max-w-2xl">
            {dict.howItWorks.subHeading}
          </p>
        </AnimateOnScroll>

        <div className="mt-14 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-8 left-8 right-8 h-[1px] bg-border-light" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {dict.howItWorks.steps.map((step, i) => (
              <AnimateOnScroll key={i} delay={i * 0.08}>
                <div className="relative group">
                  <div className="relative z-10 w-16 h-16 bg-carbon-dark text-white flex items-center justify-center font-black text-lg mb-5 group-hover:bg-logistics-orange transition-colors duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-base font-bold text-carbon-dark mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
