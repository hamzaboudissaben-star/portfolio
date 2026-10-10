import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Particle globe: sphere of glowing points + wireframe core.
// Off on reduced-motion / small screens / coarse pointers (perf + mobile).
export default function HeroGlobe() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;
    if (window.matchMedia('(pointer: coarse)').matches && window.innerWidth < 1024) return;

    const el = mount.current!;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    el.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. point sphere
    const COUNT = 1400;
    const R = 2.4;
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const cyan = new THREE.Color('#22d3ee');
    const violet = new THREE.Color('#a78bfa');
    const pink = new THREE.Color('#e879f9');
    for (let i = 0; i < COUNT; i++) {
      // fibonacci sphere for even coverage
      const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const jitter = 1 + (Math.random() - 0.5) * 0.06;
      pos[i * 3] = R * jitter * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = R * jitter * Math.cos(phi);
      pos[i * 3 + 2] = R * jitter * Math.sin(phi) * Math.sin(theta);
      const t = Math.random();
      const c = t < 0.45 ? cyan : t < 0.75 ? violet : pink;
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.028, vertexColors: true, transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    });
    group.add(new THREE.Points(geo, mat));

    // 2. wireframe core
    const core = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(R * 0.72, 1)),
      new THREE.LineBasicMaterial({ color: '#22d3ee', transparent: true, opacity: 0.16 }),
    );
    group.add(core);

    // 3. orbit ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(R * 1.35, 0.008, 8, 128),
      new THREE.MeshBasicMaterial({ color: '#e879f9', transparent: true, opacity: 0.4 }),
    );
    ring.rotation.x = Math.PI / 2.4;
    group.add(ring);

    group.position.x = 2.1;
    group.rotation.z = 0.2;

    const resize = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    // mouse parallax
    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    let raf = 0;
    const clock = new THREE.Clock();
    const tick = () => {
      const t = clock.getElapsedTime();
      group.rotation.y = t * 0.12 + mx * 0.35;
      group.rotation.x = my * 0.22;
      ring.rotation.z = t * 0.08;
      (mat as THREE.PointsMaterial).size = 0.028 + Math.sin(t * 1.4) * 0.004;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      geo.dispose(); mat.dispose();
      (core.geometry as THREE.BufferGeometry).dispose();
      (core.material as THREE.Material).dispose();
      ring.geometry.dispose();
      (ring.material as THREE.Material).dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mount} aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 md:block [&>canvas]:h-full [&>canvas]:w-full" />;
}
