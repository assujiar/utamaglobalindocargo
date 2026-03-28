"use client";

import { useRef, useEffect, useCallback } from "react";
import {
  CORRIDORS,
  HUBS,
  PULSES,
  COLORS,
  generateLanes,
  generateHubNodes,
  type Point,
  type GeneratedLane,
  type GeneratedNode,
} from "@/lib/hero/routeFieldConfig";

// ═══════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════

const _pos = { x: 0, y: 0 };
const _trail = { x: 0, y: 0 };

function lerpPoint(
  points: Point[],
  t: number,
  w: number,
  h: number,
  out: { x: number; y: number }
) {
  const c = Math.max(0, Math.min(1, t));
  const seg = c * (points.length - 1);
  const i = Math.floor(seg);
  const f = seg - i;
  const a = points[Math.min(i, points.length - 1)];
  const b = points[Math.min(i + 1, points.length - 1)];
  out.x = (a.x + (b.x - a.x) * f) * w;
  out.y = (a.y + (b.y - a.y) * f) * h;
}

function traceCurve(
  ctx: CanvasRenderingContext2D,
  pts: Point[],
  w: number,
  h: number
) {
  ctx.moveTo(pts[0].x * w, pts[0].y * h);
  for (let i = 1; i < pts.length; i++) {
    const cx = pts[i].x * w;
    const cy = pts[i].y * h;
    if (i < pts.length - 1) {
      const nx = pts[i + 1].x * w;
      const ny = pts[i + 1].y * h;
      ctx.quadraticCurveTo(cx, cy, (cx + nx) / 2, (cy + ny) / 2);
    } else {
      ctx.lineTo(cx, cy);
    }
  }
}

// ═══════════════════════════════════════════════════════
// DRAWING SYSTEMS
// ═══════════════════════════════════════════════════════

function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.strokeStyle = COLORS.grid;
  ctx.lineWidth = 0.5;
  const sp = 100;
  for (let x = 0; x < w; x += sp) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += sp) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
}

/** Draw all generated lanes — the corridor bundle system */
function drawCorridorBundles(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  lanes: GeneratedLane[]
) {
  for (const lane of lanes) {
    const colorSet = COLORS.corridor[lane.role];
    // Outer lanes use accent color, inner lanes use base color
    const color = lane.opacity > 0.7 ? colorSet.base : colorSet.accent;

    ctx.globalAlpha = lane.opacity;
    ctx.strokeStyle = color;
    ctx.lineWidth = lane.width;
    ctx.beginPath();
    traceCurve(ctx, lane.points, w, h);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

/** Draw hub zones — glow, ring, connection lines, and nodes */
function drawHubs(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  nodes: GeneratedNode[]
) {
  // 1. Hub zone glow (very subtle area fill)
  for (const hub of HUBS) {
    const cx = hub.center.x * w;
    const cy = hub.center.y * h;
    const r = hub.radius * w;
    const colors = COLORS.hub[hub.role];

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, colors.glow);
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Connection lines between nodes within each hub
  const nodesByHub = new Map<string, GeneratedNode[]>();
  for (const n of nodes) {
    const arr = nodesByHub.get(n.hubId) || [];
    arr.push(n);
    nodesByHub.set(n.hubId, arr);
  }

  for (const [, hubNodes] of nodesByHub) {
    if (hubNodes.length < 2) continue;
    const primary = hubNodes.find((n) => n.isPrimary);
    if (!primary) continue;

    ctx.strokeStyle =
      primary.role === "transfer"
        ? "rgba(255, 70, 0, 0.10)"
        : "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 0.5;

    for (const n of hubNodes) {
      if (n.isPrimary) continue;
      ctx.beginPath();
      ctx.moveTo(primary.x * w, primary.y * h);
      ctx.lineTo(n.x * w, n.y * h);
      ctx.stroke();
    }
  }

  // 3. Hub perimeter ring (dashed for transfer hub)
  for (const hub of HUBS) {
    const cx = hub.center.x * w;
    const cy = hub.center.y * h;
    const r = hub.radius * w * 0.8;
    const colors = COLORS.hub[hub.role];

    ctx.strokeStyle = colors.ring;
    ctx.lineWidth = 0.6;

    if (hub.role === "transfer") {
      ctx.setLineDash([4, 6]);
    }
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // 4. Individual nodes
  for (const node of nodes) {
    const x = node.x * w;
    const y = node.y * h;
    const colors = COLORS.hub[node.role];

    const breathe = node.isPrimary && node.role === "transfer"
      ? 1 + Math.sin(time * 1.2) * 0.15
      : 1;

    const baseSize = node.isPrimary ? 3.0 : 1.5 + node.size * 1.5;
    const r = baseSize * breathe;

    // Node fill
    ctx.fillStyle = node.isPrimary ? colors.node : colors.node;
    ctx.globalAlpha = node.isPrimary ? 1 : 0.5 + node.size * 0.3;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    // Primary node outer ring
    if (node.isPrimary) {
      ctx.strokeStyle = colors.ring;
      ctx.lineWidth = 0.6;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(x, y, r + 5, 0, Math.PI * 2);
      ctx.stroke();

      // Second concentric ring for transfer hub
      if (node.role === "transfer") {
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(x, y, r + 10, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  }
}

/** Draw inter-hub connection lines — visual handoff corridors between hub zones */
function drawHubConnections(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) {
  ctx.strokeStyle = "rgba(255, 70, 0, 0.06)";
  ctx.lineWidth = 1;
  ctx.setLineDash([8, 12]);

  for (let i = 0; i < HUBS.length - 1; i++) {
    const a = HUBS[i].center;
    const b = HUBS[i + 1].center;
    ctx.beginPath();
    ctx.moveTo(a.x * w, a.y * h);
    ctx.lineTo(b.x * w, b.y * h);
    ctx.stroke();
  }

  ctx.setLineDash([]);
}

/** Draw pulses moving along corridor spines */
function drawPulses(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  spineMap: Map<string, Point[]>,
  pulseStates: number[]
) {
  for (let i = 0; i < PULSES.length; i++) {
    const pulse = PULSES[i];
    const spine = spineMap.get(pulse.routeId);
    if (!spine) continue;

    const t = pulseStates[i];
    if (t < 0 || t > 1) continue;

    lerpPoint(spine, t, w, h, _pos);

    // Glow
    const glowR = pulse.size * 4;
    const grad = ctx.createRadialGradient(
      _pos.x, _pos.y, 0,
      _pos.x, _pos.y, glowR
    );
    grad.addColorStop(0, pulse.color);
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(_pos.x, _pos.y, glowR, 0, Math.PI * 2);
    ctx.fill();

    // Core
    ctx.fillStyle = pulse.color;
    ctx.beginPath();
    ctx.arc(_pos.x, _pos.y, pulse.size, 0, Math.PI * 2);
    ctx.fill();

    // Trail
    const isOrange = pulse.color === "#ff4600";
    for (let s = 1; s <= 5; s++) {
      const tt = t - 0.012 * s;
      if (tt < 0) continue;
      lerpPoint(spine, tt, w, h, _trail);
      const a = (1 - s / 5) * 0.3;
      ctx.fillStyle = isOrange
        ? `rgba(255,70,0,${a})`
        : `rgba(255,255,255,${a * 0.4})`;
      ctx.beginPath();
      ctx.arc(_trail.x, _trail.y, pulse.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

/** Readability mask — darker zone behind text content, cleaner edges */
function drawReadabilityMask(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // Center darkening for headline
  const cg = ctx.createRadialGradient(w * 0.5, h * 0.42, 0, w * 0.5, h * 0.42, w * 0.38);
  cg.addColorStop(0, "rgba(11,11,13,0.52)");
  cg.addColorStop(0.6, "rgba(11,11,13,0.20)");
  cg.addColorStop(1, "rgba(11,11,13,0)");
  ctx.fillStyle = cg;
  ctx.fillRect(0, 0, w, h);

  // Bottom vignette
  const bg = ctx.createLinearGradient(0, h * 0.65, 0, h);
  bg.addColorStop(0, "transparent");
  bg.addColorStop(1, "rgba(11,11,13,0.5)");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Top vignette
  const tg = ctx.createLinearGradient(0, 0, 0, h * 0.12);
  tg.addColorStop(0, "rgba(11,11,13,0.35)");
  tg.addColorStop(1, "transparent");
  ctx.fillStyle = tg;
  ctx.fillRect(0, 0, w, h);
}

// ═══════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════

interface Props {
  simplified?: boolean;
}

export default function AbstractRouteFieldCanvas({ simplified = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const pulseStatesRef = useRef<number[]>(PULSES.map((p) => p.offset));

  // Pre-generate lane bundles and hub nodes (deterministic, only once)
  const lanesRef = useRef(generateLanes());
  const nodesRef = useRef(generateHubNodes());
  const spineMapRef = useRef(
    (() => {
      const map = new Map<string, Point[]>();
      for (const c of CORRIDORS) map.set(c.id, c.spine);
      return map;
    })()
  );

  const draw = useCallback(
    (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { w, h } = sizeRef.current;
      if (w === 0) return;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#0b0b0d";
      ctx.fillRect(0, 0, w, h);

      // Grid
      if (!simplified) drawGrid(ctx, w, h);

      // Corridor bundles
      drawCorridorBundles(ctx, w, h, lanesRef.current);

      // Hub connections (dashed lines between hub centers)
      if (!simplified) drawHubConnections(ctx, w, h);

      // Hub zones, rings, nodes
      drawHubs(ctx, w, h, time, nodesRef.current);

      // Advance and draw pulses
      const ps = pulseStatesRef.current;
      for (let i = 0; i < PULSES.length; i++) {
        ps[i] += PULSES[i].speed * 0.016;
        if (ps[i] > 1.1) ps[i] = -0.1;
      }
      if (!simplified) {
        drawPulses(ctx, w, h, spineMapRef.current, ps);
      }

      // Readability overlays
      drawReadabilityMask(ctx, w, h);
    },
    [simplified]
  );

  // Size management
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w: rect.width, h: rect.height };
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Animation loop
  useEffect(() => {
    const t0 = performance.now();
    const tick = (now: number) => {
      draw((now - t0) / 1000);
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ display: "block" }}
    />
  );
}
