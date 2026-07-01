import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BRAND, NAV_LINKS } from '../lib/constants';

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

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      // Stay in light/transparent mode over the dark cinematic Overture; flip to
      // the solid light bar once the real (light) content reaches the top.
      const overture = document.getElementById('overture');
      if (overture) {
        setScrolled(overture.getBoundingClientRect().bottom <= 72);
      } else {
        setScrolled(window.scrollY > 40);
      }
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
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
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
