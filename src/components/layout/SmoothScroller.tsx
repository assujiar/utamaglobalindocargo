"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollerProps {
  children: React.ReactNode;
}

export default function SmoothScroller({ children }: SmoothScrollerProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Instansiasi Lenis dengan parameter redaman matematis
    // untuk translasi pergerakan gulir inersia sinematik
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
      autoRaf: false, // RAF dikelola manual via GSAP ticker
    });

    lenisRef.current = lenis;

    // SINKRONISASI KRITIS: Hubungkan Lenis scroll events ke ScrollTrigger
    // Setiap perpindahan piksel Lenis memicu evaluasi ulang ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Ikat Lenis.raf ke denyut internal GSAP ticker
    // time dari GSAP dalam detik, Lenis membutuhkan milidetik
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    // IMPERATIF: Matikan lag smoothing GSAP
    // Tanpa ini, GSAP akan mencoba koreksi frame rate yang menghancurkan
    // keselarasan orkestrasi waktu Lenis
    gsap.ticker.lagSmoothing(0);

    // Pembersihan degradasi memori (memory cleanup)
    return () => {
      // Hapus ticker callback dari GSAP
      gsap.ticker.remove(tickerCallback);

      // Dekonstruksi semua instance ScrollTrigger
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Musnahkan antarmuka Lenis
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
