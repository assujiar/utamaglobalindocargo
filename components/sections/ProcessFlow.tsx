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
      <section className={cn("py-24 sm:py-32 bg-[--color-bg-dark] relative", className)}>
        <div className="absolute top-0 left-0 right-0 h-px bg-[rgba(255,255,255,0.06)]" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          <SplitTextReveal
            as="h2"
            type="words"
            stagger={0.05}
            className="text-display-sm font-bold text-[--color-text-inverse] mb-16 sm:mb-20 tracking-[-0.03em]"
          >
            {heading}
          </SplitTextReveal>

          {/* Numbered list — editorial, like Buzzworthy's rules */}
          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 border-b border-[rgba(255,255,255,0.06)]"
                initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.08,
                }}
              >
                <div className="md:col-span-1">
                  <span className="label-text text-[--color-primary]">
                    {step.number}
                  </span>
                </div>
                <div className="md:col-span-3">
                  <h3 className="text-lg font-semibold text-[--color-text-inverse]">
                    {step.title}
                  </h3>
                </div>
                <div className="md:col-span-7 md:col-start-6">
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
