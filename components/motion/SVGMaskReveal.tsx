"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils/cn";

interface SVGMaskRevealProps {
  children: ReactNode;
  className?: string;
  /** Shape of the reveal mask */
  shape?: "circle" | "diamond" | "hexagon";
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts */
  delay?: number;
  /** Whether to use scroll-trigger or play on mount */
  scrollTriggered?: boolean;
  disabled?: boolean;
}

// Unique clip-path IDs per instance
let idCounter = 0;

/**
 * Buzzworthy-style SVG mask image reveal.
 * Content is clipped by an SVG shape that scales from 0 to full size,
 * revealing the content underneath with a dramatic mask animation.
 * Like Buzzworthy's work-lottie project thumbnail reveals.
 */
export function SVGMaskReveal({
  children,
  className,
  shape = "circle",
  duration = 1,
  delay = 0,
  scrollTriggered = true,
  disabled = false,
}: SVGMaskRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<SVGCircleElement | SVGPolygonElement>(null);
  const clipId = useRef(`svg-mask-${++idCounter}`);

  useEffect(() => {
    if (disabled || !containerRef.current || !maskRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const el = maskRef.current;

    if (shape === "circle") {
      gsap.set(el, { attr: { r: 0 } });

      const tween = gsap.to(el, {
        attr: { r: 75 },
        duration,
        delay: scrollTriggered ? 0 : delay,
        ease: "power3.inOut",
        scrollTrigger: scrollTriggered
          ? {
              trigger: containerRef.current,
              start: "top 75%",
              once: true,
            }
          : undefined,
      });

      return () => { tween.kill(); };
    }

    // Diamond and hexagon: scale from 0
    gsap.set(el, { scale: 0, transformOrigin: "center center" });

    const tween = gsap.to(el, {
      scale: 1,
      duration,
      delay: scrollTriggered ? 0 : delay,
      ease: "power3.inOut",
      scrollTrigger: scrollTriggered
        ? {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          }
        : undefined,
    });

    return () => { tween.kill(); };
  }, [disabled, shape, duration, delay, scrollTriggered]);

  const getShapeElement = () => {
    const id = clipId.current;

    switch (shape) {
      case "diamond":
        return (
          <svg width="0" height="0" className="absolute">
            <defs>
              <clipPath id={id} clipPathUnits="objectBoundingBox">
                <polygon
                  ref={maskRef as React.Ref<SVGPolygonElement>}
                  points="0.5,0 1,0.5 0.5,1 0,0.5"
                />
              </clipPath>
            </defs>
          </svg>
        );
      case "hexagon":
        return (
          <svg width="0" height="0" className="absolute">
            <defs>
              <clipPath id={id} clipPathUnits="objectBoundingBox">
                <polygon
                  ref={maskRef as React.Ref<SVGPolygonElement>}
                  points="0.5,0 0.933,0.25 0.933,0.75 0.5,1 0.067,0.75 0.067,0.25"
                />
              </clipPath>
            </defs>
          </svg>
        );
      default: // circle
        return (
          <svg viewBox="0 0 150 150" width="0" height="0" className="absolute">
            <defs>
              <clipPath id={id} clipPathUnits="objectBoundingBox">
                <circle
                  ref={maskRef as React.Ref<SVGCircleElement>}
                  cx="0.5"
                  cy="0.5"
                  r="0"
                />
              </clipPath>
            </defs>
          </svg>
        );
    }
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {getShapeElement()}
      <div
        style={{
          clipPath: disabled ? undefined : `url(#${clipId.current})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
