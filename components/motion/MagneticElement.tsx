"use client";

import { useRef, useCallback } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils/cn";

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  disabled?: boolean;
  as?: React.ElementType;
}

export function MagneticElement({
  children,
  className,
  strength = 0.35,
  disabled = false,
  as: Tag = "div",
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || !ref.current) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReduced) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(ref.current, {
        x: deltaX,
        y: deltaY,
        duration: 0.4,
        ease: "power3.out",
      });
    },
    [strength, disabled],
  );

  const handleMouseLeave = useCallback(() => {
    if (disabled || !ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  }, [disabled]);

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      className={cn("will-change-transform", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Component>
  );
}
