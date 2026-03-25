"use client";

import { Children, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface StaggeredRevealProps {
  children: ReactNode;
  staggerDelay?: number;
  maxStagger?: number;
  className?: string;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants = (staggerDelay: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay / 1000,
    },
  },
});

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: EASE_OUT_EXPO,
    },
  },
};

function StaggeredReveal({
  children,
  staggerDelay = 80,
  maxStagger = 6,
  className,
}: StaggeredRevealProps) {
  const prefersReduced = useReducedMotion();
  const items = Children.toArray(children);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants(staggerDelay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {items.map((child, i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          transition={
            i >= maxStagger
              ? {
                  duration: 0.4,
                  ease: EASE_OUT_EXPO,
                  delay: (maxStagger * staggerDelay) / 1000,
                }
              : undefined
          }
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

export { StaggeredReveal, type StaggeredRevealProps };
