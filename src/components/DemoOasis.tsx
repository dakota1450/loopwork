import { useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';

const PAIRS = [
  {
    p: 'Plan my day around 3 deep-work blocks',
    r: 'Morning (9–11): ship the checkout flow. Midday (1–2:30): review two PRs and reply to Maria. Late (3:30–5): sketch dashboard v2. I moved 4 shallow tasks to tomorrow and muted notifications for each block.',
  },
  {
    p: 'Summarize the Boulder Bibs call',
    r: 'They want live print-queue status and auto-generated shipping labels, budget ~$4.5k, live before race season. Next step: send the sprint proposal + a Cal link. I saved 3 action items to your list.',
  },
  {
    p: 'Draft a warm reply to the new lead',
    r: '“Hi Jordan — thanks for reaching out! Love what you’re building at Trailhead. I think we can automate intake + invoicing in one sprint. Grab any time here and I’ll bring a quick plan.” Want me to send it?',
  },
];

export default function DemoOasis() {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState('');
  const [typing, setTyping] = useState(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const full = PAIRS[idx].r;
    if (reduced) {
      setShown(full);
      setTyping(false);
      return;
    }
    setShown('');
    setTyping(true);
    let i = 0;
    interval.current = setInterval(() => {
      i += 2;
      setShown(full.slice(0, i));
      if (i >= full.length) {
        if (interval.current) clearInterval(interval.current);
        setTyping(false);
        const t = setTimeout(() => setIdx((v) => (v + 1) % PAIRS.length), 3600);
        timers.current.push(t);
      }
    }, 16);
    return () => {
      if (interval.current) clearInterval(interval.current);
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [idx]);

  return (
    <div
      className="overflow-hidden rounded-3xl border border-white/10 shadow-xl"
      style={{
        background:
          'radial-gradient(120% 100% at 80% 0%, #0e3547 0%, #0a2130 45%, #071620 100%)',
      }}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <span className="flex items-center gap-2 text-sm font-medium text-white/90">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7dd3c0" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
            <path d="M4.5 15h15l-2.6 4.2H7.1z" />
            <path d="M12 3.4v11.6M12 6l6.4 9H12z" />
          </svg>
          Oasis
          <span className="text-white/40">— a calm home base for building with AI</span>
        </span>
        <span className="hidden items-center gap-1.5 text-xs text-white/45 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-300" /> calm mode
        </span>
      </div>

      <div className="px-5 py-6 sm:px-8 sm:py-8">
        {/* user prompt */}
        <div className="flex justify-end">
          <div className="rounded-2xl rounded-br-sm bg-white/10 px-4 py-2.5 text-sm text-white/85 backdrop-blur">
            {PAIRS[idx].p}
          </div>
        </div>
        {/* assistant */}
        <div className="mt-4 flex gap-3">
          <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal-400/15 text-teal-300">
            <Sparkles size={15} />
          </span>
          <p className="max-w-xl text-[15px] leading-relaxed text-white/90">
            {shown}
            {typing && <span className="oasis-caret">▍</span>}
          </p>
        </div>

        {/* prompt bar + chips */}
        <div className="mt-7 rounded-2xl border border-white/12 bg-white/[0.04] p-2">
          <div className="flex items-center gap-2">
            <input
              readOnly
              value=""
              placeholder="Ask Oasis anything…"
              className="flex-1 bg-transparent px-3 py-2 text-sm text-white/80 placeholder-white/35 outline-none"
            />
            <span className="grid h-8 w-8 place-items-center rounded-full bg-teal-400 text-teal-950">
              <ArrowUp size={16} />
            </span>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {PAIRS.map((pr, i) => (
            <button
              key={pr.p}
              type="button"
              onClick={() => setIdx(i)}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                i === idx
                  ? 'border-teal-300/40 bg-teal-300/10 text-teal-100'
                  : 'border-white/12 text-white/60 hover:bg-white/5'
              }`}
            >
              {pr.p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
