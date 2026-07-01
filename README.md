# Loopwork — landing page

A full-screen, dark-themed marketing site for **Loopwork**, an agency that builds high-ROI
software, automations, and internal tools for small businesses. Tagline: _“If you can think it,
we can build it.”_

The signature feature is an **interactive hero**: a cursor-following spotlight reveals a second
image through a soft circular mask. The base layer is a glowing blue **blueprint** (the idea); the
revealed layer is the warm, **built** product — so moving your cursor literally “builds” the idea
into reality.

## Stack

- **React + TypeScript + Vite**
- **Tailwind CSS v3**
- **lucide-react** for icons
- Fonts: **Inter** (body/UI) + **Playfair Display, italic** (display accents), via Google Fonts

## Hero imagery

The two hero images were generated with [Higgsfield](https://higgsfield.ai) (Nano Banana 2) and live
in [`public/`](public):

- `hero-base.webp` — the blue blueprint / “idea” state (shown by default)
- `hero-reveal.webp` — the warm, built “product” state (revealed under the cursor)

They were generated as an image-to-image pair so the composition aligns, making the spotlight look
like the same scene transforming. To rebrand, swap those two files (or point
`BG_IMAGE_1` / `BG_IMAGE_2` in [`src/lib/constants.ts`](src/lib/constants.ts) at new URLs).

## How the reveal works

- A hidden `<canvas>` is sized to the viewport. On each cursor move it paints a soft radial gradient
  (radius `SPOTLIGHT_R = 260`) centered on the cursor.
- `canvas.toDataURL()` becomes a CSS `mask-image` on the reveal `<div>`, so the built image is only
  visible inside the glowing circle.
- The cursor position is eased with a self-stopping `requestAnimationFrame` loop
  (`smooth += (mouse − smooth) * 0.1`) that halts when the cursor settles, so the page goes idle.

All tunables (image paths, spotlight radius, brand copy, nav links) live in
[`src/lib/constants.ts`](src/lib/constants.ts).

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build & preview

```bash
npm run build    # type-checks (tsc -b) then builds to dist/
npm run preview  # serve the production build locally
```

## Deploy

Static SPA — deploy the `dist/` folder anywhere (Vercel, Netlify, Cloudflare Pages, S3, etc.).
For Vercel, the framework preset “Vite” works out of the box (build: `npm run build`, output: `dist`).

## Lead capture

The closing **Contact** section ([Contact.tsx](src/components/sections/Contact.tsx)) is a real
audit/lead form: name, email, company, and a "where does the work pile up?" textarea, with inline
validation, loading/success/error states, a honeypot for spam, and UTM/referrer source capture.

By default it has **no backend** — it falls back to opening a prefilled `mailto:` to `BRAND.email`,
so it works the moment you deploy. To capture leads programmatically, set `FORM_ENDPOINT` in
[constants.ts](src/lib/constants.ts) to a Formspree URL, a serverless function, or your own
`/api/lead` route (this is Phase 0, tickets 0.2/0.3 of the build handoff). The form POSTs JSON:
`{ name, email, company, message, source }`.

## SEO & sharing

- Open Graph + Twitter Card tags with a custom Higgsfield-generated share image
  ([og.webp](public/og.webp)) — a "blueprint → built" banner.
- `ProfessionalService` JSON-LD structured data and a `robots.txt`.
- When you deploy, change the relative `og:image` / structured-data URLs to absolute
  (`https://yourdomain.com/...`).

## Accessibility & performance

- Respects `prefers-reduced-motion` (on-load, scroll-in, and the cursor spotlight are all disabled).
- The spotlight is a GPU-composited CSS mask (no per-frame canvas encoding) and works with mouse,
  pen, and touch; touch devices get a static centered reveal.
- Optimized `.webp` art (~120 KB each); base hero image is preloaded for fast LCP.
- Semantic `<main>` + skip link, visible focus rings, AA-contrast text, keyboard-operable nav/menu,
  and a native `<details>` FAQ accordion.

## Customizing

| Want to change…        | Edit…                                                |
| ---------------------- | ---------------------------------------------------- |
| Brand name, email, CTA | `src/lib/constants.ts` (`BRAND`)                     |
| Nav links              | `src/lib/constants.ts` (`NAV_LINKS`)                 |
| Hero images / radius   | `src/lib/constants.ts` (`BG_IMAGE_*`, `SPOTLIGHT_R`) |
| Lead form endpoint     | `src/lib/constants.ts` (`FORM_ENDPOINT`)             |
| Hero copy & layout     | `src/components/Hero.tsx`                             |
| Sections               | `src/components/sections/*.tsx`                       |
| Accent color `#e8702a` | search-and-replace across `src/`                     |

## Booking integration

The CTAs point at `#contact` by default. To wire up real booking, set `BRAND.calLink` in
`src/lib/constants.ts` to your Cal.com / Calendly URL.
