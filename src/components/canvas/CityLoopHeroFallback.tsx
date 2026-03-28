"use client";

/**
 * Static CSS fallback for the CityLoop hero.
 * Renders a stylized dark cityscape with static orange glow trails.
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

      {/* City silhouette — near buildings */}
      <div className="absolute bottom-[28%] left-[5%] w-[4%] h-[18%] bg-[#0d0d10]" />
      <div className="absolute bottom-[28%] left-[10%] w-[3%] h-[28%] bg-[#0d0d10]" />
      <div className="absolute bottom-[28%] left-[15%] w-[5%] h-[14%] bg-[#0e0e12]" />
      <div className="absolute bottom-[28%] left-[22%] w-[3%] h-[22%] bg-[#0d0d10]" />
      <div className="absolute bottom-[28%] left-[28%] w-[4%] h-[32%] bg-[#0c0c0f]" />
      <div className="absolute bottom-[28%] left-[34%] w-[3%] h-[16%] bg-[#0e0e12]" />
      <div className="absolute bottom-[28%] left-[40%] w-[5%] h-[25%] bg-[#0d0d10]" />
      <div className="absolute bottom-[28%] left-[48%] w-[3%] h-[20%] bg-[#0d0d10]" />
      <div className="absolute bottom-[28%] left-[54%] w-[4%] h-[35%] bg-[#0c0c0f]" />
      <div className="absolute bottom-[28%] left-[60%] w-[3%] h-[18%] bg-[#0e0e12]" />
      <div className="absolute bottom-[28%] left-[66%] w-[5%] h-[26%] bg-[#0d0d10]" />
      <div className="absolute bottom-[28%] left-[74%] w-[3%] h-[30%] bg-[#0c0c0f]" />
      <div className="absolute bottom-[28%] left-[80%] w-[4%] h-[15%] bg-[#0e0e12]" />
      <div className="absolute bottom-[28%] left-[86%] w-[3%] h-[22%] bg-[#0d0d10]" />
      <div className="absolute bottom-[28%] left-[91%] w-[5%] h-[28%] bg-[#0c0c0f]" />

      {/* Far skyline silhouette */}
      <div className="absolute bottom-[36%] left-0 right-0 h-[12%] bg-gradient-to-t from-[#0b0b0e] to-transparent opacity-60" />

      {/* Orange highway glow trails — lower scene */}
      <div
        className="absolute bottom-[20%] left-[5%] right-[5%] h-[1.5px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,70,0,0.35) 30%, rgba(255,70,0,0.5) 50%, rgba(255,70,0,0.35) 70%, transparent)",
        }}
      />
      <div
        className="absolute bottom-[24%] left-[10%] right-[10%] h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,70,0,0.2) 25%, rgba(255,70,0,0.3) 50%, rgba(255,70,0,0.2) 75%, transparent)",
        }}
      />
      <div
        className="absolute bottom-[17%] left-[15%] right-[8%] h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,70,0,0.15) 40%, rgba(255,70,0,0.25) 60%, transparent)",
        }}
      />

      {/* Ambient orange glow from ground */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40%]"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(255,70,0,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Atmospheric haze gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(8,8,10,0.3) 0%, transparent 30%, transparent 60%, rgba(8,8,10,0.6) 100%)",
        }}
      />

      {/* Subtle depth fog */}
      <div
        className="absolute bottom-[25%] left-0 right-0 h-[20%]"
        style={{
          background: "linear-gradient(to top, rgba(8,8,10,0.0), rgba(8,8,10,0.15) 50%, rgba(8,8,10,0.4))",
        }}
      />
    </div>
  );
}
