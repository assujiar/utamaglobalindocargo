"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
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
      <section className={cn("py-28 sm:py-36 section-elevated relative overflow-hidden", className)}>
        {/* Ambient depth */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="blur-circle absolute w-[40vw] h-[40vw] top-[-10%] left-[10%] opacity-[0.05]" />
        </div>

        {/* Top glow divider */}
        <div className="absolute top-0 left-0 right-0 glow-divider-full" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          {/* Heading */}
          <div className="mb-16 sm:mb-20">
            <motion.p
              className="label-text text-[--color-primary] mb-4"
              initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              PROCESS
            </motion.p>
            <SplitTextReveal
              as="h2"
              type="words"
              stagger={0.05}
              className="text-display-sm sm:text-display-md font-bold text-[--color-text-inverse] max-w-2xl tracking-[-0.03em]"
            >
              {heading}
            </SplitTextReveal>
          </div>

          {/* Steps — elevated cards with oversized numbers */}
          <div className="space-y-5">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 60}>
                <div className="card-elevated !p-6 sm:!p-8 grid grid-cols-12 gap-4 sm:gap-6 items-start">
                  {/* Oversized step number */}
                  <div className="col-span-2 sm:col-span-1">
                    <span className="stat-number text-3xl sm:text-4xl gradient-text">
                      {step.number}
                    </span>
                  </div>
                  {/* Title */}
                  <div className="col-span-10 sm:col-span-3">
                    <h3 className="text-base sm:text-lg font-semibold text-[--color-text-primary]">
                      {step.title}
                    </h3>
                  </div>
                  {/* Description */}
                  <div className="col-span-12 sm:col-span-7 sm:col-start-6">
                    <p className="text-sm text-[--color-text-secondary] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </GSAPProvider>
  );
}

export { ProcessFlow, type ProcessFlowProps, type ProcessStep };
