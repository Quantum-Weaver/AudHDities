// src/lib/constants/components/ui/badge.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    BADGE CONSTANTS                                        ║
// ║                    Single source of truth — sizing, padding, base classes ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import {
  FONT_SIZES,
  FONT_WEIGHTS,
  BORDER_RADII,
  SPACING_SCALE,
} from '@/lib/constants/cosmic/index';

// ─── Base Classes ──────────────────────────────────────────────────────────
export const BADGE_BASE_CLASSES = [
  'inline-flex',
  'items-center',
  'gap-1.5',
  'font-medium',
  'transition-colors',
] as const;

// ─── Shape Variants ────────────────────────────────────────────────────────
/** Border radius applied when pill=false */
export const BADGE_RADIUS_DEFAULT = 'rounded-md';
/** Border radius applied when pill=true */
export const BADGE_RADIUS_PILL = BORDER_RADII.full;

// ─── Size Configuration ────────────────────────────────────────────────────
export const BADGE_SIZES = {
  SM: {
    paddingX: 'px-1.5',
    paddingY: 'py-0.5',
    fontSize: 'text-[10px]',
    gap: 'gap-1',
  },
  MD: {
    paddingX: 'px-2',
    paddingY: 'py-0.5',
    fontSize: FONT_SIZES.xs,
    gap: 'gap-1.5',
  },
  LG: {
    paddingX: 'px-2.5',
    paddingY: 'py-1',
    fontSize: FONT_SIZES.sm,
    gap: 'gap-2',
  },
} as const;

export type BadgeSize = keyof typeof BADGE_SIZES;

// ─── Dot Indicator ─────────────────────────────────────────────────────────
/** Size of the dot indicator by badge size */
export const BADGE_DOT_SIZES: Record<BadgeSize, string> = {
  SM: 'w-1.5 h-1.5',
  MD: 'w-2 h-2',
  LG: 'w-2.5 h-2.5',
} as const;

// ─── Remove Button ─────────────────────────────────────────────────────────
/** Padding around the remove button by badge size */
export const BADGE_REMOVE_PADDING: Record<BadgeSize, string> = {
  SM: 'p-0.5',
  MD: 'p-1',
  LG: 'p-1',
} as const;

/** Icon size for the remove button by badge size */
export const BADGE_REMOVE_ICON_SIZE: Record<BadgeSize, string> = {
  SM: 'h-2.5 w-2.5',
  MD: 'h-3 w-3',
  LG: 'h-3.5 w-3.5',
} as const;

// ─── Group Spacing ─────────────────────────────────────────────────────────
export const BADGE_GROUP_SPACING = {
  SM: 'gap-1',
  MD: 'gap-2',
  LG: 'gap-3',
} as const;

export type BadgeGroupSpacing = keyof typeof BADGE_GROUP_SPACING;

// ─── Typography ────────────────────────────────────────────────────────────
export const BADGE_FONT_WEIGHT = `font-[${FONT_WEIGHTS.medium}]`;