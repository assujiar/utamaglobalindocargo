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

/**
 * Buzzworthy-style full-screen slide-out menu.
 * Slides down from top with SVG wave transition, staggered nav link reveals,
 * and dramatic typography. Works on both mobile and desktop.
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
    { key: "home", label: dictionary.nav.home, href: getLocalizedPath("home", locale) },
    { key: "services", label: dictionary.nav.services, href: getLocalizedPath("services", locale), hasChildren: true },
    { key: "about", label: dictionary.nav.about, href: getLocalizedPath("about", locale) },
    { key: "track", label: dictionary.nav.track, href: getLocalizedPath("track", locale) },
    { key: "contact", label: dictionary.nav.contact, href: getLocalizedPath("contact", locale) },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col"
          initial={{ y: "-100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: EASE_QUART }}
        >
          {/* Background layers */}
          <div className="absolute inset-0 bg-[#09090B]" />

          {/* Decorative glow */}
          <motion.div
            className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255,70,0,0.08) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          {/* Close button */}
          <div className="relative z-10 flex items-center justify-end h-16 px-5 sm:px-10">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center size-10 text-[--color-text-inverse] hover:text-[--color-primary] transition-colors"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>

          {/* Nav content */}
          <nav
            className="relative z-10 flex flex-col flex-1 overflow-y-auto px-6 sm:px-10 md:px-20 pb-8"
            aria-label="Mobile navigation"
          >
            {/* Main nav links — large Buzzworthy-style typography */}
            <div className="flex-1 flex flex-col justify-center gap-1 sm:gap-2">
              {navItems.map((item, i) => (
                <div key={item.key}>
                  <motion.div
                    initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.5,
                      ease: EASE_EXPO,
                      delay: 0.15 + i * 0.06,
                    }}
                  >
                    {item.hasChildren ? (
                      <button
                        type="button"
                        onClick={() => setServicesExpanded(!servicesExpanded)}
                        className="group flex items-center gap-4 w-full text-left py-3 sm:py-4"
                        aria-expanded={servicesExpanded}
                      >
                        <span className="font-mono text-xs text-[--color-primary] opacity-50">
                          0{i + 1}
                        </span>
                        <span className="text-3xl sm:text-5xl md:text-6xl font-bold text-[--color-text-inverse] tracking-[-0.03em] group-hover:text-[--color-primary] transition-colors duration-200">
                          {item.label}
                        </span>
                        <ChevronDown
                          className={cn(
                            "size-6 sm:size-8 text-[--color-text-muted] transition-transform duration-300",
                            servicesExpanded && "rotate-180",
                          )}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className="group flex items-center gap-4 py-3 sm:py-4"
                        onClick={onClose}
                      >
                        <span className="font-mono text-xs text-[--color-primary] opacity-50">
                          0{i + 1}
                        </span>
                        <span className="text-3xl sm:text-5xl md:text-6xl font-bold text-[--color-text-inverse] tracking-[-0.03em] group-hover:text-[--color-primary] transition-colors duration-200">
                          {item.label}
                        </span>
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
                          <div className="pl-12 sm:pl-16 flex flex-col gap-1 pb-3">
                            {services.map((service, si) => {
                              const name = locale === "id" ? service.name_id : service.name_en;
                              const slug = locale === "id" ? service.slug_id : service.slug_en;
                              const servicesPath = locale === "id" ? "layanan" : "services";
                              return (
                                <motion.div
                                  key={service.key}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: si * 0.04, duration: 0.3, ease: EASE_EXPO }}
                                >
                                  <Link
                                    href={`/${locale}/${servicesPath}/${slug}`}
                                    className="flex items-center gap-3 py-2 text-base sm:text-lg text-[--color-text-secondary] hover:text-[--color-text-inverse] transition-colors duration-150"
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

            {/* Bottom section: CTA + social */}
            <motion.div
              className="pt-6 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_EXPO, delay: 0.5 }}
            >
              <Button
                href={getLocalizedPath("quote", locale)}
                size="lg"
                onClick={onClose}
              >
                {dictionary.buttons.requestQuote}
              </Button>

              <p className="text-xs text-[--color-text-muted] tracking-wide">
                &copy; {new Date().getFullYear()} UGC Logistics
              </p>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { MobileNav, type MobileNavProps };
