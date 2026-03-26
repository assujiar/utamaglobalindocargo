"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type RevealDirection = "top" | "bottom" | "left" | "right" | "center";

interface ImageRevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  duration?: number;
  delay?: number;
  className?: string;
  disabled?: boolean;
}

const EASE: [number, number, number, number] = [0.77, 0, 0.175, 1];

function getClipPaths(direction: RevealDirection) {
  switch (direction) {
    case "top":
      return { hidden: "inset(0 0 100% 0)", visible: "inset(0 0 0% 0)" };
    case "bottom":
      return { hidden: "inset(100% 0 0 0)", visible: "inset(0% 0 0 0)" };
    case "left":
      return { hidden: "inset(0 100% 0 0)", visible: "inset(0 0% 0 0)" };
    case "right":
      return { hidden: "inset(0 0 0 100%)", visible: "inset(0 0 0 0%)" };
    case "center":
      return { hidden: "inset(50% 50% 50% 50%)", visible: "inset(0% 0% 0% 0%)" };
  }
}

function ImageReveal({
  children,
  direction = "bottom",
  duration = 0.8,
  delay = 0,
  className,
  disabled = false,
}: ImageRevealProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

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

  if (prefersReduced || disabled) {
    return <div className={className}>{children}</div>;
  }

  const clips = getClipPaths(direction);

  return (
    <motion.div
      ref={ref}
      className={cn("overflow-hidden", className)}
      initial={{
        clipPath: clips.hidden,
        scale: 1.1,
      }}
      animate={
        isInView
          ? { clipPath: clips.visible, scale: 1 }
          : { clipPath: clips.hidden, scale: 1.1 }
      }
      transition={{
        duration,
        ease: EASE,
        delay,
        scale: { duration: duration * 1.2, ease: EASE, delay },
      }}
    >
      {children}
    </motion.div>
  );
}

export { ImageReveal, type ImageRevealProps };
