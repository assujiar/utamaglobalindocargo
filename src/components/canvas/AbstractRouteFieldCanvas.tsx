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

/** Interpolate a position along a polyline at parameter t ∈ [0,1] */
function interpolatePolyline(
  points: Point[],
  t: number,
  w: number,
  h: number
): { x: number; y: number } {
  const clamped = Math.max(0, Math.min(1, t));
  const segment = clamped * (points.length - 1);
  const i = Math.floor(segment);
  const frac = segment - i;
  const a = points[Math.min(i, points.length - 1)];
  const b = points[Math.min(i + 1, points.length - 1)];
  return {
    x: (a.x + (b.x - a.x) * frac) * w,
    y: (a.y + (b.y - a.y) * frac) * h,
  };
}

/** Build a route lookup map */
function buildRouteMap(): Map<string, RouteLane> {
  const map = new Map<string, RouteLane>();
  for (const lane of ROUTE_LANES) {
    map.set(lane.id, lane);
  }
  return map;
}

// ─── Drawing functions ───

function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const spacing = 120;
  ctx.strokeStyle = ROUTE_FIELD_COLORS.grid;
  ctx.lineWidth = 0.5;

  // Vertical lines
  for (let x = 0; x < w; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  // Horizontal lines
  for (let y = 0; y < h; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
}

function drawLanes(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number
) {
  for (const lane of ROUTE_LANES) {
    const color =
      lane.role === "primary"
        ? ROUTE_FIELD_COLORS.primary
        : lane.role === "secondary"
          ? ROUTE_FIELD_COLORS.secondary
          : ROUTE_FIELD_COLORS.tertiary;

    const lineWidth =
      lane.role === "primary" ? 1.2 : lane.role === "secondary" ? 0.8 : 0.4;

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();

    const pts = lane.points;
    const p0 = { x: pts[0].x * w, y: pts[0].y * h };
    ctx.moveTo(p0.x, p0.y);

    // Draw smooth curve through points using quadratic bezier
    for (let i = 1; i < pts.length; i++) {
      const curr = { x: pts[i].x * w, y: pts[i].y * h };
      if (i === 1) {
        // First segment: line to midpoint
        const mx = (p0.x + curr.x) / 2;
        const my = (p0.y + curr.y) / 2;
        ctx.lineTo(mx, my);
      }
      if (i < pts.length - 1) {
        const next = { x: pts[i + 1].x * w, y: pts[i + 1].y * h };
        const mx = (curr.x + next.x) / 2;
        const my = (curr.y + next.y) / 2;
        ctx.quadraticCurveTo(curr.x, curr.y, mx, my);
      } else {
        ctx.lineTo(curr.x, curr.y);
      }
    }

    ctx.stroke();

    // For primary lanes, draw a faint parallel lane (double-track effect)
    if (lane.role === "primary") {
      const offset = 6 + Math.sin(time * 0.3) * 0.5; // subtle breathing
      ctx.strokeStyle = "rgba(255, 70, 0, 0.08)";
      ctx.lineWidth = 0.6;
      ctx.beginPath();

      const pOff0 = { x: pts[0].x * w, y: pts[0].y * h + offset };
      ctx.moveTo(pOff0.x, pOff0.y);

      for (let i = 1; i < pts.length; i++) {
        const curr = { x: pts[i].x * w, y: pts[i].y * h + offset };
        if (i === 1) {
          const mx = (pOff0.x + curr.x) / 2;
          const my = (pOff0.y + curr.y) / 2;
          ctx.lineTo(mx, my);
        }
        if (i < pts.length - 1) {
          const next = { x: pts[i + 1].x * w, y: pts[i + 1].y * h + offset };
          const mx = (curr.x + next.x) / 2;
          const my = (curr.y + next.y) / 2;
          ctx.quadraticCurveTo(curr.x, curr.y, mx, my);
        } else {
          ctx.lineTo(curr.x, curr.y);
        }
      }
      ctx.stroke();
    }
  }
}

function drawNodes(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number
) {
  for (const cluster of NODE_CLUSTERS) {
    const isTransfer = cluster.role === "transfer";

    for (let i = 0; i < cluster.points.length; i++) {
      const pt = cluster.points[i];
      const x = pt.x * w;
      const y = pt.y * h;

      // Subtle pulse for transfer zone nodes
      const breathe = isTransfer
        ? 1 + Math.sin(time * 1.5 + i * 1.2) * 0.15
        : 1;

      const baseRadius = i === 0 ? 2.5 : 1.8;
      const radius = baseRadius * breathe;

      // Node fill
      if (isTransfer && i === 0) {
        ctx.fillStyle = ROUTE_FIELD_COLORS.nodeActive;
      } else {
        ctx.fillStyle = ROUTE_FIELD_COLORS.node;
      }

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Outer ring for primary nodes
      if (i === 0) {
        ctx.strokeStyle = isTransfer
          ? "rgba(255, 70, 0, 0.25)"
          : "rgba(255, 255, 255, 0.12)";
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.arc(x, y, radius + 4, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }
}

function drawPulses(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  routeMap: Map<string, RouteLane>,
  pulseStates: number[]
) {
  for (let i = 0; i < PULSES.length; i++) {
    const pulse = PULSES[i];
    const route = routeMap.get(pulse.routeId);
    if (!route) continue;

    // Advance pulse position
    const t = pulseStates[i];
    const pos = interpolatePolyline(route.points, t, w, h);

    // Draw pulse glow
    const gradient = ctx.createRadialGradient(
      pos.x,
      pos.y,
      0,
      pos.x,
      pos.y,
      pulse.size * 4
    );
    gradient.addColorStop(0, pulse.color);
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, pulse.size * 4, 0, Math.PI * 2);
    ctx.fill();

    // Draw pulse core
    ctx.fillStyle = pulse.color;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, pulse.size, 0, Math.PI * 2);
    ctx.fill();

    // Draw faint trail behind pulse
    const trailLength = 0.06;
    const trailSteps = 5;
    for (let s = 1; s <= trailSteps; s++) {
      const trailT = t - (trailLength * s) / trailSteps;
      if (trailT < 0) continue;
      const trailPos = interpolatePolyline(route.points, trailT, w, h);
      const alpha = (1 - s / trailSteps) * 0.3;
      ctx.fillStyle =
        pulse.color === "#ff4600"
          ? `rgba(255, 70, 0, ${alpha})`
          : `rgba(255, 255, 255, ${alpha * 0.5})`;
      ctx.beginPath();
      ctx.arc(trailPos.x, trailPos.y, pulse.size * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Return is handled via mutation of pulseStates
  void time; // used indirectly via pulse state advancement
}

// ─── Readability mask ───
// Creates a darker zone in the content area so text stays readable

function drawReadabilityMask(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) {
  // Center-weighted darkening — protects headline zone
  const gradient = ctx.createRadialGradient(
    w * 0.5,
    h * 0.38,
    0,
    w * 0.5,
    h * 0.38,
    w * 0.5
  );
  gradient.addColorStop(0, "rgba(11, 11, 13, 0.42)");
  gradient.addColorStop(0.5, "rgba(11, 11, 13, 0.18)");
  gradient.addColorStop(1, "rgba(11, 11, 13, 0.0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  // Bottom vignette
  const bottomGrad = ctx.createLinearGradient(0, h * 0.6, 0, h);
  bottomGrad.addColorStop(0, "transparent");
  bottomGrad.addColorStop(1, "rgba(11, 11, 13, 0.55)");
  ctx.fillStyle = bottomGrad;
  ctx.fillRect(0, 0, w, h);

  // Top vignette
  const topGrad = ctx.createLinearGradient(0, 0, 0, h * 0.2);
  topGrad.addColorStop(0, "rgba(11, 11, 13, 0.35)");
  topGrad.addColorStop(1, "transparent");
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, w, h);
}

// ─── Main component ───

interface Props {
  simplified?: boolean;
}

export default function AbstractRouteFieldCanvas({
  simplified = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const pulseStatesRef = useRef<number[]>(
    PULSES.map((p) => p.offset)
  );
  const routeMapRef = useRef<Map<string, RouteLane>>(buildRouteMap());

  const draw = useCallback(
    (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Resize canvas if needed
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);
      }

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Background
      ctx.fillStyle = "#0b0b0d";
      ctx.fillRect(0, 0, w, h);

      // Grid
      if (!simplified) {
        drawGrid(ctx, w, h);
      }

      // Lanes
      drawLanes(ctx, w, h, time);

      // Nodes
      drawNodes(ctx, w, h, time);

      // Pulses (advance state)
      const pulseStates = pulseStatesRef.current;
      for (let i = 0; i < PULSES.length; i++) {
        pulseStates[i] += PULSES[i].speed * 0.016; // ~60fps normalized
        if (pulseStates[i] > 1.08) {
          pulseStates[i] = -0.08; // wrap around with buffer
        }
      }

      if (!simplified) {
        drawPulses(ctx, w, h, time, routeMapRef.current, pulseStates);
      }

      // Readability overlays
      drawReadabilityMask(ctx, w, h);
    },
    [simplified]
  );

  useEffect(() => {
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      draw(elapsed);
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animRef.current);
    };
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
