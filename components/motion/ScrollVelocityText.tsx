"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils/cn";

interface ScrollVelocityTextProps {
  children: string;
  className?: string;
  baseVelocity?: number;
  repeat?: number;
  disabled?: boolean;
  direction?: "left" | "right";
}

export function ScrollVelocityText({
  children,
  className,
  baseVelocity = 80,
  repeat = 4,
  disabled = false,
  direction = "left",
}: ScrollVelocityTextProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const currentX = useRef(0);
  const targetVelocity = useRef(baseVelocity);
  const rafId = useRef<number>(0);
  const lastTime = useRef(0);

  const dirMultiplier = direction === "left" ? -1 : 1;

  const loop = useCallback(
    (time: number) => {
      if (!trackRef.current) return;

      const dt = lastTime.current ? (time - lastTime.current) / 1000 : 0.016;
      lastTime.current = time;

      currentX.current += targetVelocity.current * dirMultiplier * dt;

      const trackWidth = trackRef.current.scrollWidth / (repeat + 1);
      if (Math.abs(currentX.current) >= trackWidth) {
        currentX.current =
          currentX.current + trackWidth * (direction === "left" ? 1 : -1);
      }

      gsap.set(trackRef.current, { x: currentX.current });
      rafId.current = requestAnimationFrame(loop);
    },
    [baseVelocity, dirMultiplier, direction, repeat],
  );

  useEffect(() => {
    if (disabled) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    // Reduce marquee speed on mobile (70% of desktop)
    const isMobile = window.innerWidth < 768;
    const effectiveVelocity = isMobile ? baseVelocity * 0.4 : baseVelocity;
    targetVelocity.current = effectiveVelocity;

    gsap.registerPlugin(ScrollTrigger);

    const velocityTracker = ScrollTrigger.create({
      onUpdate: (self) => {
        const scrollVelocity = Math.abs(self.getVelocity());
        const boost = gsap.utils.clamp(1, isMobile ? 2 : 5, scrollVelocity / 500);
        targetVelocity.current = effectiveVelocity * boost;
      },
    });

    rafId.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId.current);
      velocityTracker.kill();
    };
  }, [disabled, baseVelocity, loop]);

  const items = Array.from({ length: repeat + 1 }, (_, i) => (
    <span
      key={i}
      className="inline-block whitespace-nowrap px-8"
      aria-hidden={i > 0}
    >
      {children}
    </span>
  ));

  return (
    <div className="overflow-hidden" aria-label={children}>
      <div
        ref={trackRef}
        className={cn(
          "flex whitespace-nowrap will-change-transform",
          className,
        )}
      >
        {items}
      </div>
    </div>
  );
}
