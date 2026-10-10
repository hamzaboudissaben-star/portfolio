import { useRef } from 'react';
import { FiArrowUp, FiFacebook, FiGithub, FiInstagram, FiLinkedin, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import useToggleReveal from '../hooks/useToggleReveal';
import { navLinks, profile } from '../data/portfolio';

export default function Footer() {
  const socials = [
    { icon: FiFacebook, href: profile.socials.facebook, label: 'Facebook' },
    { icon: FiGithub, href: profile.socials.github, label: 'GitHub' },
    { icon: FiLinkedin, href: profile.socials.linkedin, label: 'LinkedIn' },
    { icon: FiInstagram, href: profile.socials.instagram, label: 'Instagram' },
  ];

  const root = useRef<HTMLElement>(null);
  useToggleReveal(root, '.footer-anim', { y: 35, duration: 0.7 });

  return (
    <footer id="footer" ref={root} className="relative overflow-hidden border-t border-black/10 bg-neutral-950 text-white dark:border-white/10">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 blur-[100px]" />
      <div className="relative mx-auto max-w-6xl px-5 pb-8 pt-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
          {/* brand */}
          <div className="footer-anim">
            <a href="#home" className="glow-link font-display text-2xl font-bold">
              HB<span className="text-gradient">.dev</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-400">
              {profile.name} — {profile.role}. {profile.tagline}
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="glow-icon rounded-full border border-white/10 bg-white/5 p-2.5 text-neutral-300"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>
          {/* quick links */}
          <div className="footer-anim">
            <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-500">Sections</h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="glow-link text-sm text-neutral-300">
                    → {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* contact */}
          <div className="footer-anim">
            <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-500">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-neutral-300">
              <li>
                <a href={profile.socials.phone} className="glow-link flex items-center gap-2.5">
                  <span className="rounded-lg bg-white/5 p-2"><FiPhone size={15} /></span>
                  {profile.socials.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={profile.socials.email} className="glow-link flex items-center gap-2.5">
                  <span className="rounded-lg bg-white/5 p-2"><FiMail size={15} /></span>
                  hello@hamzaboudi.dev
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="rounded-lg bg-white/5 p-2"><FiMapPin size={15} /></span>
                Available remotely
              </li>
            </ul>
            <a
              href={profile.socials.email}
              className="glow-btn mt-5 inline-block rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white"
            >
              Let&apos;s work together
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-neutral-500">© 2026 {profile.name}. Built with React, Tailwind & GSAP.</p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-500">MERN • PostgreSQL • Tailwind</span>
            <a
              href="#home"
              aria-label="Back to top"
              className="glow-icon rounded-full border border-white/10 bg-white/5 p-2.5"
            >
              <FiArrowUp size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
