"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  /** "clip" = mask reveal, "word" = word-by-word stagger */
  variant?: "clip" | "word";
}

export default function TextReveal({
  children,
  as: Tag = "h2",
  className = "",
  delay = 0,
  variant = "clip",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !containerRef.current) return;

    const el = containerRef.current;

    if (variant === "clip") {
      gsap.set(el, {
        clipPath: "inset(0 100% 0 0)",
        opacity: 1,
      });
      gsap.to(el, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1,
        delay,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    } else {
      // Word by word
      const words = el.querySelectorAll(".word");
      gsap.set(words, { opacity: 0, y: 20 });
      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.04,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [delay, variant]);

  if (variant === "word") {
    const words = children.split(" ");
    return (
      <div ref={containerRef}>
        <Tag className={className}>
          {words.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </Tag>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ opacity: 0 }}>
      <Tag className={className}>{children}</Tag>
    </div>
  );
}
