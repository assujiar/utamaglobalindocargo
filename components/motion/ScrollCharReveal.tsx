"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils/cn";

interface ScrollCharRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  /** Per-character stagger offset in scroll progress (0-1). Default 0.03 */
  stagger?: number;
  /** Scroll-driven y offset per character in px */
  yOffset?: number;
  /** Scroll-driven scale range */
  scaleRange?: { from: number; to: number };
  /** Color transition: dim → bright */
  colorFrom?: string;
  colorTo?: string;
  disabled?: boolean;
}

/**
 * Buzzworthy-style per-character scroll-driven text animation.
 * Each character has its own continuously updating transform3d + scale + color
 * as the user scrolls. Unlike SplitTextReveal (entrance-only), this component
 * keeps updating transforms the entire time the element is in the viewport.
 */
export function ScrollCharReveal({
  children,
  className,
  as: Tag = "h2",
  stagger = 0.03,
  yOffset = 30,
  scaleRange = { from: 0.92, to: 1 },
  colorFrom = "rgba(255,255,255,0.2)",
  colorTo = "rgba(255,255,255,1)",
  disabled = false,
}: ScrollCharRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled || !containerRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const isMobile = window.innerWidth < 768;

    gsap.registerPlugin(ScrollTrigger);

    const chars = containerRef.current.querySelectorAll<HTMLElement>(".sc-char");
    if (!chars.length) return;

    // Mobile: simple opacity fade-in only, no per-char offsets
    if (isMobile) {
      gsap.set(chars, { opacity: 0.3, color: colorFrom });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "top 40%",
          scrub: 0.4,
        },
      });

      tl.to(chars, {
        opacity: 1,
        color: colorTo,
        stagger: stagger,
        duration: 1,
        ease: "power2.out",
      });

      return () => {
        tl.kill();
      };
    }

    // Desktop: full per-character scroll-driven animation
    const totalChars = chars.length;

    chars.forEach((char, i) => {
      const progress = i / totalChars;
      gsap.set(char, {
        y: yOffset + progress * yOffset * 0.5,
        scale: scaleRange.from,
        color: colorFrom,
        opacity: 0.3,
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%",
        end: "top 20%",
        scrub: 0.4,
      },
    });

    tl.to(chars, {
      y: 0,
      scale: scaleRange.to,
      color: colorTo,
      opacity: 1,
      stagger: stagger,
      duration: 1,
      ease: "power2.out",
    });

    // Second phase: gentle continuous parallax after reveal (desktop only)
    chars.forEach((char, i) => {
      const speed = 0.02 + (i % 3) * 0.01;
      gsap.to(char, {
        y: -(window.innerHeight * speed),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === containerRef.current)
        .forEach((st) => st.kill());
    };
  }, [disabled, stagger, yOffset, scaleRange, colorFrom, colorTo]);

  // Split into characters, preserving spaces
  const renderChars = () => {
    const words = children.split(" ");
    return words.map((word, wi) => (
      <span key={wi} className="inline-block whitespace-nowrap">
        {word.split("").map((char, ci) => (
          <span
            key={`${wi}-${ci}`}
            className="sc-char inline-block will-change-transform"
            style={{ transformOrigin: "0% 100%" }}
          >
            {char}
          </span>
        ))}
        {wi < words.length - 1 && (
          <span className="inline-block">&nbsp;</span>
        )}
      </span>
    ));
  };

  return (
    <div ref={containerRef}>
      <Tag className={cn(className)}>{renderChars()}</Tag>
    </div>
  );
}
