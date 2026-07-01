import { Check } from 'lucide-react';
import Reveal from '../Reveal';
import Tilt from '../Tilt';
import Aurora from '../Aurora';
import SectionLabel from '../SectionLabel';
import { BRAND } from '../../lib/constants';

const stats = [
  { value: '2–3 wks', label: 'Per build sprint' },
  { value: 'Fixed', label: 'Price, scoped up front' },
  { value: '100%', label: 'Code ownership, yours' },
  { value: 'SMB', label: 'Built for small teams' },
];

const plans = [
  {
    name: 'Audit + Build Sprint',
    price: '$3–5k',
    cadence: 'fixed price',
    blurb:
      'We find the highest-leverage thing to automate in your business, then design and ship it — end to end.',
    highlight: true,
    points: [
      'Deep workflow audit',
      'One high-ROI tool or automation, shipped',
      '2–3 weeks, fixed scope and price',
      'You own 100% of the code',
    ],
  },
  {
    name: 'Growth Retainer',
    price: '$1.5–3k',
    cadence: 'per month · optional',
    blurb:
      'After the sprint, keep building. A fractional product team on tap for whatever comes next.',
    highlight: false,
    points: [
      'New builds & iterations every month',
      'Priority support & maintenance',
      'A rolling roadmap of wins',
      'Cancel anytime',
    ],
  },
];

export default function Offer() {
  return (
    <section id="offer" className="relative overflow-hidden py-24 sm:py-32">
      {/* Blend the dark cinematic Overture into the light content above */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-28 bg-gradient-to-b from-[#08080b]/25 to-transparent"
      />
      <Aurora intensity={0.5} />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <SectionLabel index="01">The offer</SectionLabel>
          <h2 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-neutral-900">
            One sprint to a tool that{' '}
            <span className="font-playfair italic font-medium">pays for itself</span>.
          </h2>
          <p className="mt-5 text-lg text-neutral-500 leading-relaxed">
            No bloated retainers. No six-month builds. We pinpoint the busywork that's quietly
            costing you, then ship the fix — fixed scope, fixed price, fast.
          </p>
        </Reveal>

        {/* Stats strip */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.05 * i}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-neutral-200 bg-white px-5 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#e8702a]/40 hover:shadow-lg">
                <span className="absolute left-0 top-0 h-1 w-0 bg-[#e8702a] transition-all duration-500 group-hover:w-full" />
                <div className="font-mono text-[11px] tabular-nums text-[#b1531a]/70">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-neutral-900">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-neutral-500">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Plans */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {plans.map((plan, i) => (
            <Reveal
              key={plan.name}
              delay={0.05 * (i + 1)}
              variant={i === 0 ? 'left' : 'right'}
              className="h-full"
            >
              <Tilt className="h-full" max={5} lift={4}>
              <div
                className={`flex h-full flex-col rounded-3xl border p-8 transition-shadow ${
                  plan.highlight
                    ? 'border-[#e8702a]/30 bg-neutral-950 text-white shadow-xl shadow-[#e8702a]/5'
                    : 'border-neutral-200 bg-white text-neutral-900 hover:shadow-lg'
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-semibold tracking-[-0.02em]">{plan.name}</h3>
                  <div className="text-right">
                    <div
                      className={`text-2xl font-semibold ${
                        plan.highlight ? 'text-[#e8702a]' : 'text-neutral-900'
                      }`}
                    >
                      {plan.price}
                    </div>
                    <div
                      className={`text-xs ${plan.highlight ? 'text-white/60' : 'text-neutral-500'}`}
                    >
                      {plan.cadence}
                    </div>
                  </div>
                </div>
                <p
                  className={`mt-4 leading-relaxed ${
                    plan.highlight ? 'text-white/70' : 'text-neutral-500'
                  }`}
                >
                  {plan.blurb}
                </p>
                <ul className="mt-6 space-y-3">
                  {plan.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm">
                      <Check size={18} className="mt-0.5 shrink-0 text-[#e8702a]" />
                      <span className={plan.highlight ? 'text-white/85' : 'text-neutral-600'}>
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href={BRAND.calLink}
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all hover:scale-[1.02] active:scale-95 ${
                    plan.highlight
                      ? 'bg-[#b1531a] text-white hover:bg-[#964918] hover:shadow-lg hover:shadow-[#e8702a]/30'
                      : 'bg-neutral-900 text-white hover:bg-neutral-800'
                  }`}
                >
                  {plan.highlight ? 'Start a sprint' : 'Talk to us'}
                </a>
              </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
