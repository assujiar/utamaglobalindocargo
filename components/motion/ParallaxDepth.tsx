"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils/cn";

interface ParallaxDepthProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
  scale?: { from: number; to: number } | null;
  opacity?: { from: number; to: number } | null;
  rotate?: { from: number; to: number } | null;
  disabled?: boolean;
  scrubSmooth?: number;
}

export function ParallaxDepth({
  children,
  className,
  speed = 0.2,
  direction = "up",
  scale = null,
  opacity = null,
  rotate = null,
  disabled = false,
  scrubSmooth = 0.6,
}: ParallaxDepthProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled || !ref.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const distance = window.innerHeight * speed;
    const yFrom = direction === "up" ? distance : -distance;
    const yTo = direction === "up" ? -distance : distance;

    const animProps: gsap.TweenVars = {
      y: yTo,
      ease: "none",
    };

    if (scale) animProps.scale = scale.to;
    if (opacity) animProps.opacity = opacity.to;
    if (rotate) animProps.rotation = rotate.to;

    gsap.set(ref.current, {
      y: yFrom,
      ...(scale && { scale: scale.from }),
      ...(opacity && { opacity: opacity.from }),
      ...(rotate && { rotation: rotate.from }),
    });

    const tween = gsap.to(ref.current, {
      ...animProps,
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: scrubSmooth,
      },
    });

    return () => {
      tween.kill();
    };
  }, [disabled, speed, direction, scale, opacity, rotate, scrubSmooth]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
