"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { world } from "@/lib/scrollState";
import { helixShape, knotShape, ringShape, sphereShape, textShape } from "@/lib/shapes";

const VERT = /* glsl */ `
  attribute vec3 aP1; attribute vec3 aP2; attribute vec3 aP3; attribute vec3 aP4;
  attribute vec4 aRand;
  uniform float uTime, uU, uSize, uPR, uBurst;
  uniform vec3 uPointer;
  uniform float uPointerOn;
  varying float vRand;
  varying float vFade;

  vec3 sel(float i){
    vec3 r = position;
    r = mix(r, aP1, step(0.5, i));
    r = mix(r, aP2, step(1.5, i));
    r = mix(r, aP3, step(2.5, i));
    r = mix(r, aP4, step(3.5, i));
    return r;
  }
  mat2 rot(float a){ float c = cos(a), s = sin(a); return mat2(c,-s,s,c); }

  void main(){
    float u = clamp(uU, 0.0, 3.9999);
    float i = floor(u);
    float f = fract(u);
    vec3 a = sel(i);
    vec3 b = sel(i + 1.0);
    float d = aRand.x * 0.42;
    float t = smoothstep(d, d + 0.58, f);
    vec3 p = mix(a, b, t);
    float travel = sin(t * 3.14159);
    p.xz = rot(travel * (aRand.y - 0.5) * 4.0) * p.xz;
    p += (aRand.yzw - 0.5) * travel * 3.2;

    // napas halus
    p += 0.035 * vec3(
      sin(uTime * 0.8 + aRand.y * 40.0),
      cos(uTime * 0.7 + aRand.z * 40.0),
      sin(uTime * 0.6 + aRand.w * 40.0));

    // ledakan klik: naik cepat, kembali elastis
    vec3 dir = normalize(p + (aRand.yzw - 0.5) * 0.8 + 0.0001);
    p += dir * uBurst * (1.2 + aRand.x * 3.4);

    vec4 world = modelMatrix * vec4(p, 1.0);

    // kursor menolak partikel
    vec3 dv = world.xyz - uPointer;
    float dist = length(dv.xy);
    float k = smoothstep(1.7, 0.0, dist) * uPointerOn;
    world.xy += normalize(dv.xy + 0.0001) * k * 1.1;
    world.z += k * (aRand.z - 0.3) * 1.2;

    vec4 mv = viewMatrix * world;
    float depth = -mv.z;
    gl_PointSize = clamp(uSize * uPR * (0.55 + aRand.x * 0.9) / max(depth, 0.5) * 9.0, 1.0, 16.0 * uPR);
    gl_Position = projectionMatrix * mv;
    vRand = aRand.w;
    vFade = smoothstep(0.35, 1.4, depth);
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uAccent;
  uniform float uAccentAmt;
  uniform float uDim;
  varying float vRand;
  varying float vFade;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = pow(smoothstep(0.5, 0.0, d), 1.6);
    float isAccent = step(1.0 - uAccentAmt, vRand);
    vec3 col = mix(uInk, uAccent, isAccent);
    gl_FragColor = vec4(col, a * 1.1 * vFade * uDim);
  }
`;

type Props = { count: number };

export default function ParticleField({ count }: Props) {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { camera, viewport, size } = useThree();
  const [geo, setGeo] = useState<THREE.BufferGeometry | null>(null);
  const uSmooth = useRef(0);
  const pointerWorld = useMemo(() => new THREE.Vector3(999, 999, 0), []);
  const pointerSmooth = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let cancelled = false;
    const build = async () => {
      const family =
        getComputedStyle(document.documentElement).getPropertyValue("--f-serif").trim() || "sans-serif";
      try {
        await document.fonts.load(`400 100px ${family}`, "HIZBY");
        await document.fonts.ready;
      } catch {}
      if (cancelled) return;
      const g = new THREE.BufferGeometry();
      const n = count;
      g.setAttribute("position", new THREE.BufferAttribute(textShape(n, "HIZBY", family, 9.2), 3));
      g.setAttribute("aP1", new THREE.BufferAttribute(sphereShape(n), 3));
      g.setAttribute("aP2", new THREE.BufferAttribute(knotShape(n), 3));
      g.setAttribute("aP3", new THREE.BufferAttribute(helixShape(n), 3));
      g.setAttribute("aP4", new THREE.BufferAttribute(ringShape(n), 3));
      const r = new Float32Array(n * 4);
      for (let i = 0; i < r.length; i++) r[i] = Math.random();
      g.setAttribute("aRand", new THREE.BufferAttribute(r, 4));
      g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 50);
      setGeo(g);
      world.ready = true;
      window.dispatchEvent(new Event("world-ready"));
    };
    build();
    return () => {
      cancelled = true;
    };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uU: { value: 0 },
      uSize: { value: 1.9 },
      uPR: { value: 1 },
      uBurst: { value: 0 },
      uPointer: { value: pointerWorld },
      uPointerOn: { value: 0 },
      uInk: { value: new THREE.Color("#141414") },
      uAccent: { value: new THREE.Color("#ff4d1c") },
      uAccentAmt: { value: 0.16 },
      uDim: { value: 1 },
    }),
    [pointerWorld],
  );

  useFrame((state, dt) => {
    const m = mat.current;
    const g = group.current;
    if (!m || !g) return;
    const reduced = world.reduced;
    const t = state.clock.elapsedTime;
    m.uniforms.uTime.value = reduced ? 0 : t;
    m.uniforms.uPR.value = state.gl.getPixelRatio();

    // wujud mengikuti scroll (dihaluskan)
    const target = world.shape;
    uSmooth.current += (target - uSmooth.current) * (1 - Math.exp(-dt * (reduced ? 30 : 5)));
    m.uniforms.uU.value = uSmooth.current;
    const k = 1 - Math.exp(-dt * (reduced ? 30 : 4));
    const sizeAspect = size.width / size.height;
    const ox = sizeAspect < 1 ? 0 : world.offsetX * Math.min(1, sizeAspect / 1.7);
    g.position.x += (ox - g.position.x) * k;
    m.uniforms.uDim.value += (world.dim - m.uniforms.uDim.value) * k;

    // rotasi dunia: berakhir pas 4π di p=1 sehingga cincin menghadap pengunjung
    const rotScroll = world.p * Math.PI * 4; // p=1 -> 4π: cincin menghadap pengunjung
    const ps = pointerSmooth.current;
    ps.x += (world.pointer.x - ps.x) * (1 - Math.exp(-dt * 4));
    ps.y += (world.pointer.y - ps.y) * (1 - Math.exp(-dt * 4));
    g.rotation.y = rotScroll + (reduced ? 0 : ps.x * 0.25);
    g.rotation.x = reduced ? 0 : -ps.y * 0.12;

    // skala responsif
    const aspect = size.width / size.height;
    const s = aspect < 1 ? 0.42 : Math.min(1, Math.max(0.5, aspect / 1.9));
    g.scale.setScalar(s);

    // kursor -> titik di bidang z=0 dunia
    const px = world.pointer.x;
    const py = world.pointer.y;
    const v = new THREE.Vector3(px, py, 0.5).unproject(camera);
    const dir = v.sub(camera.position).normalize();
    const distZ = -camera.position.z / (dir.z || 1e-4);
    const hit = camera.position.clone().add(dir.multiplyScalar(distZ));
    if (world.pointer.active && !reduced) {
      pointerWorld.copy(hit);
      m.uniforms.uPointerOn.value += (1 - m.uniforms.uPointerOn.value) * (1 - Math.exp(-dt * 10));
    } else {
      m.uniforms.uPointerOn.value += (0 - m.uniforms.uPointerOn.value) * (1 - Math.exp(-dt * 6));
    }

    // ledakan klik
    const since = performance.now() / 1000 - world.burstAt;
    const burst = since < 0 || reduced ? 0 : (1 - Math.exp(-since * 16)) * Math.exp(-since * 2.4);
    m.uniforms.uBurst.value = burst * 1.4;

    // aksen lebih banyak di bab penutup
    m.uniforms.uAccentAmt.value = 0.14 + 0.2 * Math.min(1, Math.max(0, (world.p - 0.85) / 0.1));
    void viewport;
  });

  if (!geo) return null;
  return (
    <group ref={group}>
      <points geometry={geo} frustumCulled={false}>
        <shaderMaterial
          ref={mat}
          vertexShader={VERT}
          fragmentShader={FRAG}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
    </group>
  );
}
