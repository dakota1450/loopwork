import { forwardRef, useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { BG_IMAGE_1, BG_IMAGE_2, SPOTLIGHT_R, BRAND, NAV_LINKS } from '../lib/constants';

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
        {/* Custom "loop" mark — a continuous infinity loop */}
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

  // Switch to a solid light bar once we leave the dark hero, and track which
  // section is currently in view to highlight the matching nav link.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const offset = 120; // clear the fixed nav
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

  // While the mobile menu is open, close it on Escape, outside click, or scroll.
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
      {/* Left — logo + wordmark */}
      <LogoMark scrolled={scrolled} />

      {/* Center — glass pill (desktop) */}
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

      {/* Right — primary CTA (desktop) */}
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

      {/* Mobile — hamburger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`md:hidden p-1 transition-colors ${scrolled ? 'text-neutral-900' : 'text-white'}`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile — dropdown menu */}
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
/* Reveal layer — the "built" image, unmasked only under the spotlight */
/* ------------------------------------------------------------------ */
// A CSS radial-gradient mask (positioned via the --spot-x / --spot-y custom
// properties) — resolution-independent and GPU-composited, so there is no
// per-frame canvas encoding. Defaults off-screen so only the base shows on load.
const SPOTLIGHT_MASK =
  `radial-gradient(circle ${SPOTLIGHT_R}px at var(--spot-x, -1000px) var(--spot-y, -1000px),` +
  ' #000 0%, #000 40%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.12) 88%, rgba(0,0,0,0) 100%)';

const RevealLayer = forwardRef<HTMLDivElement, { image: string }>(function RevealLayer(
  { image },
  ref,
) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
      style={{
        backgroundImage: `url(${image})`,
        maskImage: SPOTLIGHT_MASK,
        WebkitMaskImage: SPOTLIGHT_MASK,
      }}
    />
  );
});

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
export default function Hero() {
  const revealRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const smooth = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef(0);
  const runningRef = useRef(false);
  const seenRef = useRef(false);
  const visibleRef = useRef(true);

  useEffect(() => {
    const reveal = revealRef.current;
    if (!reveal) return;

    const setSpot = (x: number, y: number) => {
      reveal.style.setProperty('--spot-x', `${x}px`);
      reveal.style.setProperty('--spot-y', `${y}px`);
    };

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const noHover = window.matchMedia('(hover: none)').matches;

    // Touch / no-hover (and reduced-motion) devices get a static centered reveal,
    // so the "built" payoff is still visible without a tracking cursor.
    if (noHover || prefersReduced) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight * 0.42;
      mouse.current = { x: cx, y: cy };
      smooth.current = { x: cx, y: cy };
      seenRef.current = true;
      setSpot(cx, cy);
    }

    // Reduced motion: keep the static reveal, no pointer tracking / animation.
    if (prefersReduced) return;

    // Pause the work entirely while the hero is scrolled out of view.
    const io = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    const section = reveal.closest('section');
    if (section) io.observe(section);

    // Self-stopping smoothing loop: trails the cursor, then halts when settled.
    const tick = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      setSpot(smooth.current.x, smooth.current.y);

      const dx = mouse.current.x - smooth.current.x;
      const dy = mouse.current.y - smooth.current.y;
      if (dx * dx + dy * dy < 0.25) {
        smooth.current = { x: mouse.current.x, y: mouse.current.y };
        setSpot(smooth.current.x, smooth.current.y);
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
      if (!visibleRef.current) return;
      if (!seenRef.current) {
        // Snap to the cursor on the first move so the spotlight appears under it
        // instead of sweeping in from the corner.
        seenRef.current = true;
        smooth.current = { x: e.clientX, y: e.clientY };
        setSpot(e.clientX, e.clientY);
      }
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      start();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
      io.disconnect();
    };
  }, []);

  return (
    <section
      id="top"
      aria-label="Loopwork — if you can think it, we can build it"
      className="relative w-full overflow-hidden h-screen bg-black"
      style={{ height: '100dvh' }}
    >
      {/* 1. Base image (blueprint / idea) */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom"
        style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
      />

      {/* 2. Reveal layer (built / product) */}
      <RevealLayer ref={revealRef} image={BG_IMAGE_2} />

      {/* Nav */}
      <Nav />

      {/* 3. Heading */}
      <div className="absolute top-[14%] left-0 right-0 z-50 flex flex-col items-center text-center px-5 pointer-events-none">
        <h1 className="text-white leading-[0.95]">
          <span
            className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
            style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
          >
            Think it.
          </span>
          <span
            className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
            style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
          >
            We build it.
          </span>
        </h1>
      </div>

      {/* 4. Bottom-left paragraph */}
      <div
        className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px] z-50 hero-anim hero-fade"
        style={{ animationDelay: '0.7s' }}
      >
        <p className="text-sm text-white/80 leading-relaxed">
          We design and build custom software, automations, and internal tools for small
          businesses — turning the busywork that piles up into systems that quietly run
          themselves.
        </p>
      </div>

      {/* 5. Bottom-right block */}
      <div
        className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] z-50 flex flex-col items-start gap-4 sm:gap-5 hero-anim hero-fade"
        style={{ animationDelay: '0.85s' }}
      >
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
          Book a free audit and we'll map the highest-ROI automation hiding in your business —
          then ship it in a fixed-price sprint.
        </p>
        <a
          href={BRAND.calLink}
          className="group inline-flex items-center gap-2 bg-[#b1531a] hover:bg-[#964918] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30"
        >
          Book a Free Audit
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  );
}
