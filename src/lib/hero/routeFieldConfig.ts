export type Point = { x: number; y: number };

export type RouteLane = {
  id: string;
  role: "primary" | "secondary" | "tertiary";
  points: Point[];
};

export type NodeCluster = {
  id: string;
  role: "ingress" | "transfer" | "fulfillment";
  points: Point[];
};

export type Pulse = {
  id: string;
  routeId: string;
  color: string;
  speed: number;
  size: number;
  offset: number;
};

// ─── Route lanes: logistics corridors ───
// Primary = main freight corridors (orange tinted)
// Secondary = branch routes (white, dimmer)
// Tertiary = background intelligence traces (barely visible)

export const ROUTE_LANES: RouteLane[] = [
  {
    id: "primary-1",
    role: "primary",
    points: [
      { x: 0.02, y: 0.72 },
      { x: 0.18, y: 0.64 },
      { x: 0.34, y: 0.56 },
      { x: 0.56, y: 0.46 },
      { x: 0.82, y: 0.32 },
      { x: 0.98, y: 0.24 },
    ],
  },
  {
    id: "primary-2",
    role: "primary",
    points: [
      { x: 0.06, y: 0.84 },
      { x: 0.24, y: 0.76 },
      { x: 0.42, y: 0.64 },
      { x: 0.66, y: 0.52 },
      { x: 0.9, y: 0.38 },
    ],
  },
  {
    id: "secondary-1",
    role: "secondary",
    points: [
      { x: 0.16, y: 0.18 },
      { x: 0.26, y: 0.28 },
      { x: 0.42, y: 0.38 },
      { x: 0.6, y: 0.44 },
      { x: 0.78, y: 0.5 },
      { x: 0.94, y: 0.58 },
    ],
  },
  {
    id: "secondary-2",
    role: "secondary",
    points: [
      { x: 0.08, y: 0.52 },
      { x: 0.24, y: 0.5 },
      { x: 0.4, y: 0.48 },
      { x: 0.58, y: 0.46 },
      { x: 0.76, y: 0.42 },
      { x: 0.92, y: 0.34 },
    ],
  },
  {
    id: "tertiary-1",
    role: "tertiary",
    points: [
      { x: 0.02, y: 0.28 },
      { x: 0.18, y: 0.3 },
      { x: 0.36, y: 0.32 },
      { x: 0.54, y: 0.34 },
      { x: 0.72, y: 0.36 },
      { x: 0.98, y: 0.4 },
    ],
  },
  {
    id: "tertiary-2",
    role: "tertiary",
    points: [
      { x: 0.04, y: 0.92 },
      { x: 0.2, y: 0.86 },
      { x: 0.38, y: 0.78 },
      { x: 0.56, y: 0.68 },
      { x: 0.74, y: 0.58 },
      { x: 0.96, y: 0.5 },
    ],
  },
  {
    id: "tertiary-3",
    role: "tertiary",
    points: [
      { x: 0.0, y: 0.45 },
      { x: 0.15, y: 0.42 },
      { x: 0.32, y: 0.4 },
      { x: 0.5, y: 0.38 },
      { x: 0.68, y: 0.34 },
      { x: 1.0, y: 0.28 },
    ],
  },
];

// ─── Node clusters: operational zones ───
// Ingress = origin points (port, factory)
// Transfer = hub / cross-dock
// Fulfillment = delivery endpoint

export const NODE_CLUSTERS: NodeCluster[] = [
  {
    id: "ingress-zone",
    role: "ingress",
    points: [
      { x: 0.08, y: 0.74 },
      { x: 0.1, y: 0.82 },
      { x: 0.14, y: 0.68 },
      { x: 0.17, y: 0.78 },
    ],
  },
  {
    id: "transfer-zone",
    role: "transfer",
    points: [
      { x: 0.56, y: 0.46 },
      { x: 0.58, y: 0.52 },
      { x: 0.62, y: 0.42 },
      { x: 0.64, y: 0.5 },
    ],
  },
  {
    id: "fulfillment-zone",
    role: "fulfillment",
    points: [
      { x: 0.84, y: 0.34 },
      { x: 0.88, y: 0.28 },
      { x: 0.9, y: 0.38 },
      { x: 0.94, y: 0.32 },
    ],
  },
];

// ─── Pulses: shipment movement along routes ───

export const PULSES: Pulse[] = [
  {
    id: "pulse-1",
    routeId: "primary-1",
    color: "#ff4600",
    speed: 0.065,
    size: 3.2,
    offset: 0.08,
  },
  {
    id: "pulse-2",
    routeId: "primary-2",
    color: "#ff4600",
    speed: 0.052,
    size: 2.8,
    offset: 0.44,
  },
  {
    id: "pulse-3",
    routeId: "secondary-1",
    color: "rgba(255,255,255,0.78)",
    speed: 0.032,
    size: 2.2,
    offset: 0.22,
  },
  {
    id: "pulse-4",
    routeId: "secondary-2",
    color: "rgba(255,255,255,0.58)",
    speed: 0.028,
    size: 2,
    offset: 0.66,
  },
];

// ─── Color palette ───

export const ROUTE_FIELD_COLORS = {
  primary: "rgba(255, 70, 0, 0.22)",
  secondary: "rgba(255, 255, 255, 0.13)",
  tertiary: "rgba(255, 255, 255, 0.06)",
  node: "rgba(255, 255, 255, 0.32)",
  nodeActive: "rgba(255, 70, 0, 0.88)",
  grid: "rgba(255, 255, 255, 0.03)",
};
