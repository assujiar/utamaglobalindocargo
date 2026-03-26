"use client";

import { type ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_QUART: [number, number, number, number] = [0.77, 0, 0.175, 1];

// SVG wave paths for morphing transition (inspired by Buzzworthy's page-to-page)
const WAVE_PATHS = {
  // Flat bottom
  flat: "M0 100 L100 100 L100 100 L0 100 Z",
  // Wave covering screen
  wave1: "M0 0 C25 8 75 -5 100 0 L100 100 L0 100 Z",
  // Full cover
  full: "M0 0 L100 0 L100 100 L0 100 Z",
  // Wave retreating up
  wave2: "M0 0 C30 -12 70 5 100 0 L100 0 L0 0 Z",
};

const contentVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_EXPO,
      delay: 0.15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: {
      duration: 0.3,
      ease: EASE_QUART,
    },
  },
};

function WaveOverlay() {
  return (
    <>
      {/* Layer 1: Brand color wave wipe */}
      <motion.div
        className="fixed inset-0 z-[9998] pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <motion.path
            fill="var(--color-primary)"
            initial={{ d: WAVE_PATHS.flat }}
            animate={{
              d: [WAVE_PATHS.flat, WAVE_PATHS.wave1, WAVE_PATHS.full],
              transition: { duration: 0.5, ease: EASE_QUART, times: [0, 0.4, 1] },
            }}
            exit={{
              d: [WAVE_PATHS.full, WAVE_PATHS.wave2, WAVE_PATHS.flat],
              transition: { duration: 0.45, ease: EASE_QUART, times: [0, 0.5, 1], delay: 0.1 },
            }}
          />
        </svg>
      </motion.div>

      {/* Layer 2: Dark wave wipe on top (slightly delayed) */}
      <motion.div
        className="fixed inset-0 z-[9999] pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <motion.path
            fill="var(--color-bg-dark, #09090B)"
            initial={{ d: WAVE_PATHS.flat }}
            animate={{
              d: [WAVE_PATHS.flat, WAVE_PATHS.wave1, WAVE_PATHS.full],
              transition: { duration: 0.45, ease: EASE_QUART, times: [0, 0.4, 1], delay: 0.08 },
            }}
            exit={{
              d: [WAVE_PATHS.full, WAVE_PATHS.wave2, WAVE_PATHS.flat],
              transition: { duration: 0.4, ease: EASE_QUART, times: [0, 0.5, 1], delay: 0.18 },
            }}
          />
        </svg>

        {/* Brand glow pulse during hold */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-[200px] h-[200px] rounded-full bg-[--color-primary] opacity-[0.15] blur-[80px]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </>
  );
}

function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    setPrefersReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <>
      {/* SVG wave transition overlay */}
      <AnimatePresence>
        {isTransitioning && <WaveOverlay />}
      </AnimatePresence>

      {/* Page content */}
      <AnimatePresence
        mode="wait"
        onExitComplete={() => setIsTransitioning(false)}
      >
        <motion.div
          key={pathname}
          className={cn("will-change-[opacity,transform]", className)}
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onAnimationStart={(definition) => {
            if (definition === "exit") {
              setIsTransitioning(true);
            }
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export { PageTransition, type PageTransitionProps };
