"use client";

import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useDeviceTier } from "@/hooks/useDeviceTier";
import AbstractRouteFieldFallback from "./AbstractRouteFieldFallback";

// Dynamic import — the canvas renderer is not needed during SSR
const AbstractRouteFieldCanvas = dynamic(
  () => import("./AbstractRouteFieldCanvas"),
  { ssr: false }
);

/**
 * Orchestration wrapper for the hero background.
 *
 * Decision tree:
 * 1. prefers-reduced-motion → static CSS fallback
 * 2. low-power device → simplified canvas (no grid, no pulses)
 * 3. high-power device → full canvas with grid, lanes, nodes, pulses
 */
export default function AbstractRouteField() {
  const reducedMotion = usePrefersReducedMotion();
  const deviceTier = useDeviceTier();

  // Reduced motion: pure CSS, zero animation
  if (reducedMotion) {
    return <AbstractRouteFieldFallback />;
  }

  // Low-power: simplified canvas (lanes + nodes, no grid/pulses)
  // High-power: full canvas
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <AbstractRouteFieldCanvas simplified={deviceTier === "low"} />
    </div>
  );
}
