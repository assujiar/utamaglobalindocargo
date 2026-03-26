"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type TransitionType = "overlap" | "scale" | "gradient";

interface SectionTransitionProps {
  type?: TransitionType;
  children: React.ReactNode;
  className?: string;
}

/**
 * Section Transition Wrapper
 *
 * Type A: "overlap" — Section slides up over the previous section (parallax overlap)
 * Type B: "scale" — Section scales from 0.95 to 1.0 as it enters viewport
 * Type C: "gradient" — Background gradient morphs smoothly
 */
function SectionTransition({
  type = "scale",
  children,
  className,
}: SectionTransitionProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.7, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  if (type === "scale") {
    return (
      <motion.div
        ref={ref}
        className={cn("will-change-transform", className)}
        style={{ scale, opacity }}
      >
        {children}
      </motion.div>
    );
  }

  if (type === "overlap") {
    return (
      <motion.div
        ref={ref}
        className={cn("relative z-10 will-change-transform", className)}
        style={{ y }}
      >
        {children}
      </motion.div>
    );
  }

  // type === "gradient" — simple fade in
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity }}
    >
      {children}
    </motion.div>
  );
}

export { SectionTransition, type SectionTransitionProps, type TransitionType };
