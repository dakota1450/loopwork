import Reveal from '../Reveal';
import DemoBibsite from '../DemoBibsite';
import DemoOasis from '../DemoOasis';
import CapabilityGrid from '../CapabilityGrid';
import Aurora from '../Aurora';
import SectionLabel from '../SectionLabel';

function DemoHeader({ title, sub, ref_ }: { title: string; sub: string; ref_: string }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h3 className="text-xl font-semibold tracking-[-0.02em] text-neutral-900">{title}</h3>
        <p className="text-sm text-neutral-500">{sub}</p>
      </div>
      <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-500">
        Reference: {ref_}
      </span>
    </div>
  );
}

export default function Builds() {
  return (
    <section id="builds" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <Aurora intensity={0.4} />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <SectionLabel index="03">Proof, not promises</SectionLabel>
          <h2 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-neutral-900">
            If you can think it,{' '}
            <span className="font-playfair italic font-medium">we can build it</span>.
          </h2>
          <p className="mt-5 text-lg text-neutral-500 leading-relaxed">
            Not screenshots — actual working demos of the kind of systems we ship. Click around;
            they&apos;re live.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-12">
          <DemoHeader
            title="A storefront that runs your back office"
            sub="Watch a customer order flow straight onto your team's live dashboard."
            ref_="BibSite + Boulder Bibs"
          />
          <DemoBibsite />
        </Reveal>

        <Reveal delay={0.05} className="mt-14">
          <DemoHeader
            title="AI tools your team will actually enjoy"
            sub="Calm, focused, genuinely useful — not another cluttered chatbot."
            ref_="Oasis"
          />
          <DemoOasis />
        </Reveal>

        <CapabilityGrid />
      </div>
    </section>
  );
}
