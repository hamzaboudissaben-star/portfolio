import { useRef } from 'react';
import { FiStar } from 'react-icons/fi';
import useToggleReveal from '../hooks/useToggleReveal';
import SectionHeading from '../components/SectionHeading';
import { testimonials } from '../data/portfolio';

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);
  useToggleReveal(root, '.testi-anim', { y: 40, duration: 0.7 });

  const row = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" ref={root} className="relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="testi-anim">
          <SectionHeading
            eyebrow="Reviews"
            title={<>What clients <span className="text-gradient">say</span></>}
            desc="Placeholder quotes — replace with your real testimonials in src/data/portfolio.ts"
          />
        </div>
      </div>
      <div className="testi-anim mt-10 flex overflow-hidden" aria-label="Client testimonials">
        <div className="animate-marquee flex shrink-0 gap-5 pr-5">
          {row.map((t, i) => (
            <figure
              key={`${t.name}-${i}`}
              className="w-[320px] shrink-0 rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#12121A]"
            >
              <div className="flex gap-1 text-amber-400" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <FiStar key={s} size={14} fill="currentColor" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-sm font-bold text-white`}>
                  {t.initials}
                </span>
                <span>
                  <span className="block text-sm font-bold text-neutral-900 dark:text-white">{t.name}</span>
                  <span className="block text-xs text-neutral-500">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
