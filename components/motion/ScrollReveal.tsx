"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type Direction = "up" | "down" | "left" | "right";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  disabled?: boolean;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DESKTOP_OFFSET = 24;
const MOBILE_OFFSET = 16;

function getInitialTransform(direction: Direction, offset: number) {
  switch (direction) {
    case "up":
      return { x: 0, y: offset };
    case "down":
      return { x: 0, y: -offset };
    case "left":
      return { x: offset, y: 0 };
    case "right":
      return { x: -offset, y: 0 };
  }
}

function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  disabled = false,
}: ScrollRevealProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (disabled || prefersReduced) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [disabled, prefersReduced]);

  // Reduced motion or disabled — render immediately, no animation
  if (prefersReduced || disabled) {
    return <div className={className}>{children}</div>;
  }

  const offset = isMobile ? MOBILE_OFFSET : DESKTOP_OFFSET;
  const initial = getInitialTransform(direction, offset);
  const duration = isMobile ? 0.35 : 0.5; // 70% of desktop on mobile

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...initial }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, ...initial }
      }
      transition={{
        duration,
        ease: EASE_OUT_EXPO,
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  );
}

export { ScrollReveal, type ScrollRevealProps };
