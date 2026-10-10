import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowDown, FiFacebook, FiGithub, FiInstagram, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';
import Magnetic from '../components/Magnetic';
import { profile } from '../data/portfolio';

// Three.js layers code-split (heavy) — load after hero paints
const HeroGlobe = lazy(() => import('../components/HeroGlobe'));
const HeroShapes = lazy(() => import('../components/HeroShapes'));

gsap.registerPlugin(ScrollTrigger);

const roles = ['MERN Stack', 'PostgreSQL APIs', 'GSAP Motion', 'Tailwind UI'];

export default function Hero({ started }: { started: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [role, setRole] = useState(roles[0]);

  // typewriter role rotator
  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => { i = (i + 1) % roles.length; setRole(roles[i]); }, 2200);
    return () => clearInterval(id);
  }, [started]);

  useLayoutEffect(() => {
    if (!started) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-badge', { y: 30, opacity: 0, duration: 0.7 })
        .from('.hero-line', { y: 80, opacity: 0, duration: 0.9, stagger: 0.12 }, '-=0.3')
        .from('.hero-sub', { y: 30, opacity: 0, duration: 0.7 }, '-=0.4')
        .from('.hero-cta', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
        .from('.hero-social', { scale: 0, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)' }, '-=0.3')
        .from('.hero-card', { x: 60, opacity: 0, duration: 0.9 }, '-=0.8');

      gsap.to('.orb-1', { y: -40, x: 20, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.orb-2', { y: 40, x: -20, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      // hero fades + parallax as you scroll away (feels alive)
      gsap.to('.hero-inner', {
        yPercent: -8, opacity: 0.25, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1 },
      });
    }, root);
    return () => ctx.revert();
  }, [started]);

  const socials = [
    { icon: FiFacebook, href: profile.socials.facebook, label: 'Facebook' },
    { icon: FiGithub, href: profile.socials.github, label: 'GitHub' },
    { icon: FiLinkedin, href: profile.socials.linkedin, label: 'LinkedIn' },
    { icon: FiInstagram, href: profile.socials.instagram, label: 'Instagram' },
    { icon: FiMail, href: profile.socials.email, label: 'Email' },
    { icon: FiPhone, href: profile.socials.phone, label: 'Phone' },
  ];

  return (
    <section id="home" ref={root} className="noise relative overflow-hidden pt-16">
      {/* Three.js layers (desktop, lazy) — globe + floating shapes */}
      <Suspense fallback={null}>
        <HeroShapes />
      </Suspense>
      <Suspense fallback={null}>
        <HeroGlobe />
      </Suspense>
      {/* parallax bg layers */}
      <div data-speed="0.35" className="orb-1 animate-float-slow pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div data-speed="0.6" className="orb-2 pointer-events-none absolute -right-32 top-64 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[120px]" />

      <div className="hero-inner relative mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:pt-24">
        <div>
          <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-sm dark:border-white/10 dark:bg-white/5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-neutral-700 dark:text-neutral-300">Available for freelance & full-time</span>
          </div>

          <h1 className="font-display mt-6 text-5xl font-bold leading-[1.02] tracking-tight text-neutral-900 dark:text-white sm:text-6xl lg:text-7xl">
            <span className="hero-line block">Hi, I&apos;m</span>
            <span className="hero-line text-gradient block">{profile.name}</span>
            <span className="hero-line block text-3xl sm:text-4xl lg:text-5xl">{profile.role}</span>
          </h1>

          <p className="hero-sub mt-4 max-w-xl text-lg text-neutral-600 dark:text-neutral-400">{profile.tagline}</p>
          <p className="hero-sub type-caret mt-2 font-mono text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-300">
            {role}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <a href="#projects" className="hero-cta glow-btn inline-block rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25">
                View Projects
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="hero-cta glow-btn inline-block rounded-full border border-black/10 bg-white px-7 py-3 text-sm font-semibold text-neutral-900 dark:border-white/15 dark:bg-white/5 dark:text-white">
                Contact Me
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.resume} download="Hamza-Boudi-CV.pdf" className="hero-cta glow-btn inline-block rounded-full bg-neutral-900 px-7 py-3 text-sm font-semibold text-white dark:bg-white dark:text-black">
                ↓ Resume
              </a>
            </Magnetic>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} title={s.label}
                className="hero-social glow-icon rounded-full border border-black/10 bg-white p-3 text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
                <s.icon size={18} />
              </a>
            ))}
          </div>

          <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-500">
            {profile.socials.phoneDisplay} — click phone icon to call
          </p>
        </div>

        <div className="hero-card relative" data-speed="0.25">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 blur-2xl" />
          <div className="relative rounded-2xl border border-black/10 bg-white/80 p-2 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-[#12121A]/90">
            <div className="flex items-center gap-1.5 border-b border-black/5 px-4 py-3 dark:border-white/10">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs text-neutral-500">developer.js</span>
            </div>
            <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed text-neutral-700 dark:text-neutral-300">
{`const developer = {
  name: '${profile.name}',
  role: '${profile.role}',
  stack: ['Mongo', 'Express',
    'React', 'Node'],
  db: ['MongoDB', 'PostgreSQL'],
  style: ['Tailwind', 'GSAP'],
  hireable: true
};`}
            </pre>
            <div className="flex gap-2 px-5 pb-5">
              {['MERN', 'PostgreSQL', 'Tailwind'].map((t) => (
                <span key={t} className="rounded-full bg-gradient-to-r from-cyan-500/15 to-violet-500/15 px-3 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-6xl justify-center pb-10">
        <a href="#about" className="glow-link flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-neutral-500">
          Scroll <FiArrowDown className="animate-bounce" />
        </a>
      </div>

      <div className="relative border-y border-black/5 bg-black py-3 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 gap-8 pr-8 text-sm font-semibold uppercase tracking-widest text-white/80">
            {Array.from({ length: 2 }).flatMap((_, k) =>
              ['MongoDB', 'Express', 'React', 'Node.js', 'PostgreSQL', 'Tailwind', 'GSAP', 'TypeScript'].map((t) => (
                <span key={`${k}-${t}`} className="flex items-center gap-8">
                  {t} <span className="text-cyan-400">✦</span>
                </span>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
