"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Layanan", href: "/#layanan" },
  { label: "Studi Kasus", href: "/case-studies" },
  { label: "Kontak", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-logistics-orange flex items-center justify-center">
            <span className="text-white font-black text-sm leading-none">U</span>
          </div>
          <span
            className={`font-black text-sm md:text-base uppercase tracking-wider transition-colors duration-300 ${
              scrolled ? "text-carbon-dark" : "text-white"
            }`}
          >
            Utama<span className="text-logistics-orange">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 hover:text-logistics-orange ${
                scrolled ? "text-carbon-dark/60" : "text-white/60"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="px-5 py-2.5 bg-logistics-orange text-white text-xs font-bold uppercase tracking-widest hover:bg-logistics-orange/90 transition-colors duration-300"
          >
            Mulai Konsultasi
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-[2px] transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[5px]" : ""
            } ${scrolled ? "bg-carbon-dark" : "bg-white"}`}
          />
          <span
            className={`block w-6 h-[2px] transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            } ${scrolled ? "bg-carbon-dark" : "bg-white"}`}
          />
          <span
            className={`block w-6 h-[2px] transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[5px]" : ""
            } ${scrolled ? "bg-carbon-dark" : "bg-white"}`}
          />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="md:hidden bg-carbon-dark/98 backdrop-blur-lg">
          <nav className="flex flex-col px-6 py-8 gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-white text-lg font-bold uppercase tracking-widest hover:text-logistics-orange transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-4 inline-block px-6 py-3 bg-logistics-orange text-white text-sm font-bold uppercase tracking-widest text-center"
            >
              Mulai Konsultasi
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
