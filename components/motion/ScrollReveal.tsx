"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type Direction = "up" | "down" | "left" | "right";
type RevealVariant = "default" | "clip";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  variant?: RevealVariant;
  disabled?: boolean;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_IN_OUT_EXPO: [number, number, number, number] = [0.77, 0, 0.175, 1];
const DESKTOP_OFFSET = 32;
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
  variant = "default",
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

  // Reduced motion or disabled: render immediately
  if (prefersReduced || disabled) {
    return <div className={className}>{children}</div>;
  }

  const offset = isMobile ? MOBILE_OFFSET : DESKTOP_OFFSET;
  const initial = getInitialTransform(direction, offset);
  const duration = isMobile ? 0.42 : 0.6;

  // Clip-path reveal variant (desktop only, falls back to default on mobile)
  if (variant === "clip" && !isMobile) {
    return (
      <motion.div
        ref={ref}
        className={cn("overflow-hidden", className)}
        initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0, y: 20 }}
        animate={
          isInView
            ? { clipPath: "inset(0% 0 0 0)", opacity: 1, y: 0 }
            : { clipPath: "inset(100% 0 0 0)", opacity: 0, y: 20 }
        }
        transition={{
          duration: 0.8,
          ease: EASE_IN_OUT_EXPO,
          delay: delay / 1000,
        }}
      >
        {children}
      </motion.div>
    );
  }

  // Default opacity + translate reveal
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
