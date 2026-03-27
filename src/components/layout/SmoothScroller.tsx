"use client";

import { useEffect, useRef } from "react";

interface SmoothScrollerProps {
  children: React.ReactNode;
}

export default function SmoothScroller({ children }: SmoothScrollerProps) {
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    // Code splitting: Lazy import GSAP + Lenis
    // Paket GSAP/Lenis hanya di-download setelah halaman selesai render
    // Ini menjaga TTFB dan LCP tetap optimal — zero blocking scripts
    async function initScrollEngine() {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      // Impor CSS Lenis
      await import("lenis/dist/lenis.css");

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 2,
        autoRaf: false,
      });

      // SINKRONISASI KRITIS: Lenis → ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      // Ikat Lenis.raf ke GSAP ticker
      const tickerCallback = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);

      // Matikan GSAP lag smoothing
      gsap.ticker.lagSmoothing(0);

      // Cleanup saat unmount
      const cleanup = () => {
        gsap.ticker.remove(tickerCallback);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        lenis.destroy();
      };

      // Simpan cleanup di window untuk akses saat unmount
      (window as unknown as Record<string, () => void>).__cleanupScroll =
        cleanup;
    }

    initScrollEngine();

    return () => {
      const cleanup = (
        window as unknown as Record<string, (() => void) | undefined>
      ).__cleanupScroll;
      if (cleanup) cleanup();
    };
  }, []);

  return <>{children}</>;
}
