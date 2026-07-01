import { useEffect, useRef } from 'react';

/**
 * Interactive hero: embers flow along an infinity (lemniscate) path — the
 * Loopwork loop, alive. The cursor repels nearby particles, so moving the mouse
 * "parts" the loop and it reflows. Additive glow + motion-blur trails.
 * Reduced-motion renders a static loop. Sizing is driven by a ResizeObserver
 * so it works regardless of when layout settles.
 */
export default function HeroLoopCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let scale = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    const lem = (t: number) => {
      const s = Math.sin(t);
      const c = Math.cos(t);
      const d = 1 + s * s;
      return { x: c / d, y: (s * c) / d };
    };

    type P = { t: number; speed: number; off: number; size: number; hue: number; ox: number; oy: number };
    let particles: P[] = [];

    const rebuild = (rw: number, rh: number) => {
      w = rw;
      h = rh;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w > 900 ? w * 0.63 : w * 0.5;
      cy = w > 900 ? h * 0.46 : h * 0.4;
      scale = Math.min(w * 0.6, h * 1.25) * 0.72;

      const count = Math.max(420, Math.min(1300, Math.floor((w * h) / 1500)));
      particles = new Array(count).fill(0).map(() => ({
        t: Math.random() * Math.PI * 2,
        speed: 0.0016 + Math.random() * 0.004,
        off: (Math.random() - 0.5) * 0.07,
        size: 0.5 + Math.random() * 1.9,
        hue: Math.random(),
        ox: 0,
        oy: 0,
      }));
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#08080b';
      ctx.fillRect(0, 0, w, h);
    };

    const draw = () => {
      if (w === 0) {
        const r = canvas.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) rebuild(r.width, r.height);
        else return;
      }
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(8,8,11,0.20)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      const R = 155;
      for (const p of particles) {
        if (!reduced) p.t += p.speed;
        const b = lem(p.t);
        let px = cx + (b.x + b.x * p.off) * scale;
        let py = cy + (b.y + b.y * p.off) * scale;

        if (mouse.active) {
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / R) * 4.2;
            p.ox += (dx / d) * f;
            p.oy += (dy / d) * f;
          }
        }
        p.ox *= 0.9;
        p.oy *= 0.9;
        px += p.ox;
        py += p.oy;

        const g = 120 + Math.round(95 * p.hue);
        const bl = 40 + Math.round(55 * p.hue);
        ctx.fillStyle = `rgba(255,${g},${bl},0.55)`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf = 0;
    let running = true;
    const loop = () => {
      draw();
      if (running && !reduced) raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect;
      if (cr.width > 0 && cr.height > 0 && (Math.round(cr.width) !== Math.round(w) || Math.round(cr.height) !== Math.round(h))) {
        rebuild(cr.width, cr.height);
        if (reduced) {
          for (let i = 0; i < 60; i++) draw();
        }
      }
    });
    ro.observe(canvas);

    // Guarantee an initial sized render even if rAF is throttled (background tab).
    [40, 160, 400, 900].forEach((ms) => setTimeout(() => draw(), ms));

    if (!reduced) {
      raf = requestAnimationFrame(loop);
    } else {
      const tryStatic = () => {
        const r = canvas.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          rebuild(r.width, r.height);
          for (let i = 0; i < 60; i++) draw();
        } else {
          requestAnimationFrame(tryStatic);
        }
      };
      requestAnimationFrame(tryStatic);
    }

    const toLocal = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVis = () => {
      running = !document.hidden;
      if (running && !reduced) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      }
    };

    window.addEventListener('pointermove', toLocal, { passive: true });
    window.addEventListener('pointerdown', toLocal, { passive: true });
    window.addEventListener('blur', onLeave);
    document.addEventListener('visibilitychange', onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', toLocal);
      window.removeEventListener('pointerdown', toLocal);
      window.removeEventListener('blur', onLeave);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
