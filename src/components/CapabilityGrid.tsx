import {
  LayoutDashboard,
  Network,
  Workflow,
  Bot,
  PanelsTopLeft,
  Users,
  Plug,
  Target,
  Database,
  ShoppingCart,
  CalendarClock,
  Globe,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { BRAND } from '../lib/constants';
import Reveal from './Reveal';
import Tilt from './Tilt';
import Magnetic from './Magnetic';

/* ------------------------------------------------------------------ */
/* Compact example cards                                               */
/* ------------------------------------------------------------------ */
type Example = { icon: LucideIcon; title: string; desc: string };

const EXAMPLES: Example[] = [
  {
    icon: Workflow,
    title: 'Workflow automation',
    desc: 'Kill the copy-paste. We wire your tools together so the busywork runs itself.',
  },
  {
    icon: Bot,
    title: 'AI assistants & copilots',
    desc: 'Assistants that draft, answer, and act — trained on your business, not the whole internet.',
  },
  {
    icon: PanelsTopLeft,
    title: 'Internal tools & admin panels',
    desc: "The custom back office your team wishes it had — built to your exact process.",
  },
  {
    icon: Users,
    title: 'Client & customer portals',
    desc: 'A branded, self-serve home where clients see their projects, files, and updates.',
  },
  {
    icon: Plug,
    title: 'App & API integrations',
    desc: "Make your stack talk. We connect the apps that don't play nice out of the box.",
  },
  {
    icon: Target,
    title: 'Lead capture & CRM',
    desc: 'Never lose a lead again — captured, routed, and followed up automatically.',
  },
  {
    icon: Database,
    title: 'Data pipelines & reporting',
    desc: 'Pull scattered data into one clean, trustworthy source of truth.',
  },
  {
    icon: ShoppingCart,
    title: 'Storefronts & e-commerce',
    desc: 'Stores that sell and feed your back office the moment an order lands.',
  },
  {
    icon: CalendarClock,
    title: 'Booking & scheduling',
    desc: 'Let customers book themselves in — synced to your calendar and your CRM.',
  },
  {
    icon: Globe,
    title: 'Custom web apps',
    desc: 'A full product, built from scratch, that does exactly what you need it to.',
  },
];

/* ------------------------------------------------------------------ */
/* Featured-card mini visuals                                          */
/* ------------------------------------------------------------------ */
function DashboardVisual() {
  const bars = [42, 68, 55, 82, 60, 94, 74];
  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-5">
      <div className="grid grid-cols-3 gap-2">
        {[
          { k: 'Revenue', v: '$48.2k' },
          { k: 'Pipeline', v: '+12%' },
          { k: 'Open', v: '214' },
        ].map((m) => (
          <div key={m.k} className="rounded-lg border border-neutral-200/80 bg-white px-2.5 py-2">
            <div className="text-[9px] font-medium uppercase tracking-wide text-neutral-400">
              {m.k}
            </div>
            <div className="text-sm font-semibold text-neutral-800">{m.v}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-1 items-end gap-1.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className="dash-bar flex-1 rounded-t bg-gradient-to-t from-[#e8702a] to-[#ffb27a]"
            style={{ height: `${h}%`, animationDelay: `${i * 0.07}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function BrainVisual() {
  // Central "brain" node fed by everything the company knows.
  const nodes = [
    { x: 30, y: 34, label: 'Your data' },
    { x: 190, y: 34, label: 'Clients' },
    { x: 22, y: 104, label: 'Docs' },
    { x: 198, y: 104, label: 'Playbook' },
    { x: 110, y: 150, label: 'Brand voice' },
  ];
  const cx = 110;
  const cy = 88;
  return (
    <svg viewBox="0 0 220 180" className="absolute inset-0 h-full w-full">
      {nodes.map((n) => (
        <line
          key={`l-${n.label}`}
          className="brain-line"
          x1={cx}
          y1={cy}
          x2={n.x}
          y2={n.y}
          stroke="#e8702a"
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />
      ))}
      {nodes.map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r="4" fill="#fff" stroke="#e8702a" strokeWidth="1.5" />
          <text
            x={n.x}
            y={n.y - 9}
            textAnchor="middle"
            className="fill-neutral-500"
            style={{ fontSize: '9px', fontWeight: 600 }}
          >
            {n.label}
          </text>
        </g>
      ))}
      <circle className="brain-ring" cx={cx} cy={cy} r="20" fill="#e8702a" fillOpacity="0.18" />
      <circle cx={cx} cy={cy} r="20" fill="#e8702a" />
      <text
        x={cx}
        y={cy + 3.5}
        textAnchor="middle"
        fill="#fff"
        style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.02em' }}
      >
        AI
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Featured card                                                       */
/* ------------------------------------------------------------------ */
function FeaturedCard({
  icon: Icon,
  title,
  desc,
  tag,
  visual,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  tag: string;
  visual: React.ReactNode;
}) {
  return (
    <Tilt className="h-full" max={5} lift={5}>
      <div className="example-card group grid h-full overflow-hidden rounded-2xl border border-neutral-200 bg-white sm:grid-cols-2">
        <div className="relative z-[1] flex flex-col p-6 sm:p-7">
          <span className="example-icon inline-grid h-11 w-11 place-items-center rounded-xl bg-[#e8702a]/10 text-[#e8702a]">
            <Icon size={22} />
          </span>
          <h4 className="mt-4 text-lg font-semibold tracking-[-0.01em] text-neutral-900">{title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-neutral-500">{desc}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b1531a]">
            {tag}
          </span>
        </div>
        <div className="relative min-h-[172px] border-t border-neutral-100 bg-gradient-to-br from-neutral-50 to-white sm:border-l sm:border-t-0">
          {visual}
        </div>
      </div>
    </Tilt>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function CapabilityGrid() {
  return (
    <div className="mt-20 border-t border-neutral-200 pt-16">
      <Reveal className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b1531a]">
          Sky&apos;s the limit
        </span>
        <h3 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-neutral-900">
          A short list of what we build
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-neutral-500">
          These are starting points, not a menu. Bring us the bottleneck, the busywork, or the
          &ldquo;wouldn&apos;t it be great if&hellip;&rdquo; — we&apos;ll design the tool around it.
        </p>
      </Reveal>

      {/* Two featured examples Dakota called out */}
      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <Reveal variant="left" className="h-full">
          <FeaturedCard
            icon={LayoutDashboard}
            title="Custom dashboards & reports"
            desc="One screen for your whole business. Live KPIs, auto-generated reports, and alerts that reach you before a problem does — no more spreadsheet gymnastics."
            tag="Custom software, your way"
            visual={<DashboardVisual />}
          />
        </Reveal>
        <Reveal variant="right" delay={0.08} className="h-full">
          <FeaturedCard
            icon={Network}
            title="A brain for your whole company"
            desc="A private, branded AI trained on your world — your data, your clients, your playbooks, your voice. Every teammate gets an expert copilot that already knows how you work."
            tag="Shared across your team"
            visual={<BrainVisual />}
          />
        </Reveal>
      </div>

      {/* The wider grid of examples — staggered cascade + cursor tilt */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EXAMPLES.map((ex, i) => {
          const Icon = ex.icon;
          return (
            <Reveal key={ex.title} delay={0.04 * i} variant="up" className="h-full">
              <Tilt className="h-full" max={7} lift={5}>
                <div className="example-card group h-full rounded-2xl border border-neutral-200 bg-white p-5">
                  <span className="example-icon relative z-[1] inline-grid h-10 w-10 place-items-center rounded-lg bg-[#e8702a]/10 text-[#e8702a]">
                    <Icon size={20} />
                  </span>
                  <h4 className="relative z-[1] mt-3.5 text-base font-semibold tracking-[-0.01em] text-neutral-900">
                    {ex.title}
                  </h4>
                  <p className="relative z-[1] mt-1.5 text-sm leading-relaxed text-neutral-500">
                    {ex.desc}
                  </p>
                </div>
              </Tilt>
            </Reveal>
          );
        })}
      </div>

      {/* Closing "sky's the limit" CTA card */}
      <Reveal delay={0.05} variant="scale" className="mt-8">
        <div className="relative overflow-hidden rounded-2xl bg-neutral-900 px-6 py-10 sm:px-10 sm:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(232,112,42,0.35), transparent 70%)',
            }}
          />
          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h4 className="text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
                Don&apos;t see yours?{' '}
                <span className="font-playfair italic font-medium text-[#ff9d5c]">
                  That&apos;s the point.
                </span>
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                If you can think it, we can build it. Tell us the problem in plain English — in a free
                audit we&apos;ll map the highest-ROI tool and exactly what it takes to ship it.
              </p>
              <p className="mt-4 text-xs text-white/40">
                Demos above are inspired by real production work for BibSite, Boulder Bibs &amp; Oasis.
              </p>
            </div>
            <Magnetic className="flex-none">
              <a
                href={BRAND.calLink}
                className="group inline-flex items-center gap-2 rounded-full bg-[#e8702a] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#f07d38] hover:shadow-lg hover:shadow-[#e8702a]/30"
              >
                Book a Free Audit
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
