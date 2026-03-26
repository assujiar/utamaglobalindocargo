"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils/cn";

interface SplitTextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  type?: "chars" | "words";
  stagger?: number;
  duration?: number;
  scrub?: boolean;
  disabled?: boolean;
}

export function SplitTextReveal({
  children,
  className,
  as: Tag = "h2",
  type = "chars",
  stagger = 0.03,
  duration = 0.6,
  scrub = false,
  disabled = false,
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled || !containerRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const elements = containerRef.current.querySelectorAll(".split-unit");
    if (!elements.length) return;

    gsap.set(elements, {
      opacity: 0,
      y: type === "chars" ? 50 : 30,
      rotateX: type === "chars" ? -90 : 0,
      filter: type === "chars" ? "blur(8px)" : "blur(4px)",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: scrub ? "bottom 50%" : undefined,
        scrub: scrub ? 0.6 : false,
        once: !scrub,
      },
    });

    tl.to(elements, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      duration,
      stagger,
      ease: "power4.out",
    });

    return () => {
      tl.kill();
    };
  }, [disabled, type, stagger, duration, scrub]);

  const renderContent = () => {
    if (type === "chars") {
      return children.split("").map((char, i) => (
        <span
          key={i}
          className="split-unit inline-block will-change-transform"
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ));
    }

    return children.split(" ").map((word, i) => (
      <span key={i} className="split-unit inline-block will-change-transform">
        {word}
        {i < children.split(" ").length - 1 && "\u00A0"}
      </span>
    ));
  };

  return (
    <div ref={containerRef} style={{ perspective: "1000px" }}>
      <Tag className={cn(className)}>{renderContent()}</Tag>
    </div>
  );
}
