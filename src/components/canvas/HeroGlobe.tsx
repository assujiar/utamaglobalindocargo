"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform vec2 uPointerPos;

  attribute float aScale;

  varying float vDistance;
  varying float vElevation;

  void main() {
    vec3 pos = position;

    float angle = uTime * 0.15;
    float cosA = cos(angle);
    float sinA = sin(angle);
    pos = vec3(
      pos.x * cosA - pos.z * sinA,
      pos.y,
      pos.x * sinA + pos.z * cosA
    );

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    vec2 screenPos = gl_Position.xy / gl_Position.w;
    vDistance = length(screenPos - uPointerPos);
    vElevation = position.y;

    float proximity = 1.0 - smoothstep(0.0, 0.5, vDistance);
    gl_PointSize = aScale * (3.0 + proximity * 8.0) * (300.0 / -mvPosition.z);
  }
`;

const fragmentShader = `
  uniform float uTime;

  varying float vDistance;
  varying float vElevation;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);

    vec3 baseColor = vec3(0.067, 0.067, 0.067);
    vec3 brandColor = vec3(1.0, 0.275, 0.0);

    float proximity = 1.0 - smoothstep(0.0, 0.45, vDistance);
    proximity = pow(proximity, 1.5);

    float pulse = sin(uTime * 3.0 + vElevation * 5.0) * 0.15 + 0.85;
    proximity *= pulse;

    float ambientGlow = 0.08 + 0.05 * sin(uTime * 0.5 + vElevation * 2.0);

    vec3 finalColor = mix(baseColor, brandColor, max(proximity, ambientGlow));
    float finalAlpha = alpha * (0.4 + proximity * 0.6);

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

function ParticleGlobe() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, scales } = useMemo(() => {
    function seededRandom(seed: number) {
      let s = seed;
      return () => {
        s = (s + 0x6d2b79f5) | 0;
        let t = Math.imul(s ^ (s >>> 15), 1 | s);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    const rand = seededRandom(42);

    const count = 4000;
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);
    const radius = 2.2;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < count; i++) {
      const theta = Math.acos(1 - (2 * (i + 0.5)) / count);
      const phi = (2 * Math.PI * i) / goldenRatio;
      const r = radius * (0.85 + rand() * 0.3);

      pos[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = r * Math.cos(theta);
      scl[i] = 0.5 + rand() * 1.0;
    }

    return { positions: pos, scales: scl };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointerPos: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uPointerPos.value.lerp(
        state.pointer,
        0.05
      );
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * Static fallback for reduced-motion preference or WebGL failure.
 * Shows a subtle radial gradient matching the brand colors.
 */
function StaticFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(255,70,0,0.08) 0%, rgba(17,17,17,0) 60%)",
      }}
    />
  );
}

/**
 * Checks if WebGL is available and reduced motion is not preferred.
 * Uses useSyncExternalStore to avoid setState-in-effect lint issues.
 */
function checkWebGLCapability(): boolean {
  if (typeof window === "undefined") return false;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return false;

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

// Cache the result since WebGL capability doesn't change
let cachedResult: "yes" | "no" | null = null;
function getCanRenderWebGL(): "yes" | "no" {
  if (cachedResult === null) {
    cachedResult = checkWebGLCapability() ? "yes" : "no";
  }
  return cachedResult;
}

function useCanRenderWebGL() {
  const [status, setStatus] = useState<"yes" | "no" | "pending">("pending");

  useEffect(() => {
    // Deferred to avoid synchronous setState in effect body
    const id = requestAnimationFrame(() => {
      setStatus(getCanRenderWebGL());
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return status;
}

export default function HeroGlobe() {
  const canRender = useCanRenderWebGL();

  if (canRender !== "yes") {
    return <StaticFallback />;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    >
      <ParticleGlobe />
    </Canvas>
  );
}
