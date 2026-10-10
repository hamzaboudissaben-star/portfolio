import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
export function getLenis() { return lenis; }

export function scrollToId(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -64, duration: 1.2 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

export default function useLivingScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (t: number) => lenis?.raf(t);
    const rafId = gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // anchor clicks → lenis scroll
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a || a.getAttribute('href')!.length < 2) return;
      const id = a.getAttribute('href')!;
      if (document.querySelector(id)) { e.preventDefault(); scrollToId(id); }
    };
    document.addEventListener('click', onClick);

    const ctx = gsap.context(() => {
      // 1. scroll progress bar
      gsap.to('#scroll-progress', {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
      });

      // 2. velocity skew — sections tilt slightly when scrolling fast, settle back
      const skewSetter = gsap.quickSetter('main > section', 'skewY', 'deg') as (v: number) => void;
      let proxy = { skew: 0 };
      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = gsap.utils.clamp(-8, 8, self.getVelocity() / -350);
          if (Math.abs(v) > Math.abs(proxy.skew)) {
            proxy.skew = v;
            gsap.to(proxy, {
              skew: 0, duration: 0.7, ease: 'power3', overwrite: true,
              onUpdate: () => skewSetter(proxy.skew),
            });
            skewSetter(proxy.skew);
          }
        },
      });

      // 3. parallax orbs + grid (data-speed layers feel alive)
      gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((el) => {
        const speed = Number(el.dataset.speed || 0.2);
        gsap.to(el, {
          yPercent: speed * -25, ease: 'none',
          scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: 1 },
        });
      });

      // 4. living background hue — ambient glow shifts per section
      const hue = document.getElementById('ambient-hue');
      if (hue) {
        const sections = gsap.utils.toArray<HTMLElement>('main > section');
        sections.forEach((sec, i) => {
          ScrollTrigger.create({
            trigger: sec, start: 'top center', end: 'bottom center',
            onToggle: (self) => {
              if (self.isActive) gsap.to(hue, { opacity: 0.5 + (i % 3) * 0.2, duration: 0.8, overwrite: 'auto' });
            },
          });
        });
      }

      // 5. active nav glow
      const links = gsap.utils.toArray<HTMLAnchorElement>('.nav-link');
      links.forEach((link) => {
        const id = link.getAttribute('href');
        if (!id || !document.querySelector(id)) return;
        ScrollTrigger.create({
          trigger: id, start: 'top center', end: 'bottom center',
          onToggle: (self) => link.classList.toggle('nav-active', self.isActive),
        });
      });
    });

    return () => {
      document.removeEventListener('click', onClick);
      ctx.revert();
      gsap.ticker.remove(rafId);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}
