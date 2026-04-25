// src/lib/constants/components/runes/skeleton.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SKELETON CONSTANTS                                     ║
// ║                    Sizing, animation, and class fragments                 ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { SPACING_SCALE, BORDER_RADII, FONT_SIZES, LINE_HEIGHTS } from '@/lib/constants/cosmic';

// ─── Background Color ──────────────────────────────────────────────────────
/** Base background for skeleton placeholders */
export const SKELETON_BG = 'bg-star-dust/10' as const;

/** Card container background */
export const SKELETON_CARD_BG = 'bg-star-dust/5' as const;

// ─── Animation ─────────────────────────────────────────────────────────────
/** Shimmer animation duration in ms */
export const SKELETON_SHIMMER_DURATION = 1500;

/** Shimmer animation gradient — uses COSMIC star-dust token */
export const SKELETON_SHIMMER_GRADIENT = [
  'before:bg-gradient-to-r',
  'before:from-transparent',
  'before:via-star-dust/10',
  'before:to-transparent',
] as const;

// ─── Size Maps ─────────────────────────────────────────────────────────────
/** Height map for text variants (maps to font sizes) */
export const SKELETON_TEXT_HEIGHT: Record<string, string> = {
  xs: `h-[${FONT_SIZES.xs}]`,
  sm: `h-[${FONT_SIZES.sm}]`,
  md: `h-[${FONT_SIZES.base}]`,
  lg: `h-[${FONT_SIZES.lg}]`,
  xl: `h-[${FONT_SIZES.xl}]`,
  '2xl': `h-[${FONT_SIZES['2xl']}]`,
  '3xl': `h-[${FONT_SIZES['3xl']}]`,
  '4xl': `h-[${FONT_SIZES['4xl']}]`,
} as const;

/** Size map for avatar variants */
export const SKELETON_AVATAR_SIZE: Record<string, string> = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-14 h-14',
  '2xl': 'w-16 h-16',
  '3xl': 'w-24 h-24',
  '4xl': 'w-32 h-32',
} as const;

/** Size map for button variants */
export const SKELETON_BUTTON_SIZE: Record<string, string> = {
  xs: 'h-6 w-16',
  sm: 'h-8 w-20',
  md: 'h-10 w-24',
  lg: 'h-12 w-28',
  xl: 'h-14 w-32',
  '2xl': 'h-16 w-40',
  '3xl': 'h-20 w-48',
  '4xl': 'h-24 w-56',
} as const;

/** Size map for badge variants */
export const SKELETON_BADGE_SIZE: Record<string, string> = {
  xs: 'h-4 w-12',
  sm: 'h-5 w-14',
  md: 'h-6 w-16',
  lg: 'h-7 w-20',
  xl: 'h-8 w-24',
  '2xl': 'h-9 w-28',
  '3xl': 'h-10 w-32',
  '4xl': 'h-11 w-36',
} as const;

// ─── Variant Base Classes ──────────────────────────────────────────────────
/** Base shape classes per variant */
export const SKELETON_VARIANT_BASE: Record<string, string> = {
  text: `h-[${FONT_SIZES.base}]`,
  avatar: 'rounded-full aspect-square',
  image: 'rounded-md aspect-video',
  card: 'rounded-xl',
  button: `rounded-lg h-10`,
  badge: 'rounded-full h-6 w-16',
} as const;

// ─── Spacing Tokens for Composition Components ─────────────────────────────
export const SKELETON_SPACING = {
  LINE_GAP: 'space-y-2',
  LIST_GAP: 'space-y-4',
  DASHBOARD_GAP: 'space-y-8',
  CARD_PADDING: `p-[${SPACING_SCALE['4']}]`,
  GRID_GAP: `gap-[${SPACING_SCALE['4']}]`,
  FLEX_GAP: `gap-[${SPACING_SCALE['3']}]`,
  TEXT_MARGIN_BOTTOM: `mb-[${SPACING_SCALE['2']}]`,
  AVATAR_MARGIN_BOTTOM: `mb-[${SPACING_SCALE['4']}]`,
} as const;

// ─── Composition Skeleton Defaults ─────────────────────────────────────────
export const SKELETON_DEFAULTS = {
  CARD_IMAGE_HEIGHT: '160px',
  CHART_HEIGHT: '200px',
  CHAT_MAX_WIDTH: 'max-w-[70%]',
  LINES: 1,
  LAST_LINE_WIDTH: 75,
  ITEMS: 5,
  STAT_CARDS: 4,
  CHART_ROWS: 3,
  MESSAGES: 8,
} as const;