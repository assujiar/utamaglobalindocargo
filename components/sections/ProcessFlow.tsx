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
    <section className={cn("py-20 sm:py-24 bg-white", className)}>
      <div className="mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
        <ScrollReveal>
          <h2 className="text-heading-md sm:text-heading-lg font-bold text-[--color-text-primary] text-center mb-12 sm:mb-16">
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
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div
                    className="absolute top-5 left-[calc(50%+20px)] right-[calc(-50%+20px)] h-px bg-[--color-border]"
                    aria-hidden="true"
                  />
                )}

                {/* Step number circle */}
                <div className="relative z-10 flex items-center justify-center size-10 rounded-full bg-[--color-primary] text-white text-sm font-bold mb-4">
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
                {/* Vertical line + circle */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center size-10 shrink-0 rounded-full bg-[--color-primary] text-white text-sm font-bold">
                    {step.number}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-[--color-border] my-1" aria-hidden="true" />
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
