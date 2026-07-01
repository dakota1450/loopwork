import { useEffect, useRef, useState } from 'react';
import { Plus, ShoppingCart, Check, ArrowRight } from 'lucide-react';

type Order = { id: string; client: string; event: string; qty: number; fresh: boolean };

const EVENTS = [
  { name: 'Boulder Marathon', price: 85 },
  { name: 'Flatiron Half', price: 65 },
  { name: 'Front Range 10K', price: 45 },
  { name: 'Summit Trail Run', price: 70 },
];
const CLIENTS = ['Rocky Mtn Races', 'Front Range RC', 'Summit Events', 'Flatiron Series', 'Boulder AC'];

const seedOrders: Order[] = [
  { id: 'BB-0042', client: 'Summit Events', event: 'Summit Trail Run', qty: 220, fresh: false },
  { id: 'BB-0041', client: 'Flatiron Series', event: 'Flatiron Half', qty: 180, fresh: false },
  { id: 'BB-0040', client: 'Boulder AC', event: 'Spring Sprint', qty: 95, fresh: false },
];

export default function DemoBibsite() {
  const [evIdx, setEvIdx] = useState(0);
  const [cart, setCart] = useState(0);
  const [flying, setFlying] = useState(false);
  const [orders, setOrders] = useState<Order[]>(seedOrders);
  const [today, setToday] = useState(9);
  const [toast, setToast] = useState<string | null>(null);
  const seq = useRef(43);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const flyingRef = useRef(false);

  const ev = EVENTS[evIdx];

  const after = (ms: number, fn: () => void) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
    return t;
  };

  const place = () => {
    if (flyingRef.current) return;
    if (cart === 0) setCart(1);
    flyingRef.current = true;
    setFlying(true);
    const id = `BB-${String(++seq.current).padStart(4, '0')}`;
    const client = CLIENTS[seq.current % CLIENTS.length];
    const eventName = EVENTS[seq.current % EVENTS.length].name;
    const qty = 40 + ((seq.current * 37) % 260);
    after(1150, () => {
      setFlying(false);
      flyingRef.current = false;
      setCart(0);
      setToday((n) => n + 1);
      setOrders((prev) => [{ id, client, event: eventName, qty, fresh: true }, ...prev].slice(0, 6));
      setToast(`New order · ${id}`);
      after(600, () => setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, fresh: false } : o))));
      after(2600, () => setToast(null));
      after(300, () => setEvIdx((i) => (i + 1) % EVENTS.length));
    });
  };

  // Self-running demo (paused for reduced motion).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let alive = true;
    const cycle = () => {
      if (!alive) return;
      setCart(1);
      after(1200, () => {
        place();
        after(4200, cycle);
      });
    };
    after(1400, cycle);
    return () => {
      alive = false;
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-b from-neutral-50 to-white">
      <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-3">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
          BibSite — storefront → operations, in real time
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500">
          <span className="hero-live" /> live simulation
        </span>
      </div>

      <div className="grid items-stretch gap-0 lg:grid-cols-[1fr_88px_1.5fr]">
        {/* Storefront */}
        <div className="relative p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#b1531a]">Customer sees</p>
          <div className="mt-3 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="h-24 rounded-xl bg-gradient-to-br from-[#e8702a] to-[#8a3d12]" />
            <h4 className="mt-3 font-semibold text-neutral-900">{ev.name} 2026</h4>
            <p className="text-sm text-neutral-500">Sat · Boulder, CO · ${ev.price}/bib</p>
            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCart((c) => c + 1)}
                className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
              >
                <Plus size={15} /> Add bib
              </button>
              <span className="inline-flex items-center gap-1.5 text-sm text-neutral-500">
                <ShoppingCart size={15} /> {cart}
              </span>
              <button
                type="button"
                disabled={cart === 0 || flying}
                onClick={place}
                className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[#b1531a] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#964918] disabled:opacity-40"
              >
                Checkout <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Wire + flying packet */}
        <div className="relative hidden lg:block">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#e8702a]/50 to-transparent" />
          <div
            className={`absolute top-1/2 -translate-y-1/2 rounded-full bg-[#e8702a] px-2 py-0.5 text-[10px] font-semibold text-white shadow-lg shadow-[#e8702a]/40 transition-all duration-1000 ease-in-out ${
              flying ? 'left-full opacity-100' : 'left-0 opacity-0'
            }`}
            style={{ transitionProperty: 'left, opacity' }}
          >
            order
          </div>
        </div>

        {/* Dashboard */}
        <div className="relative border-t border-neutral-200 p-6 lg:border-l lg:border-t-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#b1531a]">Your team sees — instantly</p>
          <div className="mt-3 rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div className="flex items-center gap-4 border-b border-neutral-100 px-4 py-3">
              <div>
                <div className="text-2xl font-semibold tabular-nums text-neutral-900">{today}</div>
                <div className="text-[11px] text-neutral-500">Orders today</div>
              </div>
              <div className="ml-auto rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                Pipeline synced
              </div>
            </div>
            <div className="max-h-[230px] overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wide text-neutral-400">
                    <th className="px-4 py-2 font-medium">Order</th>
                    <th className="px-4 py-2 font-medium">Client</th>
                    <th className="hidden px-4 py-2 font-medium sm:table-cell">Event</th>
                    <th className="px-4 py-2 font-medium">Bibs</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr
                      key={o.id}
                      className={`border-t border-neutral-100 ${o.fresh ? 'demo-row-new' : ''}`}
                    >
                      <td className="px-4 py-2.5 font-medium text-neutral-900">
                        {o.id}
                        {o.fresh && (
                          <span className="ml-2 rounded-full bg-[#e8702a] px-1.5 py-0.5 text-[9px] font-bold text-white">
                            NEW
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-neutral-600">{o.client}</td>
                      <td className="hidden px-4 py-2.5 text-neutral-600 sm:table-cell">{o.event}</td>
                      <td className="px-4 py-2.5 tabular-nums text-neutral-600">{o.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {toast && (
            <div className="demo-toast absolute bottom-4 right-4 flex items-center gap-2 rounded-xl bg-neutral-900 px-3.5 py-2.5 text-sm text-white shadow-xl">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-green-500">
                <Check size={13} />
              </span>
              {toast}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
