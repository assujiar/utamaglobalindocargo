"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils/cn";

interface FloatingOrbProps {
  className?: string;
  size?: number;
  color?: string;
  speed?: number;
  scale?: { from: number; to: number };
  opacity?: { from: number; to: number };
}

/**
 * A floating decorative element that continuously transforms
 * with scroll — like Buzzworthy's #webglBubble section.
 * Creates a glowing orb with scroll-driven translate3d + scale + opacity.
 */
export function FloatingOrb({
  className,
  size = 400,
  color = "rgba(255, 70, 0, 0.15)",
  speed = 0.25,
  scale = { from: 0.7, to: 1.1 },
  opacity = { from: 0.6, to: 1 },
}: FloatingOrbProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const distance = window.innerHeight * speed;

    gsap.set(ref.current, {
      y: distance,
      scale: scale.from,
      opacity: opacity.from,
    });

    const tween = gsap.to(ref.current, {
      y: -distance,
      scale: scale.to,
      opacity: opacity.to,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });

    return () => {
      tween.kill();
    };
  }, [speed, scale, opacity]);

  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-none will-change-transform",
        className,
      )}
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(80px)",
      }}
    />
  );
}
