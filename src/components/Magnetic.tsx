import { useEffect, useRef, type ReactNode } from 'react';
import { prefersReducedMotion, isTouch } from '../lib/motion';

/**
 * Magnetic hover: the wrapped element eases toward the cursor while it hovers
 * (and just past its edges), then springs back. Great on primary CTAs.
 * Renders an inline-block span so it doesn't disturb layout.
 */
export default function Magnetic({
  children,
  className = '',
  strength = 0.4,
  radius = 90,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isTouch()) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const reach = Math.max(r.width, r.height) / 2 + radius;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (dist < reach) {
          el.style.transform = `translate(${(dx * strength).toFixed(2)}px, ${(dy * strength).toFixed(2)}px)`;
        } else {
          el.style.transform = 'translate(0,0)';
        }
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = 'translate(0,0)';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [strength, radius]);

  return (
    <span ref={ref} className={`magnetic ${className}`}>
      {children}
    </span>
  );
}
