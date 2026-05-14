"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  Mesh,
  Points,
} from "three";

function ParticleCloud() {
  const points = useRef<Points>(null);
  const geometry = useMemo(() => {
    const positions: number[] = [];

    for (let index = 0; index < 320; index += 1) {
      const radius = 1.15 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      );
    }

    const cloud = new BufferGeometry();
    cloud.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return cloud;
  }, []);

  useFrame((_, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.055;
    points.current.rotation.x += delta * 0.025;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color="#9ff6ff"
        size={0.026}
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

function CoreObject() {
  const group = useRef<Group>(null);
  const core = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current || !core.current) return;
    group.current.rotation.y += delta * 0.18;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.55) * 0.05;
    core.current.rotation.x += delta * 0.28;
    core.current.rotation.y -= delta * 0.2;
  });

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.64, 2]} />
        <meshStandardMaterial
          color="#10354a"
          emissive="#00e7ff"
          emissiveIntensity={1.35}
          metalness={0.55}
          roughness={0.22}
          transparent
          opacity={0.72}
          wireframe
        />
      </mesh>

      <mesh rotation={[Math.PI / 4, Math.PI / 8, 0]}>
        <octahedronGeometry args={[0.92, 1]} />
        <meshBasicMaterial color="#8a5cff" transparent opacity={0.28} wireframe />
      </mesh>

      {[0, 1, 2].map((ring) => (
        <mesh
          key={ring}
          rotation={[
            ring === 0 ? Math.PI / 2 : Math.PI / 2.8,
            ring === 1 ? Math.PI / 3.5 : 0,
            ring === 2 ? Math.PI / 5 : 0,
          ]}
        >
          <torusGeometry args={[1.18 + ring * 0.43, 0.01, 8, 128]} />
          <meshBasicMaterial
            color={ring === 1 ? "#8a5cff" : "#00e7ff"}
            transparent
            opacity={ring === 1 ? 0.46 : 0.7}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}

      {Array.from({ length: 10 }, (_, index) => {
        const angle = (Math.PI * 2 * index) / 10;
        return (
          <mesh key={index} position={[Math.cos(angle) * 1.55, Math.sin(angle) * 1.55, 0]}>
            <sphereGeometry args={[index % 3 === 0 ? 0.04 : 0.026, 12, 12]} />
            <meshBasicMaterial
              color={index % 2 ? "#41ffb4" : "#00e7ff"}
              transparent
              opacity={0.82}
              blending={AdditiveBlending}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export function ThreeAICore() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 42 }}
        dpr={[1, 1.25]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.45} />
        <pointLight position={[2.4, 2.1, 2.6]} intensity={2.1} color="#00e7ff" />
        <pointLight position={[-2.2, -1.8, 2.2]} intensity={1.45} color="#8a5cff" />
        <ParticleCloud />
        <CoreObject />
      </Canvas>
    </div>
  );
}
