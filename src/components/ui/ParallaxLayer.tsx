"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  speed?: number; // negative = slower, positive = faster
  offset?: [string, string]; // scroll start/end
}

export default function ParallaxLayer({
  children,
  className = "",
  speed = -50,
  offset,
}: ParallaxLayerProps) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: (offset as ["start end", "end start"]) || ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed]);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
