"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Buzzworthy #webglBlur equivalent.
 * A large blurred circle that follows the cursor with color-dodge blend mode.
 * Creates an ambient light effect wherever the user moves.
 */
function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const glow = glowRef.current;
    if (!glow) return;

    // Use GSAP quickTo for smooth following (slower than cursor = trailing effect)
    const xTo = gsap.quickTo(glow, "left", { duration: 0.8, ease: "power2.out" });
    const yTo = gsap.quickTo(glow, "top", { duration: 0.8, ease: "power2.out" });

    function onMouseMove(e: MouseEvent) {
      xTo(e.clientX);
      yTo(e.clientY);
    }

    function onMouseEnter() {
      gsap.to(glow, { opacity: 0.3, duration: 0.4 });
    }

    function onMouseLeave() {
      gsap.to(glow, { opacity: 0, duration: 0.4 });
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="cursor-glow"
      style={{ opacity: 0 }}
      aria-hidden="true"
    />
  );
}

export { CursorGlow };
