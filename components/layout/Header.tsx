"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { getLocalizedPath, getAlternatePathFromUrl } from "@/lib/utils/routes";
import { services } from "@/lib/content/services";
import type { Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/Button";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";

interface HeaderProps {
  locale: Locale;
  dictionary: {
    nav: Record<string, string>;
    buttons: Record<string, string>;
    common: Record<string, string>;
  };
  minimal?: boolean;
}

function Header({ locale, dictionary, minimal = false }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 64);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMegaMenu = useCallback(() => setMegaMenuOpen(false), []);

  // Language toggle: map to correct alternate locale path
  const alternateLocale: Locale = locale === "id" ? "en" : "id";
  const alternatePathname = getAlternatePathFromUrl(pathname, locale);

  const isActive = (routeKey: string) => {
    const path = getLocalizedPath(routeKey, locale);
    if (routeKey === "home") return pathname === path;
    return pathname.startsWith(path);
  };

  const navLinkClasses = (routeKey: string) =>
    cn(
      "text-sm font-medium transition-colors duration-200",
      "hover:text-[--color-primary]",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]",
      isActive(routeKey)
        ? "text-[--color-primary]"
        : scrolled
          ? "text-[--color-text-primary]"
          : "text-[--color-text-secondary]",
    );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300",
          scrolled
            ? "glass-nav shadow-[0_1px_0_rgba(255,70,0,0.06)]"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-full max-w-[--max-width-layout] items-center justify-between px-5 sm:px-10">
          {/* Logo */}
          <Link
            href={getLocalizedPath("home", locale)}
            className="flex items-center gap-2.5 shrink-0 group"
            aria-label="UGC Logistics"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              className="shrink-0"
              aria-hidden="true"
            >
              <rect
                width="36"
                height="36"
                rx="10"
                fill="var(--color-primary)"
                className="transition-shadow duration-200 group-hover:drop-shadow-[0_0_12px_rgba(255,70,0,0.4)]"
              />
              <text
                x="50%"
                y="54%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="700"
                fontFamily="var(--font-primary)"
                letterSpacing="0.05em"
              >
                UGC
              </text>
            </svg>
            <span className={cn(
              "text-base font-semibold hidden sm:inline transition-colors duration-200",
              scrolled ? "text-[--color-text-primary]" : "text-[--color-text-secondary]",
            )}>
              UGC Logistics
            </span>
          </Link>

          {/* Desktop Nav */}
          {!minimal && (
            <nav
              className="hidden sm:flex items-center gap-8"
              aria-label="Main navigation"
            >
              {/* Services with MegaMenu */}
              <div
                className="relative z-50"
                onMouseEnter={() => setMegaMenuOpen(true)}
                onMouseLeave={closeMegaMenu}
              >
                <Link
                  href={getLocalizedPath("services", locale)}
                  className={navLinkClasses("services")}
                >
                  {dictionary.nav.services}
                </Link>
                <MegaMenu
                  open={megaMenuOpen}
                  locale={locale}
                  services={services}
                  viewAllLabel={
                    locale === "id"
                      ? "Lihat semua layanan"
                      : "View all services"
                  }
                  onClose={closeMegaMenu}
                />
              </div>

              <Link
                href={getLocalizedPath("about", locale)}
                className={navLinkClasses("about")}
              >
                {dictionary.nav.about}
              </Link>

              {/* Insights: Phase 2 placeholder */}
              <span
                className="text-sm font-medium text-[--color-text-muted] cursor-default"
                title="Coming soon"
              >
                {dictionary.nav.insights}
              </span>
            </nav>
          )}

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Language toggle */}
            <Link
              href={alternatePathname}
              className={cn(
                "label-text text-[11px] px-2 py-1 rounded-md transition-colors duration-200",
                "hover:text-[--color-primary] hover:bg-[rgba(255,70,0,0.08)]",
                scrolled ? "text-[--color-text-secondary]" : "text-[--color-text-muted]",
              )}
              aria-label={`Switch to ${dictionary.common.switchLanguage}`}
            >
              {alternateLocale.toUpperCase()}
            </Link>

            {!minimal && (
              <>
                {/* Track link: desktop */}
                <Link
                  href={getLocalizedPath("track", locale)}
                  className={cn(
                    "hidden sm:inline-flex text-sm font-medium transition-colors duration-200",
                    "hover:text-[--color-primary]",
                    scrolled ? "text-[--color-text-secondary]" : "text-[--color-text-muted]",
                  )}
                >
                  {dictionary.nav.track}
                </Link>

                {/* Quote CTA: desktop */}
                <Button
                  href={getLocalizedPath("quote", locale)}
                  size="sm"
                  className="hidden sm:inline-flex"
                >
                  {dictionary.nav.quote}
                </Button>

                {/* Mobile hamburger */}
                <button
                  type="button"
                  className={cn(
                    "sm:hidden flex items-center justify-center size-10 -mr-2 transition-colors duration-200",
                    scrolled ? "text-[--color-text-primary]" : "text-[--color-text-secondary]",
                  )}
                  onClick={() => setMobileNavOpen(true)}
                  aria-label="Open menu"
                  aria-expanded={mobileNavOpen}
                >
                  <Menu className="size-6" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16" aria-hidden="true" />

      {/* Mobile Nav Overlay */}
      {!minimal && (
        <MobileNav
          open={mobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
          locale={locale}
          dictionary={dictionary}
          services={services}
        />
      )}
    </>
  );
}

export { Header, type HeaderProps };
