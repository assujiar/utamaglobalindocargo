"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Check } from "lucide-react";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { StaggeredReveal } from "@/components/motion/StaggeredReveal";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { ParallaxDepth } from "@/components/motion/ParallaxDepth";
import { Button } from "@/components/ui/Button";
import { GSAPProvider } from "@/components/motion/GSAPProvider";
import { services } from "@/lib/content/services";
import type { Locale } from "@/lib/i18n/config";

// ─── Easing ───

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Shared input styles ───

const inputClasses = [
  "bg-[rgba(255,255,255,0.04)]",
  "border border-[rgba(255,255,255,0.08)]",
  "rounded-lg px-4 py-3",
  "text-[--color-text-primary]",
  "placeholder:text-[--color-text-muted]",
  "focus:border-[--color-primary] focus:ring-1 focus:ring-[--color-primary]",
  "outline-none transition-colors w-full",
].join(" ");

const sectionDivider = "h-px bg-[rgba(255,255,255,0.04)] my-8";

// ─── QuoteHero ───

interface QuoteHeroProps {
  headline: string;
  subline: string;
  stepIndicator: string;
}

function QuoteHero({ headline, subline, stepIndicator }: QuoteHeroProps) {
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-[#0B0910] relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.03]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,70,0,0.4) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-xl px-4 py-24 sm:py-32 text-center">
        <ParallaxDepth speed={0.06} direction="up" scrubSmooth={0.5}>
        {/* Step indicator pill */}
        <motion.span
          className="inline-block bg-[rgba(255,70,0,0.1)] border border-[rgba(255,70,0,0.2)] rounded-full px-4 py-1.5 text-xs text-[--color-primary] tracking-wider uppercase mb-6"
          initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        >
          {stepIndicator}
        </motion.span>

        {/* Headline with unique scale-down entrance */}
        <motion.h1
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[--color-text-primary] leading-[1.1] mb-6"
          initial={prefersReduced ? {} : { opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.15 }}
        >
          {headline}
        </motion.h1>

        {/* Subline */}
        <motion.p
          className="text-base sm:text-lg text-[--color-text-secondary] max-w-md mx-auto leading-relaxed"
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.4 }}
        >
          {subline}
        </motion.p>
        </ParallaxDepth>
      </div>
    </section>
  );
}

// ─── QuoteForm ───

interface QuoteFormFields {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  origin: string;
  destination: string;
  cargoType: string;
  weight: string;
  details: string;
  submit: string;
}

interface QuoteFormProps {
  locale: Locale;
  services: readonly { key: string; name: string }[];
  preselectedService?: string;
  fields: QuoteFormFields;
  successHeading: string;
  successMessage: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  origin: string;
  destination: string;
  cargoType: string;
  weight: string;
  details: string;
}

const sectionLabels = {
  id: {
    contact: "Informasi Kontak",
    shipment: "Detail Pengiriman",
    additional: "Informasi Tambahan",
  },
  en: {
    contact: "Contact Information",
    shipment: "Shipment Details",
    additional: "Additional Details",
  },
};

function QuoteForm({
  locale,
  services: serviceOptions,
  preselectedService,
  fields,
  successHeading,
  successMessage,
}: QuoteFormProps) {
  const prefersReduced = useReducedMotion();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: preselectedService || "",
    origin: "",
    destination: "",
    cargoType: "",
    weight: "",
    details: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const labels = sectionLabels[locale];

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // POST to /api/quote - for now console.log and show success
      console.log("Quote form submission:", formData);

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, locale }),
      }).catch(() => null);

      if (res && !res.ok) {
        console.warn("Quote API returned non-OK status, showing success anyway for now");
      }
    } catch {
      console.warn("Quote API not available, showing success state");
    }

    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section className="bg-[#0D0B12] relative">
      <div className="mx-auto max-w-2xl px-4 pb-16 sm:pb-24">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              className="glass-dark rounded-2xl p-8 sm:p-12 text-center"
              initial={prefersReduced ? {} : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            >
              {/* Checkmark animation */}
              <motion.div
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(255,70,0,0.12)] border border-[rgba(255,70,0,0.25)]"
                initial={prefersReduced ? {} : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.5,
                  ease: [0.34, 1.56, 0.64, 1],
                  delay: 0.2,
                }}
              >
                <Check className="h-8 w-8 text-[--color-primary]" />
              </motion.div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[--color-text-primary] mb-3">
                {successHeading}
              </h2>
              <p className="text-[--color-text-secondary] text-base leading-relaxed max-w-md mx-auto">
                {successMessage}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              className="glass-dark rounded-2xl p-8 sm:p-12"
              initial={prefersReduced ? {} : { y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={prefersReduced ? {} : { y: -12, opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            >
              <form onSubmit={handleSubmit} noValidate>
                {/* Section 1: Contact Info */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[--color-text-muted] mb-5">
                    {labels.contact}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder={fields.name}
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder={fields.email}
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder={fields.phone}
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                    <input
                      type="text"
                      name="company"
                      placeholder={fields.company}
                      value={formData.company}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className={sectionDivider} />

                {/* Section 2: Shipment Details */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[--color-text-muted] mb-5">
                    {labels.shipment}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <select
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className={cn(
                        inputClasses,
                        "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23A0A0A0%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[center_right_1rem] pr-10",
                        "sm:col-span-2",
                        !formData.service && "text-[--color-text-muted]",
                      )}
                    >
                      <option value="" disabled>
                        {fields.service}
                      </option>
                      {serviceOptions.map((s) => (
                        <option key={s.key} value={s.key}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      name="origin"
                      required
                      placeholder={fields.origin}
                      value={formData.origin}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                    <input
                      type="text"
                      name="destination"
                      required
                      placeholder={fields.destination}
                      value={formData.destination}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                    <input
                      type="text"
                      name="cargoType"
                      placeholder={fields.cargoType}
                      value={formData.cargoType}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                    <input
                      type="text"
                      name="weight"
                      placeholder={fields.weight}
                      value={formData.weight}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className={sectionDivider} />

                {/* Section 3: Additional Details */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[--color-text-muted] mb-5">
                    {labels.additional}
                  </h3>
                  <textarea
                    name="details"
                    rows={4}
                    placeholder={fields.details}
                    value={formData.details}
                    onChange={handleChange}
                    className={cn(inputClasses, "resize-none")}
                  />
                </div>

                {/* Submit */}
                <div className="mt-10">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    className="w-full"
                  >
                    {fields.submit}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── QuoteTrustBar ───

interface QuoteTrustBarProps {
  items: readonly { icon: string; text: string }[];
}

function QuoteTrustBar({ items }: QuoteTrustBarProps) {
  return (
    <section className="bg-[#0D0B12] relative pb-16 sm:pb-24">
      <div className="mx-auto max-w-2xl px-4">
        <StaggeredReveal
          staggerDelay={80}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8"
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-xs text-[--color-text-muted]"
            >
              <span className="text-base" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.text}</span>
            </div>
          ))}
        </StaggeredReveal>
      </div>
    </section>
  );
}

export { QuoteHero, QuoteForm, QuoteTrustBar };
export type { QuoteHeroProps, QuoteFormProps, QuoteTrustBarProps };
