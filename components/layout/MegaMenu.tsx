"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
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

  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px]",
        "rounded-lg bg-white border border-[--color-border] shadow-md",
        "p-6 grid grid-cols-2 gap-4",
        "animate-in fade-in duration-150",
      )}
      role="menu"
      onMouseLeave={onClose}
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
          <Link
            key={service.key}
            href={href}
            className={cn(
              "flex gap-3 rounded-sm p-3 -m-1 transition-colors duration-150",
              "hover:bg-[--color-primary-subtle]",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]",
            )}
            role="menuitem"
            onClick={onClose}
          >
            <span className="font-mono text-sm font-medium text-[--color-primary] shrink-0 pt-0.5">
              {service.number}
            </span>
            <div className="min-w-0">
              <span className="text-sm font-semibold text-[--color-text-primary] block">
                {name}
              </span>
              <span className="text-xs text-[--color-text-secondary] line-clamp-1">
                {tagline}
              </span>
            </div>
          </Link>
        );
      })}

      {/* View all services link */}
      <div className="col-span-2 pt-3 mt-2 border-t border-[--color-border]">
        <Link
          href={`/${locale}/${locale === "id" ? "layanan" : "services"}`}
          className="text-sm font-medium text-[--color-primary] hover:underline"
          role="menuitem"
          onClick={onClose}
        >
          {viewAllLabel} →
        </Link>
      </div>
    </div>
  );
}

export { MegaMenu, type MegaMenuProps };
