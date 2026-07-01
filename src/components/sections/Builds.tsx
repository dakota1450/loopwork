import {
  LayoutDashboard,
  Workflow,
  Sparkles,
  Users,
  Database,
  Cable,
  Inbox,
  AppWindow,
} from 'lucide-react';
import Reveal from '../Reveal';

const builds = [
  {
    icon: LayoutDashboard,
    title: 'Internal tools & dashboards',
    body: 'Replace the spreadsheet held together with hope. One place to run the business.',
  },
  {
    icon: Workflow,
    title: 'Workflow automations',
    body: 'Connect your apps so the repetitive, copy-paste work just happens on its own.',
  },
  {
    icon: Sparkles,
    title: 'AI assistants & copilots',
    body: 'Drafting, triage, summaries, support — put a smart layer on top of your data.',
  },
  {
    icon: Users,
    title: 'Customer & client portals',
    body: 'Give clients a clean, branded place to log in, see status, and self-serve.',
  },
  {
    icon: Database,
    title: 'Data pipelines & reporting',
    body: 'Pull numbers from everywhere into reports you can actually trust and act on.',
  },
  {
    icon: Cable,
    title: 'App & API integrations',
    body: 'Make your tools finally talk to each other — no more double entry.',
  },
  {
    icon: Inbox,
    title: 'Lead capture & CRM',
    body: 'Instant lead response and a pipeline that makes sure nothing ever leaks.',
  },
  {
    icon: AppWindow,
    title: 'Custom web apps',
    body: "Whatever the off-the-shelf tools can't do — built exactly for how you work.",
  },
];

export default function Builds() {
  return (
    <section id="builds" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b1531a]">
            What we build
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-neutral-900">
            If you can think it,{' '}
            <span className="font-playfair italic font-medium">we can build it</span>.
          </h2>
          <p className="mt-5 text-lg text-neutral-500 leading-relaxed">
            High-ROI software and automation, scoped to the size of a small business. A few of the
            things we ship most.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {builds.map((b, i) => {
            const Icon = b.icon;
            return (
              <Reveal key={b.title} delay={0.04 * i}>
                <div className="group h-full rounded-3xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#e8702a]/40 hover:shadow-lg">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-neutral-900 text-white transition-colors group-hover:bg-[#e8702a]">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-neutral-900">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">{b.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
