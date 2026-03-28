"use client";

import { useRef, useEffect, useCallback } from "react";
import {
  ROUTE_LANES,
  NODE_CLUSTERS,
  PULSES,
  ROUTE_FIELD_COLORS,
  type Point,
  type RouteLane,
} from "@/lib/hero/routeFieldConfig";

// ─── Helpers ───

function interpolatePolyline(
  points: Point[],
  t: number,
  w: number,
  h: number,
  out: { x: number; y: number }
): void {
  const clamped = Math.max(0, Math.min(1, t));
  const seg = clamped * (points.length - 1);
  const i = Math.floor(seg);
  const f = seg - i;
  const a = points[Math.min(i, points.length - 1)];
  const b = points[Math.min(i + 1, points.length - 1)];
  out.x = (a.x + (b.x - a.x) * f) * w;
  out.y = (a.y + (b.y - a.y) * f) * h;
}

function buildRouteMap(): Map<string, RouteLane> {
  const map = new Map<string, RouteLane>();
  for (const lane of ROUTE_LANES) map.set(lane.id, lane);
  return map;
}

/** Draws a smooth polyline through normalized points. Reused for lanes + parallel tracks. */
function traceLane(
  ctx: CanvasRenderingContext2D,
  pts: Point[],
  w: number,
  h: number,
  yOffset: number
) {
  const p0x = pts[0].x * w;
  const p0y = pts[0].y * h + yOffset;
  ctx.moveTo(p0x, p0y);

  for (let i = 1; i < pts.length; i++) {
    const cx = pts[i].x * w;
    const cy = pts[i].y * h + yOffset;
    if (i < pts.length - 1) {
      const nx = pts[i + 1].x * w;
      const ny = pts[i + 1].y * h + yOffset;
      ctx.quadraticCurveTo(cx, cy, (cx + nx) / 2, (cy + ny) / 2);
    } else {
      ctx.lineTo(cx, cy);
    }
  }
}

// ─── Drawing ───

function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.strokeStyle = ROUTE_FIELD_COLORS.grid;
  ctx.lineWidth = 0.5;
  const sp = 120;
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

function drawLanes(ctx: CanvasRenderingContext2D, w: number, h: number) {
  for (const lane of ROUTE_LANES) {
    const isPrimary = lane.role === "primary";
    const color = isPrimary
      ? ROUTE_FIELD_COLORS.primary
      : lane.role === "secondary"
        ? ROUTE_FIELD_COLORS.secondary
        : ROUTE_FIELD_COLORS.tertiary;
    const lw = isPrimary ? 1.2 : lane.role === "secondary" ? 0.8 : 0.4;

    // Main lane
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.beginPath();
    traceLane(ctx, lane.points, w, h, 0);
    ctx.stroke();

    // Parallel track for primary lanes
    if (isPrimary) {
      ctx.strokeStyle = "rgba(255, 70, 0, 0.07)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      traceLane(ctx, lane.points, w, h, 6);
      ctx.stroke();
    }
  }
}

function drawNodes(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
  for (const cluster of NODE_CLUSTERS) {
    const isTransfer = cluster.role === "transfer";
    for (let i = 0; i < cluster.points.length; i++) {
      const x = cluster.points[i].x * w;
      const y = cluster.points[i].y * h;
      const breathe = isTransfer ? 1 + Math.sin(time * 1.5 + i * 1.2) * 0.12 : 1;
      const base = i === 0 ? 2.5 : 1.6;
      const r = base * breathe;

      ctx.fillStyle = isTransfer && i === 0
        ? ROUTE_FIELD_COLORS.nodeActive
        : ROUTE_FIELD_COLORS.node;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      if (i === 0) {
        ctx.strokeStyle = isTransfer
          ? "rgba(255, 70, 0, 0.2)"
          : "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(x, y, r + 4, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }
}

// Reusable point objects to avoid allocation in hot loop
const _pulsePos = { x: 0, y: 0 };
const _trailPos = { x: 0, y: 0 };

function drawPulses(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  routeMap: Map<string, RouteLane>,
  pulseStates: number[]
) {
  for (let i = 0; i < PULSES.length; i++) {
    const pulse = PULSES[i];
    const route = routeMap.get(pulse.routeId);
    if (!route) continue;

    const t = pulseStates[i];
    if (t < 0 || t > 1) continue; // off-screen, skip drawing

    interpolatePolyline(route.points, t, w, h, _pulsePos);

    // Glow
    const grad = ctx.createRadialGradient(
      _pulsePos.x, _pulsePos.y, 0,
      _pulsePos.x, _pulsePos.y, pulse.size * 3.5
    );
    grad.addColorStop(0, pulse.color);
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(_pulsePos.x, _pulsePos.y, pulse.size * 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Core
    ctx.fillStyle = pulse.color;
    ctx.beginPath();
    ctx.arc(_pulsePos.x, _pulsePos.y, pulse.size, 0, Math.PI * 2);
    ctx.fill();

    // Trail
    const isOrange = pulse.color === "#ff4600";
    for (let s = 1; s <= 4; s++) {
      const trailT = t - 0.015 * s;
      if (trailT < 0) continue;
      interpolatePolyline(route.points, trailT, w, h, _trailPos);
      const a = (1 - s / 4) * 0.25;
      ctx.fillStyle = isOrange
        ? `rgba(255,70,0,${a})`
        : `rgba(255,255,255,${a * 0.4})`;
      ctx.beginPath();
      ctx.arc(_trailPos.x, _trailPos.y, pulse.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawReadabilityMask(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // Center darkening — protects headline zone
  const cg = ctx.createRadialGradient(w * 0.5, h * 0.42, 0, w * 0.5, h * 0.42, w * 0.45);
  cg.addColorStop(0, "rgba(11,11,13,0.5)");
  cg.addColorStop(0.55, "rgba(11,11,13,0.22)");
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
  const tg = ctx.createLinearGradient(0, 0, 0, h * 0.15);
  tg.addColorStop(0, "rgba(11,11,13,0.3)");
  tg.addColorStop(1, "transparent");
  ctx.fillStyle = tg;
  ctx.fillRect(0, 0, w, h);
}

// ─── Component ───

interface Props {
  simplified?: boolean;
}

export default function AbstractRouteFieldCanvas({ simplified = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const pulseStatesRef = useRef<number[]>(PULSES.map((p) => p.offset));
  const routeMapRef = useRef(buildRouteMap());

  const draw = useCallback(
    (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const s = sizeRef.current;
      const { w, h } = s;
      if (w === 0) return;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#0b0b0d";
      ctx.fillRect(0, 0, w, h);

      if (!simplified) drawGrid(ctx, w, h);
      drawLanes(ctx, w, h);
      drawNodes(ctx, w, h, time);

      // Advance pulses
      const ps = pulseStatesRef.current;
      for (let i = 0; i < PULSES.length; i++) {
        ps[i] += PULSES[i].speed * 0.016;
        if (ps[i] > 1.1) ps[i] = -0.1;
      }

      if (!simplified) {
        drawPulses(ctx, w, h, routeMapRef.current, ps);
      }

      drawReadabilityMask(ctx, w, h);
    },
    [simplified]
  );

  // Handle sizing — only recalculate on mount and resize, not every frame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      sizeRef.current = { w, h, dpr };
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
