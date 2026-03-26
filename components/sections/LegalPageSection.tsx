"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ParallaxDepth } from "@/components/motion/ParallaxDepth";

/* ─── Shared easing ─── */
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface LegalPageSectionProps {
  title: string;
  lastUpdated: string;
  content: readonly { heading: string; body: string }[];
  variant: "privacy" | "terms";
}

export function LegalPageSection({
  title,
  lastUpdated,
  content,
  variant,
}: LegalPageSectionProps) {
  const prefersReduced = useReducedMotion();

  const isPrivacy = variant === "privacy";

  const bgClass = isPrivacy ? "bg-[#0C0810]" : "bg-[#0A100C]";

  const dividerClass = isPrivacy
    ? "h-px bg-gradient-to-r from-[rgba(139,92,246,0.15)] to-transparent"
    : "h-px bg-gradient-to-r from-transparent to-[rgba(34,197,94,0.12)]";

  const layoutClass = isPrivacy
    ? "max-w-3xl text-left"
    : "max-w-3xl mx-auto text-center";

  const contentLayoutClass = isPrivacy
    ? "max-w-3xl"
    : "max-w-3xl mx-auto";

  return (
    <section className={cn("relative min-h-screen", bgClass)}>
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full opacity-[0.03]"
        style={{
          background: isPrivacy
            ? "radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(34,197,94,0.5) 0%, transparent 70%)",
          filter: "blur(140px)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.header
          className={cn("mb-16", layoutClass)}
          initial={prefersReduced ? {} : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          <h1 className="font-display text-3xl font-bold tracking-tight text-[--color-text-primary] sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm uppercase tracking-widest font-semibold text-[--color-text-secondary]">
            {lastUpdated}
          </p>
        </motion.header>

        {/* Divider */}
        <div className={cn("mb-12", dividerClass)} />

        {/* Content sections */}
        <div className={cn("space-y-12", contentLayoutClass)}>
          {content.map((section, index) => (
            <ParallaxDepth key={index} speed={0.03 + index * 0.008} direction="up" scrubSmooth={0.5}>
            <ScrollReveal delay={index * 80}>
              <article
                className={cn(
                  "group",
                  isPrivacy && index % 2 === 1 && "opacity-90"
                )}
              >
                <h3
                  className={cn(
                    "text-xl font-semibold text-[--color-text-primary] sm:text-2xl",
                    !isPrivacy && "text-center"
                  )}
                >
                  {!isPrivacy && (
                    <span className="mr-2 text-[--color-primary] font-mono">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                  )}
                  {section.heading}
                </h3>

                <div
                  className={cn(
                    "mt-4 text-base leading-relaxed text-[--color-text-secondary]",
                    "[&_a]:text-[--color-primary] [&_a]:underline [&_a]:underline-offset-2",
                    "[&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1",
                    "[&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1",
                    "[&_strong]:text-[--color-text-primary] [&_strong]:font-medium",
                    !isPrivacy && "text-left"
                  )}
                  dangerouslySetInnerHTML={{ __html: section.body }}
                />

                {/* Section divider between items */}
                {index < content.length - 1 && (
                  <div className={cn("mt-12", dividerClass)} />
                )}
              </article>
            </ScrollReveal>
            </ParallaxDepth>
          ))}
        </div>
      </div>
    </section>
  );
}
