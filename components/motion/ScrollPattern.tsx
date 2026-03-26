"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils/cn";

interface ScrollPatternProps {
  className?: string;
  /** Number of dots/lines in the pattern */
  count?: number;
  /** Pattern type */
  variant?: "dots" | "lines" | "grid";
  /** Scroll speed multiplier */
  speed?: number;
}

/**
 * Decorative scroll-driven background pattern.
 * Each element has its own scroll-linked transform for continuous
 * devtools activity — like Buzzworthy's .scrollPattern elements.
 */
export function ScrollPattern({
  className,
  count = 12,
  variant = "dots",
  speed = 0.1,
}: ScrollPatternProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Skip animations on mobile — decorative only
    if (window.innerWidth < 768) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const elements =
      containerRef.current.querySelectorAll<HTMLElement>(".sp-item");
    const tweens: gsap.core.Tween[] = [];

    elements.forEach((el, i) => {
      const direction = i % 2 === 0 ? 1 : -1;
      const individualSpeed = speed + (i % 4) * 0.03;

      const tw = gsap.to(el, {
        y: direction * window.innerHeight * individualSpeed,
        rotation: direction * (5 + (i % 3) * 3),
        scale: 1 + (i % 3) * 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.3 + (i % 3) * 0.2,
        },
      });
      tweens.push(tw);
    });

    return () => {
      tweens.forEach((tw) => tw.kill());
    };
  }, [count, speed]);

  const renderItems = () => {
    if (variant === "dots") {
      return Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="sp-item absolute will-change-transform rounded-full"
          style={{
            width: 2 + (i % 3) * 2,
            height: 2 + (i % 3) * 2,
            background: "rgba(255, 70, 0, 0.08)",
            top: `${(i / count) * 100}%`,
            left: `${10 + (i * 37) % 80}%`,
          }}
        />
      ));
    }

    if (variant === "lines") {
      return Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="sp-item absolute will-change-transform"
          style={{
            width: 20 + (i % 4) * 15,
            height: 1,
            background: `rgba(255, 70, 0, ${0.03 + (i % 3) * 0.02})`,
            top: `${(i / count) * 100}%`,
            left: `${5 + (i * 31) % 85}%`,
          }}
        />
      ));
    }

    // Grid variant
    return Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        className="sp-item absolute will-change-transform"
        style={{
          width: 1,
          height: 8 + (i % 3) * 6,
          background: "rgba(255, 255, 255, 0.03)",
          top: `${(i / count) * 100}%`,
          left: `${(i * 23) % 95}%`,
        }}
      />
    ));
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      {renderItems()}
    </div>
  );
}
