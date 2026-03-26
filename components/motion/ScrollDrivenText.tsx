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
}

/**
 * Oversized decorative background text that translates horizontally
 * as the user scrolls — like Buzzworthy's "attitude" text.
 * Uses GSAP ScrollTrigger with scrub for continuous transform updates.
 */
export function ScrollDrivenText({
  text,
  className,
  speed = 0.3,
  direction = "left",
}: ScrollDrivenTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const distance = window.innerWidth * speed;
    const xFrom = direction === "left" ? 0 : -distance;
    const xTo = direction === "left" ? -distance : 0;

    gsap.set(textRef.current, { x: xFrom });

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

    return () => {
      tween.kill();
    };
  }, [speed, direction]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none select-none overflow-hidden absolute inset-0",
        className,
      )}
      aria-hidden="true"
    >
      <div
        ref={textRef}
        className="will-change-transform whitespace-nowrap"
      >
        <span
          className="block text-[18vw] md:text-[14vw] font-bold leading-none tracking-tighter opacity-[0.03]"
          style={{ fontFamily: "var(--font-display, var(--font-primary))" }}
        >
          {text}
        </span>
      </div>
    </div>
  );
}
