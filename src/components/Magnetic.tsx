import { useEffect, useRef, type ReactNode, type MouseEvent } from 'react';
import gsap from 'gsap';

// Magnetic wrapper — child pulls toward cursor, springs back on leave.
export default function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const el = ref.current!;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.3, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.3, ease: 'power3' });
    const move = (e: globalThis.MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => { xTo(0); yTo(0); };
    el.addEventListener('mousemove', move as EventListener);
    el.addEventListener('mouseleave', leave);
    return () => { el.removeEventListener('mousemove', move as EventListener); el.removeEventListener('mouseleave', leave); };
  }, [strength]);

  const stop = (e: MouseEvent) => e.stopPropagation();

  return <div ref={ref} onMouseMove={stop} className="inline-block"><div>{children}</div></div>;
}
