"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";
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

  const linkClasses =
    "flex items-center min-h-12 px-6 text-lg font-medium text-[--color-text-inverse] hover:text-[--color-primary] transition-colors duration-150";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] bg-[#09090B] flex flex-col"
          style={{ backgroundColor: "#09090B" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Close button */}
          <div className="flex items-center justify-end h-16 px-5">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center size-10 text-[--color-text-inverse]"
              aria-label="Close menu"
            >
              <X className="size-6" />
            </button>
          </div>

          {/* Nav content — staggered link entrance */}
          <motion.nav
            className="flex flex-col flex-1 overflow-y-auto pb-8"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
            }}
            aria-label="Mobile navigation"
          >
            <motion.div
              variants={{
                open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
                closed: { opacity: 0, x: 30, transition: { duration: 0.15 } },
              }}
            >
              <Link
                href={getLocalizedPath("home", locale)}
                className={linkClasses}
                onClick={onClose}
              >
                {dictionary.nav.home}
              </Link>
            </motion.div>

            {/* Services with expandable sub-items */}
            <motion.div
              variants={{
                open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
                closed: { opacity: 0, x: 30, transition: { duration: 0.15 } },
              }}
            >
            <button
              type="button"
              onClick={() => setServicesExpanded(!servicesExpanded)}
              className={cn(
                linkClasses,
                "justify-between w-full text-left",
              )}
              aria-expanded={servicesExpanded}
            >
              <span>{dictionary.nav.services}</span>
              <ChevronDown
                className={cn(
                  "size-5 transition-transform duration-200",
                  servicesExpanded && "rotate-180",
                )}
              />
            </button>

            <AnimatePresence>
              {servicesExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pl-6 flex flex-col gap-1 pb-2">
                    {services.map((service) => {
                      const name =
                        locale === "id"
                          ? service.name_id
                          : service.name_en;
                      const slug =
                        locale === "id"
                          ? service.slug_id
                          : service.slug_en;
                      const servicesPath =
                        locale === "id" ? "layanan" : "services";
                      return (
                        <Link
                          key={service.key}
                          href={`/${locale}/${servicesPath}/${slug}`}
                          className="flex items-center min-h-11 px-6 text-base text-[--color-text-secondary] hover:text-[--color-text-inverse] transition-colors duration-150"
                          onClick={onClose}
                        >
                          <span className="font-mono text-xs text-[--color-primary] mr-3">
                            {service.number}
                          </span>
                          {name}
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            </motion.div>

            <motion.div
              variants={{
                open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
                closed: { opacity: 0, x: 30, transition: { duration: 0.15 } },
              }}
            >
              <Link
                href={getLocalizedPath("about", locale)}
                className={linkClasses}
                onClick={onClose}
              >
                {dictionary.nav.about}
              </Link>
            </motion.div>

            <motion.div
              variants={{
                open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
                closed: { opacity: 0, x: 30, transition: { duration: 0.15 } },
              }}
            >
              {/* Insights — Phase 2 placeholder */}
              <span className={cn(linkClasses, "text-[--color-text-secondary] cursor-default")}>
                {dictionary.nav.insights}
              </span>
            </motion.div>

            <motion.div
              variants={{
                open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
                closed: { opacity: 0, x: 30, transition: { duration: 0.15 } },
              }}
            >
              <Link
                href={getLocalizedPath("track", locale)}
                className={linkClasses}
                onClick={onClose}
              >
                {dictionary.nav.track}
              </Link>
            </motion.div>

            <motion.div
              variants={{
                open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
                closed: { opacity: 0, x: 30, transition: { duration: 0.15 } },
              }}
            >
              <Link
                href={getLocalizedPath("contact", locale)}
                className={linkClasses}
                onClick={onClose}
              >
                {dictionary.nav.contact}
              </Link>
            </motion.div>

            {/* Spacer */}
            <div className="flex-1 min-h-8" />

            {/* Quote CTA — prominent at bottom */}
            <motion.div
              className="px-6 pt-4"
              variants={{
                open: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                closed: { opacity: 0, y: 20, transition: { duration: 0.15 } },
              }}
            >
              <Button
                href={getLocalizedPath("quote", locale)}
                size="lg"
                className="w-full justify-center"
                onClick={onClose}
              >
                {dictionary.buttons.requestQuote}
              </Button>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { MobileNav, type MobileNavProps };
