"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import ParticleField from "./ParticleField";
import { world } from "@/lib/scrollState";

function CameraRig() {
  const look = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const pos = useMemo(() => new THREE.Vector3(), []);
  useFrame((state, dt) => {
    const px = world.reduced ? 0 : world.pointer.x;
    const py = world.reduced ? 0 : world.pointer.y;
    const aspect = state.size.width / state.size.height;
    const back = aspect < 1 ? (1 - aspect) * 5 : 0; // layar portrait: mundur
    pos.set(px * 0.35, py * 0.25, 9 + back);
    state.camera.position.lerp(pos, 1 - Math.exp(-dt * 8));
    state.camera.lookAt(look);
  });
  return null;
}

/** Bentuk wireframe melayang di kejauhan untuk kedalaman paralaks. */
function Drifters() {
  const group = useRef<THREE.Group>(null);
  const items = useMemo(
    () => {
      return Array.from({ length: 11 }, (_, i) => {
        const rand = (n = 0) => {
          const x = Math.sin(i * 12.9898 + n * 78.233 + 7) * 43758.5453;
          return x - Math.floor(x);
        };
        let n = 0;
        const r = () => rand(++n);
        const side = i % 2 ? 1 : -1;
        return {
          pos: [side * (5 + r() * 7), (r() - 0.5) * 9, -6 - r() * 14] as [number, number, number],
          scale: 0.5 + r() * 1.2,
          kind: i % 3,
          speed: 0.05 + r() * 0.12,
          accent: i % 4 === 0,
        };
      });
    },
    [],
  );
  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = world.reduced ? 0 : state.clock.elapsedTime;
    g.children.forEach((c, i) => {
      const it = items[i];
      c.rotation.x = t * it.speed + i;
      c.rotation.y = t * it.speed * 1.3;
      c.position.y = it.pos[1] + world.p * (i % 2 ? 6 : -6);
    });
  });
  return (
    <group ref={group}>
      {items.map((it, i) => (
        <mesh key={i} position={it.pos} scale={it.scale}>
          {it.kind === 0 ? <icosahedronGeometry args={[1, 0]} /> : it.kind === 1 ? <octahedronGeometry args={[1, 0]} /> : <torusGeometry args={[1, 0.18, 8, 24]} />}
          <meshBasicMaterial wireframe color={it.accent ? "#ff4d1c" : "#6f6c64"} transparent opacity={it.accent ? 0.6 : 0.4} />
        </mesh>
      ))}
    </group>
  );
}

function Pointer() {
  useEffect(() => {
    const move = (e: PointerEvent) => {
      world.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      world.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
      world.pointer.active = true;
    };
    const leave = () => (world.pointer.active = false);
    const down = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a,button")) return;
      world.burstAt = performance.now() / 1000;
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);
  return null;
}

export default function World() {
  const mobile = typeof window !== "undefined" && window.innerWidth < 760;
  return (
    <div className="fixed inset-0 z-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50, near: 0.1, far: 80 }}
        dpr={[1, 1.75]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <CameraRig />
        <Drifters />
        <ParticleField count={mobile ? 16000 : 28000} />
        <Pointer />
      </Canvas>
    </div>
  );
}
