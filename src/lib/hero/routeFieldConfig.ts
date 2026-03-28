export type Point = { x: number; y: number };

// ─── Corridor: a bundle of related lanes that read as one throughput system ───

export type Corridor = {
  id: string;
  role: "primary" | "secondary" | "tertiary";
  /** The spine — the central path of this corridor */
  spine: Point[];
  /** Number of parallel lanes to generate around the spine */
  laneCount: number;
  /** Max perpendicular offset (in normalized coords) for outermost lane */
  spread: number;
};

// ─── Hub: an operational zone where corridors converge ───

export type Hub = {
  id: string;
  role: "ingress" | "transfer" | "fulfillment";
  center: Point;
  /** Radius of the hub influence area (normalized) */
  radius: number;
  /** Number of sub-nodes inside the hub */
  nodeCount: number;
};

// ─── Pulse: a shipment moving along a corridor spine ───

export type Pulse = {
  routeId: string;
  color: string;
  speed: number;
  size: number;
  offset: number;
};

// ═══════════════════════════════════════════════════════
// CORRIDOR DEFINITIONS
// ═══════════════════════════════════════════════════════
//
// Primary corridors: main freight throughput. Bundled 4–5 lanes.
// Flow from bottom-left (ingress/origin) through center (transfer hub)
// to upper-right (fulfillment/destination).
//
// Secondary corridors: supporting routes. 3 lanes.
// Branch traffic, feeder lanes, alternative routing.
//
// Tertiary: background intelligence traces. Single faint lines.
// Data flows, planning signals, telemetry.

export const CORRIDORS: Corridor[] = [
  // ── PRIMARY: main freight corridor (bottom-left → upper-right) ──
  {
    id: "corridor-main",
    role: "primary",
    spine: [
      { x: -0.02, y: 0.82 },
      { x: 0.12, y: 0.74 },
      { x: 0.28, y: 0.66 },
      { x: 0.48, y: 0.56 },
      { x: 0.68, y: 0.44 },
      { x: 0.85, y: 0.32 },
      { x: 1.02, y: 0.22 },
    ],
    laneCount: 5,
    spread: 0.035,
  },
  // ── PRIMARY: secondary main corridor (slightly lower, converges at transfer hub) ──
  {
    id: "corridor-main-2",
    role: "primary",
    spine: [
      { x: -0.02, y: 0.94 },
      { x: 0.15, y: 0.86 },
      { x: 0.32, y: 0.74 },
      { x: 0.50, y: 0.62 },
      { x: 0.70, y: 0.48 },
      { x: 0.88, y: 0.36 },
      { x: 1.02, y: 0.28 },
    ],
    laneCount: 4,
    spread: 0.025,
  },
  // ── SECONDARY: upper branch route (feeds into transfer hub from above) ──
  {
    id: "corridor-branch-upper",
    role: "secondary",
    spine: [
      { x: 0.10, y: 0.14 },
      { x: 0.22, y: 0.22 },
      { x: 0.36, y: 0.32 },
      { x: 0.50, y: 0.42 },
      { x: 0.66, y: 0.48 },
      { x: 0.80, y: 0.52 },
      { x: 0.96, y: 0.58 },
    ],
    laneCount: 3,
    spread: 0.018,
  },
  // ── SECONDARY: mid-field distribution route ──
  {
    id: "corridor-branch-mid",
    role: "secondary",
    spine: [
      { x: -0.02, y: 0.52 },
      { x: 0.16, y: 0.50 },
      { x: 0.34, y: 0.50 },
      { x: 0.52, y: 0.52 },
      { x: 0.70, y: 0.50 },
      { x: 0.88, y: 0.44 },
      { x: 1.02, y: 0.38 },
    ],
    laneCount: 3,
    spread: 0.015,
  },
  // ── TERTIARY: upper planning trace ──
  {
    id: "trace-upper",
    role: "tertiary",
    spine: [
      { x: -0.02, y: 0.26 },
      { x: 0.20, y: 0.28 },
      { x: 0.45, y: 0.30 },
      { x: 0.70, y: 0.32 },
      { x: 1.02, y: 0.36 },
    ],
    laneCount: 1,
    spread: 0,
  },
  // ── TERTIARY: lower planning trace ──
  {
    id: "trace-lower",
    role: "tertiary",
    spine: [
      { x: 0.02, y: 0.96 },
      { x: 0.22, y: 0.90 },
      { x: 0.44, y: 0.82 },
      { x: 0.66, y: 0.72 },
      { x: 0.88, y: 0.62 },
      { x: 1.02, y: 0.56 },
    ],
    laneCount: 1,
    spread: 0,
  },
];

// ═══════════════════════════════════════════════════════
// HUB DEFINITIONS
// ═══════════════════════════════════════════════════════
//
// Ingress: bottom-left — origin ports, factories, suppliers
// Transfer: center-right — main consolidation/customs/cross-dock hub
// Fulfillment: upper-right — destination warehouses, client facilities

export const HUBS: Hub[] = [
  {
    id: "hub-ingress",
    role: "ingress",
    center: { x: 0.10, y: 0.80 },
    radius: 0.06,
    nodeCount: 5,
  },
  {
    id: "hub-transfer",
    role: "transfer",
    center: { x: 0.52, y: 0.54 },
    radius: 0.07,
    nodeCount: 7,
  },
  {
    id: "hub-fulfillment",
    role: "fulfillment",
    center: { x: 0.86, y: 0.34 },
    radius: 0.055,
    nodeCount: 5,
  },
];

// ═══════════════════════════════════════════════════════
// PULSES — shipments moving along corridor spines
// ═══════════════════════════════════════════════════════

export const PULSES: Pulse[] = [
  // Main corridor — two orange pulses at different speeds
  { routeId: "corridor-main", color: "#ff4600", speed: 0.055, size: 3.0, offset: 0.05 },
  { routeId: "corridor-main", color: "#ff4600", speed: 0.042, size: 2.4, offset: 0.55 },
  // Second main corridor
  { routeId: "corridor-main-2", color: "#ff4600", speed: 0.048, size: 2.6, offset: 0.30 },
  // Branch routes — white pulses
  { routeId: "corridor-branch-upper", color: "rgba(255,255,255,0.65)", speed: 0.030, size: 2.0, offset: 0.20 },
  { routeId: "corridor-branch-mid", color: "rgba(255,255,255,0.50)", speed: 0.025, size: 1.8, offset: 0.60 },
];

// ═══════════════════════════════════════════════════════
// COLOR SYSTEM
// ═══════════════════════════════════════════════════════

export const COLORS = {
  // Corridor lane colors (per role)
  corridor: {
    primary: { base: "rgba(255, 70, 0, 0.18)", accent: "rgba(255, 70, 0, 0.10)" },
    secondary: { base: "rgba(255, 255, 255, 0.10)", accent: "rgba(255, 255, 255, 0.05)" },
    tertiary: { base: "rgba(255, 255, 255, 0.04)", accent: "rgba(255, 255, 255, 0.02)" },
  },
  // Hub colors
  hub: {
    ingress: { node: "rgba(255, 255, 255, 0.30)", ring: "rgba(255, 255, 255, 0.08)", glow: "rgba(255, 255, 255, 0.03)" },
    transfer: { node: "rgba(255, 70, 0, 0.80)", ring: "rgba(255, 70, 0, 0.18)", glow: "rgba(255, 70, 0, 0.06)" },
    fulfillment: { node: "rgba(255, 255, 255, 0.35)", ring: "rgba(255, 255, 255, 0.10)", glow: "rgba(255, 255, 255, 0.03)" },
  },
  // Grid
  grid: "rgba(255, 255, 255, 0.025)",
};

// ═══════════════════════════════════════════════════════
// LANE GENERATION — expand corridor spines into lane bundles
// ═══════════════════════════════════════════════════════

export type GeneratedLane = {
  corridorId: string;
  role: "primary" | "secondary" | "tertiary";
  points: Point[];
  opacity: number; // 0–1, varies across bundle
  width: number;
};

/**
 * Generates individual lanes from corridor definitions.
 * Each corridor produces `laneCount` parallel lanes spread around its spine.
 * Lanes closer to the spine are more opaque (core throughput).
 * Lanes farther from the spine are fainter (capacity margin).
 */
export function generateLanes(): GeneratedLane[] {
  const lanes: GeneratedLane[] = [];

  for (const corridor of CORRIDORS) {
    const { laneCount, spread, spine } = corridor;

    if (laneCount === 1) {
      // Tertiary: just the spine itself
      lanes.push({
        corridorId: corridor.id,
        role: corridor.role,
        points: spine,
        opacity: 1,
        width: 0.4,
      });
      continue;
    }

    for (let li = 0; li < laneCount; li++) {
      // Position within bundle: -1 to +1
      const t = laneCount === 1 ? 0 : (li / (laneCount - 1)) * 2 - 1;
      const offset = t * spread;

      // Opacity: brightest at center, dimmer at edges
      const distFromCenter = Math.abs(t);
      const opacity = 1 - distFromCenter * 0.6;

      // Width: center lane is thickest
      const baseWidth = corridor.role === "primary" ? 1.0 : 0.7;
      const width = baseWidth * (1 - distFromCenter * 0.4);

      // Offset each point perpendicular to the corridor direction
      const offsetPoints = spine.map((pt, pi) => {
        // Compute perpendicular direction from neighboring points
        const prev = spine[Math.max(0, pi - 1)];
        const next = spine[Math.min(spine.length - 1, pi + 1)];
        const dx = next.x - prev.x;
        const dy = next.y - prev.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        // Perpendicular: rotate direction 90 degrees
        const px = -dy / len;
        const py = dx / len;
        return {
          x: pt.x + px * offset,
          y: pt.y + py * offset,
        };
      });

      lanes.push({
        corridorId: corridor.id,
        role: corridor.role,
        points: offsetPoints,
        opacity,
        width,
      });
    }
  }

  return lanes;
}

// ═══════════════════════════════════════════════════════
// HUB NODE GENERATION — create structured node positions
// ═══════════════════════════════════════════════════════

export type GeneratedNode = {
  hubId: string;
  role: "ingress" | "transfer" | "fulfillment";
  x: number;
  y: number;
  size: number; // relative size 0–1
  isPrimary: boolean; // whether this is the main node of the hub
};

/**
 * Generates node positions for each hub using deterministic placement.
 * Primary node at center. Secondary nodes arranged around it.
 */
export function generateHubNodes(): GeneratedNode[] {
  const nodes: GeneratedNode[] = [];

  // Seeded random for deterministic output
  let seed = 42;
  const rand = () => {
    seed = (seed * 16807 + 0) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (const hub of HUBS) {
    // Primary node: dead center
    nodes.push({
      hubId: hub.id,
      role: hub.role,
      x: hub.center.x,
      y: hub.center.y,
      size: 1,
      isPrimary: true,
    });

    // Secondary nodes: arranged around center
    for (let i = 0; i < hub.nodeCount - 1; i++) {
      const angle = (i / (hub.nodeCount - 1)) * Math.PI * 2 + rand() * 0.5;
      const dist = hub.radius * (0.4 + rand() * 0.6);
      nodes.push({
        hubId: hub.id,
        role: hub.role,
        x: hub.center.x + Math.cos(angle) * dist,
        y: hub.center.y + Math.sin(angle) * dist,
        size: 0.3 + rand() * 0.4,
        isPrimary: false,
      });
    }
  }

  return nodes;
}
