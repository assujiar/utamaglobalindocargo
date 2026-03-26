"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils/cn";

interface CustomCursorProps {
  disabled?: boolean;
}

function CustomCursor({ disabled = false }: CustomCursorProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    if (disabled) return;

    // Skip on touch devices
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Check reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const dot = dotRef.current;
    if (!dot) return;

    // Use GSAP quickTo for smooth follow
    const xTo = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power2.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power2.out" });

    function onMouseMove(e: MouseEvent) {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!isVisible) setIsVisible(true);
    }

    function onMouseEnter() {
      setIsVisible(true);
    }

    function onMouseLeave() {
      setIsVisible(false);
    }

    // Track hover on interactive elements
    function onElementEnter(e: Event) {
      const target = e.target as HTMLElement;
      setIsHovering(true);

      // Check for data-cursor-text attribute
      const text = target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text");
      if (text) setCursorText(text);
    }

    function onElementLeave() {
      setIsHovering(false);
      setCursorText("");
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    // Attach hover listeners to interactive elements
    const interactiveSelector = "a, button, [role='button'], input, textarea, select, [data-cursor-text]";
    const interactiveElements = document.querySelectorAll(interactiveSelector);
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onElementEnter);
      el.addEventListener("mouseleave", onElementLeave);
    });

    // MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll(interactiveSelector);
      newElements.forEach((el) => {
        el.removeEventListener("mouseenter", onElementEnter);
        el.removeEventListener("mouseleave", onElementLeave);
        el.addEventListener("mouseenter", onElementEnter);
        el.addEventListener("mouseleave", onElementLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onElementEnter);
        el.removeEventListener("mouseleave", onElementLeave);
      });
      observer.disconnect();
    };
  }, [disabled, isVisible]);

  if (disabled) return null;

  return (
    <div
      ref={dotRef}
      className={cn(
        "fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference",
        "transition-[width,height,opacity] duration-200 ease-out",
        isVisible ? "opacity-100" : "opacity-0",
        isHovering ? "w-10 h-10" : "w-2 h-2",
      )}
      style={{
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Dot */}
      <div
        className={cn(
          "absolute inset-0 rounded-full transition-all duration-200 ease-out",
          isHovering
            ? "bg-transparent border border-white scale-100"
            : "bg-white scale-100",
        )}
      />
      {/* Text label */}
      {cursorText && isHovering && (
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] font-bold uppercase tracking-wider text-white whitespace-nowrap">
          {cursorText}
        </span>
      )}
    </div>
  );
}

export { CustomCursor, type CustomCursorProps };
