"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Icosahedron, Torus, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";

function ParticleField({ count = 1200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.04;
    ref.current.rotation.x = state.clock.elapsedTime * 0.02;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#5eead4"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  );
}

function CoreGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.18;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -state.clock.elapsedTime * 0.3;
      innerRef.current.rotation.x = state.clock.elapsedTime * 0.22;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
        <Icosahedron args={[1.6, 1]}>
          <meshBasicMaterial
            color="#5eead4"
            wireframe
            transparent
            opacity={0.55}
          />
        </Icosahedron>
        <Icosahedron args={[1.6, 1]} scale={1.001}>
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.18} />
        </Icosahedron>
      </Float>

      <mesh ref={innerRef}>
        <Torus args={[2.4, 0.012, 8, 128]} rotation={[Math.PI / 2.6, 0, 0]}>
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.45} />
        </Torus>
      </mesh>
      <mesh>
        <Torus args={[2.9, 0.008, 8, 128]} rotation={[Math.PI / 3.6, Math.PI / 2.2, 0]}>
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.32} />
        </Torus>
      </mesh>
      <mesh>
        <Torus args={[3.3, 0.006, 8, 128]} rotation={[Math.PI / 2.1, Math.PI / 1.5, 0]}>
          <meshBasicMaterial color="#5eead4" transparent opacity={0.22} />
        </Torus>
      </mesh>
    </group>
  );
}

function MouseParallax() {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.6;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  useFrame(() => {
    camera.position.x += (target.current.x - camera.position.x) * 0.04;
    camera.position.y += (-target.current.y - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#05070d"]} />
      <fog attach="fog" args={["#05070d", 8, 18]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#22d3ee" />
      <pointLight position={[-5, -3, -2]} intensity={0.4} color="#fbbf24" />
      <ParticleField count={1100} />
      <CoreGeometry />
      <MouseParallax />
    </Canvas>
  );
}
