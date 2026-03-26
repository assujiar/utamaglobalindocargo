"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { GSAPProvider } from "@/components/motion/GSAPProvider";

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
  const prefersReduced = useReducedMotion();

  return (
    <GSAPProvider>
      <section className={cn("py-28 sm:py-40 section-elevated relative overflow-hidden", className)}>
        <div className="absolute top-0 left-0 right-0 glow-divider-full" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          {/* Heading */}
          <div className="mb-16 sm:mb-24">
            <SplitTextReveal
              as="h2"
              type="words"
              stagger={0.05}
              className="text-display-sm sm:text-display-md font-bold text-[--color-text-inverse] max-w-2xl tracking-[-0.03em]"
            >
              {heading}
            </SplitTextReveal>
          </div>

          {/* Steps — clean rows with border separators, no cards */}
          <div>
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="grid grid-cols-12 gap-4 sm:gap-8 items-baseline py-6 sm:py-8 border-b border-[rgba(255,255,255,0.06)] first:border-t"
                initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.6,
                  ease: [0.23, 1, 0.32, 1],
                  delay: i * 0.08,
                }}
              >
                {/* Oversized step number */}
                <div className="col-span-3 sm:col-span-2 lg:col-span-1">
                  <span className="stat-number text-4xl sm:text-5xl gradient-text-vivid">
                    {step.number}
                  </span>
                </div>
                {/* Title */}
                <div className="col-span-9 sm:col-span-3">
                  <h3 className="text-base sm:text-lg font-semibold text-[--color-text-primary]">
                    {step.title}
                  </h3>
                </div>
                {/* Description */}
                <div className="col-span-12 sm:col-span-6 sm:col-start-7 lg:col-span-7 lg:col-start-5">
                  <p className="text-sm text-[--color-text-secondary] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </GSAPProvider>
  );
}

export { ProcessFlow, type ProcessFlowProps, type ProcessStep };
