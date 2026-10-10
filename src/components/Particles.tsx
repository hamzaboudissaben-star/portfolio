import { useEffect, useRef } from 'react';

// Lightweight scroll-reactive dust — drifts faster while scrolling, settles when idle.
export default function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    let w = 0, h = 0, raf = 0;
    let energy = 0; // rises on scroll, decays
    const N = 70;
    const ps = Array.from({ length: N }, () => ({
      x: Math.random(), y: Math.random(),
      r: 1 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.0006,
      vy: -0.0004 - Math.random() * 0.001,
      hue: Math.random() > 0.5 ? 190 : 290,
    }));

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    const onScroll = () => { energy = Math.min(1, energy + 0.12); };
    window.addEventListener('scroll', onScroll, { passive: true });

    const tick = () => {
      energy *= 0.96;
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.x += p.vx * (1 + energy * 8) + Math.sin(Date.now() / 2000 + p.y * 10) * 0.0004;
        p.y += p.vy * (1 + energy * 10);
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        if (p.x < -0.02) p.x = 1.02; else if (p.x > 1.02) p.x = -0.02;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r * (1 + energy), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${0.25 + energy * 0.4})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <canvas ref={ref} aria-hidden
      className="pointer-events-none fixed inset-0 z-[5]" />
  );
}
