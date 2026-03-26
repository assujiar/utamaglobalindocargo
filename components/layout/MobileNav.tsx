"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { getLocalizedPath } from "@/lib/utils/routes";
import type { Locale } from "@/lib/i18n/config";
import type { ServiceData } from "@/lib/content/services";
import { Button } from "@/components/ui/Button";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  dictionary: {
    nav: Record<string, string>;
    buttons: Record<string, string>;
  };
  services: ServiceData[];
}

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_QUART: [number, number, number, number] = [0.77, 0, 0.175, 1];

// SVG wave path for organic edge transition (like Buzzworthy's menu-slide)
const WAVE_OPEN = "M0,0 L100,0 L100,100 C75,95 50,105 25,95 L0,100 Z";
const WAVE_CLOSED = "M0,0 L100,0 L100,0 C75,0 50,0 25,0 L0,0 Z";

/**
 * Buzzworthy-style full-screen menu with:
 * - Light background (cream) matching Buzzworthy screenshots
 * - SVG wave transition edge
 * - Large centered uppercase nav text with brand dot accent
 * - Staggered reveals
 */
function MobileNav({
  open,
  onClose,
  locale,
  dictionary,
  services,
}: MobileNavProps) {
  const [servicesExpanded, setServicesExpanded] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const navItems = [
    { key: "services", label: dictionary.nav.services, href: getLocalizedPath("services", locale), hasChildren: true },
    { key: "about", label: dictionary.nav.about, href: getLocalizedPath("about", locale) },
    { key: "track", label: dictionary.nav.track, href: getLocalizedPath("track", locale) },
    { key: "contact", label: dictionary.nav.contact, href: getLocalizedPath("contact", locale) },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Dark backdrop behind the wave */}
          <motion.div
            className="fixed inset-0 z-[59] bg-[--color-bg-dark]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Menu panel with SVG wave bottom edge */}
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease: EASE_QUART }}
          >
            {/* Light background — like Buzzworthy's menu */}
            <div className="absolute inset-0 bg-[#FAFAF8]" />

            {/* SVG wave bottom edge — organic transition shape (desktop only, skip on small screens to avoid leak) */}
            <div className="absolute bottom-0 left-0 right-0 translate-y-[calc(100%-2px)] z-[1] hidden sm:block">
              <motion.svg
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                className="w-full h-[60px] sm:h-[80px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.path
                  fill="#FAFAF8"
                  initial={{ d: "M0,0 L100,0 L100,0 C80,0 60,0 40,0 C20,0 0,0 0,0 Z" }}
                  animate={{ d: "M0,0 L100,0 L100,5 C80,18 60,2 40,15 C20,8 5,20 0,12 Z" }}
                  transition={{ duration: 0.8, ease: EASE_QUART, delay: 0.2 }}
                />
              </motion.svg>
            </div>

            {/* Close button — top right */}
            <div className="relative z-10 flex items-center justify-end h-16 px-5 sm:px-10">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center justify-center size-10 text-[#1A1A1A] hover:text-[--color-primary] transition-colors"
                aria-label="Close menu"
              >
                {/* Chain-link / two-circles close icon like Buzzworthy */}
                <svg width="28" height="16" viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="8" r="6" />
                  <circle cx="20" cy="8" r="6" />
                </svg>
              </button>
            </div>

            {/* Nav content */}
            <nav
              className="relative z-10 flex flex-col flex-1 overflow-y-auto px-6 sm:px-10 md:px-16 pb-8"
              aria-label="Mobile navigation"
            >
              {/* Centered large uppercase nav — Buzzworthy style */}
              <div className="flex-1 flex flex-col items-center justify-center gap-2 sm:gap-3">
                {navItems.map((item, i) => (
                  <div key={item.key}>
                    <motion.div
                      initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{
                        duration: 0.6,
                        ease: EASE_EXPO,
                        delay: 0.2 + i * 0.08,
                      }}
                      className="text-center"
                    >
                      {item.hasChildren ? (
                        <button
                          type="button"
                          onClick={() => setServicesExpanded(!servicesExpanded)}
                          className="group inline-flex items-center gap-2 py-2"
                          aria-expanded={servicesExpanded}
                        >
                          <span className="text-4xl sm:text-6xl md:text-7xl font-bold uppercase text-[#1A1A1A] tracking-[-0.02em] group-hover:text-[--color-primary] transition-colors duration-200">
                            {item.label}
                          </span>
                          {/* Brand dot accent — like Buzzworthy's red dots */}
                          <span className="inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[--color-primary] flex-shrink-0 mb-1" />
                          <ChevronDown
                            className={cn(
                              "size-5 sm:size-7 text-[--color-primary] transition-transform duration-300",
                              servicesExpanded && "rotate-180",
                            )}
                          />
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          className="group inline-flex items-center gap-2 py-2"
                          onClick={onClose}
                        >
                          <span className="text-4xl sm:text-6xl md:text-7xl font-bold uppercase text-[#1A1A1A] tracking-[-0.02em] group-hover:text-[--color-primary] transition-colors duration-200">
                            {item.label}
                          </span>
                          {/* Brand dot accent */}
                          <span className="inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[--color-primary] flex-shrink-0 mb-1" />
                        </Link>
                      )}
                    </motion.div>

                    {/* Expandable services sub-menu */}
                    {item.hasChildren && (
                      <AnimatePresence>
                        {servicesExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: EASE_EXPO }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col items-center gap-1 pb-3 pt-1">
                              {services.map((service, si) => {
                                const name = locale === "id" ? service.name_id : service.name_en;
                                const slug = locale === "id" ? service.slug_id : service.slug_en;
                                const servicesPath = locale === "id" ? "layanan" : "services";
                                return (
                                  <motion.div
                                    key={service.key}
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: si * 0.04, duration: 0.3, ease: EASE_EXPO }}
                                  >
                                    <Link
                                      href={`/${locale}/${servicesPath}/${slug}`}
                                      className="flex items-center gap-2 py-1.5 text-sm sm:text-base text-[#1A1A1A]/60 hover:text-[--color-primary] transition-colors duration-150"
                                      onClick={onClose}
                                    >
                                      <span className="font-mono text-xs text-[--color-primary]">
                                        {service.number}
                                      </span>
                                      {name}
                                    </Link>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom: CTA + copyright — like Buzzworthy's social row */}
              <motion.div
                className="flex flex-col items-center gap-6 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_EXPO, delay: 0.6 }}
              >
                <Button
                  href={getLocalizedPath("quote", locale)}
                  size="lg"
                  onClick={onClose}
                >
                  {dictionary.buttons.requestQuote}
                </Button>

                {/* WhatsApp + Email inline */}
                <div className="flex items-center gap-6 text-xs uppercase tracking-[0.15em] text-[#1A1A1A]/40">
                  <a
                    href="https://wa.me/6281284596614"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[--color-primary] transition-colors"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="mailto:services@ugc.co.id"
                    className="hover:text-[--color-primary] transition-colors"
                  >
                    Email
                  </a>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export { MobileNav, type MobileNavProps };
