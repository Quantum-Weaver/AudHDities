// src/lib/constants/components/bifrost/header.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    HEADER CONSTANTS                                       ║
// ║                    Raw values + variant keys — no CVA, no logic           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import {
  SPACING_SCALE,
  BORDER_RADII,
  BREAKPOINTS,
} from '@/lib/constants/cosmic/dimensions';

import { durations, easing } from '@/lib/constants/cosmic/motion';

// ─── Variant Keys ──────────────────────────────────────────────────────────
/** Valid header variant identifiers */
export const HEADER_VARIANTS = {
  SOVEREIGN: 'sovereign',
  TRANSPARENT: 'transparent',
  GLASS: 'glass',
} as const;

// ─── Density Keys ──────────────────────────────────────────────────────────
/** Valid header density identifiers */
export const HEADER_DENSITIES = {
  DEFAULT: 'default',
  COMPACT: 'compact',
  SPACIOUS: 'spacious',
} as const;

// ─── Dimensions ────────────────────────────────────────────────────────────
export const HEADER_HEIGHT = SPACING_SCALE['16']; // 64px

export const HEADER_PADDING = {
  X: SPACING_SCALE['6'],  // 24px
  Y: SPACING_SCALE['4'],  // 16px
} as const;

// ─── Navigation ────────────────────────────────────────────────────────────
export const NAV_ITEM_PADDING = SPACING_SCALE['4']; // 16px
export const NAV_ITEM_RADIUS = BORDER_RADII.md;

// ─── Transition ─────────────────────────────────────────────────────────────
export const HEADER_TRANSITION_DURATION = durations.normal;
export const HEADER_TRANSITION_EASING = easing.quantum;

// ─── Responsive ────────────────────────────────────────────────────────────
export const HEADER_MOBILE_HEIGHT = SPACING_SCALE['14']; // 56px
export const HEADER_BREAKPOINT = BREAKPOINTS.md;