"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { ParallaxDepth } from "@/components/motion/ParallaxDepth";
import { ScrollPattern } from "@/components/motion/ScrollPattern";
import { AnimatedDivider } from "@/components/motion/AnimatedDivider";
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

// UNIQUE: section-dark bg (NOT section-elevated like Capabilities), divider-center-fade (NOT glow-divider-full),
//         vertical timeline connector layout with alternating indent, scale+opacity entrance per step

function ProcessFlow({ heading, steps, className }: ProcessFlowProps) {
  const prefersReduced = useReducedMotion();

  return (
    <GSAPProvider>
      <section className={cn("py-28 sm:py-40 bg-[#08080E] relative overflow-hidden", className)}>
        <ScrollPattern variant="lines" count={8} speed={0.06} />
        {/* Animated top divider with cross endpoints */}
        <div className="absolute top-4 left-0 right-0 px-8 sm:px-16">
          <AnimatedDivider color="rgba(255,70,0,0.15)" endpointShape="cross" />
        </div>
        {/* Vertical left-side accent */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[rgba(255,70,0,0.2)] to-transparent" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
          {/* Heading — right-aligned (unique vs all other headings which are left/centered) */}
          <div className="mb-16 sm:mb-24 flex justify-end">
            <div className="max-w-2xl text-right">
              <SplitTextReveal
                as="h2"
                type="words"
                stagger={0.08}
                className="text-display-sm sm:text-display-md font-bold text-[--color-text-inverse] tracking-[-0.03em]"
              >
                {heading}
              </SplitTextReveal>
            </div>
          </div>

          {/* Steps — vertical timeline with connector line */}
          <div className="relative">
            {/* Vertical connector line */}
            <div
              className="absolute left-5 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[--color-primary] via-[rgba(255,70,0,0.15)] to-transparent"
              aria-hidden="true"
            />

            <div className="space-y-0">
              {steps.map((step, i) => (
                <ParallaxDepth key={step.number} speed={0.03 + i * 0.015} direction="up" scrubSmooth={0.5}>
                  <motion.div
                    className="relative pl-14 sm:pl-20 py-8 sm:py-10"
                    initial={prefersReduced ? undefined : { opacity: 0, scale: 0.95, x: -16 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.7,
                      ease: [0.34, 1.56, 0.64, 1],
                      delay: i * 0.1,
                    }}
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute left-3 sm:left-6 top-10 sm:top-12 size-4 rounded-full border-2 border-[--color-primary] bg-[--color-bg-dark]"
                      aria-hidden="true"
                    />

                    {/* Step number — oversized, gradient */}
                    <span className="stat-number text-5xl sm:text-6xl gradient-text-vivid leading-none block mb-3">
                      {step.number}
                    </span>
                    <h3 className="text-lg sm:text-xl font-semibold text-[--color-text-primary] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[--color-text-secondary] leading-relaxed max-w-xl">
                      {step.description}
                    </p>
                  </motion.div>
                </ParallaxDepth>
              ))}
            </div>
          </div>
        </div>
      </section>
    </GSAPProvider>
  );
}

export { ProcessFlow, type ProcessFlowProps, type ProcessStep };
