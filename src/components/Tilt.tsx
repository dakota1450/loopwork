import { useEffect, useRef, type ReactNode } from 'react';
import { prefersReducedMotion, isTouch } from '../lib/motion';

/**
 * 3D cursor-tilt wrapper. The element leans toward the pointer and lifts,
 * with a soft light-glare that tracks the cursor. Pure transform work, gated
 * off for touch + reduced-motion. Wrap any card; the card keeps its own styles.
 */
export default function Tilt({
  children,
  className = '',
  max = 6,
  lift = 6,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  lift?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isTouch()) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rx = (0.5 - y) * max;
        const ry = (x - 0.5) * max;
        el.style.transform = `perspective(1100px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(${(-lift).toFixed(1)}px)`;
        if (glareRef.current) {
          glareRef.current.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
          glareRef.current.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
          glareRef.current.style.opacity = '1';
        }
      });
    };
    const onEnter = () => {
      el.style.transition = 'transform 0.12s ease-out';
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
      el.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0)';
      if (glareRef.current) glareRef.current.style.opacity = '0';
    };

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [max, lift]);

  return (
    <div ref={ref} className={`tilt ${className}`}>
      {children}
      {glare && <div ref={glareRef} className="tilt-glare" aria-hidden="true" />}
    </div>
  );
}
