"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_QUART: [number, number, number, number] = [0.77, 0, 0.175, 1];

function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setPrefersReduced(reduced);

    // Skip preloader on return visits
    if (sessionStorage.getItem("ugc-visited")) {
      setIsLoading(false);
      return;
    }

    // Minimum display time: 800ms, then wait for DOM ready
    const minTimer = setTimeout(() => {
      sessionStorage.setItem("ugc-visited", "1");
      setIsLoading(false);
    }, reduced ? 0 : 1200);

    // Safety max: never show longer than 2s
    const maxTimer = setTimeout(() => {
      sessionStorage.setItem("ugc-visited", "1");
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, []);

  if (prefersReduced) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[--color-bg-dark] flex items-center justify-center"
          exit={{
            clipPath: "inset(0 0 100% 0)",
          }}
          transition={{
            duration: 0.6,
            ease: EASE_QUART,
          }}
        >
          {/* Animated UGC wordmark */}
          <div className="flex flex-col items-center gap-6">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE_EXPO }}
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  width="64"
                  height="64"
                  rx="16"
                  fill="var(--color-primary)"
                />
                <text
                  x="50%"
                  y="54%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fill="white"
                  fontSize="22"
                  fontWeight="700"
                  fontFamily="var(--font-primary)"
                  letterSpacing="0.08em"
                >
                  UGC
                </text>
              </svg>
            </motion.div>

            {/* Glow pulse behind logo */}
            <motion.div
              className="absolute w-[200px] h-[200px] rounded-full bg-[--color-primary] blur-[80px]"
              animate={{
                opacity: [0.05, 0.15, 0.05],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Progress line */}
            <motion.div
              className="w-16 h-px bg-[--color-primary]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1,
                ease: EASE_EXPO,
                delay: 0.2,
              }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { Preloader };
