"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { getLocalizedPath } from "@/lib/utils/routes";
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

  // Language toggle: swap id<->en in current path
  const alternateLocale: Locale = locale === "id" ? "en" : "id";
  const alternatePathname = pathname.replace(
    new RegExp(`^/${locale}`),
    `/${alternateLocale}`,
  );

  const isActive = (routeKey: string) => {
    const path = getLocalizedPath(routeKey, locale);
    if (routeKey === "home") return pathname === path;
    return pathname.startsWith(path);
  };

  const navLinkClasses = (routeKey: string) =>
    cn(
      "text-sm font-medium transition-colors duration-150",
      "hover:text-[--color-primary]",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]",
      isActive(routeKey)
        ? "text-[--color-primary]"
        : "text-[--color-text-primary]",
    );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300",
          scrolled ? "glass-nav" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-full max-w-[--max-width-layout] items-center justify-between px-5 sm:px-10">
          {/* Logo */}
          <Link
            href={getLocalizedPath("home", locale)}
            className="flex items-center gap-2 shrink-0"
            aria-label="UGC Logistics — Home"
          >
            {/* TODO: Replace with real UGC logo SVG from brand assets */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              className="shrink-0"
              aria-hidden="true"
            >
              <rect width="40" height="40" rx="8" fill="var(--color-primary)" />
              <text
                x="50%"
                y="54%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="700"
                fontFamily="var(--font-primary)"
              >
                UGC
              </text>
            </svg>
            <span className="text-lg font-semibold text-[--color-text-primary] hidden sm:inline">
              UGC Logistics
            </span>
          </Link>

          {/* Desktop Nav — center */}
          {!minimal && (
            <nav
              className="hidden sm:flex items-center gap-8"
              aria-label="Main navigation"
            >
              {/* Services with MegaMenu */}
              <div
                className="relative"
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

              {/* Insights — Phase 2, rendered as disabled placeholder */}
              <span
                className="text-sm font-medium text-[--color-text-secondary] cursor-default"
                title="Coming soon"
              >
                {dictionary.nav.insights}
              </span>
            </nav>
          )}

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <Link
              href={alternatePathname}
              className="text-sm font-medium text-[--color-text-secondary] hover:text-[--color-text-primary] transition-colors duration-150 uppercase"
              aria-label={`Switch to ${dictionary.common.switchLanguage}`}
            >
              {alternateLocale.toUpperCase()}
            </Link>

            {!minimal && (
              <>
                {/* Track — secondary utility link (desktop only) */}
                <Link
                  href={getLocalizedPath("track", locale)}
                  className={cn(
                    "hidden sm:inline-flex text-sm font-medium text-[--color-text-secondary] hover:text-[--color-text-primary] transition-colors duration-150",
                  )}
                >
                  {dictionary.nav.track}
                </Link>

                {/* Request Quote CTA (desktop only) */}
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
                  className="sm:hidden flex items-center justify-center size-10 -mr-2 text-[--color-text-primary]"
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

      {/* Spacer so content doesn't sit behind fixed header */}
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
