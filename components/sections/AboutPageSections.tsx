"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { TextRevealByLine } from "@/components/motion/TextRevealByLine";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { StaggeredReveal } from "@/components/motion/StaggeredReveal";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { CounterAnimation } from "@/components/motion/CounterAnimation";
import { SectionTransition } from "@/components/motion/SectionTransition";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { GSAPProvider } from "@/components/motion/GSAPProvider";

/* ─────────────────────────────────────────────
   Shared constants
   ───────────────────────────────────────────── */

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─────────────────────────────────────────────
   1. AboutHero
   ───────────────────────────────────────────── */

interface AboutHeroProps {
  headline: string;
  subline: string;
  breadcrumbItems: readonly { label: string; href?: string }[];
}

function AboutHero({ headline, subline, breadcrumbItems }: AboutHeroProps) {
  const prefersReduced = useReducedMotion();

  return (
    <GSAPProvider>
      <section className="relative bg-[#0A0A12] overflow-hidden">
        {/* Ambient glow orb */}
        <div
          className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,70,0,0.4) 0%, transparent 70%)",
            filter: "blur(120px)",
          }}
        />

        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-24 pt-24 pb-20 md:pt-32 md:pb-28">
          <Breadcrumb
            items={breadcrumbItems as { label: string; href?: string }[]}
            className="mb-8 md:mb-12"
          />

          <div className="max-w-4xl">
            <TextRevealByLine
              as="h1"
              className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal leading-[1.1] text-[--color-text-primary] tracking-tight"
              staggerDelay={0.1}
            >
              {headline}
            </TextRevealByLine>

            {prefersReduced ? (
              <p className="mt-6 md:mt-10 max-w-2xl text-lg md:text-xl text-[--color-text-secondary] leading-relaxed">
                {subline}
              </p>
            ) : (
              <motion.p
                className="mt-6 md:mt-10 max-w-2xl text-lg md:text-xl text-[--color-text-secondary] leading-relaxed"
                initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
                animate={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.77, 0, 0.175, 1],
                  delay: 0.6,
                }}
              >
                {subline}
              </motion.p>
            )}
          </div>
        </div>

        {/* Bottom divider: amber glow line (unique) */}
        <div className="h-px bg-gradient-to-r from-transparent via-[rgba(255,171,64,0.15)] to-transparent" />
      </section>
    </GSAPProvider>
  );
}

/* ─────────────────────────────────────────────
   2. CompanyStory
   ───────────────────────────────────────────── */

interface CompanyStoryProps {
  label: string;
  paragraphs: readonly string[];
  since: string;
}

function CompanyStory({ label, paragraphs, since }: CompanyStoryProps) {
  return (
    <section className="relative bg-[#F7F3EE] overflow-hidden">
      {/* Giant watermark year */}
      <div
        className="pointer-events-none absolute top-1/2 right-4 md:right-12 -translate-y-1/2 select-none text-[120px] md:text-[200px] font-bold leading-none opacity-[0.03] text-[#1A1A1A]"
        aria-hidden="true"
      >
        {since}
      </div>

      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-24 py-20 md:py-28">
        <div className="max-w-3xl">
          {/* Top-left solid bar divider (unique: not gradient, not centered) */}
          <div className="h-[2px] w-24 bg-[--color-primary] mb-8" />

          <span className="inline-block uppercase tracking-[0.2em] text-xs font-semibold text-[#1A1A1A]/60 mb-6">
            {label}
          </span>

          <StaggeredReveal
            className="space-y-6"
            staggerDelay={120}
          >
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-base md:text-lg leading-relaxed text-[#1A1A1A]/85 max-w-[720px]"
              >
                {paragraph}
              </p>
            ))}
          </StaggeredReveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   3. MilestoneTimeline
   ───────────────────────────────────────────── */

interface MilestoneTimelineProps {
  heading: string;
  milestones: readonly { year: string; event: string }[];
}

function MilestoneTimeline({ heading, milestones }: MilestoneTimelineProps) {
  return (
    <GSAPProvider>
      <section className="bg-[#0D0D14]">
        {/* Double-line divider (unique) */}
        <div className="flex flex-col gap-1">
          <div className="h-px bg-[rgba(255,70,0,0.1)]" />
          <div className="h-px bg-[rgba(255,255,255,0.03)]" />
        </div>

        <div className="py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-24 mb-12 md:mb-16">
            <ScrollReveal direction="up">
              <h2 className="font-serif text-3xl md:text-5xl text-[--color-text-primary] tracking-tight">
                {heading}
              </h2>
            </ScrollReveal>
          </div>

          <HorizontalScroll
            className="min-h-[400px]"
            panelClassName="gap-6 px-6 md:px-12 lg:px-24 items-center"
          >
            {milestones.map((milestone, i) => (
              <div
                key={i}
                className={cn(
                  "flex-shrink-0 min-w-[280px] max-w-[320px] p-8",
                  "rounded-2xl",
                  "bg-[rgba(255,255,255,0.03)]",
                  "border border-[rgba(255,255,255,0.06)]",
                  "backdrop-blur-sm",
                  "hover:border-[rgba(255,70,0,0.2)] hover:bg-[rgba(255,255,255,0.05)]",
                  "transition-all duration-200 ease-out"
                )}
              >
                <span className="block font-mono text-4xl md:text-5xl font-bold text-[--color-primary] mb-4 tabular-nums">
                  {milestone.year}
                </span>
                <p className="text-[--color-text-secondary] text-sm md:text-base leading-relaxed">
                  {milestone.event}
                </p>
              </div>
            ))}
          </HorizontalScroll>
        </div>
      </section>
    </GSAPProvider>
  );
}

/* ─────────────────────────────────────────────
   4. ValuePillars
   ───────────────────────────────────────────── */

interface ValuePillarsProps {
  heading: string;
  values: readonly { title: string; description: string }[];
}

function ValuePillars({ heading, values }: ValuePillarsProps) {
  return (
    <GSAPProvider>
      <section className="bg-gradient-to-b from-[#111118] to-[#0A0A0F]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-24 py-20 md:py-28">
          <div className="mb-12 md:mb-16 max-w-2xl">
            <SplitTextReveal
              as="h2"
              type="words"
              className="font-serif text-3xl md:text-5xl text-[--color-text-primary] tracking-tight"
              stagger={0.06}
            >
              {heading}
            </SplitTextReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {values.map((value, i) => (
              <ImageReveal
                key={i}
                direction="left"
                delay={i * 0.15}
              >
                <div
                  className={cn(
                    "p-8 md:p-10 rounded-2xl",
                    "border border-[rgba(255,255,255,0.06)]",
                    "hover:border-[rgba(255,70,0,0.15)]",
                    "transition-colors duration-200 ease-out"
                  )}
                >
                  <span className="inline-block uppercase tracking-[0.2em] text-xs font-semibold text-[--color-primary] mb-4">
                    0{i + 1}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold text-[--color-text-primary] mb-4">
                    {value.title}
                  </h3>
                  <p className="text-[--color-text-secondary] text-sm md:text-base leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </ImageReveal>
            ))}
          </div>
        </div>
      </section>
    </GSAPProvider>
  );
}

/* ─────────────────────────────────────────────
   5. NetworkReach
   ───────────────────────────────────────────── */

interface NetworkReachProps {
  heading: string;
  description: string;
  stats: readonly { value: string; label: string }[];
}

function NetworkReach({ heading, description, stats }: NetworkReachProps) {
  const prefersReduced = useReducedMotion();

  /**
   * Parse a stat value like "34+" into { numeric: 34, suffix: "+" }.
   * Handles values such as "15,000", "50+", "200".
   */
  function parseStatValue(value: string): {
    numeric: number;
    prefix: string;
    suffix: string;
  } {
    const match = value.match(/^([^\d]*)([\d,]+)(.*)$/);
    if (!match) return { numeric: 0, prefix: "", suffix: value };
    return {
      prefix: match[1],
      numeric: parseInt(match[2].replace(/,/g, ""), 10),
      suffix: match[3],
    };
  }

  return (
    <GSAPProvider>
      <section className="bg-[#0F0A06]">
        {/* Dashed line divider (unique) */}
        <div className="border-t border-dashed border-[rgba(255,70,0,0.2)]" />

        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-24 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* Left column: 5/12 */}
            <div className="md:col-span-5">
              <TextRevealByLine
                as="h2"
                className="font-serif text-3xl md:text-4xl lg:text-5xl text-[--color-text-primary] tracking-tight mb-6"
                staggerDelay={0.08}
              >
                {heading}
              </TextRevealByLine>

              <ScrollReveal direction="up" delay={300}>
                <p className="text-[--color-text-secondary] text-base md:text-lg leading-relaxed max-w-md">
                  {description}
                </p>
              </ScrollReveal>
            </div>

            {/* Right column: 6/12, offset by 1 (col-start-7) */}
            <div className="md:col-span-6 md:col-start-7">
              <div className="grid grid-cols-2 gap-6 md:gap-8">
                {stats.map((stat, i) => {
                  const parsed = parseStatValue(stat.value);
                  return (
                    <motion.div
                      key={i}
                      className="text-center md:text-left"
                      initial={
                        prefersReduced
                          ? undefined
                          : { opacity: 0, scale: 0.9 }
                      }
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{
                        duration: 0.5,
                        ease: EASE_OUT_EXPO,
                        delay: i * 0.1,
                      }}
                    >
                      <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                        <CounterAnimation
                          target={parsed.numeric}
                          prefix={parsed.prefix}
                          suffix={parsed.suffix}
                          className="text-[--color-primary]"
                          duration={1400}
                        />
                      </div>
                      <span className="uppercase tracking-[0.15em] text-xs font-semibold text-[--color-text-secondary]">
                        {stat.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </GSAPProvider>
  );
}

/* ─────────────────────────────────────────────
   6. AboutCTA
   ───────────────────────────────────────────── */

interface AboutCTAProps {
  heading: string;
  ctaLabel: string;
  ctaHref: string;
  trustLine: string;
}

function AboutCTA({ heading, ctaLabel, ctaHref, trustLine }: AboutCTAProps) {
  const prefersReduced = useReducedMotion();
  const words = heading.split(" ");

  return (
    <section className="bg-[#12100A]">
      {/* Amber tint full-width divider (unique) */}
      <div className="h-px bg-[rgba(255,171,64,0.12)]" />

      <SectionTransition type="overlap">
        <div className="mx-auto max-w-2xl px-6 md:px-12 py-20 md:py-28 text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[--color-text-primary] tracking-tight mb-8 leading-[1.15]">
            {prefersReduced
              ? heading
              : words.map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-[0.3em] last:mr-0"
                    initial={{ opacity: 0, rotate: -3, y: 12 }}
                    whileInView={{ opacity: 1, rotate: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.5,
                      ease: EASE_OUT_EXPO,
                      delay: i * 0.07,
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
          </h2>

          <ScrollReveal direction="up" delay={400}>
            <MagneticElement className="inline-block mb-6">
              <Button href={ctaHref} size="lg">
                {ctaLabel}
              </Button>
            </MagneticElement>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={550}>
            <p className="text-sm text-[--color-text-secondary]">
              {trustLine}
            </p>
          </ScrollReveal>
        </div>
      </SectionTransition>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Exports
   ───────────────────────────────────────────── */

export {
  AboutHero,
  CompanyStory,
  MilestoneTimeline,
  ValuePillars,
  NetworkReach,
  AboutCTA,
};

export type {
  AboutHeroProps,
  CompanyStoryProps,
  MilestoneTimelineProps,
  ValuePillarsProps,
  NetworkReachProps,
  AboutCTAProps,
};
