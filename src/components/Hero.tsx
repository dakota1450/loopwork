import { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { BRAND, NAV_LINKS } from '../lib/constants';

const B = import.meta.env.BASE_URL;

/* ------------------------------------------------------------------ */
/* Logo                                                                */
/* ------------------------------------------------------------------ */
function LogoMark({ scrolled }: { scrolled: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5">
      <span
        className={`grid h-7 w-7 place-items-center rounded-lg transition-colors ${
          scrolled ? 'bg-neutral-900' : 'bg-white'
        }`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 48 28"
          fill="none"
          stroke={scrolled ? '#ffffff' : '#0a0a0a'}
          strokeWidth="5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M24 14c-3-5-6.5-7.5-10.5-7.5a7.5 7.5 0 1 0 0 15C17.5 21.5 21 19 24 14c3-5 6.5-7.5 10.5-7.5a7.5 7.5 0 1 1 0 15C30.5 21.5 27 19 24 14Z" />
        </svg>
      </span>
      <span
        className={`text-2xl font-playfair italic transition-colors ${
          scrolled ? 'text-neutral-900' : 'text-white'
        }`}
      >
        {BRAND.name}
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const offset = 120;
      let current = '';
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.href.slice(1));
        if (el && el.getBoundingClientRect().top <= offset) current = link.href.slice(1);
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onScroll = () => setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('scroll', onScroll);
    };
  }, [open]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5 transition-colors duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : ''
      }`}
    >
      <LogoMark scrolled={scrolled} />

      <div
        className={`hidden md:flex absolute left-1/2 -translate-x-1/2 rounded-full px-2 py-2 items-center gap-1 border transition-colors ${
          scrolled
            ? 'bg-neutral-900/[0.04] border-neutral-200'
            : 'bg-white/20 backdrop-blur-md border-white/30'
        }`}
      >
        {NAV_LINKS.map((link) => {
          const active = link.href === `#${activeId}`;
          const base = 'px-4 py-1.5 rounded-full text-sm font-medium transition-colors';
          const cls = scrolled
            ? active
              ? 'text-neutral-900 bg-neutral-900/10'
              : 'text-neutral-500 hover:bg-neutral-900/10 hover:text-neutral-900'
            : active
              ? 'text-white bg-white/20'
              : 'text-white/80 hover:bg-white/20 hover:text-white';
          return (
            <a key={link.href} href={link.href} className={`${base} ${cls}`}>
              {link.label}
            </a>
          );
        })}
      </div>

      <a
        href={BRAND.calLink}
        className={`hidden md:block text-sm font-semibold px-6 py-2.5 rounded-full transition-colors ${
          scrolled
            ? 'bg-neutral-900 text-white hover:bg-neutral-800'
            : 'bg-white text-gray-900 hover:bg-gray-100'
        }`}
      >
        Book a Call
      </a>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`md:hidden p-1 transition-colors ${scrolled ? 'text-neutral-900' : 'text-white'}`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      {open && (
        <div className="md:hidden absolute top-full right-4 left-4 mt-2 rounded-2xl bg-black/80 backdrop-blur-lg border border-white/15 p-3 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-white/85 hover:text-white hover:bg-white/10 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={BRAND.calLink}
            onClick={() => setOpen(false)}
            className="mt-1 text-center bg-white text-gray-900 text-sm font-semibold px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Book a Call
          </a>
        </div>
      )}
    </nav>
  );
}

const MARQUEE = [
  'Custom software',
  'Workflow automation',
  'Internal tools',
  'AI assistants',
  'Client portals',
  'Live dashboards',
  'API integrations',
  'Lead systems',
];

/* ------------------------------------------------------------------ */
/* Hero — Higgsfield-animated "living loop" video header               */
/* ------------------------------------------------------------------ */
export default function Hero() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <section
      id="top"
      aria-label="Loopwork — if you can think it, we can build it"
      className="relative w-full overflow-hidden bg-[#08080b]"
      style={{ minHeight: '100dvh' }}
    >
      {/* Animated hero video (generated with Higgsfield) */}
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        poster={`${B}hero-poster.webp`}
        autoPlay={!reduced}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={`${B}hero-loop.mp4`} type="video/mp4" />
      </video>

      {/* Filmic scrims for legibility (darker on the left where the copy sits) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(90deg, rgba(8,8,11,0.94) 0%, rgba(8,8,11,0.75) 32%, rgba(8,8,11,0.2) 62%, rgba(8,8,11,0) 100%), linear-gradient(to top, rgba(8,8,11,0.85) 0%, transparent 34%)',
        }}
      />
      {/* Film grain — filmic texture so it doesn't read as a flat template */}
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 z-10" />

      <Nav />

      {/* Copy */}
      <div className="relative z-20 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-center px-6 pt-28 pb-24">
        <div className="max-w-2xl">
          <span
            className="hero-anim hero-fade inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/75 backdrop-blur"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="hero-live" />
            Software studio for small business
          </span>
          <h1 className="mt-6 text-white leading-[0.9]">
            <span
              className="block font-playfair italic font-normal text-6xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
              style={{ letterSpacing: '-0.04em', animationDelay: '0.28s' }}
            >
              If you can think it,
            </span>
            <span
              className="block font-semibold text-6xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
              style={{ letterSpacing: '-0.05em', animationDelay: '0.46s' }}
            >
              we can{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-[#ffb37a] via-[#e8702a] to-[#e8702a] bg-clip-text text-transparent">
                  build it.
                </span>
              </span>
            </span>
          </h1>
          <p
            className="mt-7 max-w-lg text-lg leading-relaxed text-white/70 hero-anim hero-fade"
            style={{ animationDelay: '0.72s' }}
          >
            High-ROI software, automations, and internal tools — designed, built, and shipped for
            small businesses in fixed-price sprints.
          </p>
          <div
            className="mt-9 flex flex-col sm:flex-row items-start gap-4 hero-anim hero-fade"
            style={{ animationDelay: '0.88s' }}
          >
            <a
              href={BRAND.calLink}
              className="group inline-flex items-center gap-2 rounded-full bg-[#b1531a] px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-[#964918] hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30"
            >
              Book a Free Audit
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#builds"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
            >
              See what we&apos;ve built
            </a>
          </div>
        </div>
      </div>

      {/* Capability marquee — editorial motion strip along the bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/30 py-3 backdrop-blur-sm">
        <div className="hero-marquee">
          <div className="hero-marquee-track">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={i} className="hero-marquee-item">
                {item}
                <span className="text-[#e8702a]">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
