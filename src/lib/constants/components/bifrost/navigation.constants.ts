/* src/lib/constants/components/bifrost/navigation.constants.ts */
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    NAVIGATION CONSTANTS                                   ║
// ║                    Raw values + variant keys — no CVA, no logic           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import {
  SPACING_SCALE,
  BORDER_RADII,
} from '@/lib/constants/cosmic/dimensions';

import { durations, easing } from '@/lib/constants/cosmic/motion';

// ─── Variant Keys ──────────────────────────────────────────────────────────
export const NAVIGATION_VARIANTS = {
  DESKTOP: 'desktop',
  MOBILE: 'mobile',
} as const;

export const NAV_ITEM_STATES = {
  DEFAULT: 'default',
  ACTIVE: 'active',
  HOVER: 'hover',
} as const;

// ─── Brand ─────────────────────────────────────────────────────────────────
export const BRAND_NAME = 'AudHDities' as const;

// ─── Dimensions ────────────────────────────────────────────────────────────
export const NAV_BAR_HEIGHT = SPACING_SCALE['14']; // 56px

export const NAV_ITEM_PADDING = {
  X: SPACING_SCALE['3'],  // 12px
  Y: SPACING_SCALE['2'],  // 8px
} as const;

export const NAV_MOBILE_ITEM_PADDING = {
  X: SPACING_SCALE['4'],  // 16px
  Y: SPACING_SCALE['3'],  // 12px
} as const;

export const NAV_ITEM_GAP = SPACING_SCALE['2']; // 8px
export const NAV_MOBILE_SECTION_GAP = SPACING_SCALE['3']; // 12px

export const NAV_ICON_SIZE = {
  DESKTOP: 'h-4 w-4',
  MOBILE: 'h-5 w-5',
} as const;

export const NAV_ITEM_RADIUS = BORDER_RADII.lg;

// ─── Auth Separator ────────────────────────────────────────────────────────
export const NAV_AUTH_SEPARATOR_CLASS = 'h-6 w-px bg-white/10 mx-3 flex-shrink-0';

// ─── Mobile Floating Button ────────────────────────────────────────────────
/** Position of the floating menu button */
export const NAV_FLOATING_BUTTON_POSITION = 'fixed bottom-4 left-4 z-50';

/** Size of the floating button */
export const NAV_FLOATING_BUTTON_SIZE = 'h-12 w-12';

/** Icon size inside the floating button */
export const NAV_FLOATING_ICON_SIZE = 'h-6 w-6';

// ─── Transition ─────────────────────────────────────────────────────────────
export const NAV_TRANSITION_DURATION = durations.fast; // 150ms
export const NAV_TRANSITION_EASING = easing.quantum;

// ─── Z-Index ───────────────────────────────────────────────────────────────
export const NAV_MOBILE_MENU_Z_INDEX = 'z-50';

// ─── Mobile Menu ───────────────────────────────────────────────────────────
export const NAV_MOBILE_BREAKPOINT = 'md';
export const NAV_DIVIDER_HEIGHT = 'h-px';
export const NAV_DIVIDER_MARGIN = 'my-2';