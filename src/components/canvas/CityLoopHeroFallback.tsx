"use client";

/**
 * Static CSS fallback for the CityLoop hero.
 * Layered cityscape silhouette with strong orange highway glow trails.
 * Used when: prefers-reduced-motion, WebGL unavailable, or low-power device.
 */
export default function CityLoopHeroFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Base */}
      <div className="absolute inset-0 bg-[#08080a]" />

      {/* ── FAR SKYLINE: hazy low horizon ── */}
      <div className="absolute bottom-[42%] left-0 right-0 h-[15%] bg-gradient-to-t from-[#101014] to-transparent opacity-40" />

      {/* ── LEFT CLUSTER: tall landmark silhouettes ── */}
      <div className="absolute bottom-[32%] left-[4%] w-[3%] h-[22%] bg-[#121216]" />
      <div className="absolute bottom-[32%] left-[7%] w-[2.5%] h-[32%] bg-[#131317]" />
      <div className="absolute bottom-[32%] left-[10%] w-[3.5%] h-[38%] bg-[#111115]" />
      <div className="absolute bottom-[32%] left-[14%] w-[2%] h-[26%] bg-[#131317]" />
      <div className="absolute bottom-[32%] left-[16.5%] w-[3%] h-[20%] bg-[#121216]" />

      {/* ── RIGHT CLUSTER: medium silhouettes ── */}
      <div className="absolute bottom-[32%] right-[5%] w-[3%] h-[24%] bg-[#121216]" />
      <div className="absolute bottom-[32%] right-[8.5%] w-[2.5%] h-[18%] bg-[#131317]" />
      <div className="absolute bottom-[32%] right-[11.5%] w-[3.5%] h-[28%] bg-[#111115]" />
      <div className="absolute bottom-[32%] right-[15.5%] w-[2%] h-[15%] bg-[#131317]" />

      {/* ── MID-FIELD: scattered shorter masses ── */}
      <div className="absolute bottom-[32%] left-[30%] w-[2%] h-[12%] bg-[#111115]" />
      <div className="absolute bottom-[32%] left-[38%] w-[2.5%] h-[16%] bg-[#121216]" />
      <div className="absolute bottom-[32%] left-[52%] w-[2%] h-[10%] bg-[#131317]" />
      <div className="absolute bottom-[32%] left-[60%] w-[3%] h-[14%] bg-[#111115]" />

      {/* ── FOREGROUND EDGES: dark cropped framing ── */}
      <div className="absolute bottom-0 left-0 w-[6%] h-[45%] bg-[#0c0c0f]" />
      <div className="absolute bottom-0 right-0 w-[5%] h-[40%] bg-[#0c0c0f]" />

      {/* ── HIGHWAY GLOW TRAILS — the main visual hook ── */}
      {/* Primary trail — brightest */}
      <div
        className="absolute bottom-[30%] left-[3%] right-[3%] h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent 5%, rgba(255,70,0,0.5) 25%, rgba(255,70,0,0.7) 50%, rgba(255,70,0,0.5) 75%, transparent 95%)",
        }}
      />
      {/* Inner trail */}
      <div
        className="absolute bottom-[33%] left-[8%] right-[8%] h-[1.5px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,70,0,0.35) 30%, rgba(255,70,0,0.5) 50%, rgba(255,70,0,0.35) 70%, transparent)",
        }}
      />
      {/* Low trail */}
      <div
        className="absolute bottom-[27%] left-[6%] right-[10%] h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent 10%, rgba(255,70,0,0.2) 30%, rgba(255,70,0,0.3) 55%, rgba(255,70,0,0.15) 80%, transparent)",
        }}
      />
      {/* Far atmospheric trail */}
      <div
        className="absolute bottom-[36%] left-[10%] right-[5%] h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,70,0,0.1) 35%, rgba(255,70,0,0.15) 50%, rgba(255,70,0,0.08) 70%, transparent)",
        }}
      />

      {/* ── ORANGE GROUND WASH — highway illumination ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[45%]"
        style={{
          background: "radial-gradient(ellipse at 50% 85%, rgba(255,70,0,0.12) 0%, rgba(255,70,0,0.04) 40%, transparent 65%)",
        }}
      />

      {/* ── Building edge orange catch ── */}
      <div
        className="absolute bottom-[28%] left-[8%] w-[8%] h-[3%]"
        style={{
          background: "linear-gradient(to top, rgba(255,70,0,0.08), transparent)",
        }}
      />
      <div
        className="absolute bottom-[28%] right-[10%] w-[6%] h-[2%]"
        style={{
          background: "linear-gradient(to top, rgba(255,70,0,0.06), transparent)",
        }}
      />

      {/* ── Atmospheric vignette ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 40%, rgba(8,8,10,0.4) 0%, transparent 50%),
            linear-gradient(to bottom, rgba(8,8,10,0.25) 0%, transparent 20%, transparent 70%, rgba(8,8,10,0.4) 100%)
          `,
        }}
      />
    </div>
  );
}
