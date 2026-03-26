"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { GitBranch } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

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
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  // Scroll-driven progress for the connecting line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.6"],
  });

  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className={cn("py-28 sm:py-36 bg-[--color-bg-dark-elevated] relative overflow-hidden", className)}>
      {/* Radial burst background */}
      <div className="absolute inset-0 radial-burst pointer-events-none" aria-hidden="true" />

      {/* Giant watermark icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
        <GitBranch className="size-[280px] sm:size-[400px] text-[--color-primary] opacity-[0.02] -rotate-90" strokeWidth={0.5} />
      </div>

      {/* Top glow divider */}
      <div className="absolute top-0 left-0 right-0 glow-divider-full" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[--max-width-layout] px-5 sm:px-10">
        <ScrollReveal>
          <p className="label-text text-[--color-primary] text-center mb-4">Process</p>
          <h2 className="text-heading-md sm:text-heading-lg font-bold gradient-text text-center mb-16 sm:mb-24 tracking-[-0.02em]">
            {heading}
          </h2>
        </ScrollReveal>

        {/* Desktop: horizontal timeline with scroll-driven line */}
        <div className="hidden md:block">
          {/* Scroll-driven progress line */}
          <div className="relative mb-12">
            {/* Background track */}
            <div className="absolute top-5 left-[5%] right-[5%] h-px bg-[rgba(255,255,255,0.06)]" aria-hidden="true" />
            {/* Animated fill */}
            {!prefersReduced && (
              <motion.div
                className="absolute top-5 left-[5%] right-[5%] h-px bg-gradient-to-r from-[--color-primary] via-[--color-accent-warm] to-[--color-primary] origin-left"
                style={{ scaleX: lineScaleX }}
                aria-hidden="true"
              />
            )}
          </div>

          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: `repeat(${Math.min(steps.length, 6)}, 1fr)` }}
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="relative flex flex-col items-center text-center"
                initial={prefersReduced ? undefined : { opacity: 0, y: 40, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.12,
                }}
              >
                {/* Step number circle with pulse glow */}
                <motion.div
                  className="relative z-10 flex items-center justify-center size-12 rounded-full bg-[--color-primary] text-white text-sm font-bold mb-6"
                  whileInView={prefersReduced ? undefined : {
                    boxShadow: [
                      "0 0 20px rgba(255,70,0,0.3)",
                      "0 0 40px rgba(255,70,0,0.5), 0 0 80px rgba(255,70,0,0.2)",
                      "0 0 20px rgba(255,70,0,0.3)",
                    ],
                  }}
                  viewport={{ once: true }}
                  transition={{
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    },
                  }}
                >
                  {step.number}
                </motion.div>

                <h3 className="text-base font-semibold text-[--color-text-primary] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[--color-text-secondary] leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical steps with scroll-driven line */}
        <div className="md:hidden">
          {/* Vertical progress line container */}
          <div className="relative">
            {/* Background track */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-[rgba(255,255,255,0.06)]" aria-hidden="true" />
            {/* Animated fill */}
            {!prefersReduced && (
              <motion.div
                className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[--color-primary] via-[--color-accent-warm] to-[--color-primary] origin-top"
                style={{ scaleY: lineScaleY }}
                aria-hidden="true"
              />
            )}

            <div className="flex flex-col gap-0">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  className="flex gap-5"
                  initial={prefersReduced ? undefined : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                    delay: i * 0.1,
                  }}
                >
                  {/* Circle */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="flex items-center justify-center size-10 shrink-0 rounded-full bg-[--color-primary] text-white text-sm font-bold"
                      whileInView={prefersReduced ? undefined : {
                        boxShadow: [
                          "0 0 15px rgba(255,70,0,0.3)",
                          "0 0 30px rgba(255,70,0,0.5)",
                          "0 0 15px rgba(255,70,0,0.3)",
                        ],
                      }}
                      viewport={{ once: true }}
                      transition={{
                        boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
                      }}
                    >
                      {step.number}
                    </motion.div>
                    {i < steps.length - 1 && (
                      <div className="w-px flex-1 min-h-[40px]" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-10">
                    <h3 className="text-base font-semibold text-[--color-text-primary] mb-1 pt-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[--color-text-secondary] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { ProcessFlow, type ProcessFlowProps, type ProcessStep };
