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
// CITY BUILDINGS — procedural instanced silhouettes
// ═══════════════════════════════════════════════════════

type BuildingDatum = {
  position: [number, number, number];
  scale: [number, number, number];
};

function CityBuildings() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tempObject = useMemo(() => new THREE.Object3D(), []);

  const buildings = useMemo<BuildingDatum[]>(() => {
    const rng = makeRng(77);
    const result: BuildingDatum[] = [];

    // Near row
    for (let i = 0; i < 16; i++) {
      const x = (i - 8) * 3.5 + rng() * 1.5;
      const h = 1.5 + rng() * 5;
      result.push({
        position: [x, h / 2 - 2, -1 + rng() * 3],
        scale: [0.8 + rng() * 1.4, h, 0.8 + rng() * 1.2],
      });
    }
    // Far row
    for (let i = 0; i < 22; i++) {
      const x = (i - 11) * 3 + rng() * 2;
      const h = 2.5 + rng() * 7;
      result.push({
        position: [x, h / 2 - 2, -7 + rng() * 3],
        scale: [0.6 + rng() * 1, h, 0.6 + rng() * 0.8],
      });
    }
    // Very far skyline
    for (let i = 0; i < 28; i++) {
      const x = (i - 14) * 2.6 + rng() * 2;
      const h = 3 + rng() * 9;
      result.push({
        position: [x, h / 2 - 2.5, -13 + rng() * 3],
        scale: [0.5 + rng() * 0.8, h, 0.4 + rng() * 0.6],
      });
    }

    return result;
  }, []);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    for (let i = 0; i < buildings.length; i++) {
      const b = buildings[i];
      tempObject.position.set(b.position[0], b.position[1], b.position[2]);
      tempObject.scale.set(b.scale[0], b.scale[1], b.scale[2]);
      tempObject.rotation.set(0, 0, 0);
      tempObject.updateMatrix();
      mesh.setMatrixAt(i, tempObject.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [buildings, tempObject]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, buildings.length]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#151519" roughness={0.9} metalness={0.1} />
    </instancedMesh>
  );
}

// ═══════════════════════════════════════════════════════
// HIGHWAY LOOPS — glowing orange speed trails
// ═══════════════════════════════════════════════════════

function makeLoopCurve(
  rx: number, rz: number, y: number,
  ox: number, oz: number, tilt: number
): THREE.CatmullRomCurve3 {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= 64; i++) {
    const t = (i / 64) * Math.PI * 2;
    pts.push(new THREE.Vector3(
      Math.cos(t) * rx + ox,
      y + Math.sin(t * 2) * tilt,
      Math.sin(t) * rz + oz
    ));
  }
  return new THREE.CatmullRomCurve3(pts, true);
}

const VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;
  void main() {
    // Smoother, more even flow — less flashy than pow(3)
    float pulse = sin((vUv.x - uTime) * 8.0) * 0.5 + 0.5;
    pulse = pow(pulse, 2.0);
    // Gentle constant base glow so the tube is always slightly visible
    pulse = 0.15 + pulse * 0.85;

    float edge = 1.0 - abs(vUv.y - 0.5) * 2.0;
    edge = pow(edge, 0.6);

    float a = pulse * edge * uOpacity;
    gl_FragColor = vec4(uColor, a);
  }
`;

function HighwayLoop({
  curve, width, opacity, speed,
}: {
  curve: THREE.CatmullRomCurve3;
  width: number;
  opacity: number;
  speed: number;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const geo = useMemo(
    () => new THREE.TubeGeometry(curve, 80, width, 4, true),
    [curve, width]
  );

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#ff4600") },
    uOpacity: { value: opacity },
  }), [opacity]);

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
        vertexShader={VERT}
        fragmentShader={FRAG}
      />
    </mesh>
  );
}

function HighwaySystem() {
  // 3 loops: dominant sweep, mid supporting, far atmospheric
  const loops = useMemo(() => [
    { curve: makeLoopCurve(12, 6, -1.8, 0, -2, 0.3), width: 0.055, opacity: 0.6, speed: 0.12 },
    { curve: makeLoopCurve(8, 4, -1.6, 1, -1, 0.2), width: 0.04, opacity: 0.4, speed: 0.16 },
    { curve: makeLoopCurve(15, 8, -2.4, 2, -5, 0.35), width: 0.03, opacity: 0.2, speed: 0.07 },
  ], []);

  return (
    <group>
      {loops.map((l, i) => <HighwayLoop key={i} {...l} />)}
    </group>
  );
}

// ═══════════════════════════════════════════════════════
// GROUND + ATMOSPHERE + CAMERA
// ═══════════════════════════════════════════════════════

function GroundPlane() {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -2.2, 0]}>
      <planeGeometry args={[100, 60]} />
      <meshBasicMaterial color="#080809" />
    </mesh>
  );
}

function Atmosphere() {
  return (
    <group>
      <pointLight position={[0, -0.5, -3]} color="#ff4600" intensity={0.5} distance={30} decay={2} />
      <ambientLight intensity={0.04} />
    </group>
  );
}

function CameraDrift() {
  useFrame(({ camera, clock }) => {
    const t = clock.elapsedTime;
    // Barely perceptible — premium, not distracting
    camera.position.x = Math.sin(t * 0.04) * 0.3;
    camera.position.y = 3.5 + Math.sin(t * 0.06) * 0.08;
    camera.lookAt(0, -0.5, -4);
  });
  return null;
}

// ═══════════════════════════════════════════════════════
// EXPORTED COMPONENT
// ═══════════════════════════════════════════════════════

interface Props {
  simplified?: boolean;
}

export default function CityLoopHeroScene({ simplified = false }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 3.5, 8], fov: 55, near: 0.1, far: 80 }}
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
      <fog attach="fog" args={["#08080a", 10, 42]} />
      <color attach="background" args={["#08080a"]} />
      <CameraDrift />
      <Atmosphere />
      <GroundPlane />
      <CityBuildings />
      <HighwaySystem />
    </Canvas>
  );
}
