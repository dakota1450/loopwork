import { Search, PencilRuler, Hammer, Repeat } from 'lucide-react';
import Reveal from '../Reveal';

const steps = [
  {
    icon: Search,
    title: 'Audit',
    body: "We dig into where work piles up and pinpoint the single highest-ROI thing to build first.",
  },
  {
    icon: PencilRuler,
    title: 'Blueprint',
    body: 'You get a fixed-price scope and a plain-English plan. No jargon, no surprise invoices.',
  },
  {
    icon: Hammer,
    title: 'Build',
    body: 'We design and ship it in a focused sprint, keeping you in the loop the whole way.',
  },
  {
    icon: Repeat,
    title: 'Loop',
    body: 'You own it. We measure the ROI, then find the next win worth automating.',
  },
];

export default function Process() {
  return (
    <section id="process" className="relative bg-neutral-50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b1531a]">
            How it works
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-neutral-900">
            From idea to <span className="font-playfair italic font-medium">live</span> in four
            steps.
          </h2>
          <p className="mt-5 text-lg text-neutral-500 leading-relaxed">
            A tight, transparent process designed to get value into your hands fast — and keep it
            coming.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={0.07 * i}>
                <div className="group h-full rounded-3xl border border-neutral-200 bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e8702a]/10 text-[#e8702a] transition-colors group-hover:bg-[#e8702a] group-hover:text-white">
                      <Icon size={22} />
                    </span>
                    <span className="text-5xl font-semibold tracking-tight text-neutral-100">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-neutral-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">{step.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
