import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const COLORS = ['#22d3ee', '#818cf8', '#e879f9', '#34d399', '#fbbf24'];

// Floating 3D shapes (squares / rectangles / rounds) that drift,
// follow the cursor and glow on hover. Hero-only, background layer.
export default function HeroShapes() {
  const mount = useRef<HTMLDivElement>(null);
  const cleanup = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;
    const el = mount.current;
    if (!el) return;
    try {
      cleanup.current = init(el);
      console.log('[hero-shapes] WebGL ready');
    } catch (err) {
      console.error('[hero-shapes] failed to start:', err);
    }
    return () => {
      cleanup.current?.();
      cleanup.current = null;
    };
  }, []);

  return <div ref={mount} aria-hidden className="pointer-events-none absolute inset-0 hidden md:block [&>canvas]:h-full [&>canvas]:w-full" />;
}

function init(el: HTMLDivElement): () => void {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.z = 10;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  el.appendChild(renderer.domElement);

  const group = new THREE.Group();
  scene.add(group);

  const geoBox = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const geoRect = new THREE.BoxGeometry(0.85, 0.42, 0.25);
  const geoBall = new THREE.SphereGeometry(0.34, 20, 20);
  const geoRing = new THREE.TorusGeometry(0.36, 0.09, 12, 32);
  const geos = [geoBox, geoRect, geoBall, geoRing];

  interface Item {
    mesh: THREE.Mesh;
    base: THREE.Vector3;
    speed: number;
    phase: number;
    spin: THREE.Vector3;
    s0: number;
  }
  const items: Item[] = [];
  const COUNT = 40;
  for (let i = 0; i < COUNT; i++) {
    const color = COLORS[i % COLORS.length];
    const mat = new THREE.MeshStandardMaterial({
      color, transparent: true, opacity: 0.75 + Math.random() * 0.2,
      roughness: 0.35, metalness: 0.25,
      emissive: new THREE.Color(color), emissiveIntensity: 0.35,
    });
    const mesh = new THREE.Mesh(geos[i % geos.length], mat);
    const bx = (Math.random() - 0.5) * 13;
    const by = (Math.random() - 0.5) * 8;
    const bz = -1 - Math.random() * 3;
    mesh.position.set(bx, by, bz);
    const s0 = 1.0 + Math.random() * 1.0;
    mesh.scale.setScalar(s0);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    group.add(mesh);
    items.push({
      mesh, base: new THREE.Vector3(bx, by, bz),
      speed: 0.3 + Math.random() * 0.5, phase: Math.random() * Math.PI * 2,
      spin: new THREE.Vector3((Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.4),
      s0,
    });
  }

  scene.add(new THREE.AmbientLight('#ffffff', 1.0));
  const key = new THREE.DirectionalLight('#ffffff', 1.6);
  key.position.set(4, 6, 8);
  scene.add(key);

  const resize = () => {
    const w = el.clientWidth || 1;
    const h = el.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  const mouse = new THREE.Vector2(0, 0);
  const smooth = new THREE.Vector2(0, 0);
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2(0, 0);
  let hovered: THREE.Mesh | null = null;

  const onMouse = (e: MouseEvent) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    const r = renderer.domElement.getBoundingClientRect();
    ndc.x = ((e.clientX - r.left) / Math.max(r.width, 1)) * 2 - 1;
    ndc.y = -((e.clientY - r.top) / Math.max(r.height, 1)) * 2 + 1;
  };
  window.addEventListener('mousemove', onMouse);

  let raf = 0;
  const clock = new THREE.Clock();
  const big = new THREE.Vector3();
  const tick = () => {
    const t = clock.getElapsedTime();
    smooth.x += (mouse.x - smooth.x) * 0.04;
    smooth.y += (mouse.y - smooth.y) * 0.04;

    group.position.x = smooth.x * 0.9;
    group.position.y = smooth.y * 0.6;
    group.rotation.y = smooth.x * 0.12;

    for (const it of items) {
      const m = it.mesh;
      m.position.y = it.base.y + Math.sin(t * it.speed + it.phase) * 0.55;
      m.position.x = it.base.x + Math.cos(t * it.speed * 0.7 + it.phase) * 0.4 + smooth.x * 0.35;
      m.rotation.x += it.spin.x * 0.008;
      m.rotation.y += it.spin.y * 0.008;
      m.rotation.z += it.spin.z * 0.008;
    }

    ray.setFromCamera(ndc, camera);
    const hits = ray.intersectObjects(items.map((i) => i.mesh), false);
    const hit = hits.length ? (hits[0].object as THREE.Mesh) : null;
    if (hovered && hovered !== hit) {
      const it = items.find((i) => i.mesh === hovered);
      if (it) {
        hovered.scale.setScalar(it.s0);
        (hovered.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.35;
      }
      hovered = null;
    }
    if (hit) {
      hovered = hit;
      const it = items.find((i) => i.mesh === hit);
      big.setScalar((it?.s0 ?? 1) * 1.6);
      hit.scale.lerp(big, 0.25);
      (hit.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.0;
    }

    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  };
  tick();

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
    window.removeEventListener('mousemove', onMouse);
    geos.forEach((g) => g.dispose());
    items.forEach((i) => (i.mesh.material as THREE.Material).dispose());
    renderer.dispose();
    if (renderer.domElement.parentElement === el) el.removeChild(renderer.domElement);
  };
}
