"use client";

/**
 * Static CSS fallback for the CityLoop hero.
 * Dark cityscape silhouette with static orange glow trails.
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
      <div className="absolute bottom-[28%] left-[5%] w-[4%] h-[18%] bg-[#131317]" />
      <div className="absolute bottom-[28%] left-[10%] w-[3%] h-[28%] bg-[#131317]" />
      <div className="absolute bottom-[28%] left-[15%] w-[5%] h-[14%] bg-[#111115]" />
      <div className="absolute bottom-[28%] left-[22%] w-[3%] h-[22%] bg-[#131317]" />
      <div className="absolute bottom-[28%] left-[28%] w-[4%] h-[32%] bg-[#111115]" />
      <div className="absolute bottom-[28%] left-[34%] w-[3%] h-[16%] bg-[#131317]" />
      <div className="absolute bottom-[28%] left-[40%] w-[5%] h-[25%] bg-[#111115]" />
      <div className="absolute bottom-[28%] left-[48%] w-[3%] h-[20%] bg-[#131317]" />
      <div className="absolute bottom-[28%] left-[54%] w-[4%] h-[35%] bg-[#111115]" />
      <div className="absolute bottom-[28%] left-[60%] w-[3%] h-[18%] bg-[#131317]" />
      <div className="absolute bottom-[28%] left-[66%] w-[5%] h-[26%] bg-[#111115]" />
      <div className="absolute bottom-[28%] left-[74%] w-[3%] h-[30%] bg-[#131317]" />
      <div className="absolute bottom-[28%] left-[80%] w-[4%] h-[15%] bg-[#111115]" />
      <div className="absolute bottom-[28%] left-[86%] w-[3%] h-[22%] bg-[#131317]" />
      <div className="absolute bottom-[28%] left-[91%] w-[5%] h-[28%] bg-[#111115]" />

      {/* Far skyline haze */}
      <div className="absolute bottom-[36%] left-0 right-0 h-[12%] bg-gradient-to-t from-[#0e0e12] to-transparent opacity-50" />

      {/* Orange highway glow trails */}
      <div
        className="absolute bottom-[20%] left-[5%] right-[5%] h-[1.5px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,70,0,0.3) 30%, rgba(255,70,0,0.45) 50%, rgba(255,70,0,0.3) 70%, transparent)",
        }}
      />
      <div
        className="absolute bottom-[24%] left-[12%] right-[12%] h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,70,0,0.15) 30%, rgba(255,70,0,0.22) 50%, rgba(255,70,0,0.15) 70%, transparent)",
        }}
      />

      {/* Ambient orange glow from ground */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[35%]"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(255,70,0,0.06) 0%, transparent 55%)",
        }}
      />

      {/* Top/bottom vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(8,8,10,0.3) 0%, transparent 25%, transparent 65%, rgba(8,8,10,0.5) 100%)",
        }}
      />
    </div>
  );
}
