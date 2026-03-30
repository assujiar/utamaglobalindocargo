"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/type";
import { services } from "@/data/services";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Header({ locale, dict }: HeaderProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
    setIsServicesOpen(false);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    if (isMobileOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isMobileOpen, closeMobile]);

  const otherLocale = locale === "id" ? "en" : "id";
  const prefix = `/${locale}`;

  const navLinks = [
    { href: `${prefix}`, label: dict.nav.home },
    { href: `${prefix}/services`, label: dict.nav.services, hasDropdown: true },
    { href: `${prefix}/industries`, label: dict.nav.industries },
    { href: `${prefix}/case-studies`, label: dict.nav.caseStudies },
    { href: `${prefix}/about`, label: dict.nav.about },
    { href: `${prefix}/faq`, label: dict.nav.faq },
  ];

  const mobileMenu = isMobileOpen && mounted
    ? createPortal(
        <div
          className="lg:hidden fixed inset-0 bg-carbon-dark overflow-y-auto"
          style={{ zIndex: 9999 }}
          role="dialog"
          aria-modal="true"
        >
          {/* Mobile menu header */}
          <div className="flex items-center justify-between px-6 h-16">
            <Link
              href={prefix}
              className="flex items-center gap-3 text-white font-black text-lg tracking-tight"
              onClick={closeMobile}
            >
              <span className="w-8 h-8 bg-logistics-orange flex items-center justify-center text-sm font-black">
                U
              </span>
              <span>UGC</span>
            </Link>
            <button
              className="w-10 h-10 flex items-center justify-center text-white"
              onClick={closeMobile}
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <div className="px-6 py-8 flex flex-col gap-2">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className="block py-3 text-lg text-white/80 hover:text-white font-medium transition-colors"
                  onClick={link.hasDropdown ? undefined : closeMobile}
                >
                  {link.label}
                </Link>
                {link.hasDropdown && (
                  <div className="pl-4 flex flex-col gap-1 mt-1 mb-2">
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`${prefix}/services/${service.slug}`}
                        className="block py-2 text-sm text-white/50 hover:text-white transition-colors"
                        onClick={closeMobile}
                      >
                        {service.name[locale]}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <hr className="border-white/10 my-4" />

            <Link
              href={`/${otherLocale}`}
              className="py-3 text-sm text-white/50 hover:text-white transition-colors"
              onClick={closeMobile}
            >
              {dict.common.language}
            </Link>

            <Link
              href={`${prefix}/contact`}
              className="mt-4 bg-logistics-orange text-white px-6 py-4 text-center font-bold text-sm uppercase tracking-wider hover:bg-logistics-orange/90 transition-colors"
              onClick={closeMobile}
            >
              {dict.nav.contact}
            </Link>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-carbon-dark/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href={prefix}
            className="flex items-center gap-3 text-white font-black text-lg tracking-tight"
            onClick={closeMobile}
          >
            <span className="w-8 h-8 bg-logistics-orange flex items-center justify-center text-sm font-black">
              U
            </span>
            <span>
              UGC<span className="hidden sm:inline"> Logistics</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.href}
                  className="relative group"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <Link
                    href={link.href}
                    className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors font-medium hover-underline-slide"
                  >
                    {link.label}
                    <svg
                      className="inline-block ml-1 w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  {isServicesOpen && (
                    <div className="absolute top-full left-0 pt-2">
                      <div className="bg-carbon-dark border border-white/10 py-2 min-w-[280px] shadow-xl">
                        {services.map((service) => (
                          <Link
                            key={service.slug}
                            href={`${prefix}/services/${service.slug}`}
                            className="block px-5 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors hover-line-extend"
                          >
                            {service.name[locale]}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors font-medium hover-underline-slide"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop right side */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={`/${otherLocale}`}
              className="text-sm text-white/50 hover:text-white transition-colors"
              aria-label={`Switch to ${dict.common.language}`}
            >
              {dict.common.language}
            </Link>
            <Link
              href={`${prefix}/contact`}
              className="bg-logistics-orange text-white px-5 py-2.5 text-sm font-bold transition-colors hover-sweep-fill"
            >
              {dict.nav.contact}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden relative w-10 h-10 flex items-center justify-center text-white"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-expanded={isMobileOpen}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          >
            <span className="sr-only">{isMobileOpen ? "Close" : "Menu"}</span>
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 bg-white transition-transform duration-300 ${
                  isMobileOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-white transition-opacity duration-300 ${
                  isMobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-white transition-transform duration-300 ${
                  isMobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile menu portaled to document.body to escape header stacking context */}
      {mobileMenu}
    </>
  );
}
