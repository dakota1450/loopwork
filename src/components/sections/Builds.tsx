import Reveal from '../Reveal';
import WorkExhibit from '../WorkExhibit';

const CAPABILITIES = [
  'Internal tools & dashboards',
  'Workflow automation',
  'AI assistants & copilots',
  'Client & customer portals',
  'Data pipelines & reporting',
  'App & API integrations',
  'Lead capture & CRM',
  'Custom web apps',
];

export default function Builds() {
  return (
    <section id="builds" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b1531a]">
            Selected work
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-neutral-900">
            If you can think it,{' '}
            <span className="font-playfair italic font-medium">we can build it</span>.
          </h2>
          <p className="mt-5 text-lg text-neutral-500 leading-relaxed">
            Not mockups — real products running real businesses. Pick one to watch it live.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <WorkExhibit />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-16 border-t border-neutral-200 pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
              And whatever else you need
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {CAPABILITIES.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-sm text-neutral-700"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
