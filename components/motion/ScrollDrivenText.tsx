"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils/cn";

interface ScrollDrivenTextProps {
  text: string;
  className?: string;
  speed?: number;
  direction?: "left" | "right";
  /** Split into individual characters for per-char scroll transforms */
  splitChars?: boolean;
}

/**
 * Oversized decorative background text that translates horizontally
 * as the user scrolls — like Buzzworthy's "attitude" text.
 * When splitChars is true, each character gets its own scroll-driven
 * translate3d + color transition (matching devtools behavior).
 */
export function ScrollDrivenText({
  text,
  className,
  speed = 0.3,
  direction = "left",
  splitChars = true,
}: ScrollDrivenTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    // Skip on mobile — oversized text causes overflow and visual noise
    if (window.innerWidth < 768) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const distance = window.innerWidth * speed;
    const xFrom = direction === "left" ? 0 : -distance;
    const xTo = direction === "left" ? -distance : 0;

    gsap.set(textRef.current, { x: xFrom });

    // Main horizontal movement
    const tween = gsap.to(textRef.current, {
      x: xTo,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    // Per-character scroll-driven transforms
    const charTweens: gsap.core.Tween[] = [];
    if (splitChars) {
      const chars = textRef.current.querySelectorAll<HTMLElement>(".sdt-char");
      chars.forEach((char, i) => {
        const charSpeed = 0.015 + (i % 4) * 0.008;
        const yDir = i % 2 === 0 ? 1 : -1;

        const ct = gsap.to(char, {
          y: yDir * window.innerHeight * charSpeed,
          scale: 1 + (i % 3) * 0.02,
          color: `rgba(255,255,255,${0.03 + (i % 3) * 0.01})`,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.4 + (i % 3) * 0.1,
          },
        });
        charTweens.push(ct);
      });
    }

    return () => {
      tween.kill();
      charTweens.forEach((ct) => ct.kill());
    };
  }, [speed, direction, splitChars]);

  const renderText = () => {
    if (!splitChars) {
      return (
        <span
          className="block text-[18vw] md:text-[14vw] font-bold leading-none tracking-tighter opacity-[0.03]"
          style={{ fontFamily: "var(--font-display, var(--font-primary))" }}
        >
          {text}
        </span>
      );
    }

    return (
      <span
        className="block text-[18vw] md:text-[14vw] font-bold leading-none tracking-tighter"
        style={{ fontFamily: "var(--font-display, var(--font-primary))" }}
      >
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="sdt-char inline-block will-change-transform"
            style={{
              color: "rgba(255,255,255,0.03)",
              transformOrigin: "50% 100%",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none select-none overflow-hidden absolute inset-0 hidden md:block",
        className,
      )}
      aria-hidden="true"
    >
      <div
        ref={textRef}
        className="will-change-transform whitespace-nowrap"
      >
        {renderText()}
      </div>
    </div>
  );
}
