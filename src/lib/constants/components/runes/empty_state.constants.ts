// src/lib/constants/components/runes/empty_state.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    EMPTY STATE CONSTANTS                                  ║
// ║                    Single source of truth — sizing, spacing, icon scale   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { SPACING_SCALE } from '@/lib/constants/cosmic';

// ─── Size Keys ─────────────────────────────────────────────────────────────
/** Available size variants — maps to Tailwind spacing scale keys */
export const EMPTY_STATE_SIZES = {
  COMPACT: 'compact',
  DEFAULT: 'default',
  SPACIOUS: 'spacious',
} as const;

export type EmptyStateSize = (typeof EMPTY_STATE_SIZES)[keyof typeof EMPTY_STATE_SIZES];

// ─── Layout Spacing (Tailwind spacing keys, NOT pixel values) ──────────────
/** Vertical padding mapped to size — uses Tailwind py-{key} format */
export const EMPTY_STATE_PADDING: Record<EmptyStateSize, string> = {
  compact: 'py-6',    // 24px via Tailwind spacing scale
  default: 'py-12',   // 48px
  spacious: 'py-20',  // 80px
} as const;

// ─── Icon Sizing ───────────────────────────────────────────────────────────
/** Icon container text size per size variant */
export const EMPTY_STATE_ICON_SIZE: Record<EmptyStateSize, string> = {
  compact: 'text-4xl',   // 36px
  default: 'text-6xl',   // 48px (60px in Tailwind — maps to 3.75rem)
  spacious: 'text-7xl',  // 56px (72px in Tailwind — maps to 4.5rem)
} as const;

// ─── Title Sizing ──────────────────────────────────────────────────────────
export const EMPTY_STATE_TITLE_SIZE: Record<EmptyStateSize, string> = {
  compact: 'text-lg',    // 20px
  default: 'text-xl',    // 24px
  spacious: 'text-2xl',  // 28px
} as const;

// ─── Description Sizing ────────────────────────────────────────────────────
export const EMPTY_STATE_DESCRIPTION_SIZE: Record<EmptyStateSize, string> = {
  compact: 'text-sm',     // 14px
  default: 'text-base',   // 16px
  spacious: 'text-lg',    // 20px
} as const;

// ─── Element Gaps (Tailwind margin keys) ───────────────────────────────────
/** Gap between icon container and title */
export const EMPTY_STATE_ICON_GAP: Record<EmptyStateSize, string> = {
  compact: 'mb-3',   // 12px
  default: 'mb-4',   // 16px
  spacious: 'mb-6',  // 24px
} as const;

/** Gap between title and description */
export const EMPTY_STATE_TITLE_GAP = 'mb-2' as const;  // 8px

/** Gap between description and action button */
export const EMPTY_STATE_DESCRIPTION_GAP = 'mb-4' as const;  // 16px

// ─── Max Width ─────────────────────────────────────────────────────────────
/** Maximum content width per size to constrain text measure */
export const EMPTY_STATE_MAX_WIDTH: Record<EmptyStateSize, string> = {
  compact: 'max-w-xs',   // 320px
  default: 'max-w-md',   // 448px
  spacious: 'max-w-lg',  // 512px
} as const;