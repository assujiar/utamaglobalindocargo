"use client";

/**
 * Static CSS-only fallback for the Abstract Route Field.
 * Used when: reduced-motion preferred, low-power device, or canvas unavailable.
 * Renders the same visual language (lanes, nodes, grid) without animation.
 */
export default function AbstractRouteFieldFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Base: near-black */}
      <div className="absolute inset-0 bg-[#0b0b0d]" />

      {/* Subtle grid — implies structured operational field */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "120px 120px",
          maskImage:
            "radial-gradient(circle at 50% 45%, black 0%, black 55%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 45%, black 0%, black 55%, transparent 100%)",
        }}
      />

      {/* Static route lanes — primary corridors */}
      <div className="absolute left-[14%] top-[78%] h-px w-[46%] bg-[#ff4600]/20 rotate-[-18deg]" />
      <div className="absolute left-[64%] top-[32%] h-px w-[24%] bg-[#ff4600]/20 rotate-[-10deg]" />

      {/* Static route lanes — secondary corridors */}
      <div className="absolute left-[6%] top-[66%] h-px w-[34%] bg-white/10 rotate-[-14deg]" />
      <div className="absolute left-[48%] top-[44%] h-px w-[36%] bg-white/10 rotate-[-16deg]" />

      {/* Static route lanes — tertiary traces */}
      <div className="absolute left-[2%] top-[28%] h-px w-[96%] bg-white/[0.04] rotate-[1deg]" />
      <div className="absolute left-[4%] top-[90%] h-px w-[80%] bg-white/[0.04] rotate-[-12deg]" />

      {/* Node clusters — ingress zone */}
      <div className="absolute left-[11%] top-[74%] h-2 w-2 rounded-full bg-white/30" />
      <div className="absolute left-[14%] top-[68%] h-1.5 w-1.5 rounded-full bg-white/20" />

      {/* Node clusters — transfer zone */}
      <div className="absolute left-[58%] top-[47%] h-2 w-2 rounded-full bg-[#ff4600]/70" />
      <div className="absolute left-[62%] top-[42%] h-1.5 w-1.5 rounded-full bg-[#ff4600]/40" />

      {/* Node clusters — fulfillment zone */}
      <div className="absolute left-[86%] top-[31%] h-2 w-2 rounded-full bg-white/40" />
      <div className="absolute left-[90%] top-[36%] h-1.5 w-1.5 rounded-full bg-white/25" />

      {/* Very subtle center light — just enough depth, no blowout */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.03),transparent_48%)]" />

      {/* Bottom vignette — darkens toward CTA area for text readability */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,11,13,0.15),rgba(11,11,13,0.65))]" />
    </div>
  );
}
