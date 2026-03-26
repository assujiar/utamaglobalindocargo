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
      {/* Multi-layer dramatic transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <>
            {/* Layer 1: Primary brand color wipe (from bottom) */}
            <motion.div
              className="fixed inset-0 z-[9998] bg-[--color-primary] pointer-events-none"
              initial={{ scaleY: 0, originY: 1 }}
              animate={{
                scaleY: 1,
                transition: { duration: 0.45, ease: EASE_QUART },
              }}
              exit={{
                scaleY: 0,
                originY: 0,
                transition: { duration: 0.4, ease: EASE_QUART, delay: 0.1 },
              }}
            />

            {/* Layer 2: Dark overlay on top (slightly delayed) */}
            <motion.div
              className="fixed inset-0 z-[9999] bg-[--color-bg-dark] pointer-events-none"
              initial={{ scaleY: 0, originY: 1 }}
              animate={{
                scaleY: 1,
                transition: { duration: 0.4, ease: EASE_QUART, delay: 0.08 },
              }}
              exit={{
                scaleY: 0,
                originY: 0,
                transition: { duration: 0.35, ease: EASE_QUART, delay: 0.15 },
              }}
            >
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
        )}
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
