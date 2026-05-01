// src/lib/constants/components/hof/scroll_area.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SCROLL AREA CONSTANTS                                  ║
// ║                    All sizing, opacity, and class fragments               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';
import { SPACING_SCALE } from '@/lib/constants/cosmic/dimensions';
import { BORDER_RADII } from '@/lib/constants/cosmic/dimensions';
import { durations } from '@/lib/constants/cosmic/motion';

// ─── Scrollbar Dimensions ──────────────────────────────────────────────────
/** Thickness tokens for scrollbar width/height */
export const SCROLLBAR_THICKNESS = {
  thin: {
    webkit: '[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-1',
    firefox: 'scrollbar-thin',
  },
  normal: {
    webkit: '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:h-1.5',
    firefox: 'scrollbar-thin',
  },
  wide: {
    webkit: '[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2',
    firefox: 'scrollbar-auto',
  },
} as const;

export type ScrollbarThickness = keyof typeof SCROLLBAR_THICKNESS;

// ─── Scrollbar Colors (derived from COSMIC) ────────────────────────────────
const starDust = QUANTUM_COLORS['starDust'];   // #E0E0E0
const neurospark = QUANTUM_COLORS['neurospark']; // #22D3EE

/** Scrollbar track background */
export const SCROLLBAR_TRACK_BG = `bg-[${starDust}]/5`;

/** Scrollbar thumb background */
export const SCROLLBAR_THUMB_BG = `bg-[${neurospark}]/50`;

/** Scrollbar thumb hover background */
export const SCROLLBAR_THUMB_HOVER_BG = `hover:bg-[${neurospark}]/70`;

// ─── Visibility Classes ────────────────────────────────────────────────────
export const SCROLLBAR_VISIBILITY = {
  always: '[&::-webkit-scrollbar]:block',
  auto: '[&::-webkit-scrollbar]:block',
  hover: '[&::-webkit-scrollbar]:opacity-0 hover:[&::-webkit-scrollbar]:opacity-100',
  hidden: '[&::-webkit-scrollbar]:hidden',
} as const;

export type ScrollbarVisibility = keyof typeof SCROLLBAR_VISIBILITY;

// ─── Orientation ───────────────────────────────────────────────────────────
export const SCROLL_ORIENTATION = {
  vertical: 'overflow-y-auto',
  horizontal: 'overflow-x-auto',
  both: 'overflow-auto',
} as const;

export type ScrollOrientation = keyof typeof SCROLL_ORIENTATION;

// ─── Snap Direction ────────────────────────────────────────────────────────
export const SNAP_DIRECTION = {
  start: 'snap-start',
  center: 'snap-center',
  end: 'snap-end',
  proximity: 'snap-proximity',
} as const;

export type SnapDirection = keyof typeof SNAP_DIRECTION;

// ─── Rounded Size Map (uses COSMIC border radii) ───────────────────────────
export const SCROLL_AREA_ROUNDED = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
} as const;

export type ScrollAreaRoundedSize = keyof typeof SCROLL_AREA_ROUNDED;

// ─── Border & Background Tokens ────────────────────────────────────────────
/** Border color for bordered variant */
export const SCROLL_AREA_BORDER = `border border-[${starDust}]/10`;

/** Background for background variant */
export const SCROLL_AREA_BACKGROUND = `bg-[${starDust}]/5 backdrop-blur-sm`;

// ─── Shadow on Scroll ──────────────────────────────────────────────────────
/** Inset shadow applied when scrolled */
export const SCROLL_SHADOW_INSET =
  'shadow-[inset_0_10px_15px_-10px_rgba(0,0,0,0.3)]';

// ─── Scroll Indicator Colors ───────────────────────────────────────────────
export const SCROLL_INDICATOR_TRACK_BG = `bg-[${starDust}]/10`;
export const SCROLL_INDICATOR_THUMB_BG = `bg-[${neurospark}]/50`;

// ─── Scroll To Top Button Colors ───────────────────────────────────────────
export const SCROLL_TO_TOP_BUTTON_BG = `bg-[${starDust}]/10`;
export const SCROLL_TO_TOP_BUTTON_HOVER_BG = `hover:bg-[${starDust}]/20`;

// ─── Scrollbar Base Classes (WebKit) ───────────────────────────────────────
export const SCROLLBAR_WEBKIT_BASE = [
  '[&::-webkit-scrollbar]:rounded-full',
  `[&::-webkit-scrollbar-track]:${SCROLLBAR_TRACK_BG}`,
  '[&::-webkit-scrollbar-track]:rounded-full',
  `[&::-webkit-scrollbar-thumb]:${SCROLLBAR_THUMB_BG}`,
  '[&::-webkit-scrollbar-thumb]:rounded-full',
  `[&::-webkit-scrollbar-thumb]:${SCROLLBAR_THUMB_HOVER_BG}`,
] as const;

// ─── Firefox Scrollbar Classes ─────────────────────────────────────────────
export const SCROLLBAR_FIREFOX_BASE = [
  '[&::-moz-scrollbar]:rounded-full',
  `[&::-moz-scrollbar-track]:${SCROLLBAR_TRACK_BG}`,
  '[&::-moz-scrollbar-track]:rounded-full',
  `[&::-moz-scrollbar-thumb]:${SCROLLBAR_THUMB_BG}`,
  '[&::-moz-scrollbar-thumb]:rounded-full',
] as const;

// ─── Transition Duration ───────────────────────────────────────────────────
export const SCROLL_INDICATOR_TRANSITION = `transition-all duration-${durations.fast}ms`;