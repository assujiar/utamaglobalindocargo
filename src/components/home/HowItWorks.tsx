"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import type { Dictionary } from "@/i18n/dictionaries/type";

interface HowItWorksProps {
  dict: Dictionary;
}

export default function HowItWorks({ dict }: HowItWorksProps) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            title={dict.howItWorks.heading}
            subtitle={dict.howItWorks.subHeading}
          />
        </AnimateOnScroll>

        <div className="mt-14 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-[2px] bg-border-light" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {dict.howItWorks.steps.map((step, i) => (
              <AnimateOnScroll key={i} delay={i * 0.1}>
                <div className="relative">
                  <div className="relative z-10 w-16 h-16 bg-carbon-dark text-white flex items-center justify-center font-black text-lg mb-5">
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
