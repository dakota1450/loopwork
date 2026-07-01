import { useEffect, useRef, useState } from 'react';

const B = import.meta.env.BASE_URL;

type Work = {
  id: string;
  brand: string;
  role: string;
  kind: 'video' | 'image';
  src: string;
  poster?: string;
  frame: 'browser' | 'phone' | 'soft';
  brief: string;
  built: string;
  tech: string[];
};

const WORK: Work[] = [
  {
    id: 'bibsite-client',
    brand: 'BibSite',
    role: 'Customer registration',
    kind: 'video',
    src: `${B}work/bibsite-client.mp4`,
    frame: 'phone',
    brief: 'Race sign-up was clunky and off-brand — runners bailed before paying.',
    built: 'A fast, beautiful registration flow that fills races and takes payment.',
    tech: ['Next.js', 'Stripe', 'Prisma'],
  },
  {
    id: 'bibsite-company',
    brand: 'BibSite',
    role: 'Team order dashboard',
    kind: 'image',
    src: `${B}work/bibsite-company.png`,
    frame: 'browser',
    brief: 'Orders lived across spreadsheets, inboxes, and sticky notes.',
    built: 'One dashboard for every order, proof, and client — with clear next actions.',
    tech: ['Next.js', 'Postgres', 'AWS S3'],
  },
  {
    id: 'boulder',
    brand: 'Boulder Bibs',
    role: 'Production dashboard',
    kind: 'image',
    src: `${B}work/boulder-dashboard.png`,
    frame: 'browser',
    brief: 'The print floor ran on memory and guesswork.',
    built: 'A live print-queue + shipping command center the whole shop runs on.',
    tech: ['Next.js', 'Prisma', 'Docker'],
  },
  {
    id: 'oasis',
    brand: 'Oasis',
    role: 'Ambient AI workspace',
    kind: 'video',
    src: `${B}work/oasis.mp4`,
    poster: `${B}work/oasis-poster.jpg`,
    frame: 'soft',
    brief: 'AI tools felt cold, scattered, and stressful to sit in.',
    built: 'A calm, single home base for people who build with AI all day.',
    tech: ['Node', 'xterm.js', 'Web'],
  },
];

export default function WorkExhibit() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % WORK.length), 6500);
    return () => clearTimeout(t);
  }, [active, paused, reduced]);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, [active]);

  const w = WORK[active];

  return (
    <div
      className="mt-12 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Selector list */}
      <div className="flex flex-col gap-1.5">
        {WORK.map((item, i) => {
          const on = i === active;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className={`group relative overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-all ${
                on
                  ? 'border-[#e8702a]/40 bg-[#e8702a]/[0.07]'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`font-mono text-xs tabular-nums ${on ? 'text-[#b1531a]' : 'text-neutral-400'}`}
                >
                  0{i + 1}
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-neutral-900">{item.brand}</span>
                  <span className="block text-xs text-neutral-500">{item.role}</span>
                </span>
                <span
                  className={`text-[#b1531a] transition-opacity ${on ? 'opacity-100' : 'opacity-0'}`}
                >
                  ●
                </span>
              </div>
              {on && !reduced && !paused && (
                <span key={active} className="exhibit-progress" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>

      {/* Stage */}
      <div className="min-w-0">
        <div key={w.id} className="stage-media">
          <div className="panel-tilt" style={{ transform: 'none' }}>
            {w.frame === 'browser' && (
              <div className="panel-chrome">
                <span className="dot" style={{ background: '#ff5f57' }} />
                <span className="dot" style={{ background: '#febc2e' }} />
                <span className="dot" style={{ background: '#28c840' }} />
                <span className="bar" />
              </div>
            )}
            <div
              className="panel-screen"
              style={{
                aspectRatio: w.frame === 'phone' ? '16 / 10' : '16 / 9',
                height: 'auto',
              }}
            >
              {w.kind === 'video' ? (
                <video
                  ref={videoRef}
                  src={w.src}
                  poster={w.poster}
                  muted
                  loop
                  playsInline
                  autoPlay={!reduced}
                  preload="auto"
                  style={{ objectPosition: 'center' }}
                />
              ) : (
                <img src={w.src} alt={`${w.brand} — ${w.role}`} />
              )}
              <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                <span className="hero-live" />
                Live build
              </span>
            </div>
          </div>

          {/* Story */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                The brief
              </span>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{w.brief}</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b1531a]">
                What we shipped
              </span>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-800">{w.built}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {w.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-xs text-neutral-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
