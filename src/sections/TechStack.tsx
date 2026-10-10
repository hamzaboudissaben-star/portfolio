import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiExpress,
  SiMongodb,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
} from 'react-icons/si';
import SectionHeading from '../components/SectionHeading';
import useToggleReveal from '../hooks/useToggleReveal';
import { techStack } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const logoByName: Record<string, typeof SiReact> = {
  MongoDB: SiMongodb,
  Express: SiExpress,
  React: SiReact,
  'Node.js': SiNodedotjs,
  PostgreSQL: SiPostgresql,
  Tailwind: SiTailwindcss,
};

const glowByName: Record<string, string> = {
  MongoDB: 'group-hover:shadow-[0_0_40px_-8px_#22c55e]',
  Express: 'group-hover:shadow-[0_0_40px_-8px_#a3a3a3]',
  React: 'group-hover:shadow-[0_0_40px_-8px_#22d3ee]',
  'Node.js': 'group-hover:shadow-[0_0_40px_-8px_#84cc16]',
  PostgreSQL: 'group-hover:shadow-[0_0_40px_-8px_#60a5fa]',
  Tailwind: 'group-hover:shadow-[0_0_40px_-8px_#2dd4bf]',
};

export default function TechStack() {
  const root = useRef<HTMLElement>(null);
  useToggleReveal(root, '.stack-head', { y: 30, duration: 0.7 });
  useToggleReveal(root, '.tech-card', { y: 50, scale: 0.96, duration: 0.7 });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Progress bars
      gsap.utils.toArray<HTMLElement>('.tech-bar-fill').forEach((bar) => {
        const level = Number(bar.dataset.level || 0);
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${level}%`, duration: 1.3, ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: { trigger: bar, start: 'top 92%', once: true },
          },
        );
      });

      // Floating logos (transform only, 60fps)
      gsap.utils.toArray<HTMLElement>('.tech-logo').forEach((logo, i) => {
        gsap.to(logo, {
          y: -6, duration: 1.8 + (i % 3) * 0.3, repeat: -1, yoyo: true,
          ease: 'sine.inOut', delay: i * 0.15,
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="stack" ref={root} className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
      <div className="stack-head">
        <SectionHeading
          eyebrow="Tech stack"
          title={<>What I use to <span className="text-gradient">build MERN apps</span></>}
          desc="MongoDB • Express • React • Node + PostgreSQL & Tailwind for production-grade apps."
        />
      </div>
      <div className="tech-grid reveal-group mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {techStack.map((t) => {
          const Logo = logoByName[t.name] ?? SiReact;
          return (
            <div
              key={t.name}
              className={`tech-card group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-6 transition-shadow duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.03] ${glowByName[t.name] ?? ''}`}
            >
              {/* shine sweep */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <div className="relative flex items-center gap-4">
                <span className={`tech-logo flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${t.color} text-3xl text-white shadow-lg`}>
                  <Logo />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white">{t.name}</h3>
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">{t.level}% mastery</span>
                </div>
              </div>
              <p className="relative mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{t.description}</p>
              <div className="relative mt-4 h-2.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-white/10">
                <div
                  className={`tech-bar-fill h-full rounded-full bg-gradient-to-r ${t.color}`}
                  data-level={t.level}
                  style={{ width: `${t.level}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="stack-head mt-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 p-6 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
        <strong>How I build:</strong> React + Tailwind front-end animated with GSAP → Express + Node REST API with JWT →
        MongoDB for flexible docs or PostgreSQL for relational data → deployed with CI/CD.
      </div>
    </section>
  );
}
