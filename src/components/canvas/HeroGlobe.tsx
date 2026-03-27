"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ============================================================
// GLSL Vertex Shader — Menerima uniform uPointerPos (vec2)
// Menghitung jarak setiap partikel ke posisi kursor untuk
// efek displacement interaktif magnetik
// ============================================================
const vertexShader = `
  uniform float uTime;
  uniform vec2 uPointerPos;

  attribute float aScale;

  varying float vDistance;
  varying float vElevation;

  void main() {
    vec3 pos = position;

    // Rotasi lambat pada sumbu Y untuk efek orbit globe
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

    // Proyeksi posisi partikel ke ruang layar normalisasi
    vec2 screenPos = gl_Position.xy / gl_Position.w;

    // Kalkulus jarak vektor antara partikel dan kursor
    vDistance = length(screenPos - uPointerPos);

    // Elevasi berdasarkan posisi Y asli untuk variasi warna
    vElevation = position.y;

    // Ukuran partikel — membesar saat dekat kursor
    float proximity = 1.0 - smoothstep(0.0, 0.5, vDistance);
    gl_PointSize = aScale * (3.0 + proximity * 8.0) * (300.0 / -mvPosition.z);
  }
`;

// ============================================================
// GLSL Fragment Shader — Pewarnaan partikel berbasis jarak
// Base: carbon dark (#111111), Proximity glow: logistics orange (#ff4600)
// ============================================================
const fragmentShader = `
  uniform float uTime;

  varying float vDistance;
  varying float vElevation;

  void main() {
    // Bentuk partikel bulat (discard di luar radius)
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    // Soft edge untuk anti-aliasing partikel
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);

    // Warna dasar: carbon dark (#111111 = 0.067, 0.067, 0.067)
    vec3 baseColor = vec3(0.067, 0.067, 0.067);

    // Warna identitas merek: logistics orange (#ff4600 = 1.0, 0.275, 0.0)
    vec3 brandColor = vec3(1.0, 0.275, 0.0);

    // Interpolasi magnetik — partikel menyala oranye saat kursor mendekat
    float proximity = 1.0 - smoothstep(0.0, 0.45, vDistance);
    proximity = pow(proximity, 1.5); // Kurva eksponensial untuk efek dramatis

    // Pulse subtil berdasarkan waktu untuk partikel dekat kursor
    float pulse = sin(uTime * 3.0 + vElevation * 5.0) * 0.15 + 0.85;
    proximity *= pulse;

    // Ambient glow dasar agar globe terlihat tanpa interaksi
    float ambientGlow = 0.08 + 0.05 * sin(uTime * 0.5 + vElevation * 2.0);

    // Campuran warna akhir
    vec3 finalColor = mix(baseColor, brandColor, max(proximity, ambientGlow));

    // Alpha berdasarkan proximity + base visibility
    float finalAlpha = alpha * (0.4 + proximity * 0.6);

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

// ============================================================
// Komponen Partikel Globe — BufferGeometry + Points
// ============================================================
function ParticleGlobe() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  // Generasi formasi titik partikel sferis (distribusi Fibonacci)
  const { positions, scales } = useMemo(() => {
    const count = 4000;
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);
    const radius = 2.2;

    // Distribusi Fibonacci sphere — distribusi merata di permukaan bola
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < count; i++) {
      const theta = Math.acos(1 - (2 * (i + 0.5)) / count);
      const phi = (2 * Math.PI * i) / goldenRatio;

      // Variasi radius untuk efek volume (tidak hanya permukaan)
      const r = radius * (0.85 + Math.random() * 0.3);

      pos[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = r * Math.cos(theta);

      scl[i] = 0.5 + Math.random() * 1.0;
    }

    return { positions: pos, scales: scl };
  }, []);

  // Uniforms untuk shader
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointerPos: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  // Mouse tracking — konversi ke NDC (-1 to 1)
  const handlePointerMove = useCallback(
    (e: THREE.Event & { pointer?: THREE.Vector2 }) => {
      if (e.pointer) {
        pointer.current.copy(e.pointer);
      }
    },
    []
  );

  // Animation loop — update uniforms setiap frame
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

      // Smooth lerp untuk posisi pointer
      materialRef.current.uniforms.uPointerPos.value.lerp(
        state.pointer,
        0.05
      );
    }
  });

  return (
    <points ref={pointsRef} onPointerMove={handlePointerMove}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aScale"
          args={[scales, 1]}
        />
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

// ============================================================
// Canvas Wrapper — Eksportasi untuk digunakan di Hero Section
// ============================================================
export default function HeroGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
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
