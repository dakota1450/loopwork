import { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { BRAND, NAV_LINKS } from '../lib/constants';

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

/* ------------------------------------------------------------------ */
/* Work deck — real project pieces, floating in 3D                     */
/* ------------------------------------------------------------------ */
const B = import.meta.env.BASE_URL;

type Piece = {
  id: string;
  kind: 'video' | 'image';
  src: string;
  poster?: string;
  frame: 'browser' | 'phone' | 'soft';
  brand: string;
  tag: string;
  autoplay?: boolean;
  // desktop placement inside the 600x560 deck canvas
  style: React.CSSProperties;
  depth: number;
  rot: number;
  tz: number;
  delay: number;
  float: number;
  z: number;
};

const PIECES: Piece[] = [
  {
    id: 'boulder',
    kind: 'image',
    src: `${B}work/boulder-dashboard.png`,
    frame: 'browser',
    brand: 'Boulder Bibs',
    tag: 'Production dashboard',
    style: { left: 0, top: 64, width: 384, height: 256 },
    depth: 44,
    rot: -4,
    tz: -30,
    delay: 0,
    float: 11,
    z: 1,
  },
  {
    id: 'oasis',
    kind: 'video',
    src: `${B}work/oasis.mp4`,
    poster: `${B}work/oasis-poster.jpg`,
    frame: 'soft',
    brand: 'Oasis',
    tag: 'Ambient AI workspace',
    style: { left: 366, top: 0, width: 234, height: 150 },
    depth: 30,
    rot: 6,
    tz: 12,
    delay: 1.2,
    float: 10,
    z: 2,
  },
  {
    id: 'bibsite-company',
    kind: 'image',
    src: `${B}work/bibsite-company.png`,
    frame: 'browser',
    brand: 'BibSite',
    tag: 'Team order dashboard',
    style: { left: 196, top: 258, width: 384, height: 256 },
    depth: 18,
    rot: 3,
    tz: 44,
    delay: 0.8,
    float: 9,
    z: 3,
  },
  {
    id: 'bibsite-client',
    kind: 'video',
    src: `${B}work/bibsite-client.mp4`,
    frame: 'phone',
    brand: 'BibSite',
    tag: 'Race registration — client',
    autoplay: true,
    style: { left: 26, top: 168, width: 156, height: 330 },
    depth: 12,
    rot: -3,
    tz: 74,
    delay: 0.4,
    float: 8,
    z: 4,
  },
];

function WorkPanel({ piece, reduced }: { piece: Piece; reduced: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => {
    const v = videoRef.current;
    if (v) v.play().catch(() => {});
  };
  const pause = () => {
    const v = videoRef.current;
    if (v && !piece.autoplay) {
      v.pause();
    }
  };

  const vars = {
    ['--depth' as string]: piece.depth,
    ['--rot' as string]: `${piece.rot}deg`,
    ['--tz' as string]: `${piece.tz}px`,
    ['--delay' as string]: `${piece.delay}s`,
    ['--float' as string]: `${piece.float}s`,
  } as React.CSSProperties;

  return (
    <figure
      className="work-panel"
      style={{ ...piece.style, ...vars, zIndex: piece.z }}
      onMouseEnter={play}
      onMouseLeave={pause}
    >
      <div className="panel-float" style={{ height: '100%' }}>
        <div className="panel-tilt" style={{ height: '100%' }}>
          {piece.frame === 'browser' && (
            <div className="panel-chrome">
              <span className="dot" style={{ background: '#ff5f57' }} />
              <span className="dot" style={{ background: '#febc2e' }} />
              <span className="dot" style={{ background: '#28c840' }} />
              <span className="bar" />
            </div>
          )}
          <div
            className="panel-screen"
            style={{ height: piece.frame === 'browser' ? 'calc(100% - 26px)' : '100%' }}
          >
            {piece.kind === 'video' ? (
              <video
                ref={videoRef}
                src={piece.src}
                poster={piece.poster}
                muted
                loop
                playsInline
                autoPlay={piece.autoplay && !reduced}
                preload={piece.autoplay ? 'auto' : 'none'}
              />
            ) : (
              <img src={piece.src} alt={`${piece.brand} — ${piece.tag}`} loading="lazy" />
            )}
            <figcaption className="panel-label">
              <span className="panel-live" />
              <span className="text-xs font-medium">
                <span className="text-white">{piece.brand}</span>
                <span className="text-white/55"> · {piece.tag}</span>
              </span>
            </figcaption>
          </div>
        </div>
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
export default function Hero() {
  const deckRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const runningRef = useRef(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduced(prefersReduced);
    const noHover = window.matchMedia('(hover: none)').matches;
    const deck = deckRef.current;
    if (!deck || prefersReduced || noHover) return;

    const set = (x: number, y: number) => {
      deck.style.setProperty('--mx', x.toFixed(3));
      deck.style.setProperty('--my', y.toFixed(3));
    };

    const tick = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.08;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.08;
      set(smooth.current.x, smooth.current.y);
      const dx = mouse.current.x - smooth.current.x;
      const dy = mouse.current.y - smooth.current.y;
      if (dx * dx + dy * dy < 0.00002) {
        set(mouse.current.x, mouse.current.y);
        runningRef.current = false;
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    const start = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      rafRef.current = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      // normalized -1..1 relative to viewport center
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      start();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
    };
  }, []);

  return (
    <section
      id="top"
      aria-label="Loopwork — if you can think it, we can build it"
      className="relative w-full overflow-hidden bg-[#08080b]"
      style={{ minHeight: '100dvh' }}
    >
      {/* Backdrop: dark with a warm brand glow + faint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(1100px 700px at 72% 28%, rgba(232,112,42,0.18), transparent 60%), radial-gradient(900px 600px at 10% 90%, rgba(59,130,246,0.10), transparent 55%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
          maskImage: 'radial-gradient(circle at 60% 40%, black, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 60% 40%, black, transparent 75%)',
        }}
      />

      <Nav />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col items-center gap-10 px-6 pt-28 pb-16 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-6 lg:pt-20">
        {/* Left — copy */}
        <div className="max-w-xl text-center lg:text-left">
          <span
            className="hero-anim hero-fade inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/75 backdrop-blur"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="panel-live" />
            Real software, shipped for real businesses
          </span>
          <h1 className="mt-6 text-white leading-[0.92]">
            <span
              className="block font-playfair italic font-normal text-5xl sm:text-6xl md:text-7xl hero-anim hero-reveal"
              style={{ letterSpacing: '-0.04em', animationDelay: '0.25s' }}
            >
              Think it.
            </span>
            <span
              className="block font-semibold text-5xl sm:text-6xl md:text-7xl -mt-1 hero-anim hero-reveal"
              style={{ letterSpacing: '-0.06em', animationDelay: '0.42s' }}
            >
              We build it.
            </span>
          </h1>
          <p
            className="mx-auto lg:mx-0 mt-6 max-w-md text-base sm:text-lg leading-relaxed text-white/70 hero-anim hero-fade"
            style={{ animationDelay: '0.7s' }}
          >
            High-ROI software, automations, and internal tools for small businesses — from
            customer-facing sites to the dashboards that run the back office.{' '}
            <span className="text-white/90">Hover the work to see it live.</span>
          </p>
          <div
            className="mt-8 flex flex-col sm:flex-row items-center lg:items-start gap-4 hero-anim hero-fade"
            style={{ animationDelay: '0.85s' }}
          >
            <a
              href={BRAND.calLink}
              className="group inline-flex items-center gap-2 rounded-full bg-[#b1531a] px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-[#964918] hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30"
            >
              Book a Free Audit
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <span className="font-semibold text-white/75">Featured builds:</span>
              BibSite · Boulder Bibs · Oasis
            </div>
          </div>
        </div>

        {/* Right — interactive work deck */}
        <div
          className="work-deck relative flex w-full items-center justify-center lg:justify-end hero-anim hero-fade"
          style={{ animationDelay: '0.55s' }}
        >
          <div ref={deckRef} className="deck-inner">
            {PIECES.map((p) => (
              <WorkPanel key={p.id} piece={p} reduced={reduced} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
