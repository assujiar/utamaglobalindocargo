"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface RotatingTextProps {
  phrases: string[];
  className?: string;
  /** Prefix text shown before rotating part */
  prefix?: string;
  /** Time each phrase stays visible in ms */
  interval?: number;
  disabled?: boolean;
}

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Buzzworthy-style USP text carousel.
 * Rotates through phrases with a clip-path + translateY reveal animation.
 * Like Buzzworthy's #usp section that cycles through value propositions.
 */
export function RotatingText({
  phrases,
  className,
  prefix,
  interval = 3000,
  disabled = false,
}: RotatingTextProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReduced = useReducedMotion();

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % phrases.length);
  }, [phrases.length]);

  useEffect(() => {
    if (disabled || prefersReduced) return;
    const timer = setInterval(advance, interval);
    return () => clearInterval(timer);
  }, [disabled, prefersReduced, interval, advance]);

  if (prefersReduced || disabled) {
    return (
      <span className={className}>
        {prefix && <span>{prefix} </span>}
        {phrases[0]}
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-baseline gap-[0.3em] overflow-hidden", className)}>
      {prefix && <span>{prefix}</span>}
      <span className="relative inline-block overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-110%", opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: EASE_EXPO,
            }}
          >
            {phrases[activeIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
