"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils/cn";

interface TextRevealByLineProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  staggerDelay?: number;
  duration?: number;
  disabled?: boolean;
  scrub?: boolean;
}

export function TextRevealByLine({
  children,
  className,
  as: Tag = "h2",
  staggerDelay = 0.12,
  duration = 0.8,
  disabled = false,
  scrub = false,
}: TextRevealByLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (disabled || hasAnimated.current || !containerRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const words = containerRef.current.querySelectorAll(".reveal-word");
    if (!words.length) return;

    gsap.set(words, {
      clipPath: "inset(0 0 100% 0)",
      y: 30,
      opacity: 0,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        end: scrub ? "bottom 40%" : undefined,
        scrub: scrub ? 0.8 : false,
        once: !scrub,
      },
    });

    tl.to(words, {
      clipPath: "inset(0 0 0% 0)",
      y: 0,
      opacity: 1,
      duration,
      stagger: staggerDelay,
      ease: "power4.out",
    });

    hasAnimated.current = true;

    return () => {
      tl.kill();
    };
  }, [disabled, staggerDelay, duration, scrub]);

  const wordElements = children.split(" ").map((word, i) => (
    <span key={i} className="reveal-word inline-block will-change-transform">
      {word}
      {i < children.split(" ").length - 1 && "\u00A0"}
    </span>
  ));

  return (
    <div ref={containerRef}>
      <Tag className={cn(className)}>{wordElements}</Tag>
    </div>
  );
}
