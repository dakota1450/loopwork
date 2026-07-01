import { ChevronDown } from 'lucide-react';
import Reveal from '../Reveal';

const faqs = [
  {
    q: 'How fast can you start?',
    a: 'Usually within a week. The free audit comes first, then we lock in a sprint start date — most builds are live in 2–3 weeks.',
  },
  {
    q: "What if I don't know what to automate?",
    a: "That's exactly what the audit is for. We map how work actually flows through your business and tell you where the fastest ROI is hiding.",
  },
  {
    q: 'Do I own the code?',
    a: '100%. Everything we build is yours — the code, the accounts, and the documentation. No lock-in, ever.',
  },
  {
    q: 'What tech do you use?',
    a: 'Proven, boring-on-purpose tools: TypeScript, React / Next.js, Postgres, and the automation platforms your team already touches. We optimize for something you can maintain, not a science project.',
  },
  {
    q: 'What size businesses do you work with?',
    a: 'Small and mid-sized businesses — typically teams of 2 to 50 that are drowning in manual, repetitive work and ready to fix it.',
  },
  {
    q: "What if it doesn't deliver ROI?",
    a: 'We scope every sprint around a measurable outcome and agree on it up front. If the numbers are not there, we keep working until they are.',
  },
];

export default function Faq() {
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b1531a]">
            FAQ
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-neutral-900">
            Questions, <span className="font-playfair italic font-medium">answered</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-12 divide-y divide-neutral-200 border-y border-neutral-200">
            {faqs.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left [&::-webkit-details-marker]:hidden">
                  <span className="text-base font-medium text-neutral-900 sm:text-lg">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={20}
                    className="shrink-0 text-neutral-400 transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-500 sm:text-base">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
