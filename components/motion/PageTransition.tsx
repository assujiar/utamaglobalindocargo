"use client";

import { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

const PAGE_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className={cn(className)}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4, ease: PAGE_EASE }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export { PageTransition, type PageTransitionProps };
