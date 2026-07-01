import { useRef } from 'react';
import { useScrollEffect } from '../lib/motion';

/**
 * Thin gradient progress bar pinned to the top of the viewport. Width tracks
 * how far down the page you are — a small, premium "this site is alive" cue.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollEffect((y) => {
    const el = ref.current;
    if (!el) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
    el.style.transform = `scaleX(${p.toFixed(4)})`;
  });

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[200] h-[3px] w-full origin-left"
    >
      <div
        ref={ref}
        className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[#ffb37a] via-[#e8702a] to-[#b1531a]"
        style={{ boxShadow: '0 0 12px rgba(232,112,42,0.6)' }}
      />
    </div>
  );
}
