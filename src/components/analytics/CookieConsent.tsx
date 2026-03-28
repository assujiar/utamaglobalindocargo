"use client";

import { useState, useSyncExternalStore, useCallback } from "react";

const CONSENT_KEY = "ugc_cookie_consent";

function getConsentSnapshot(): string | null {
  if (typeof window === "undefined") return "unknown";
  return localStorage.getItem(CONSENT_KEY);
}

function getServerSnapshot(): string | null {
  return "unknown";
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

interface CookieConsentProps {
  locale: string;
}

export default function CookieConsent({ locale }: CookieConsentProps) {
  const consent = useSyncExternalStore(subscribe, getConsentSnapshot, getServerSnapshot);
  const [dismissed, setDismissed] = useState(false);
  const isVisible = consent === null && !dismissed;

  const accept = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setDismissed(true);
  }, []);

  const decline = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setDismissed(true);
  }, []);

  if (!isVisible) return null;

  const isEN = locale === "en";

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-carbon-dark border-t border-white/10 p-4 md:p-6"
      role="dialog"
      aria-label={isEN ? "Cookie consent" : "Persetujuan cookie"}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-white/60 flex-1 leading-relaxed">
          {isEN
            ? "This site uses cookies and analytics to improve your experience. By continuing, you agree to our use of cookies."
            : "Situs ini menggunakan cookies dan analitik untuk meningkatkan pengalaman Anda. Dengan melanjutkan, Anda menyetujui penggunaan cookies."}
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/40 border border-white/10 hover:border-white/30 transition-colors"
          >
            {isEN ? "Decline" : "Tolak"}
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-logistics-orange text-white hover:bg-logistics-orange/90 transition-colors"
          >
            {isEN ? "Accept" : "Terima"}
          </button>
        </div>
      </div>
    </div>
  );
}
