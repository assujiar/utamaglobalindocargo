"use client";

/**
 * Static CSS-only fallback for the Abstract Route Field.
 * Renders corridor bundles, hub zones, and routing structure without animation.
 * Used when: prefers-reduced-motion or canvas unavailable.
 */
export default function AbstractRouteFieldFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <div className="absolute inset-0 bg-[#0b0b0d]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
          maskImage:
            "radial-gradient(circle at 50% 45%, black 0%, black 50%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 45%, black 0%, black 50%, transparent 85%)",
        }}
      />

      {/* ── PRIMARY CORRIDOR BUNDLE (bottom-left → upper-right) ── */}
      {/* 5 bundled lanes with varying opacity */}
      <div className="absolute left-[-2%] top-[80%] h-[1.2px] w-[104%] bg-[#ff4600]/18 origin-left rotate-[-18deg]" />
      <div className="absolute left-[-2%] top-[78%] h-px w-[104%] bg-[#ff4600]/12 origin-left rotate-[-18deg]" />
      <div className="absolute left-[-2%] top-[82%] h-px w-[104%] bg-[#ff4600]/12 origin-left rotate-[-18deg]" />
      <div className="absolute left-[-2%] top-[76%] h-px w-[104%] bg-[#ff4600]/07 origin-left rotate-[-18deg]" />
      <div className="absolute left-[-2%] top-[84%] h-px w-[104%] bg-[#ff4600]/07 origin-left rotate-[-18deg]" />

      {/* ── SECOND PRIMARY CORRIDOR BUNDLE ── */}
      <div className="absolute left-[-2%] top-[92%] h-[1.2px] w-[104%] bg-[#ff4600]/14 origin-left rotate-[-20deg]" />
      <div className="absolute left-[-2%] top-[90%] h-px w-[104%] bg-[#ff4600]/08 origin-left rotate-[-20deg]" />
      <div className="absolute left-[-2%] top-[94%] h-px w-[104%] bg-[#ff4600]/08 origin-left rotate-[-20deg]" />
      <div className="absolute left-[-2%] top-[88%] h-px w-[104%] bg-[#ff4600]/04 origin-left rotate-[-20deg]" />

      {/* ── SECONDARY CORRIDOR: upper branch ── */}
      <div className="absolute left-[10%] top-[14%] h-[0.8px] w-[86%] bg-white/10 origin-left rotate-[14deg]" />
      <div className="absolute left-[10%] top-[12%] h-px w-[86%] bg-white/05 origin-left rotate-[14deg]" />
      <div className="absolute left-[10%] top-[16%] h-px w-[86%] bg-white/05 origin-left rotate-[14deg]" />

      {/* ── SECONDARY CORRIDOR: mid-field ── */}
      <div className="absolute left-[-2%] top-[52%] h-[0.8px] w-[104%] bg-white/08 origin-left rotate-[-4deg]" />
      <div className="absolute left-[-2%] top-[50%] h-px w-[104%] bg-white/04 origin-left rotate-[-4deg]" />
      <div className="absolute left-[-2%] top-[54%] h-px w-[104%] bg-white/04 origin-left rotate-[-4deg]" />

      {/* ── TERTIARY: planning traces ── */}
      <div className="absolute left-[-2%] top-[26%] h-px w-[104%] bg-white/[0.03] origin-left rotate-[2deg]" />
      <div className="absolute left-[2%] top-[95%] h-px w-[98%] bg-white/[0.03] origin-left rotate-[-12deg]" />

      {/* ── HUB: Ingress zone (bottom-left) ── */}
      <div className="absolute left-[8%] top-[78%] h-3 w-3 rounded-full bg-white/25" />
      <div className="absolute left-[6%] top-[74%] h-1.5 w-1.5 rounded-full bg-white/15" />
      <div className="absolute left-[12%] top-[82%] h-1.5 w-1.5 rounded-full bg-white/15" />
      <div className="absolute left-[11%] top-[76%] h-1 w-1 rounded-full bg-white/10" />
      <div className="absolute left-[7%] top-[82%] h-1 w-1 rounded-full bg-white/10" />

      {/* ── HUB: Transfer zone (center — the main logic hub) ── */}
      <div className="absolute left-[50%] top-[52%] h-3.5 w-3.5 rounded-full bg-[#ff4600]/60" />
      <div className="absolute left-[47%] top-[48%] h-2 w-2 rounded-full bg-[#ff4600]/30" />
      <div className="absolute left-[54%] top-[56%] h-2 w-2 rounded-full bg-[#ff4600]/30" />
      <div className="absolute left-[48%] top-[56%] h-1.5 w-1.5 rounded-full bg-[#ff4600]/20" />
      <div className="absolute left-[55%] top-[49%] h-1.5 w-1.5 rounded-full bg-[#ff4600]/20" />
      <div className="absolute left-[52%] top-[47%] h-1 w-1 rounded-full bg-[#ff4600]/15" />
      <div className="absolute left-[49%] top-[53%] h-1 w-1 rounded-full bg-[#ff4600]/15" />
      {/* Transfer hub ring */}
      <div
        className="absolute left-[44%] top-[44%] w-[14%] aspect-square rounded-full border border-dashed border-[#ff4600]/12"
      />

      {/* ── HUB: Fulfillment zone (upper-right) ── */}
      <div className="absolute left-[84%] top-[32%] h-3 w-3 rounded-full bg-white/30" />
      <div className="absolute left-[82%] top-[28%] h-1.5 w-1.5 rounded-full bg-white/18" />
      <div className="absolute left-[88%] top-[36%] h-1.5 w-1.5 rounded-full bg-white/18" />
      <div className="absolute left-[86%] top-[28%] h-1 w-1 rounded-full bg-white/10" />
      <div className="absolute left-[82%] top-[35%] h-1 w-1 rounded-full bg-white/10" />

      {/* ── Hub-to-hub connection lines (dashed) ── */}
      <div
        className="absolute left-[10%] top-[79%] w-[42%] h-px origin-left rotate-[-18deg]"
        style={{
          backgroundImage: "repeating-linear-gradient(to right, rgba(255,70,0,0.06) 0px, rgba(255,70,0,0.06) 8px, transparent 8px, transparent 20px)",
        }}
      />
      <div
        className="absolute left-[52%] top-[53%] w-[36%] h-px origin-left rotate-[-16deg]"
        style={{
          backgroundImage: "repeating-linear-gradient(to right, rgba(255,70,0,0.06) 0px, rgba(255,70,0,0.06) 8px, transparent 8px, transparent 20px)",
        }}
      />

      {/* Readability overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(11,11,13,0.45),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,11,13,0.25),rgba(11,11,13,0.60))]" />
    </div>
  );
}
