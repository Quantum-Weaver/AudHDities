// src/lib/constants/components/hof/divider.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    DIVIDER CONSTANTS                                      ║
// ║                    Sizing, thickness, length, spacing — no magic values   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { SPACING_SCALE } from '@/lib/constants/cosmic';

// ─── Thickness ──────────────────────────────────────────────────────────────
/** Maps thickness keys to Tailwind dimension classes */
export const DIVIDER_THICKNESS = {
  THIN: 'h-px',
  NORMAL: 'h-0.5',
  THICK: 'h-1',
} as const;

export const DIVIDER_THICKNESS_VERTICAL = {
  THIN: 'w-px',
  NORMAL: 'w-0.5',
  THICK: 'w-1',
} as const;

export type DividerThickness = keyof typeof DIVIDER_THICKNESS;

// ─── Length ─────────────────────────────────────────────────────────────────
/** Maps length keys to Tailwind width classes (horizontal) */
export const DIVIDER_LENGTH_HORIZONTAL = {
  FULL: 'w-full',
  SHORT: 'w-16',
  MEDIUM: 'w-32',
  LONG: 'w-48',
} as const;

/** Maps length keys to Tailwind height classes (vertical) */
export const DIVIDER_LENGTH_VERTICAL = {
  FULL: 'h-full',
  SHORT: 'h-8',
  MEDIUM: 'h-16',
  LONG: 'h-24',
} as const;

export type DividerLength = keyof typeof DIVIDER_LENGTH_HORIZONTAL;

// ─── Spacing Around Divider ─────────────────────────────────────────────────
export const DIVIDER_SPACING_HORIZONTAL = {
  SM: 'my-2',
  MD: 'my-4',
  LG: 'my-6',
} as const;

export const DIVIDER_SPACING_VERTICAL = {
  SM: 'mx-2',
  MD: 'mx-4',
  LG: 'mx-6',
} as const;

export type DividerSpacingSize = keyof typeof DIVIDER_SPACING_HORIZONTAL;

// ─── Label Styling ──────────────────────────────────────────────────────────
export const DIVIDER_LABEL_GAP = 'gap-4';
export const DIVIDER_LABEL_TEXT = 'text-star-dust/40 text-sm whitespace-nowrap';
export const DIVIDER_LABEL_ICON_SIZE = 'w-4 h-4';
export const DIVIDER_SECTION_SUBTITLE = 'text-center text-star-dust/40 text-sm mt-3';
export const DIVIDER_SECTION_PADDING = 'py-8';

// ─── Line Style Base ────────────────────────────────────────────────────────
export const DIVIDER_LINE_BASE = 'border-white/20';