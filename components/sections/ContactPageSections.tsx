"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { TextRevealByLine } from "@/components/motion/TextRevealByLine";
import { StaggeredReveal } from "@/components/motion/StaggeredReveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { Button } from "@/components/ui/Button";
import { GSAPProvider } from "@/components/motion/GSAPProvider";
import type { Locale } from "@/lib/i18n/config";

/* ─────────────────────────────────────────────────────────
   Shared easing
   ───────────────────────────────────────────────────────── */

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─────────────────────────────────────────────────────────
   1. ContactHero
   ───────────────────────────────────────────────────────── */

interface ContactHeroProps {
  headline: string;
  subline: string;
  breadcrumbItems: readonly { label: string; href?: string }[];
}

export function ContactHero({
  headline,
  subline,
  breadcrumbItems,
}: ContactHeroProps) {
  const prefersReduced = useReducedMotion();

  return (
    <GSAPProvider>
      <section className="relative bg-[#0E0B14] overflow-hidden">
        {/* Ambient glow orb */}
        <div
          className="pointer-events-none absolute top-[-120px] right-[-80px] size-[500px] rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.6) 0%, transparent 70%)",
            filter: "blur(120px)",
          }}
        />

        <div className="mx-auto max-w-7xl px-4 md:px-6 pt-24 pb-20 md:pt-32 md:pb-28">
          {/* Breadcrumb — right-aligned to match the text block */}
          <div className="flex justify-end">
            <Breadcrumb
              items={breadcrumbItems as { label: string; href?: string }[]}
              className="mb-8"
            />
          </div>

          {/* Right-aligned text block */}
          <div className="ml-auto max-w-3xl text-right">
            <SplitTextReveal
              as="h1"
              type="words"
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[--color-text-primary] leading-[1.1]"
            >
              {headline}
            </SplitTextReveal>

            <motion.p
              className="mt-6 text-lg md:text-xl text-[--color-text-secondary] max-w-2xl ml-auto leading-relaxed"
              initial={prefersReduced ? {} : { opacity: 0, x: 40 }}
              whileInView={prefersReduced ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                ease: EASE_OUT_EXPO,
                delay: 0.3,
              }}
            >
              {subline}
            </motion.p>
          </div>
        </div>

        {/* Bottom divider: purple-to-orange gradient (unique) */}
        <div
          className="h-px bg-gradient-to-r from-[rgba(168,85,247,0.15)] via-[rgba(255,70,0,0.15)] to-transparent"
          aria-hidden="true"
        />
      </section>
    </GSAPProvider>
  );
}

/* ─────────────────────────────────────────────────────────
   2. ContactInfoCards
   ───────────────────────────────────────────────────────── */

interface ContactInfoCard {
  icon: string;
  title: string;
  value: string;
  action?: { label: string; href: string };
}

interface ContactInfoCardsProps {
  cards: readonly ContactInfoCard[];
}

export function ContactInfoCards({ cards }: ContactInfoCardsProps) {
  return (
    <section className="relative bg-[#100E18]">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24">
        <StaggeredReveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={cn(
                "border border-[rgba(168,85,247,0.1)] rounded-2xl p-8",
                "bg-[rgba(255,255,255,0.02)]",
                "transition-all duration-300 ease-out",
                "hover:border-[rgba(255,70,0,0.3)] hover:bg-[rgba(255,255,255,0.03)]",
                "hover:-translate-y-1.5"
              )}
            >
              {/* Icon */}
              <span className="text-3xl block mb-5" aria-hidden="true">
                {card.icon}
              </span>

              {/* Title */}
              <h3 className="text-sm font-semibold uppercase tracking-widest text-[--color-text-secondary] mb-3">
                {card.title}
              </h3>

              {/* Value */}
              <p className="text-lg md:text-xl font-medium text-[--color-text-primary] leading-relaxed">
                {card.value}
              </p>

              {/* Optional action link */}
              {card.action && (
                <MagneticElement className="mt-5 inline-block" strength={0.2}>
                  <a
                    href={card.action.href}
                    className="inline-flex items-center gap-2 text-[--color-primary] text-sm font-semibold hover:text-[--color-primary-light] transition-colors duration-150"
                  >
                    {card.action.label}
                    <svg
                      className="size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </a>
                </MagneticElement>
              )}
            </div>
          ))}
        </StaggeredReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   3. ContactForm
   ───────────────────────────────────────────────────────── */

interface ContactFormProps {
  locale: Locale;
  heading: string;
  submitLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  companyPlaceholder: string;
  messagePlaceholder: string;
  successMessage: string;
}

export function ContactForm({
  locale,
  heading,
  submitLabel,
  namePlaceholder,
  emailPlaceholder,
  phonePlaceholder,
  companyPlaceholder,
  messagePlaceholder,
  successMessage,
}: ContactFormProps) {
  const prefersReduced = useReducedMotion();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputClasses = cn(
    "w-full bg-white border border-[#E0DDD6] rounded-lg px-4 py-3",
    "text-[#1A1A1A] placeholder:text-[#999]",
    "focus:border-[--color-primary] focus:ring-1 focus:ring-[--color-primary]",
    "outline-none transition-colors duration-200"
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: wire up to /api/contact endpoint
      console.log("Contact form submission:", { ...formData, locale });
      setSubmitted(true);
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <GSAPProvider>
      <section className="relative">
        {/* Zigzag divider (top) */}
        <div
          className="h-[4px] w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #E0DDD6 0px, #E0DDD6 8px, transparent 8px, transparent 16px)",
            backgroundSize: "16px 4px",
          }}
          aria-hidden="true"
        />

        <div className="bg-[#F5F2ED]" style={{ color: "#1A1A1A" }}>
          <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0">
              {/* Heading — left column */}
              <div className="md:col-span-4">
                <TextRevealByLine
                  as="h2"
                  className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15]"
                >
                  {heading}
                </TextRevealByLine>
              </div>

              {/* Form — right column */}
              <div className="md:col-span-7 md:col-start-6">
                <motion.div
                  initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
                  whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    ease: EASE_OUT_EXPO,
                    delay: 0.15,
                  }}
                >
                  {submitted ? (
                    <div className="rounded-2xl border border-[#D4EDDA] bg-[#F0FFF4] p-8 text-center">
                      <span className="text-4xl block mb-4" aria-hidden="true">
                        ✓
                      </span>
                      <p className="text-lg font-medium text-[#2D6A4F]">
                        {successMessage}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Name + Email row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="contact-name" className="sr-only">
                            {namePlaceholder}
                          </label>
                          <input
                            id="contact-name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={namePlaceholder}
                            className={inputClasses}
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-email" className="sr-only">
                            {emailPlaceholder}
                          </label>
                          <input
                            id="contact-email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={emailPlaceholder}
                            className={inputClasses}
                          />
                        </div>
                      </div>

                      {/* Phone + Company row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="contact-phone" className="sr-only">
                            {phonePlaceholder}
                          </label>
                          <input
                            id="contact-phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={phonePlaceholder}
                            className={inputClasses}
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-company" className="sr-only">
                            {companyPlaceholder}
                          </label>
                          <input
                            id="contact-company"
                            name="company"
                            type="text"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder={companyPlaceholder}
                            className={inputClasses}
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="contact-message" className="sr-only">
                          {messagePlaceholder}
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={messagePlaceholder}
                          className={cn(inputClasses, "resize-none")}
                        />
                      </div>

                      {/* Submit */}
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        loading={loading}
                        className="w-full sm:w-auto"
                      >
                        {submitLabel}
                      </Button>
                    </form>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </GSAPProvider>
  );
}

/* ─────────────────────────────────────────────────────────
   4. OfficeLocation
   ───────────────────────────────────────────────────────── */

interface OfficeLocationProps {
  heading: string;
  address: string;
  hours: string;
  hoursLabel: string;
}

export function OfficeLocation({
  heading,
  address,
  hours,
  hoursLabel,
}: OfficeLocationProps) {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative bg-[#0C0A10]">
      {/* Single dot divider (unique) */}
      <div className="flex justify-center py-10" aria-hidden="true">
        <div className="size-1.5 rounded-full bg-[rgba(168,85,247,0.4)]" />
      </div>

      <ScrollReveal>
        <div className="mx-auto max-w-xl px-4 md:px-6 pb-20 md:pb-28 text-center">
          {/* Heading with letter-spacing animation */}
          <motion.h2
            className="font-display text-3xl md:text-4xl font-bold text-[--color-text-primary] mb-10"
            initial={
              prefersReduced
                ? {}
                : { opacity: 0, letterSpacing: "0.1em" }
            }
            whileInView={
              prefersReduced
                ? {}
                : { opacity: 1, letterSpacing: "-0.02em" }
            }
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.8,
              ease: EASE_OUT_EXPO,
            }}
          >
            {heading}
          </motion.h2>

          {/* Address */}
          <motion.div
            className="mb-8"
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              ease: EASE_OUT_EXPO,
              delay: 0.15,
            }}
          >
            <p className="text-[--color-text-secondary] text-base md:text-lg leading-relaxed whitespace-pre-line">
              {address}
            </p>
          </motion.div>

          {/* Business hours */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              ease: EASE_OUT_EXPO,
              delay: 0.3,
            }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-[--color-text-secondary] mb-2">
              {hoursLabel}
            </p>
            <p className="text-[--color-text-primary] text-base md:text-lg font-medium">
              {hours}
            </p>
          </motion.div>
        </div>
      </ScrollReveal>
    </section>
  );
}
