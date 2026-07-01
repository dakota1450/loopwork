import { useParallax } from '../lib/motion';

/**
 * Ambient, slowly-drifting orange aurora blobs for section backgrounds. Adds
 * continuous life behind otherwise-flat panels and parallax-drifts on scroll.
 * Decorative + non-interactive; sits at the very back of a `relative` section.
 */
export default function Aurora({
  className = '',
  intensity = 1,
}: {
  className?: string;
  intensity?: number;
}) {
  const ref = useParallax<HTMLDivElement>(0.08);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-0 overflow-hidden ${className}`}
      style={{ opacity: intensity }}
    >
      <div className="aurora-blob aurora-1" />
      <div className="aurora-blob aurora-2" />
    </div>
  );
}
