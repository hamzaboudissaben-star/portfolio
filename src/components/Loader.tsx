import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Loader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => { setGone(true); onDone(); },
      });
      tl.from('.loader-logo', { scale: 0.6, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' })
        .to('.loader-bar', { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, '-=0.2')
        .to(root.current, { yPercent: -100, duration: 0.7, ease: 'power4.inOut', delay: 0.1 });
    }, root);
    return () => ctx.revert();
  }, [onDone]);

  if (gone) return null;
  return (
    <div id="loader" ref={root}>
      <div className="text-center">
        <div className="loader-logo font-display text-4xl font-bold text-white">HB<span className="text-gradient">.dev</span></div>
        <div className="mx-auto mt-4 h-1 w-48 overflow-hidden rounded-full bg-white/10">
          <div className="loader-bar h-full w-full origin-left scale-x-0 bg-gradient-to-r from-cyan-400 to-fuchsia-500" />
        </div>
      </div>
    </div>
  );
}
