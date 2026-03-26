"use client";

import { useRef, useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils/cn";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: ImageProps["src"];
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  /** Aspect ratio class e.g. "aspect-video", "aspect-[4/3]" */
  aspectRatio?: string;
  /** Parallax travel range: image moves from +range% to -range% */
  range?: number;
  /** Enable zoom-out effect: image starts at scale and ends at 1.0 */
  zoomOut?: boolean;
  /** Initial scale for zoom-out (default 1.1) */
  initialScale?: number;
  disabled?: boolean;
}

function ParallaxImage({
  src,
  alt,
  width,
  height,
  fill = true,
  priority = false,
  className,
  containerClassName,
  aspectRatio = "aspect-video",
  range = 10,
  zoomOut = false,
  initialScale = 1.1,
  disabled = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (disabled || isMobile) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });

    // Parallax translateY
    tl.fromTo(
      image,
      { yPercent: range },
      { yPercent: -range, ease: "none" },
      0,
    );

    // Optional zoom-out
    if (zoomOut) {
      tl.fromTo(
        image,
        { scale: initialScale },
        { scale: 1, ease: "none" },
        0,
      );
    }

    return () => {
      tl.kill();
    };
  }, [disabled, isMobile, range, zoomOut, initialScale]);

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden", aspectRatio, containerClassName)}
    >
      <div
        ref={imageRef}
        className={cn(
          "w-full will-change-transform",
          // Extra height for parallax travel canvas
          !isMobile && !disabled ? "h-[120%] -mt-[10%]" : "h-full",
          className,
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          priority={priority}
          className="object-cover w-full h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 720px"
        />
      </div>
    </div>
  );
}

export { ParallaxImage, type ParallaxImageProps };
