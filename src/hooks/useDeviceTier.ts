"use client";

import { useEffect, useState } from "react";

export type DeviceTier = "high" | "low";

/**
 * Estimates device capability tier.
 * Uses hardwareConcurrency + screen size as rough heuristic.
 * "low" = mobile or weak hardware → simplified rendering.
 * "high" = desktop with decent specs → full rendering.
 */
export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("high");

  useEffect(() => {
    // Defer to avoid synchronous setState in effect body
    const id = requestAnimationFrame(() => {
      const cores = navigator.hardwareConcurrency || 2;
      const isNarrow = window.innerWidth < 768;
      const isWeakCPU = cores <= 2;

      if (isNarrow || isWeakCPU) {
        setTier("low");
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return tier;
}
