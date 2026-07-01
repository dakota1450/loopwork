import { type ReactNode } from 'react';
import { useInView } from '../lib/motion';

type Variant = 'up' | 'left' | 'right' | 'scale' | 'blur';

/**
 * Scroll-reveal wrapper. Fades + eases children into view with a directional
 * variant and optional stagger delay. The motion lives in index.css
 * (.reveal-on-scroll[.rv-*] / .in-view) and is disabled under
 * prefers-reduced-motion, so this stays purely additive.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  variant = 'up',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll rv-${variant} ${inView ? 'in-view' : ''} ${className}`}
      style={{ '--rv-delay': `${delay}s` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
