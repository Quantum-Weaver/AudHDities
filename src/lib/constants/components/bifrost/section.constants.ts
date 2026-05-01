// src/lib/constants/components/bifrost/section.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SECTION CONSTANTS                                      ║
// ║                    Raw values — spacing, sizing, class fragments          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import {
  SPACING_SCALE,
  CONTAINER_MAX_WIDTHS,
} from '@/lib/constants/cosmic/dimensions';

import {
  TEXT_SIZES,
  FONT_WEIGHT_CLASSES,
  LINE_HEIGHT_CLASSES,
} from '@/lib/constants/cosmic/typography';

// ─── Section Spacing Keys ──────────────────────────────────────────────────
export const SECTION_SPACING = {
  NONE: 'none',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  '2XL': '2xl',
} as const;

// ─── Section Variant Keys ──────────────────────────────────────────────────
export const SECTION_VARIANTS = {
  DEFAULT: 'default',
  MUTED: 'muted',
  GLOW: 'glow',
  GRADIENT: 'gradient',
  GLASS: 'glass',
} as const;

// ─── Title Alignment Keys ──────────────────────────────────────────────────
export const SECTION_TITLE_ALIGN = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
} as const;

// ─── Spacing Map (vertical padding per spacing key) ────────────────────────
export const SECTION_SPACING_MAP = {
  [SECTION_SPACING.NONE]: 'py-0',
  [SECTION_SPACING.SM]: `py-[${SPACING_SCALE['8']}]`,    // py-8  → 32px
  [SECTION_SPACING.MD]: `py-[${SPACING_SCALE['12']}]`,    // py-12 → 48px
  [SECTION_SPACING.LG]: `py-[${SPACING_SCALE['16']}]`,    // py-16 → 64px
  [SECTION_SPACING.XL]: `py-[${SPACING_SCALE['20']}]`,    // py-20 → 80px
  [SECTION_SPACING['2XL']]: `py-[${SPACING_SCALE['24']}]`, // py-24 → 96px
} as const;

// ─── Content Spacing ───────────────────────────────────────────────────────
export const SECTION_TITLE_MARGIN_BOTTOM = `mb-[${SPACING_SCALE['8']}]`; // 32px
export const SECTION_TITLE_DESCRIPTION_GAP = `mb-[${SPACING_SCALE['3']}]`; // 12px
export const SECTION_DIVIDER_SPACING = `py-[${SPACING_SCALE['8']}]`; // 32px

// ─── Typography — Title ────────────────────────────────────────────────────
export const SECTION_TITLE_SIZE = `${TEXT_SIZES['2xl']} md:${TEXT_SIZES['3xl']}`;
export const SECTION_TITLE_WEIGHT = FONT_WEIGHT_CLASSES.bold;

// ─── Typography — Description ──────────────────────────────────────────────
export const SECTION_DESCRIPTION_MAX_WIDTH = CONTAINER_MAX_WIDTHS['2xl'];

// ─── Divider ────────────────────────────────────────────────────────────────
export const SECTION_DIVIDER_WIDTH = `w-[${SPACING_SCALE['16']}]`; // 64px
export const SECTION_DIVIDER_HEIGHT = 'h-px';

// ─── Separator ──────────────────────────────────────────────────────────────
export const SECTION_SEPARATOR_WIDTH = `before:w-[${SPACING_SCALE['24']}]`; // 96px
export const SECTION_SEPARATOR_HEIGHT = 'before:h-px';

// ─── Content Padding (when no container) ────────────────────────────────────
export const SECTION_CONTENT_PADDING_X = `px-[${SPACING_SCALE['4']}]`; // 16px