import { BRAND, NAV_LINKS } from '../../lib/constants';

const columns = [
  {
    title: 'What we build',
    links: [
      { label: 'Internal tools', href: '#builds' },
      { label: 'Workflow automations', href: '#builds' },
      { label: 'AI assistants', href: '#builds' },
      { label: 'Integrations', href: '#builds' },
    ],
  },
  {
    title: 'Company',
    links: NAV_LINKS,
  },
];

export default function Footer() {
  const year = 2026;
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-white">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 48 28"
                  fill="none"
                  stroke="#0a0a0a"
                  strokeWidth="5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M24 14c-3-5-6.5-7.5-10.5-7.5a7.5 7.5 0 1 0 0 15C17.5 21.5 21 19 24 14c3-5 6.5-7.5 10.5-7.5a7.5 7.5 0 1 1 0 15C30.5 21.5 27 19 24 14Z" />
                </svg>
              </span>
              <span className="text-2xl font-playfair italic">{BRAND.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {BRAND.tagline} High-ROI software, automations, and internal tools for small
              businesses.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label + link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white">Get in touch</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Tell us where the work piles up — we'll map the fastest win.
            </p>
            <a
              href={`mailto:${BRAND.email}`}
              className="mt-3 inline-block text-sm font-medium text-[#e8702a] transition-colors hover:text-[#f3884a]"
            >
              {BRAND.email}
            </a>
            <div className="mt-5">
              <a
                href={BRAND.calLink}
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-white/90"
              >
                Book a call
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/60 sm:flex-row">
          <p>
            © {year} {BRAND.name}. All rights reserved.
          </p>
          <p>Designed &amp; built in-house — the way we build for you.</p>
        </div>
      </div>
    </footer>
  );
}
