// src/lib/constants/components/bifrost/footer.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FOOTER CONSTANTS                                       ║
// ║                    Single source of truth — no magic values               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

// ─── Content ───────────────────────────────────────────────────────────────
/** Copyright text displayed in the footer */
export const FOOTER_COPYRIGHT = '© 2026 AudHDities Sanctuary LLC. All rights reserved.';

/** Link definitions for footer navigation */
export const FOOTER_LINKS = {
  TERMS: { href: '/terms', label: 'Terms of Service' },
  PRIVACY: { href: '/privacy', label: 'Privacy Policy' },
} as const;

/** Separator character between footer links */
export const FOOTER_LINK_SEPARATOR = '⚖️';

// ─── Styling Tokens ────────────────────────────────────────────────────────
/** Opacity for footer text elements */
export const FOOTER_TEXT_OPACITY = 'opacity-80';

/** Padding for the footer container */
export const FOOTER_PADDING_Y = 'py-8';

/** Border classes for the footer top edge */
export const FOOTER_BORDER_CLASSES = 'border-t border-white/5';

/** Background + backdrop classes */
export const FOOTER_BACKGROUND_CLASSES = 'bg-deep-space/40 backdrop-blur-lg';

/** Layout positioning */
export const FOOTER_LAYOUT_CLASSES = 'mt-auto';

// ─── Text Size Mappings ────────────────────────────────────────────────────
/** Font size for the copyright line */
export const FOOTER_COPYRIGHT_SIZE = 'text-sm';

/** Font size for the links line */
export const FOOTER_LINKS_SIZE = 'text-xs';