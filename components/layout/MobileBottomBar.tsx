"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { getLocalizedPath } from "@/lib/utils/routes";
import type { Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/Button";

interface MobileBottomBarProps {
  locale: Locale;
  dictionary: {
    buttons: Record<string, string>;
  };
}

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || "6281284596614";

const WA_TEXT: Record<Locale, string> = {
  id: "Halo UGC, saya tertarik untuk konsultasi pengiriman.",
  en: "Hi UGC, I'd like to discuss shipping requirements.",
};

function MobileBottomBar({ locale, dictionary }: MobileBottomBarProps) {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth < 768);
    }
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Observe a hero sentinel element or fall back to scroll position
  useEffect(() => {
    if (!isMobile) return;

    // Look for a sentinel data attribute placed in hero sections
    const sentinel = document.querySelector("[data-hero-sentinel]");

    if (sentinel) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisible(!entry.isIntersecting);
        },
        { threshold: 0 },
      );
      observer.observe(sentinel);
      return () => observer.disconnect();
    }

    // Fallback: show after scrolling past ~100vh
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  if (!isMobile) return null;

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT[locale])}`;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 sm:hidden",
        "glass-nav h-14 flex items-center justify-between gap-3 px-4",
        "pb-[env(safe-area-inset-bottom)]",
        "transition-transform duration-300 ease-out",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center justify-center gap-2 flex-1",
          "h-10 rounded-sm text-sm font-medium",
          "bg-[#25D366] text-white hover:bg-[#20BD5A] transition-colors duration-150",
        )}
      >
        <MessageCircle className="size-4" />
        <span>WhatsApp</span>
      </a>

      <Button
        href={getLocalizedPath("quote", locale)}
        size="sm"
        className="flex-1 justify-center"
      >
        {dictionary.buttons.requestQuote}
      </Button>
    </div>
  );
}

export { MobileBottomBar, type MobileBottomBarProps };
