import type { ReactNode } from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: ReactNode;
  desc?: string;
}) {
  return (
    <div className="section-head max-w-2xl">
      <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300 dark:text-cyan-300 text-cyan-700">
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500" />
        {eyebrow}
      </span>
      <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
        {title}
      </h2>
      {desc ? <p className="mt-3 text-neutral-600 dark:text-neutral-400">{desc}</p> : null}
    </div>
  );
}
