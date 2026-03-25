"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface CounterAnimationProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function CounterAnimation({
  target,
  prefix = "",
  suffix = "",
  duration = 1200,
  className,
}: CounterAnimationProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(prefersReduced ? target : 0);
  const hasTriggered = useRef(false);

  const animate = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;

    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut(progress);

      setValue(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [target, duration]);

  useEffect(() => {
    if (prefersReduced) {
      setValue(target);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReduced, target, animate]);

  return (
    <span ref={ref} className={cn("font-mono tabular-nums", className)}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

export { CounterAnimation, type CounterAnimationProps };
