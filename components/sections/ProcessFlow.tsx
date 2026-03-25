"use client";

import { cn } from "@/lib/utils/cn";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggeredReveal } from "@/components/motion/StaggeredReveal";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessFlowProps {
  heading: string;
  steps: ProcessStep[];
  className?: string;
}

function ProcessFlow({ heading, steps, className }: ProcessFlowProps) {
  return (
    <section className={cn("py-24 sm:py-32 bg-[--color-bg-dark] relative", className)}>
      {/* Gradient mesh subtle */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[--color-primary] opacity-[0.03] blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
        <ScrollReveal>
          <p className="label-text text-[--color-primary] text-center mb-4">Process</p>
          <h2 className="text-heading-md sm:text-heading-lg font-bold text-[--color-text-primary] text-center mb-14 sm:mb-20 tracking-[-0.02em]">
            {heading}
          </h2>
        </ScrollReveal>

        {/* Desktop: horizontal timeline */}
        <ScrollReveal className="hidden md:block">
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: `repeat(${Math.min(steps.length, 6)}, 1fr)` }}
          >
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                {/* Glow connector line */}
                {i < steps.length - 1 && (
                  <div
                    className="absolute top-5 left-[calc(50%+24px)] right-[calc(-50%+24px)] h-px bg-gradient-to-r from-[rgba(255,70,0,0.30)] to-[rgba(255,70,0,0.05)]"
                    aria-hidden="true"
                  />
                )}

                {/* Step number circle with glow */}
                <div className="relative z-10 flex items-center justify-center size-10 rounded-full bg-[--color-primary] text-white text-sm font-bold mb-5 shadow-[0_0_24px_rgba(255,70,0,0.30)]">
                  {step.number}
                </div>

                <h3 className="text-base font-semibold text-[--color-text-primary] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[--color-text-secondary] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Mobile: vertical steps */}
        <div className="md:hidden">
          <StaggeredReveal className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                {/* Vertical glow line + circle */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center size-10 shrink-0 rounded-full bg-[--color-primary] text-white text-sm font-bold shadow-[0_0_20px_rgba(255,70,0,0.25)]">
                    {step.number}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-[rgba(255,70,0,0.25)] to-transparent my-1" aria-hidden="true" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-8">
                  <h3 className="text-base font-semibold text-[--color-text-primary] mb-1 pt-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[--color-text-secondary] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </StaggeredReveal>
        </div>
      </div>
    </section>
  );
}

export { ProcessFlow, type ProcessFlowProps, type ProcessStep };
