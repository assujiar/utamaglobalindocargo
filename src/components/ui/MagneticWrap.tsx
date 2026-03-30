"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { gsap } from "gsap";

interface MagneticWrapProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export default function MagneticWrap({
  children,
  className = "",
  strength = 0.3,
}: MagneticWrapProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: MouseEvent) {
    if (!ref.current) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(ref.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: "power2.out",
    });
  }

  function handleLeave() {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}
