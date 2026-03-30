"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  /** "spring" for physics, "tween" for smooth */
  physics?: "spring" | "tween";
}

const containerVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.1,
    },
  }),
};

const springChild: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      mass: 0.8,
    },
  },
};

const tweenChild: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export function StaggerContainer({
  children,
  className = "",
  stagger = 0.08,
  physics = "spring",
}: StaggerRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      custom={stagger}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  physics = "spring",
}: {
  children: ReactNode;
  className?: string;
  physics?: "spring" | "tween";
}) {
  return (
    <motion.div
      className={className}
      variants={physics === "spring" ? springChild : tweenChild}
    >
      {children}
    </motion.div>
  );
}
