"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils/cn";

interface PinnedRevealProps {
  children: React.ReactNode[];
  className?: string;
  panelClassName?: string;
  disabled?: boolean;
}

export function PinnedReveal({
  children,
  className,
  panelClassName,
  disabled = false,
}: PinnedRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled || !containerRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const panels =
      containerRef.current.querySelectorAll<HTMLElement>(".pinned-panel");
    if (panels.length < 2) return;

    const triggers: ScrollTrigger[] = [];

    panels.forEach((panel, i) => {
      if (i === 0) return;

      gsap.set(panel, { yPercent: 100, opacity: 0, scale: 0.92 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: () => `top+=${(i - 1) * window.innerHeight} top`,
          end: () => `top+=${i * window.innerHeight} top`,
          scrub: 0.5,
          pin: i === 1 ? containerRef.current : false,
          pinSpacing: i === 1,
        },
      });

      tl.to(panel, {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        ease: "power2.inOut",
      });

      if (panels[i - 1]) {
        tl.to(
          panels[i - 1],
          {
            scale: 0.85,
            opacity: 0.3,
            filter: "blur(6px)",
            ease: "power2.inOut",
          },
          0,
        );
      }

      triggers.push(tl.scrollTrigger!);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [disabled, children.length]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ height: "100vh" }}
    >
      {(Array.isArray(children) ? children : [children]).map((child, i) => (
        <div
          key={i}
          className={cn(
            "pinned-panel absolute inset-0 will-change-transform",
            panelClassName,
          )}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
