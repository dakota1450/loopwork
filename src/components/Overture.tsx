import { useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { BRAND } from '../lib/constants';
import HeroLoopCanvas from './HeroLoopCanvas';
import Magnetic from './Magnetic';
import {
  useScrollEffect,
  prefersReducedMotion,
  cine,
  clamp01,
  track,
  easeInOut,
} from '../lib/motion';

const BASE = import.meta.env.BASE_URL;

// Each scene's [fade-in start, fade-in end] and [fade-out start, fade-out end]
// as a fraction of the Overture's scroll length. Scene 1 exits just as the loop
// zoom peaks (~0.34), so you "fly through" the loop into scene 2.
const SCENES: { in: [number, number]; out: [number, number] }[] = [
  { in: [-1, 0], out: [0.17, 0.25] }, // fully visible at the top, then flies away
  { in: [0.27, 0.37], out: [0.47, 0.55] },
  { in: [0.57, 0.66], out: [0.74, 0.82] },
  { in: [0.84, 0.92], out: [2, 3] },
];

/* ------------------------------------------------------------------ */
/* Scene content                                                       */
/* ------------------------------------------------------------------ */
function Scene1() {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/75 backdrop-blur">
          <span className="hero-live" />
          Software studio for small business
        </span>
        <h1 className="mt-6 text-white leading-[0.9]">
          <span
            className="block font-playfair italic font-normal text-6xl sm:text-7xl md:text-8xl"
            style={{ letterSpacing: '-0.04em' }}
          >
            If you can think it,
          </span>
          <span
            className="-mt-1 block text-6xl font-semibold sm:text-7xl md:text-8xl"
            style={{ letterSpacing: '-0.05em' }}
          >
            we can{' '}
            <span className="bg-gradient-to-r from-[#ffb37a] via-[#e8702a] to-[#e8702a] bg-clip-text text-transparent">
              build it.
            </span>
          </span>
        </h1>
        <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/70">
          High-ROI software, automations, and internal tools — designed, built, and shipped for
          small businesses in fixed-price sprints.
        </p>
        <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row">
          <Magnetic>
            <a
              href={BRAND.calLink}
              className="group inline-flex items-center gap-2 rounded-full bg-[#e8702a] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#f07d38] hover:shadow-lg hover:shadow-[#e8702a]/40"
            >
              Book a Free Audit
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
          <a
            href="#builds"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
          >
            See what we&apos;ve built
          </a>
        </div>
      </div>
    </div>
  );
}

function CenterScene({
  eyebrow,
  children,
  sub,
  cta,
}: {
  eyebrow: string;
  children: React.ReactNode;
  sub?: React.ReactNode;
  cta?: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ff9d5c]">
        {eyebrow}
      </span>
      <h2 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl">
        {children}
      </h2>
      {sub && <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">{sub}</p>}
      {cta && <div className="mt-9">{cta}</div>}
    </div>
  );
}

/* Reduced-motion / no-JS fallback: a plain, legible hero. */
function ReducedHero() {
  return (
    <section
      id="overture"
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-[#08080b] px-6 sm:px-10"
    >
      <span id="top" aria-hidden="true" className="absolute top-0" />
      <HeroLoopCanvas />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(8,8,11,0.9) 0%, rgba(8,8,11,0.5) 40%, rgba(8,8,11,0) 72%)',
        }}
      />
      <div className="relative z-10 py-28">
        <Scene1 />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The pinned cinematic Overture                                       */
/* ------------------------------------------------------------------ */
export default function Overture() {
  const reduced = prefersReducedMotion();
  const outerRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const scrimRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const nebulaRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useScrollEffect((_y, vh) => {
    const el = outerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const total = el.offsetHeight - vh;
    const p = clamp01(-rect.top / (total || 1));
    cine.p = p;

    SCENES.forEach((c, i) => {
      const s = sceneRefs.current[i];
      if (!s) return;
      const enter = track(p, c.in[0], c.in[1]);
      const exit = track(p, c.out[0], c.out[1]);
      const op = Math.min(enter, 1 - exit);
      const ty = (1 - enter) * 48 - exit * 48;
      const sc = 0.96 + enter * 0.04 - exit * 0.02;
      s.style.opacity = op.toFixed(3);
      s.style.transform = `translate3d(0,${ty.toFixed(1)}px,0) scale(${sc.toFixed(3)})`;
      s.style.pointerEvents = op > 0.6 ? 'auto' : 'none';
    });

    if (scrimRef.current)
      scrimRef.current.style.opacity = (0.06 + track(p, 0.12, 0.42) * 0.68).toFixed(3);
    if (portalRef.current) {
      const o = Math.min(track(p, 0.08, 0.3), 1 - track(p, 0.3, 0.46)) * 0.85;
      portalRef.current.style.opacity = o.toFixed(3);
      const s = 0.5 + easeInOut(track(p, 0.05, 0.44)) * 2.6;
      portalRef.current.style.transform = `translate(-50%,-50%) scale(${s.toFixed(3)})`;
    }
    if (nebulaRef.current)
      nebulaRef.current.style.opacity = (track(p, 0.4, 0.62) * 0.45).toFixed(3);
    if (cueRef.current) cueRef.current.style.opacity = (1 - track(p, 0, 0.07)).toFixed(3);

    const active = p < 0.25 ? 0 : p < 0.55 ? 1 : p < 0.82 ? 2 : 3;
    dotRefs.current.forEach((d, i) => {
      if (!d) return;
      d.style.height = i === active ? '22px' : '6px';
      d.style.background = i === active ? '#e8702a' : 'rgba(255,255,255,0.32)';
    });
  }, !reduced);

  if (reduced) return <ReducedHero />;

  return (
    <section id="overture" ref={outerRef} className="relative bg-[#08080b]" style={{ height: '480vh' }}>
      <span id="top" aria-hidden="true" className="absolute top-0" />
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Ambient nebula (appears for later scenes) */}
        <div
          ref={nebulaRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-0 mix-blend-screen"
          style={{ backgroundImage: `url(${BASE}hero-nebula.webp)` }}
        />

        {/* The living infinity loop (zooms with cine.p) */}
        <HeroLoopCanvas />

        {/* Portal plate — blooms and scales as you fly into the loop */}
        <div
          ref={portalRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[62vmin] w-[112vmin] -translate-x-1/2 -translate-y-1/2 bg-cover bg-center bg-no-repeat opacity-0 mix-blend-screen"
          style={{ backgroundImage: `url(${BASE}hero-portal.webp)` }}
        />

        {/* Darkening scrim so later scenes read over the zoomed loop */}
        <div ref={scrimRef} aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#08080b] opacity-0" />

        {/* Left legibility gradient + vignette + grain */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(8,8,11,0.82) 0%, rgba(8,8,11,0.4) 34%, rgba(8,8,11,0) 66%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: 'inset 0 0 220px 60px rgba(0,0,0,0.7)' }}
        />
        <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />

        {/* Scenes */}
        <div className="pointer-events-none absolute inset-0 z-20">
          <div
            ref={(el) => {
              sceneRefs.current[0] = el;
            }}
            className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-16"
          >
            <Scene1 />
          </div>

          <div
            ref={(el) => {
              sceneRefs.current[1] = el;
            }}
            className="absolute inset-0 flex items-center justify-center px-6 opacity-0"
          >
            <CenterScene
              eyebrow="What we are"
              sub="Not a template shop. A studio that designs and ships the exact tool your business is missing."
            >
              One partner for every{' '}
              <span className="font-playfair italic font-medium text-[#ff9d5c]">tool you need</span>.
            </CenterScene>
          </div>

          <div
            ref={(el) => {
              sceneRefs.current[2] = el;
            }}
            className="absolute inset-0 flex items-center justify-center px-6 opacity-0"
          >
            <CenterScene
              eyebrow="What we build"
              sub="Real, working systems — dashboards, portals, automations, and private AI trained on your world. Shipped in weeks, owned by you."
            >
              Dashboards. Portals.{' '}
              <span className="font-playfair italic font-medium text-[#ff9d5c]">
                A brain for your company.
              </span>
            </CenterScene>
          </div>

          <div
            ref={(el) => {
              sceneRefs.current[3] = el;
            }}
            className="absolute inset-0 flex items-center justify-center px-6 opacity-0"
          >
            <CenterScene
              eyebrow="Let's begin"
              cta={
                <Magnetic>
                  <a
                    href={BRAND.calLink}
                    className="group inline-flex items-center gap-2 rounded-full bg-[#e8702a] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#f07d38] hover:shadow-lg hover:shadow-[#e8702a]/40"
                  >
                    Book a Free Audit
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </a>
                </Magnetic>
              }
            >
              Let&apos;s build{' '}
              <span className="font-playfair italic font-medium text-[#ff9d5c]">yours</span>.
            </CenterScene>
          </div>
        </div>

        {/* Scene progress rail */}
        <div className="absolute right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-2.5 sm:flex">
          {SCENES.map((_, i) => (
            <span
              key={i}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              className="w-1.5 rounded-full transition-all duration-300"
              style={{ height: '6px', background: 'rgba(255,255,255,0.32)' }}
            />
          ))}
        </div>

        {/* Scroll cue */}
        <div
          ref={cueRef}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
            Scroll to enter
          </span>
          <ChevronDown size={18} className="scroll-cue-chevron text-[#e8702a]" />
        </div>
      </div>
    </section>
  );
}
