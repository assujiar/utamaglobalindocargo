"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils/cn";

interface BlurCircleProps {
  className?: string;
  /** Size in px */
  size?: number;
  /** Primary color */
  color?: string;
  /** Ambient float animation duration in seconds */
  floatDuration?: number;
  /** Scroll-linked movement speed */
  scrollSpeed?: number;
}

/**
 * Buzzworthy-style .blur-circle element.
 * A large soft-edged circle with ambient floating animation
 * AND scroll-linked parallax movement. Creates atmospheric depth.
 */
export function BlurCircle({
  className,
  size = 600,
  color = "rgba(255, 70, 0, 0.12)",
  floatDuration = 20,
  scrollSpeed = 0.15,
}: BlurCircleProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Hide on mobile — too large and causes visual artifacts
    if (window.innerWidth < 768) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    // Ambient floating animation (continuous, not scroll-linked)
    const float = gsap.to(ref.current, {
      x: "random(-40, 40)",
      y: "random(-40, 40)",
      scale: "random(0.9, 1.1)",
      duration: floatDuration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Scroll-linked parallax
    const parallax = gsap.to(ref.current, {
      y: -window.innerHeight * scrollSpeed,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    return () => {
      float.kill();
      parallax.kill();
    };
  }, [floatDuration, scrollSpeed]);

  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-none will-change-transform hidden md:block",
        className,
      )}
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 60%)`,
        filter: `blur(${Math.round(size * 0.2)}px)`,
      }}
    />
  );
}
