import { useEffect, useRef, useState } from 'react';

/**
 * Motion toolkit for the Loopwork site.
 *
 * One shared, rAF-throttled scroll loop drives every scroll-linked effect
 * (parallax, hero fade, progress bar) so we never stack N scroll listeners.
 * Everything degrades to "no motion" under prefers-reduced-motion.
 */

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ */
/* Math helpers + shared "cinematic" scroll progress                   */
/* ------------------------------------------------------------------ */
export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Ease-in-out cubic. */
export const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Map v from [a,b] onto 0..1 (clamped). */
export const track = (v: number, a: number, b: number) => clamp01((v - a) / (b - a || 1));

/**
 * A triangular 0→1→0 window: ramps up over [inStart,inEnd], holds at 1, ramps
 * down over [outStart,outEnd]. Used to fade cinematic scenes in and out as the
 * pinned Overture is scrubbed. Omit the out-range for a scene that stays.
 */
export function sceneOpacity(
  p: number,
  inStart: number,
  inEnd: number,
  outStart = 2,
  outEnd = 3,
) {
  return Math.min(track(p, inStart, inEnd), 1 - track(p, outStart, outEnd));
}

/**
 * Shared cinematic-scroll progress (0..1), written by the pinned Overture and
 * read every frame by the hero canvas so the infinity loop "zooms" in lockstep
 * with the scroll. A plain mutable object keeps the canvas + React decoupled.
 */
export const cine = { p: 0 };

export const isTouch = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(hover: none)').matches;

/* ------------------------------------------------------------------ */
/* Shared scroll engine                                                */
/* ------------------------------------------------------------------ */
type ScrollCb = (scrollY: number, viewportH: number) => void;
const subscribers = new Set<ScrollCb>();
let scrollY = 0;
let viewportH = 0;
let ticking = false;
let started = false;

function flush() {
  ticking = false;
  for (const cb of subscribers) cb(scrollY, viewportH);
}
function requestFlush() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(flush);
  }
}
function onScroll() {
  scrollY = window.scrollY;
  requestFlush();
}
function onResize() {
  viewportH = window.innerHeight;
  scrollY = window.scrollY;
  requestFlush();
}
function start() {
  if (started) return;
  started = true;
  viewportH = window.innerHeight;
  scrollY = window.scrollY;
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
}

/** Subscribe to the shared scroll loop. `cb` gets (scrollY, viewportHeight). */
export function useScrollEffect(cb: ScrollCb, enabled = true) {
  const cbRef = useRef(cb);
  cbRef.current = cb;
  useEffect(() => {
    if (!enabled) return;
    start();
    const wrapped: ScrollCb = (y, h) => cbRef.current(y, h);
    subscribers.add(wrapped);
    wrapped(scrollY, viewportH); // prime immediately
    return () => {
      subscribers.delete(wrapped);
    };
  }, [enabled]);
}

/**
 * Parallax: translate an element on the Y axis based on how far its center is
 * from the viewport center. Positive `speed` drifts it upward as you scroll.
 */
export function useParallax<T extends HTMLElement>(speed = 0.12) {
  const ref = useRef<T>(null);
  const enabled = !prefersReducedMotion();
  useScrollEffect((_y, vh) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const delta = (center - vh / 2) * -speed;
    el.style.transform = `translate3d(0, ${delta.toFixed(2)}px, 0)`;
  }, enabled);
  return ref;
}

/* ------------------------------------------------------------------ */
/* In-view detection (for reveals + gated animations)                  */
/* ------------------------------------------------------------------ */
export function useInView<T extends HTMLElement>(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const once = options?.once ?? true;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? '0px 0px -8% 0px',
      },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [once]);

  return [ref, inView] as const;
}
