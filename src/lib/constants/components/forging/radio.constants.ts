// src/lib/constants/components/forging/radio.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    RADIO CONSTANTS                                        ║
// ║                    Sizing, spacing, interaction tokens                    ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { SPACING_SCALE, BORDER_RADII } from '@/lib/constants/cosmic';

// ─── Size Tokens ───────────────────────────────────────────────────────────
/** Radio control outer dimensions (maps to spacing scale) */
export const RADIO_SIZE = {
  SM: 'size-3.5',     // 14px — compact forms, table rows
  MD: 'size-4',       // 16px — default
  LG: 'size-5',       // 20px — prominent selection
} as const;

/** Radio indicator inner dot dimensions */
export const RADIO_INDICATOR_SIZE = {
  SM: 'size-1.5',     // 6px
  MD: 'size-2',       // 8px
  LG: 'size-2.5',     // 10px
} as const;

/** Label text size per radio size */
export const RADIO_LABEL_SIZE = {
  SM: 'text-sm',
  MD: 'text-base',
  LG: 'text-lg',
} as const;

// ─── Border Radius ─────────────────────────────────────────────────────────
export const RADIO_RADIUS = {
  CONTROL: 'rounded-full',
  CARD: 'rounded-lg',
  BUTTON: 'rounded-lg',
} as const;

// ─── Spacing ───────────────────────────────────────────────────────────────
export const RADIO_GAP = {
  GROUP: 'gap-2',
  ITEM: 'gap-2',
} as const;

export const RADIO_PADDING = {
  CARD: 'p-4',
  BUTTON_X: 'px-4',
  BUTTON_Y: 'py-2',
} as const;

// ─── Interaction Tokens ────────────────────────────────────────────────────
export const RADIO_FOCUS_RING = {
  WIDTH: 'ring-2',
  OFFSET: 'ring-offset-0',
} as const;

export const RADIO_TRANSITION = 'transition-all duration-150';

// ─── Disabled State ────────────────────────────────────────────────────────
export const RADIO_DISABLED = 'disabled:cursor-not-allowed disabled:opacity-50';

// ─── Type Exports ──────────────────────────────────────────────────────────
export const RADIO_SIZE_VALUES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

export type RadioSize = (typeof RADIO_SIZE_VALUES)[keyof typeof RADIO_SIZE_VALUES];
// Resolves to: 'sm' | 'md' | 'lg'