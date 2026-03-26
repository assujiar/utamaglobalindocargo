"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils/cn";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  panelClassName?: string;
  disabled?: boolean;
  speed?: number;
}

export function HorizontalScroll({
  children,
  className,
  panelClassName,
  disabled = false,
  speed = 1,
}: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled || !sectionRef.current || !trackRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const track = trackRef.current;
    const totalWidth = track.scrollWidth - window.innerWidth;

    // Scroll distance = 1.8x the overflow width for comfortable pacing.
    // Start pinning when section top reaches 10% from viewport top,
    // so the heading is visible and cards start moving while user is IN the section.
    const scrollDistance = totalWidth * 1.8;

    const tween = gsap.to(track, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 10%",
        pin: true,
        scrub: 0.4 * speed,
        end: () => `+=${scrollDistance}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, [disabled, speed]);

  return (
    <div ref={sectionRef} className={cn("overflow-hidden", className)}>
      <div
        ref={trackRef}
        className={cn("flex will-change-transform", panelClassName)}
      >
        {children}
      </div>
    </div>
  );
}
