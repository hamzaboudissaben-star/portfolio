import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { navLinks, profile } from '../data/portfolio';
import { useTheme } from '../hooks/useTheme';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(barRef.current, { y: -80, opacity: 0, duration: 0.8, ease: 'power3.out' });
      ScrollTrigger.create({
        start: 40,
        onUpdate: (self) => {
          barRef.current?.classList.toggle('shadow-lg', self.scroll() > 40);
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={barRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-[#0A0A0F]/70"
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#home" className="glow-link font-display text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
          HB<span className="text-gradient">.dev</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-nav={l.href}
              className="nav-link text-sm font-medium text-neutral-600 dark:text-neutral-300"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="mr-1 hidden rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400 lg:inline">
            ● available
          </span>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="glow-icon rounded-full border border-black/10 p-2 text-neutral-700 dark:border-white/10 dark:text-yellow-300"
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <a
            href={profile.socials.phone}
            className="glow-btn hidden rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-black sm:inline"
          >
            Hire me
          </a>
          <button
            className="p-2 text-neutral-800 dark:text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>
      {open ? (
        <div className="border-t border-black/5 bg-white px-5 py-4 dark:border-white/10 dark:bg-[#0A0A0F] md:hidden">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="nav-link block py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200"
            >
              {l.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
