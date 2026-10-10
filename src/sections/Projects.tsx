import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiExternalLink, FiGithub, FiStar } from 'react-icons/fi';
import useGithubRepos from '../hooks/useGithubRepos';
import useToggleReveal from '../hooks/useToggleReveal';
import SectionHeading from '../components/SectionHeading';
import { projects } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const { repos, live, user, show } = useGithubRepos(6);
  useToggleReveal(root, '.projects-head', { y: 30, duration: 0.7 });
  useToggleReveal(root, '.project-card', { y: 50, scale: 0.97, duration: 0.7 });
  useToggleReveal(root, '.gh-card', { y: 30, duration: 0.6 });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Hover lift via GSAP (transform only = 60fps)
      document.querySelectorAll('.project-card').forEach((card) => {
        card.addEventListener('mouseenter', () =>
          gsap.to(card, { y: -8, duration: 0.3, ease: 'power2.out', overwrite: 'auto' }),
        );
        card.addEventListener('mouseleave', () =>
          gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' }),
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={root} className="relative bg-neutral-50 py-20 dark:bg-white/[0.015] lg:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="projects-head">
          <SectionHeading
            eyebrow="Projects"
            title={<>Selected <span className="text-gradient">work & builds</span></>}
            desc="6 placeholder MERN projects — replace links & descriptions with your real work in src/data/portfolio.ts"
          />
        </div>
        <div className="project-grid reveal-group mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.id}
              className="project-card group overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-[#12121A]"
            >
              <div className={`relative h-44 bg-gradient-to-br ${p.imageGradient} flex items-center justify-center overflow-hidden`}>
                <span className="font-display text-5xl font-bold text-white/40 transition duration-300 group-hover:scale-110">
                  {p.title.charAt(0)}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition group-hover:opacity-100">
                  <a href={p.github} aria-label={`${p.title} GitHub`} className="glow-icon rounded-full bg-black/50 p-2 text-white backdrop-blur">
                    <FiGithub size={16} />
                  </a>
                  <a href={p.live} aria-label={`${p.title} live demo`} className="glow-icon rounded-full bg-black/50 p-2 text-white backdrop-blur">
                    <FiExternalLink size={16} />
                  </a>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold text-neutral-700 dark:bg-white/10 dark:text-neutral-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        {/* live GitHub feed — hidden when username 404s and no cache */}
        {show ? (
        <div className="mt-10 rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
              <FiGithub size={18} /> Live from GitHub @{user}
            </span>
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${live ? 'bg-green-500/15 text-green-600 dark:text-green-400' : 'bg-neutral-500/15 text-neutral-500'}`}>
              {live ? '● live' : '● cached'}
            </span>
            <a href={`https://github.com/${user}`} target="_blank" rel="noreferrer"
              className="glow-link ml-auto text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              View all →
            </a>
          </div>
          {repos.length === 0 ? (
            <p className="mt-4 text-sm text-neutral-500">Repos will appear here once the GitHub username in <code>.env</code> (<code>VITE_GITHUB_USER</code>) matches a public account.</p>
          ) : (
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {repos.map((r) => (
                <a key={r.id} href={r.url} target="_blank" rel="noreferrer"
                  className="gh-card glow-link group rounded-xl border border-black/10 p-4 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.02]">
                  <span className="block truncate text-sm font-bold text-neutral-900 group-hover:text-cyan-600 dark:text-white">{r.name}</span>
                  <span className="mt-1 line-clamp-2 block min-h-10 text-xs text-neutral-500">{r.description || 'No description yet.'}</span>
                  <span className="mt-2 flex items-center gap-3 text-[11px] font-semibold text-neutral-500">
                    {r.language ? <span>{r.language}</span> : null}
                    <span className="flex items-center gap-1"><FiStar size={12} /> {r.stars}</span>
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
        ) : null}
      </div>
    </section>
  );
}
