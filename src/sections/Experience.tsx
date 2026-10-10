import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useToggleReveal from '../hooks/useToggleReveal';
import SectionHeading from '../components/SectionHeading';
import { experience } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const root = useRef<HTMLElement>(null);
  useToggleReveal(root, '.exp-item', { x: -40, y: 0, duration: 0.7 });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // timeline line grows on scroll
      gsap.fromTo(
        '.exp-line',
        { scaleY: 0 },
        {
          scaleY: 1, transformOrigin: 'top', duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: '.exp-list', start: 'top 80%', end: 'bottom 60%', scrub: 1 },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={root} className="relative bg-neutral-50 py-20 dark:bg-white/[0.015] lg:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Journey"
          title={<>My <span className="text-gradient">experience</span></>}
          desc="From self-taught JavaScript to full-stack MERN + PostgreSQL builds."
        />
        <div className="exp-list relative mt-12 max-w-3xl">
          <div className="exp-line absolute bottom-2 left-[19px] top-2 w-0.5 bg-gradient-to-b from-cyan-400 to-fuchsia-500 sm:left-[21px]" />
          <div className="absolute bottom-2 left-[19px] top-2 w-0.5 bg-black/5 dark:bg-white/10 sm:left-[21px]" />
          <div className="space-y-6">
            {experience.map((e) => (
              <div key={e.role} className="exp-item relative flex gap-5">
                <span className="relative z-10 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 text-white shadow-lg">
                  <span className="h-2.5 w-2.5 rounded-full bg-white" />
                </span>
                <div className="flex-1 rounded-2xl border border-black/10 bg-white p-5 transition hover:shadow-lg dark:border-white/10 dark:bg-[#12121A]">
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">{e.period}</span>
                  <h3 className="font-display mt-1 text-lg font-bold text-neutral-900 dark:text-white">{e.role}</h3>
                  <p className="text-sm font-medium text-neutral-500">{e.place}</p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{e.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {e.tags.map((t) => (
                      <span key={t} className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold text-neutral-700 dark:bg-white/10 dark:text-neutral-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
