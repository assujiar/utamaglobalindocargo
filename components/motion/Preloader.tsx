"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_MASK: [number, number, number, number] = [1, 0, 0, 1];

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

    const minTimer = setTimeout(() => {
      sessionStorage.setItem("ugc-visited", "1");
      setIsLoading(false);
    }, reduced ? 0 : 1400);

    const maxTimer = setTimeout(() => {
      sessionStorage.setItem("ugc-visited", "1");
      setIsLoading(false);
    }, 2200);

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
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "var(--color-bg-frame)" }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
          }}
          transition={{
            duration: 0.7,
            ease: EASE_MASK,
          }}
        >
          {/* Ambient blur circle behind logo */}
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full"
            style={{
              background: "radial-gradient(var(--color-primary) 0, rgba(255, 70, 0, 0) 70%)",
              mixBlendMode: "color-dodge",
            }}
            animate={{
              opacity: [0.05, 0.25, 0.05],
              scale: [0.6, 1.2, 0.6],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Logo container */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Logo mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: EASE_EXPO }}
            >
              <svg
                width="72"
                height="72"
                viewBox="0 0 72 72"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  width="72"
                  height="72"
                  rx="18"
                  fill="var(--color-primary)"
                  style={{ filter: "drop-shadow(0 0 30px rgba(255, 70, 0, 0.4))" }}
                />
                <text
                  x="50%"
                  y="54%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fill="white"
                  fontSize="24"
                  fontWeight="700"
                  fontFamily="var(--font-primary)"
                  letterSpacing="0.08em"
                >
                  UGC
                </text>
              </svg>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="label-text text-[--color-text-muted] tracking-[0.25em]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_EXPO, delay: 0.3 }}
            >
              LOGISTICS
            </motion.p>

            {/* Progress line */}
            <motion.div
              className="w-20 h-px bg-gradient-to-r from-transparent via-[--color-primary] to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 1.2,
                ease: EASE_EXPO,
                delay: 0.2,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { Preloader };
