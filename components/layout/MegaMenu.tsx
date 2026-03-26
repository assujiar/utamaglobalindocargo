"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import type { Locale } from "@/lib/i18n/config";
import type { ServiceData } from "@/lib/content/services";

interface MegaMenuProps {
  open: boolean;
  locale: Locale;
  services: ServiceData[];
  viewAllLabel: string;
  onClose: () => void;
}

function MegaMenu({
  open,
  locale,
  services,
  viewAllLabel,
  onClose,
}: MegaMenuProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [open, handleEscape]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop overlay — blurs content behind */}
          <motion.div
            className="fixed inset-0 z-40"
            style={{
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dropdown panel with stagger */}
          <motion.div
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] z-50 rounded-xl p-6 grid grid-cols-2 gap-4"
            style={{
              background: "rgba(14, 14, 18, 0.92)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              border: "1px solid rgba(255, 255, 255, 0.10)",
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 70, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
            }}
            role="menu"
            onMouseLeave={onClose}
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: { opacity: 1, y: 0, transition: { staggerChildren: 0.04, delayChildren: 0.05, duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
              closed: { opacity: 0, y: -8, transition: { duration: 0.15 } },
            }}
          >
            {services.map((service) => {
          const name =
            locale === "id" ? service.name_id : service.name_en;
          const tagline =
            locale === "id" ? service.tagline_id : service.tagline_en;
          const slug =
            locale === "id" ? service.slug_id : service.slug_en;
          const servicesPath =
            locale === "id" ? "layanan" : "services";
          const href = `/${locale}/${servicesPath}/${slug}`;

          return (
            <motion.div
              key={service.key}
              variants={{
                open: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
                closed: { opacity: 0, y: 8 },
              }}
            >
              <Link
                href={href}
                className="flex gap-3 rounded-lg p-3 -m-1 transition-all duration-150 hover:bg-[rgba(255,70,0,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]"
                role="menuitem"
                onClick={onClose}
              >
                <span className="font-mono text-sm font-bold text-[--color-primary] shrink-0 pt-0.5">
                  {service.number}
                </span>
                <div className="min-w-0">
                  <span className="text-sm font-semibold text-white block mask-link" data-text={name}>
                    {name}
                  </span>
                  <span className="text-xs text-[rgba(255,255,255,0.55)] line-clamp-1">
                    {tagline}
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}

            {/* View all services link */}
            <motion.div
              className="col-span-2 pt-3 mt-2 border-t border-[rgba(255,255,255,0.08)]"
              variants={{
                open: { opacity: 1, transition: { duration: 0.3, delay: 0.2 } },
                closed: { opacity: 0 },
              }}
            >
              <Link
                href={`/${locale}/${locale === "id" ? "layanan" : "services"}`}
                className="text-sm font-semibold text-[--color-primary] hover:text-[--color-accent-warm] transition-colors duration-150"
                role="menuitem"
                onClick={onClose}
              >
                {viewAllLabel} →
              </Link>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export { MegaMenu, type MegaMenuProps };
