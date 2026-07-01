import { Check } from 'lucide-react';
import Reveal from '../Reveal';
import { BRAND } from '../../lib/constants';

const tiers = [
  {
    name: 'Free Audit',
    price: '$0',
    cadence: 'no commitment',
    blurb: 'A 30-minute call and an opportunity map of where automation pays off fastest.',
    cta: 'Book the audit',
    featured: false,
    features: ['30-minute strategy call', 'ROI opportunity map', 'Honest go / no-go advice'],
  },
  {
    name: 'Build Sprint',
    price: 'from $3k',
    cadence: 'one-time, fixed',
    blurb: 'We design and ship one high-ROI tool or automation, end to end.',
    cta: 'Start a sprint',
    featured: true,
    features: [
      'Everything in the Audit',
      'Fixed scope and price',
      'Shipped in 2–3 weeks',
      'You own all the code',
      '2 weeks of post-launch support',
    ],
  },
  {
    name: 'Growth Retainer',
    price: 'from $1.5k',
    cadence: 'per month',
    blurb: 'An ongoing build partner for whatever comes next.',
    cta: 'Talk to us',
    featured: false,
    features: ['Ongoing builds & iterations', 'Priority support', 'Monthly roadmap', 'Cancel anytime'],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative bg-neutral-50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b1531a]">
            Pricing
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-neutral-900">
            Simple, <span className="font-playfair italic font-medium">fixed</span> pricing.
          </h2>
          <p className="mt-5 text-lg text-neutral-500 leading-relaxed">
            Know the price before we start. No hourly billing, no scope creep, no surprises.
          </p>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={0.06 * i} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-3xl border p-8 ${
                  tier.featured
                    ? 'border-transparent bg-neutral-950 text-white shadow-2xl shadow-neutral-900/20 lg:-mt-4 lg:mb-[-1rem]'
                    : 'border-neutral-200 bg-white text-neutral-900'
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#b1531a] px-4 py-1 text-xs font-semibold text-white">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span
                    className={`text-4xl font-semibold tracking-[-0.03em] ${
                      tier.featured ? 'text-white' : 'text-neutral-900'
                    }`}
                  >
                    {tier.price}
                  </span>
                  <span className={tier.featured ? 'text-sm text-white/60' : 'text-sm text-neutral-500'}>
                    {tier.cadence}
                  </span>
                </div>
                <p className={`mt-4 text-sm leading-relaxed ${tier.featured ? 'text-white/70' : 'text-neutral-500'}`}>
                  {tier.blurb}
                </p>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check size={18} className="mt-0.5 shrink-0 text-[#e8702a]" />
                      <span className={tier.featured ? 'text-white/85' : 'text-neutral-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={BRAND.calLink}
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all hover:scale-[1.02] active:scale-95 ${
                    tier.featured
                      ? 'bg-[#b1531a] text-white hover:bg-[#964918] hover:shadow-lg hover:shadow-[#e8702a]/30'
                      : 'bg-neutral-900 text-white hover:bg-neutral-800'
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-neutral-600">
          Prices scale with scope — most sprints land between $3k and $5k.
        </p>
      </div>
    </section>
  );
}
