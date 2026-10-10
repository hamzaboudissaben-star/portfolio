import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useToggleReveal from '../hooks/useToggleReveal';
import SectionHeading from '../components/SectionHeading';
import { profile } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const root = useRef<HTMLElement>(null);
  useToggleReveal(root, '.about-anim', { y: 45 });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Counters
      gsap.utils.toArray<HTMLElement>('.stat-num').forEach((el) => {
        const target = Number(el.dataset.value || 0);
        const suffix = el.dataset.suffix || '';
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.v)}${suffix}`;
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="relative mx-auto max-w-6xl px-5 py-20 lg:py-28">
      <div className="about-anim">
        <SectionHeading
          eyebrow="About me"
          title={<>Software Engineer building <span className="text-gradient">modern web apps</span></>}
          desc="Full-stack focus, clean code, great UX."
        />
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="about-anim relative overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 p-8 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="font-display flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 text-3xl font-bold text-white shadow-xl">
            HB
          </div>
          <h3 className="font-display mt-6 text-2xl font-bold text-neutral-900 dark:text-white">{profile.name}</h3>
          <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400">{profile.role} • MERN + PostgreSQL</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['JavaScript', 'TypeScript', 'React', 'Node.js', 'MongoDB', 'PostgreSQL'].map((s) => (
              <span key={s} className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium text-neutral-700 dark:border-white/10 dark:text-neutral-300">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div>
          {profile.bio.map((p, i) => (
            <p key={i} className="about-anim mb-4 leading-relaxed text-neutral-600 dark:text-neutral-400">
              {p}
            </p>
          ))}
          <a href={profile.resume} download="Hamza-Boudi-CV.pdf"
            className="about-anim glow-btn mt-2 inline-block rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/25">
            ↓ Download CV
          </a>
          <div className="about-anim mt-8 grid grid-cols-3 gap-4">
            {profile.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-black/10 bg-white p-4 text-center dark:border-white/10 dark:bg-white/[0.03]">
                <div className="stat-num font-display text-2xl font-bold text-neutral-900 dark:text-white sm:text-3xl" data-value={s.value} data-suffix={s.suffix}>
                  0{s.suffix}
                </div>
                <div className="mt-1 text-xs text-neutral-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
