// src/lib/constants/components/ui/dialog.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    DIALOG CONSTANTS                                       ║
// ║                    Single source of truth — sizing, colors, animation     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';
import {
  SPACING_SCALE,
  BORDER_RADII,
  BORDER_WIDTHS,
} from '@/lib/constants/cosmic/dimensions';
import {
  TEXT_SIZES,
  FONT_WEIGHT_CLASSES,
  FONT_FAMILIES,
} from '@/lib/constants/cosmic/typography';
import { DURATIONS } from '@/lib/constants/cosmic/motion';
import { BACKDROP_EFFECTS } from '@/lib/constants/cosmic/effects';

// ─── Color Tokens ──────────────────────────────────────────────────────────
const deepSpace = QUANTUM_COLORS['deepSpace'];       // #0C0F1D
const surface = QUANTUM_COLORS['surface'];           // #1A1F35
const starDust = QUANTUM_COLORS['starDust'];         // #E0E0E0
const quantumPurple = QUANTUM_COLORS['quantum.purple'];

// ─── Overlay ───────────────────────────────────────────────────────────────
/** Background color for the overlay backdrop */
export const DIALOG_OVERLAY_BG = `bg-[${deepSpace}]/10`;

/** Transition duration for overlay animations */
export const DIALOG_OVERLAY_DURATION = 'duration-100';  // 100ms

/** Backdrop blur support */
export const DIALOG_OVERLAY_BLUR = 'supports-backdrop-filter:backdrop-blur-xs';

// ─── Content Panel ─────────────────────────────────────────────────────────
/** Background — uses surface with slight opacity for glass feel */
export const DIALOG_CONTENT_BG = `bg-[${surface}]/95`;

/** Text color */
export const DIALOG_CONTENT_TEXT = `text-[${starDust}]`;

/** Ring/border accent */
export const DIALOG_CONTENT_RING = `ring-1 ring-[${starDust}]/10`;

/** Border radius */
export const DIALOG_CONTENT_RADIUS = 'rounded-xl';      // BORDER_RADII.xl — 16px

/** Internal padding */
export const DIALOG_CONTENT_PADDING = 'p-4';            // SPACING_SCALE['4'] — 16px

/** Gap between content sections */
export const DIALOG_CONTENT_GAP = 'gap-4';              // SPACING_SCALE['4'] — 16px

/** Base text size */
export const DIALOG_CONTENT_TEXT_SIZE = 'text-sm';      // TEXT_SIZES.sm — 14px

/** Max width — responsive with 2rem breathing room */
export const DIALOG_CONTENT_MAX_WIDTH = 'max-w-[calc(100%-2rem)]';

/** Responsive max width at small breakpoint */
export const DIALOG_CONTENT_RESPONSIVE_MAX_WIDTH = 'sm:max-w-sm';

/** Centering transform */
export const DIALOG_CONTENT_CENTER = [
  'fixed',
  'top-1/2',
  'left-1/2',
  '-translate-x-1/2',
  '-translate-y-1/2',
] as const;

/** Transition duration for content animations */
export const DIALOG_CONTENT_DURATION = 'duration-100';  // 100ms

// ─── Close Button ──────────────────────────────────────────────────────────
/** Position — absolute top-right with spacing */
export const DIALOG_CLOSE_BUTTON_POSITION = 'absolute top-2 right-2';
// SPACING_SCALE['2'] — 8px from edges

// ─── Header ────────────────────────────────────────────────────────────────
/** Gap between title and description */
export const DIALOG_HEADER_GAP = 'gap-2';               // SPACING_SCALE['2'] — 8px

// ─── Footer ────────────────────────────────────────────────────────────────
/** Negative margin to extend footer to edges of content padding */
export const DIALOG_FOOTER_NEGATIVE_MARGIN = '-mx-4 -mb-4';
// SPACING_SCALE['4'] — matches content padding

/** Footer padding */
export const DIALOG_FOOTER_PADDING = 'p-4';             // SPACING_SCALE['4']

/** Bottom border radius to match content */
export const DIALOG_FOOTER_RADIUS = 'rounded-b-xl';     // BORDER_RADII.xl

/** Top border to separate footer from content */
export const DIALOG_FOOTER_BORDER = 'border-t';         // BORDER_WIDTHS['1']

/** Footer background — muted surface */
export const DIALOG_FOOTER_BG = `bg-[${surface}]/50`;

/** Footer layout — column on mobile, row on small+ */
export const DIALOG_FOOTER_LAYOUT = [
  'flex',
  'flex-col-reverse',
  'gap-2',
  'sm:flex-row',
  'sm:justify-end',
] as const;

// ─── Title ─────────────────────────────────────────────────────────────────
/** Font family for titles */
export const DIALOG_TITLE_FONT = 'font-heading';        // Maps to FONT_FAMILIES.arcane

/** Title text size */
export const DIALOG_TITLE_SIZE = 'text-base';           // TEXT_SIZES.base — 16px

/** Title line height — tight for headings */
export const DIALOG_TITLE_LEADING = 'leading-none';

/** Title font weight */
export const DIALOG_TITLE_WEIGHT = 'font-medium';       // FONT_WEIGHTS.medium — 500

// ─── Description ───────────────────────────────────────────────────────────
/** Description text size */
export const DIALOG_DESCRIPTION_SIZE = 'text-sm';       // TEXT_SIZES.sm — 14px

/** Description text color — muted */
export const DIALOG_DESCRIPTION_TEXT = `text-[${starDust}]/60`;

/** Link styling within descriptions */
export const DIALOG_DESCRIPTION_LINK_CLASSES = [
  '*:[a]:underline',
  '*:[a]:underline-offset-3',
  `*:[a]:hover:text-[${starDust}]`,
] as const;

// ─── Z-Index Layers ────────────────────────────────────────────────────────
export const DIALOG_Z_INDEX = 'z-50';

// ─── Composite Base Classes ────────────────────────────────────────────────
export const DIALOG_CONTENT_BASE_CLASSES = [
  DIALOG_Z_INDEX,
  'grid',
  'w-full',
  DIALOG_CONTENT_MAX_WIDTH,
  ...DIALOG_CONTENT_CENTER,
  DIALOG_CONTENT_GAP,
  DIALOG_CONTENT_RADIUS,
  DIALOG_CONTENT_BG,
  DIALOG_CONTENT_PADDING,
  DIALOG_CONTENT_TEXT_SIZE,
  DIALOG_CONTENT_TEXT,
  DIALOG_CONTENT_RING,
  DIALOG_CONTENT_DURATION,
  'outline-none',
  DIALOG_CONTENT_RESPONSIVE_MAX_WIDTH,
] as const;

export const DIALOG_OVERLAY_BASE_CLASSES = [
  'fixed',
  'inset-0',
  'isolate',
  DIALOG_Z_INDEX,
  DIALOG_OVERLAY_BG,
  DIALOG_OVERLAY_DURATION,
  DIALOG_OVERLAY_BLUR,
] as const;