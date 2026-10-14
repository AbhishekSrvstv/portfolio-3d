import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { view, reducedMotion } from '../state.js';

/*
  The scene is a corridor of Awadhi-style pointed arches (think Rumi Darwaza, Lucknow).
  Each page section sits between two arches. Scrolling moves the camera down the corridor.
  Small amber lights line every arch like diyas.
*/

const NIGHT = '#0B0D24';
const LAMP = '#FFB547';
const SPACING = 7; // distance between arches (world units)
const ARCH_COUNT = 11;
const FIRST_ARCH_Z = -3.5;

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/* ---------- arch geometry (built once, shared by every arch) ---------- */

const OUT = { hw: 3.0, floor: -2.4, spr: 0.4, apex: 4.6 }; // outer edge
const IN = { hw: 2.45, floor: -2.4, spr: 0.4, apex: 3.95 }; // inner edge (the opening)
const K1 = 0.55;
const K2 = 0.78;
const KX = 0.22;

function buildArchParts() {
  const s = new THREE.Shape();
  // outer edge, left pillar -> apex -> right pillar
  s.moveTo(-OUT.hw, OUT.floor);
  s.lineTo(-OUT.hw, OUT.spr);
  s.bezierCurveTo(
    -OUT.hw, OUT.spr + (OUT.apex - OUT.spr) * K1,
    -OUT.hw * KX, OUT.spr + (OUT.apex - OUT.spr) * K2,
    0, OUT.apex
  );
  s.bezierCurveTo(
    OUT.hw * KX, OUT.spr + (OUT.apex - OUT.spr) * K2,
    OUT.hw, OUT.spr + (OUT.apex - OUT.spr) * K1,
    OUT.hw, OUT.spr
  );
  s.lineTo(OUT.hw, OUT.floor);
  // inner edge, right pillar -> apex -> left pillar (the opening)
  s.lineTo(IN.hw, IN.floor);
  s.lineTo(IN.hw, IN.spr);
  s.bezierCurveTo(
    IN.hw, IN.spr + (IN.apex - IN.spr) * K1,
    IN.hw * KX, IN.spr + (IN.apex - IN.spr) * K2,
    0, IN.apex
  );
  s.bezierCurveTo(
    -IN.hw * KX, IN.spr + (IN.apex - IN.spr) * K2,
    -IN.hw, IN.spr + (IN.apex - IN.spr) * K1,
    -IN.hw, IN.spr
  );
  s.lineTo(-IN.hw, IN.floor);
  s.closePath();

  const body = new THREE.ExtrudeGeometry(s, {
    depth: 0.5,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.04,
    bevelSegments: 1,
    curveSegments: 28,
  });
  body.translate(0, 0, -0.25);

  const edges = new THREE.EdgesGeometry(body, 28);

  // lamps along the inner edge of the arch and down both pillars
  const pts = [];
  const rightCurve = new THREE.CubicBezierCurve(
    new THREE.Vector2(IN.hw, IN.spr),
    new THREE.Vector2(IN.hw, IN.spr + (IN.apex - IN.spr) * K1),
    new THREE.Vector2(IN.hw * KX, IN.spr + (IN.apex - IN.spr) * K2),
    new THREE.Vector2(0, IN.apex)
  );
  rightCurve.getSpacedPoints(16).forEach((p) => {
    pts.push(p.x * 0.99, p.y, 0.32);
    if (p.x > 0.01) pts.push(-p.x * 0.99, p.y, 0.32); // mirror to the left side (skip the apex)
  });
  for (let y = IN.floor + 0.35; y < IN.spr; y += 0.55) {
    pts.push(IN.hw * 0.99, y, 0.32, -IN.hw * 0.99, y, 0.32);
  }
  const lamps = new THREE.BufferGeometry();
  lamps.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));

  return { body, edges, lamps };
}

function makeGlowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.25, 'rgba(255,255,255,0.55)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ---------- pieces ---------- */

function Corridor() {
  const parts = useMemo(buildArchParts, []);
  const glow = useMemo(makeGlowTexture, []);

  const bodyMats = useMemo(
    () => [
      new THREE.MeshStandardMaterial({ color: '#3039A8', emissive: '#1B2275', emissiveIntensity: 0.6, roughness: 0.55, metalness: 0.25 }),
      new THREE.MeshStandardMaterial({ color: '#5B3FB8', emissive: '#2E1F73', emissiveIntensity: 0.6, roughness: 0.55, metalness: 0.25 }),
    ],
    []
  );
  const edgeMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: LAMP, transparent: true, opacity: 0.85 }),
    []
  );
  const lampMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: LAMP,
        size: 0.22,
        map: glow,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      }),
    [glow]
  );

  useFrame((state) => {
    if (reducedMotion) return;
    lampMat.size = 0.22 + Math.sin(state.clock.elapsedTime * 2.3) * 0.03;
  });

  const arches = [];
  for (let i = 0; i < ARCH_COUNT; i++) {
    arches.push(
      <group key={i} position={[0, 0, FIRST_ARCH_Z - i * SPACING]}>
        <mesh geometry={parts.body} material={bodyMats[i % 2]} />
        <lineSegments geometry={parts.edges} material={edgeMat} />
        <points geometry={parts.lamps} material={lampMat} />
      </group>
    );
  }
  return <group>{arches}</group>;
}

function Floor() {
  const grid = useMemo(() => {
    const g = new THREE.GridHelper(90, 90, '#6D5BD0', '#262B7A');
    g.material.transparent = true;
    g.material.opacity = 0.55;
    g.position.set(0, -2.42, -34);
    return g;
  }, []);
  return <primitive object={grid} />;
}

function Dust() {
  const ref = useRef();
  const glow = useMemo(makeGlowTexture, []);
  const small = typeof window !== 'undefined' && window.innerWidth < 700;
  const count = small ? 260 : 620;

  const { geometry, base } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const baseY = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      const y = -2 + Math.random() * 8;
      pos[i * 3 + 1] = y;
      baseY[i] = y;
      pos[i * 3 + 2] = 14 - Math.random() * 100;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return { geometry: geo, base: baseY };
  }, [count]);

  useFrame((state) => {
    if (reducedMotion || !ref.current) return;
    const t = state.clock.elapsedTime;
    const attr = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      attr.array[i * 3 + 1] = base[i] + Math.sin(t * 0.4 + i) * 0.18;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color="#B9AEFF"
        size={0.07}
        map={glow}
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/* Moves the camera down the corridor as the page scrolls. */
function Rig() {
  const { camera, size } = useThree();
  const light = useRef();
  const cur = useRef(0);
  const elapsed = useRef(0);

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    elapsed.current += dt;

    const follow = reducedMotion ? 1 : 1 - Math.exp(-dt * 3.2);
    cur.current += (view.idx - cur.current) * follow;

    // one-time intro: glide in from outside the first arch
    const intro = reducedMotion ? 0 : (1 - easeOutCubic(Math.min(elapsed.current / 2.8, 1))) * 10;

    const wide = size.width > 900;
    const baseX = wide ? -1.3 : 0;
    const sway = Math.sin(cur.current * 0.9) * 0.45;
    const px = reducedMotion ? 0 : view.px;
    const py = reducedMotion ? 0 : view.py;

    const x = baseX + sway + px * 0.35;
    const y = 0.15 + py * 0.2 + Math.sin(cur.current * 1.3) * 0.1;
    const z = -cur.current * SPACING + intro;

    camera.position.set(x, y, z);
    // looking slightly left of the corridor pushes the arches to the right of the screen,
    // which leaves the left side free for text on wide screens.
    camera.lookAt(x + (wide ? -1.8 : 0), 0.3, z - 8);

    if (light.current) light.current.position.set(x + 0.5, y + 1.2, z - 2.5);
  });

  return <pointLight ref={light} color={LAMP} intensity={60} distance={22} decay={2} />;
}

class SceneBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err) {
    // The page still works without the 3D background.
    console.warn('3D scene disabled:', err);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    if (!gl) return false;
    const lose = gl.getExtension('WEBGL_lose_context');
    if (lose) lose.loseContext(); // free this probe context right away
    return true;
  } catch {
    return false;
  }
}

export default function Scene() {
  if (!webglAvailable()) return null;
  return (
    <div className="stage" aria-hidden="true">
      <SceneBoundary>
        <Canvas
          flat
          dpr={[1, 1.75]}
          camera={{ fov: 55, near: 0.1, far: 90, position: [0, 0.15, 10] }}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={[NIGHT]} />
          <fog attach="fog" args={[NIGHT, 8, 36]} />
          <ambientLight intensity={0.9} color="#9FA6FF" />
          <Rig />
          <Corridor />
          <Floor />
          <Dust />
        </Canvas>
      </SceneBoundary>
    </div>
  );
}
