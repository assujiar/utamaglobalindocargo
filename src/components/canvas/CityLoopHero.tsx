"use client";

import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useDeviceTier } from "@/hooks/useDeviceTier";
import CityLoopHeroFallback from "./CityLoopHeroFallback";

const CityLoopHeroScene = dynamic(
  () => import("./CityLoopHeroScene"),
  { ssr: false }
);

/**
 * Orchestrator for the city-loop hero background.
 *
 * Decision tree:
 * 1. prefers-reduced-motion → static CSS fallback (no WebGL, no animation)
 * 2. low-power device → simplified 3D scene (lower DPR, no antialiasing)
 * 3. high-power device → full 3D scene
 */
export default function CityLoopHero() {
  const reducedMotion = usePrefersReducedMotion();
  const deviceTier = useDeviceTier();

  if (reducedMotion) {
    return <CityLoopHeroFallback />;
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <CityLoopHeroScene simplified={deviceTier === "low"} />
    </div>
  );
}
