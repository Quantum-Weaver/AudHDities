// src/lib/constants/components/shared/sort_dropdown.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SORT DROPDOWN CONSTANTS                                ║
// ║                    Sizing, spacing, z-index, interaction tokens           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { SPACING_SCALE, BORDER_RADII } from '@/lib/constants/cosmic';

// ─── Z-Index Layering ──────────────────────────────────────────────────────
export const SORT_DROPDOWN_Z_INDEX = {
  OVERLAY: 'z-10',
  DROPDOWN: 'z-20',
} as const;

// ─── Dropdown Menu Sizing ──────────────────────────────────────────────────
/** Minimum width of the dropdown panel */
export const SORT_DROPDOWN_MIN_WIDTH = 'min-w-[160px]';

// ─── Spacing Tokens ────────────────────────────────────────────────────────
export const SORT_DROPDOWN_SPACING = {
  /** Gap between trigger button icon and label */
  TRIGGER_GAP: 'gap-2',
  /** Padding inside each option button */
  OPTION_PADDING_X: 'px-4',
  OPTION_PADDING_Y: 'py-2',
  /** Margin between trigger and dropdown */
  DROPDOWN_OFFSET: 'mt-1',
  /** Spacing between active indicator and label */
  ACTIVE_INDICATOR_GAP: 'ml-2',
} as const;

// ─── Radius ────────────────────────────────────────────────────────────────
/** Border radius for the dropdown panel — references COSMIC lg */
export const SORT_DROPDOWN_RADIUS = 'rounded-lg';

// ─── Direction Indicators ──────────────────────────────────────────────────
export const SORT_DIRECTION = {
  ASC: '↑',
  DESC: '↓',
} as const;

// ─── Trigger button default variant ────────────────────────────────────────
export const SORT_DROPDOWN_TRIGGER_VARIANT = 'outline' as const;
export const SORT_DROPDOWN_TRIGGER_SIZE = 'sm' as const;

// ─── Typography Tokens ─────────────────────────────────────────────────────
export const SORT_DROPDOWN_TYPOGRAPHY = {
  /** Font size for direction indicator in trigger */
  DIRECTION_INDICATOR: 'text-xs',
  /** Font size for option labels */
  OPTION_LABEL: 'text-sm',
} as const;