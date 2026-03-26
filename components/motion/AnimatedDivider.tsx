"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils/cn";

interface AnimatedDividerProps {
  className?: string;
  /** Divider color */
  color?: string;
  /** Show endpoint dots */
  showEndpoints?: boolean;
  /** Line animation duration */
  duration?: number;
  /** Endpoint shape */
  endpointShape?: "dot" | "diamond" | "cross";
  disabled?: boolean;
}

/**
 * Buzzworthy-style animated line divider with SVG endpoints.
 * The line draws itself from center outward when scrolled into view,
 * and endpoint shapes scale up at the ends.
 * Like Buzzworthy's section dividers with hexagonal dot endpoints.
 */
export function AnimatedDivider({
  className,
  color = "rgba(255, 70, 0, 0.2)",
  showEndpoints = true,
  duration = 0.8,
  endpointShape = "diamond",
  disabled = false,
}: AnimatedDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled || !containerRef.current || !lineRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    // Initial state: line collapsed at center, endpoints hidden
    gsap.set(lineRef.current, { scaleX: 0 });
    if (leftRef.current) gsap.set(leftRef.current, { scale: 0, opacity: 0 });
    if (rightRef.current) gsap.set(rightRef.current, { scale: 0, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
      },
    });

    // Line draws from center outward
    tl.to(lineRef.current, {
      scaleX: 1,
      duration,
      ease: "power3.inOut",
    });

    // Endpoints pop in
    if (leftRef.current && rightRef.current) {
      tl.to(
        [leftRef.current, rightRef.current],
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(2)",
          stagger: 0.1,
        },
        `-=${duration * 0.3}`,
      );
    }

    return () => {
      tl.kill();
    };
  }, [disabled, duration]);

  const EndpointIcon = () => {
    switch (endpointShape) {
      case "diamond":
        return (
          <div
            className="w-2 h-2 rotate-45"
            style={{ backgroundColor: color }}
          />
        );
      case "cross":
        return (
          <div className="relative w-3 h-3">
            <div
              className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2"
              style={{ backgroundColor: color }}
            />
            <div
              className="absolute left-1/2 top-0 w-px h-full -translate-x-1/2"
              style={{ backgroundColor: color }}
            />
          </div>
        );
      default:
        return (
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: color }}
          />
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative flex items-center", className)}
      aria-hidden="true"
    >
      {showEndpoints && (
        <div ref={leftRef} className="will-change-transform flex-shrink-0">
          <EndpointIcon />
        </div>
      )}

      <div
        ref={lineRef}
        className="flex-1 h-px will-change-transform"
        style={{ backgroundColor: color, transformOrigin: "center" }}
      />

      {showEndpoints && (
        <div ref={rightRef} className="will-change-transform flex-shrink-0">
          <EndpointIcon />
        </div>
      )}
    </div>
  );
}
