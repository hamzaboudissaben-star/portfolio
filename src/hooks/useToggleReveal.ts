import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ToggleOpts {
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  end?: string;
}

/**
 * Show on scroll down, hide on scroll up — ease both ways.
 * Show: power3.out / Hide: reverse (power2.in feel).
 * Content stays in DOM, toggles with toggleActions (no stuck-hidden).
 */
export default function useToggleReveal(
  root: RefObject<HTMLElement | null>,
  selector: string,
  opts?: ToggleOpts,
) {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
        gsap.fromTo(
          el,
          {
            y: opts?.y ?? 45,
            x: opts?.x ?? 0,
            scale: opts?.scale ?? 1,
            opacity: 0,
            filter: 'blur(6px)',
          },
          {
            y: 0,
            x: 0,
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            duration: opts?.duration ?? 0.8,
            ease: 'power3.out', // show ease; reverse gives soft hide ease
            scrollTrigger: {
              trigger: el,
              start: opts?.start ?? 'top 88%',
              end: opts?.end ?? 'bottom 12%',
              toggleActions: 'play reverse play reverse',
            },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, [root, selector, opts?.y, opts?.x, opts?.scale, opts?.duration, opts?.stagger, opts?.start, opts?.end]);
}
