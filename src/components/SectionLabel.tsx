import { type ReactNode } from 'react';

/**
 * Editorial section eyebrow: a monospaced index, a short rule, and the label.
 * Replaces the generic bare-uppercase kicker so each section reads as a
 * deliberately-numbered chapter rather than a default template block.
 */
export default function SectionLabel({
  index,
  children,
  center = false,
}: {
  index: string;
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
      <span className="font-mono text-[13px] font-medium tabular-nums text-[#b1531a]">{index}</span>
      <span className="h-px w-7 bg-gradient-to-r from-[#e8702a] to-[#e8702a]/0" />
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b1531a]">
        {children}
      </span>
    </div>
  );
}
