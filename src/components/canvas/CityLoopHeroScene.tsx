"use client";

import { useRef, useMemo, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ═══════════════════════════════════════════════════════
// SEEDED RANDOM
// ═══════════════════════════════════════════════════════

function makeRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ═══════════════════════════════════════════════════════
// CITY BUILDINGS — layered silhouettes with depth hierarchy
// ═══════════════════════════════════════════════════════

type BuildingDatum = {
  position: [number, number, number];
  scale: [number, number, number];
};

function CityBuildings() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tempObject = useMemo(() => new THREE.Object3D(), []);

  const buildings = useMemo<BuildingDatum[]>(() => {
    const rng = makeRng(91);
    const b: BuildingDatum[] = [];
    const ground = -0.8;

    // ── LEFT CLUSTER: tall landmark group (creates asymmetric skyline) ──
    const leftX = -14;
    for (let i = 0; i < 6; i++) {
      const h = 4 + rng() * 10;
      b.push({
        position: [leftX + i * 2.2 + rng() * 0.8, ground + h / 2, -6 + rng() * 2],
        scale: [0.9 + rng() * 0.8, h, 0.7 + rng() * 0.6],
      });
    }

    // ── RIGHT CLUSTER: medium group ──
    const rightX = 10;
    for (let i = 0; i < 5; i++) {
      const h = 3 + rng() * 7;
      b.push({
        position: [rightX + i * 2.5 + rng() * 1, ground + h / 2, -5 + rng() * 2],
        scale: [0.8 + rng() * 1, h, 0.6 + rng() * 0.8],
      });
    }

    // ── FAR SKYLINE: continuous low horizon (many small buildings) ──
    for (let i = 0; i < 35; i++) {
      const x = (i - 17) * 2.4 + rng() * 1.5;
      const h = 2 + rng() * 6;
      b.push({
        position: [x, ground + h / 2, -12 - rng() * 5],
        scale: [0.5 + rng() * 0.7, h, 0.4 + rng() * 0.5],
      });
    }

    // ── FOREGROUND EDGES: cropped building edges at screen sides (parallax framing) ──
    // Left edge
    for (let i = 0; i < 3; i++) {
      const h = 3 + rng() * 5;
      b.push({
        position: [-20 + rng() * 2, ground + h / 2, 2 + i * 2],
        scale: [2 + rng() * 1, h, 1.5 + rng()],
      });
    }
    // Right edge
    for (let i = 0; i < 3; i++) {
      const h = 3 + rng() * 5;
      b.push({
        position: [20 + rng() * 2, ground + h / 2, 2 + i * 2],
        scale: [2 + rng() * 1, h, 1.5 + rng()],
      });
    }

    // ── MID-FIELD SCATTERED: fill between clusters ──
    for (let i = 0; i < 12; i++) {
      const x = -8 + rng() * 16;
      const h = 1.5 + rng() * 4;
      b.push({
        position: [x, ground + h / 2, -3 - rng() * 4],
        scale: [0.6 + rng() * 0.8, h, 0.5 + rng() * 0.6],
      });
    }

    return b;
  }, []);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    for (let i = 0; i < buildings.length; i++) {
      const d = buildings[i];
      tempObject.position.set(d.position[0], d.position[1], d.position[2]);
      tempObject.scale.set(d.scale[0], d.scale[1], d.scale[2]);
      tempObject.rotation.set(0, 0, 0);
      tempObject.updateMatrix();
      mesh.setMatrixAt(i, tempObject.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [buildings, tempObject]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, buildings.length]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#141418" roughness={0.85} metalness={0.15} />
    </instancedMesh>
  );
}

// ═══════════════════════════════════════════════════════
// HIGHWAY LOOPS — the main visual anchor
// ═══════════════════════════════════════════════════════

/** Creates a flowing ribbon-like loop curve at a given height plane. */
function makeLoopCurve(
  rx: number, rz: number, y: number,
  ox: number, oz: number, tilt: number, segments = 80
): THREE.CatmullRomCurve3 {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    pts.push(new THREE.Vector3(
      Math.cos(t) * rx + ox,
      y + Math.sin(t * 2) * tilt,
      Math.sin(t) * rz + oz
    ));
  }
  return new THREE.CatmullRomCurve3(pts, true);
}

const HIGHWAY_VERT = `
  varying vec2 vUv;
  varying vec3 vWorldPos;
  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const HIGHWAY_FRAG = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;
  varying vec3 vWorldPos;
  void main() {
    // Smooth flowing pulse
    float pulse = sin((vUv.x - uTime) * 6.0) * 0.5 + 0.5;
    pulse = pow(pulse, 1.8);
    // Persistent base glow — tube is always visible
    pulse = 0.25 + pulse * 0.75;

    // Edge softness
    float edge = 1.0 - abs(vUv.y - 0.5) * 2.0;
    edge = pow(edge, 0.4);

    float a = pulse * edge * uOpacity;
    gl_FragColor = vec4(uColor, a);
  }
`;

function HighwayLoop({
  curve, width, opacity, speed, color,
}: {
  curve: THREE.CatmullRomCurve3;
  width: number;
  opacity: number;
  speed: number;
  color?: string;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const geo = useMemo(
    () => new THREE.TubeGeometry(curve, 100, width, 6, true),
    [curve, width]
  );

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(color || "#ff4600") },
    uOpacity: { value: opacity },
  }), [opacity, color]);

  useFrame((_, dt) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += dt * speed;
  });

  return (
    <mesh geometry={geo}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={HIGHWAY_VERT}
        fragmentShader={HIGHWAY_FRAG}
      />
    </mesh>
  );
}

function HighwaySystem() {
  const loops = useMemo(() => [
    // ── MAIN LOOP: dominant wide sweep, clearly visible ──
    { curve: makeLoopCurve(14, 7, -0.6, -1, -3, 0.4), width: 0.09, opacity: 0.85, speed: 0.10 },
    // ── INNER LOOP: tighter, slightly offset ──
    { curve: makeLoopCurve(10, 5, -0.4, 1, -2, 0.25), width: 0.07, opacity: 0.65, speed: 0.14 },
    // ── LOW LOOP: beneath the main, adds depth ──
    { curve: makeLoopCurve(12, 6, -1.0, -2, -4, 0.3), width: 0.06, opacity: 0.5, speed: 0.08 },
    // ── FAR ATMOSPHERIC: large, slow, atmospheric presence ──
    { curve: makeLoopCurve(18, 9, -0.8, 2, -7, 0.5), width: 0.05, opacity: 0.25, speed: 0.05 },
  ], []);

  return (
    <group>
      {loops.map((l, i) => <HighwayLoop key={i} {...l} />)}
    </group>
  );
}

// ═══════════════════════════════════════════════════════
// GROUND PLANE — dark with subtle orange reflection
// ═══════════════════════════════════════════════════════

function GroundPlane() {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -0.85, 0]}>
      <planeGeometry args={[120, 80]} />
      <meshStandardMaterial color="#0a0a0d" roughness={0.7} metalness={0.3} />
    </mesh>
  );
}

// ═══════════════════════════════════════════════════════
// LIGHTING — multiple strategic orange lights
// ═══════════════════════════════════════════════════════

function Lighting() {
  return (
    <group>
      {/* Main highway-level orange wash */}
      <pointLight position={[0, 0.5, -2]} color="#ff4600" intensity={1.2} distance={30} decay={2} />
      {/* Left cluster accent */}
      <pointLight position={[-12, 2, -5]} color="#ff4600" intensity={0.5} distance={20} decay={2} />
      {/* Right accent */}
      <pointLight position={[12, 1, -4]} color="#ff4600" intensity={0.4} distance={18} decay={2} />
      {/* Far skyline wash */}
      <pointLight position={[0, 3, -14]} color="#ff4600" intensity={0.3} distance={25} decay={2} />
      {/* Base ambient — keeps buildings from being pure black */}
      <ambientLight intensity={0.06} />
    </group>
  );
}

// ═══════════════════════════════════════════════════════
// CAMERA DRIFT — slow cinematic
// ═══════════════════════════════════════════════════════

function CameraDrift() {
  useFrame(({ camera, clock }) => {
    const t = clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.035) * 0.5;
    camera.position.y = 2.2 + Math.sin(t * 0.05) * 0.1;
    camera.lookAt(0, 0.2, -5);
  });
  return null;
}

// ═══════════════════════════════════════════════════════
// EXPORTED SCENE
// ═══════════════════════════════════════════════════════

interface Props {
  simplified?: boolean;
}

export default function CityLoopHeroScene({ simplified = false }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 2.2, 6], fov: 58, near: 0.1, far: 80 }}
      dpr={simplified ? [1, 1] : [1, 1.5]}
      gl={{
        antialias: !simplified,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <fog attach="fog" args={["#08080a", 8, 38]} />
      <color attach="background" args={["#08080a"]} />
      <CameraDrift />
      <Lighting />
      <GroundPlane />
      <CityBuildings />
      <HighwaySystem />
    </Canvas>
  );
}
