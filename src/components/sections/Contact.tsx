import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import Reveal from '../Reveal';
import { BRAND, FORM_ENDPOINT } from '../../lib/constants';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const reassurances = [
  "It's free — a 30-minute call, no pitch.",
  'We reply within one business day.',
  "You'll leave with a clear ROI opportunity map.",
];

function captureSource(): string {
  if (typeof window === 'undefined') return 'website';
  const params = new URLSearchParams(window.location.search);
  const utm = params.get('utm_source') || params.get('ref');
  if (utm) return utm;
  return document.referrer ? `referrer:${document.referrer}` : 'website';
}

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [usedMailto, setUsedMailto] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  // Move focus to the confirmation (and announce it) once the form succeeds.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  function validate(data: Record<string, string>): Record<string, string> {
    const errs: Record<string, string> = {};
    if (!data.name.trim()) errs.name = 'Please tell us your name.';
    if (!data.email.trim()) errs.email = 'We need an email to reply to.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'That email looks off — mind checking it?';
    if (!data.message.trim()) errs.message = 'A sentence on where work piles up helps us prep.';
    return errs;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting') return; // guard against double-submit
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot: real users never fill this hidden field. If a bot did, pretend
    // it worked and silently drop it.
    if (String(fd.get('company_website') || '').trim()) {
      setUsedMailto(false);
      setStatus('success');
      return;
    }

    const data = {
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      company: String(fd.get('company') || ''),
      message: String(fd.get('message') || ''),
      source: captureSource(),
    };

    const errs = validate(data);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      // Move focus to the first invalid field so keyboard/AT users know what failed.
      const firstInvalid = ['name', 'email', 'message'].find((k) => errs[k]);
      if (firstInvalid) (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        setUsedMailto(false);
      } else {
        // No backend configured — fall back to a prefilled email draft. There's
        // no reliable success signal for mailto, so the success copy stays honest.
        const subject = encodeURIComponent(`Audit request — ${data.company || data.name}`);
        const body = encodeURIComponent(
          `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company}\nSource: ${data.source}\n\nWhere work piles up:\n${data.message}`,
        );
        window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
        setUsedMailto(true);
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? `Something went wrong (${err.message}). Email us directly at ${BRAND.email} and we'll sort it.`
          : `Something went wrong. Email us directly at ${BRAND.email}.`,
      );
    }
  }

  const inputCls =
    'w-full rounded-xl border bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:border-[#b1531a]';
  const req = (
    <span className="text-[#b1531a]" aria-hidden="true">
      {' '}
      *
    </span>
  );

  return (
    <section id="contact" className="relative overflow-hidden bg-neutral-950 py-24 sm:py-32">
      {/* Warm glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-50 blur-3xl"
        style={{
          background: 'radial-gradient(closest-side, rgba(232,112,42,0.45), rgba(232,112,42,0))',
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        {/* Left — pitch */}
        <Reveal>
          <h2 className="text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-white">
            If you can think it,{' '}
            <span className="font-playfair italic font-medium text-[#e8702a]">we can build it</span>.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">
            Tell us where the work piles up. We'll map the highest-ROI automation in your business
            and show you exactly what we'd build.
          </p>
          <ul className="mt-8 space-y-3">
            {reassurances.map((r) => (
              <li key={r} className="flex items-start gap-3 text-sm text-white/85">
                <Check size={18} className="mt-0.5 shrink-0 text-[#e8702a]" />
                {r}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-white/60">
            Prefer email?{' '}
            <a
              href={`mailto:${BRAND.email}`}
              className="font-medium text-[#e8702a] transition-colors hover:text-[#f3884a]"
            >
              {BRAND.email}
            </a>
          </p>
        </Reveal>

        {/* Right — form card */}
        <Reveal delay={0.08}>
          <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-black/30 sm:p-8">
            {status === 'success' ? (
              <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="flex flex-col items-center py-10 text-center outline-none"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-[#b1531a]/10 text-[#b1531a]">
                  <Check size={28} />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-neutral-900">Request received</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-neutral-500">
                  {usedMailto ? (
                    <>
                      Your email draft should be open — hit send and we'll reply within one business
                      day. Didn't open?{' '}
                      <a href={`mailto:${BRAND.email}`} className="font-medium text-[#b1531a] underline">
                        Email us directly
                      </a>
                      .
                    </>
                  ) : (
                    "Thanks — we'll be in touch within one business day to book your free audit."
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFieldErrors({});
                    setStatus('idle');
                  }}
                  className="mt-6 text-sm font-medium text-[#b1531a] hover:text-[#964918]"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot — inert keeps it out of the a11y tree and unfocusable */}
                <div inert className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
                  <label>
                    Company website
                    <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">Book your free audit</h3>
                <p className="mt-1 text-sm text-neutral-500">No commitment. Takes 60 seconds.</p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-neutral-700">
                      Name{req}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      aria-required="true"
                      autoComplete="name"
                      placeholder="Jane Doe"
                      aria-invalid={!!fieldErrors.name}
                      aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                      className={`${inputCls} ${fieldErrors.name ? 'border-red-400' : 'border-neutral-200'}`}
                    />
                    {fieldErrors.name && (
                      <p id="name-error" role="alert" className="mt-1 text-xs text-red-600">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-neutral-700">
                      Email{req}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      aria-required="true"
                      autoComplete="email"
                      placeholder="jane@company.com"
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                      className={`${inputCls} ${fieldErrors.email ? 'border-red-400' : 'border-neutral-200'}`}
                    />
                    {fieldErrors.email && (
                      <p id="email-error" role="alert" className="mt-1 text-xs text-red-600">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-neutral-700">
                      Company <span className="font-normal text-neutral-400">(optional)</span>
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Acme Co."
                      className={`${inputCls} border-neutral-200`}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-neutral-700">
                      Where does the work pile up?{req}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      aria-required="true"
                      placeholder="The manual, repetitive stuff eating your team's time…"
                      aria-invalid={!!fieldErrors.message}
                      aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                      className={`${inputCls} resize-none ${fieldErrors.message ? 'border-red-400' : 'border-neutral-200'}`}
                    />
                    {fieldErrors.message && (
                      <p id="message-error" role="alert" className="mt-1 text-xs text-red-600">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>
                </div>

                {status === 'error' && (
                  <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700" role="alert">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#b1531a] px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-[#964918] hover:shadow-lg hover:shadow-[#e8702a]/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Book my free audit
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
                <p className="mt-3 text-center text-xs text-neutral-400">
                  Fields marked <span className="text-[#b1531a]">*</span> are required.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
