// Brand + asset constants for the Loopwork landing page.
//
// The two hero images were generated with Higgsfield (Nano Banana 2) and saved
// to /public. BG_IMAGE_1 is the dark blue "blueprint" (idea) state shown by
// default; BG_IMAGE_2 is the warm, built "product" state revealed under the
// cursor spotlight. Swap these files (or point to remote URLs) to rebrand.

// Prefixed with Vite's BASE_URL so they resolve under the GitHub Pages subpath
// (/loopwork/) in production and at root in dev.
export const BG_IMAGE_1 = `${import.meta.env.BASE_URL}hero-base.webp`; // blueprint / idea
export const BG_IMAGE_2 = `${import.meta.env.BASE_URL}hero-reveal.webp`; // built / product

// Radius (px) of the cursor-following spotlight that reveals BG_IMAGE_2.
export const SPOTLIGHT_R = 260;

export const BRAND = {
  name: 'Loopwork',
  tagline: 'If you can think it, we can build it.',
  email: 'pilkingtondakota@gmail.com',
  calLink: '#contact', // swap for a Cal.com / Calendly URL when ready
};

// Where the audit/lead form POSTs. Leave empty to fall back to a prefilled
// mailto: to BRAND.email (works with zero backend). Set this to a Formspree
// endpoint, a serverless function, or your own /api/lead route to capture
// leads programmatically (Phase 0 ticket 0.2 / 0.3 in the build handoff).
export const FORM_ENDPOINT = '';

export const NAV_LINKS = [
  { label: 'Services', href: '#offer' },
  { label: 'Process', href: '#process' },
  { label: 'Builds', href: '#builds' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];
