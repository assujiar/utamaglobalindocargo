"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Search, Package, Loader2 } from "lucide-react";
import { ParallaxDepth } from "@/components/motion/ParallaxDepth";
import { GSAPProvider } from "@/components/motion/GSAPProvider";
import type { Locale } from "@/lib/i18n/config";

/* ─── Shared easing ─── */
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ═══════════════════════════════════════════════════════════
   1. TrackHero
   ═══════════════════════════════════════════════════════════ */

interface TrackHeroProps {
  headline: string;
  subline: string;
}

export function TrackHero({ headline, subline }: TrackHeroProps) {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative bg-[#080C12] overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-[-120px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,70,0,0.4) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <ParallaxDepth speed={0.06} direction="up" scrubSmooth={0.5}>
      <div className="relative mx-auto max-w-lg px-4 pt-32 pb-12 text-center sm:px-6">
        <motion.h1
          className="font-display text-4xl font-bold tracking-tight text-[--color-text-primary] sm:text-5xl"
          initial={prefersReduced ? {} : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          {headline}
        </motion.h1>

        <motion.p
          className="mt-4 text-base leading-relaxed text-[--color-text-secondary] sm:text-lg"
          initial={prefersReduced ? {} : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.15 }}
        >
          {subline}
        </motion.p>
      </div>
      </ParallaxDepth>

      {/* Section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[rgba(255,70,0,0.12)] to-transparent" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   2. TrackingSearch
   ═══════════════════════════════════════════════════════════ */

interface TrackingSearchProps {
  locale: Locale;
  placeholder: string;
  buttonLabel: string;
  helpText: string;
}

export function TrackingSearch({
  locale,
  placeholder,
  buttonLabel,
  helpText,
}: TrackingSearchProps) {
  const prefersReduced = useReducedMotion();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim() || isSearching) return;

    setIsSearching(true);
    setHasSearched(false);

    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 2000);
  };

  return (
    <section className="relative bg-[#0A0E16]">
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
        <motion.form
          onSubmit={handleSubmit}
          className="relative"
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.3 }}
        >
          <div className="relative">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder={placeholder}
              className={cn(
                "h-14 w-full rounded-xl border bg-[rgba(255,255,255,0.06)] px-5 pr-14 text-lg",
                "text-[--color-text-primary] placeholder:text-[--color-text-secondary]",
                "border-[rgba(255,255,255,0.1)]",
                "transition-all duration-200",
                "focus:border-[--color-primary] focus:outline-none",
                "focus:shadow-[0_0_20px_rgba(255,70,0,0.1)]"
              )}
            />

            <button
              type="submit"
              disabled={isSearching || !trackingNumber.trim()}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2",
                "flex h-10 w-10 items-center justify-center rounded-lg",
                "bg-[--color-primary] text-white",
                "transition-all duration-150 ease-out",
                "hover:bg-[--color-primary-dark]",
                "disabled:opacity-40 disabled:cursor-not-allowed"
              )}
              aria-label={buttonLabel}
            >
              {isSearching ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <Search className="size-5" />
              )}
            </button>
          </div>

          <p className="mt-3 text-center text-xs text-[--color-text-secondary]">
            {helpText}
          </p>
        </motion.form>

        {/* Search state feedback */}
        <AnimatePresence mode="wait">
          {isSearching && (
            <motion.div
              key="searching"
              className="mt-8 flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Loader2 className="size-8 animate-spin text-[--color-primary] opacity-60" />
              <p className="text-sm text-[--color-text-secondary]">
                {locale === "id" ? "Mencari kiriman..." : "Searching shipment..."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pass search state down */}
        {hasSearched && !isSearching && (
          <TrackingNoResult
            noResultMessage={
              locale === "id"
                ? "Kiriman tidak ditemukan"
                : "Shipment not found"
            }
            noResultSubline={
              locale === "id"
                ? "Periksa kembali nomor resi Anda atau hubungi tim kami untuk bantuan."
                : "Please verify your tracking number or contact our team for assistance."
            }
          />
        )}
      </div>

      {/* Section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[rgba(255,70,0,0.08)] to-transparent" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. TrackingResult (No-result placeholder)
   ═══════════════════════════════════════════════════════════ */

interface TrackingResultProps {
  locale: Locale;
  noResultMessage: string;
  noResultSubline: string;
}

export function TrackingResult({
  noResultMessage,
  noResultSubline,
}: TrackingResultProps) {
  return (
    <TrackingNoResult
      noResultMessage={noResultMessage}
      noResultSubline={noResultSubline}
    />
  );
}

/* Internal no-result component */
function TrackingNoResult({
  noResultMessage,
  noResultSubline,
}: {
  noResultMessage: string;
  noResultSubline: string;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className="mt-10 flex flex-col items-center gap-4 text-center"
      initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.2 }}
    >
      <Package className="size-12 text-[--color-text-secondary] opacity-20" />
      <div>
        <p className="text-lg font-medium text-[--color-text-primary]">
          {noResultMessage}
        </p>
        <p className="mt-1 text-sm text-[--color-text-secondary]">
          {noResultSubline}
        </p>
      </div>
    </motion.div>
  );
}
