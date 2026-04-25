// src/lib/constants/components/ui/kbd.contants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    KBD CONSTANTS                                          ║
// ║                    Single source of truth — sizing, typography, colors    ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';
import {
  SPACING_SCALE,
  BORDER_RADII,
} from '@/lib/constants/cosmic/dimensions';
import {
  FONT_FAMILIES,
  FONT_WEIGHT_CLASSES,
  TEXT_SIZES,
} from '@/lib/constants/cosmic/typography';

// ─── Color Tokens ──────────────────────────────────────────────────────────
/** Background color — subtle surface highlight */
const KBD_BG = QUANTUM_COLORS['surface'];          // #1A1F35
/** Text color — muted star-dust */
const KBD_TEXT = QUANTUM_COLORS['starDust'];       // #E0E0E0
/** Background when nested inside tooltip content (inverted scheme) */
const KBD_TOOLTIP_BG = QUANTUM_COLORS['starDust'];
/** Text when nested inside tooltip content (inverted scheme) */
const KBD_TOOLTIP_TEXT = QUANTUM_COLORS['deepSpace'];

// ─── Sizing ────────────────────────────────────────────────────────────────
/** Fixed height for individual kbd keys */
export const KBD_HEIGHT = 'h-5';                    // 20px — SPACING_SCALE['5']

/** Minimum width — ensures consistent sizing even for single characters */
export const KBD_MIN_WIDTH = 'min-w-5';             // 20px — SPACING_SCALE['5']

/** Horizontal padding */
export const KBD_PADDING_X = 'px-1';                // 4px — SPACING_SCALE['1']

/** Gap between elements inside a kbd (icon + text) */
export const KBD_GAP = 'gap-1';                     // 4px — SPACING_SCALE['1']

/** Gap between kbd items in a group */
export const KBD_GROUP_GAP = 'gap-1';               // 4px — SPACING_SCALE['1']

// ─── Border Radius ─────────────────────────────────────────────────────────
/** Rounded corners — subtle, not pill-shaped */
export const KBD_RADIUS = 'rounded-sm';             // BORDER_RADII.sm — 4px

// ─── Typography ────────────────────────────────────────────────────────────
/** Font family for keyboard keys — system monospace feels authentic */
export const KBD_FONT = 'font-sans';                // FONT_FAMILIES.system

/** Font size — small to distinguish from body text */
export const KBD_TEXT_SIZE = 'text-xs';             // TEXT_SIZES.xs — 12px

/** Font weight — medium for legibility at small sizes */
export const KBD_FONT_WEIGHT = 'font-medium';       // FONT_WEIGHTS.medium — 500

// ─── SVG Icon Sizing ───────────────────────────────────────────────────────
/** Size constraint for SVG icons nested inside kbd */
export const KBD_SVG_SIZE = 'size-3';               // 12px — SPACING_SCALE['3']

// ─── Composite Base Classes ────────────────────────────────────────────────
/** Base structural classes applied to all kbd elements */
export const KBD_BASE_CLASSES = [
  'pointer-events-none',
  'inline-flex',
  KBD_HEIGHT,
  'w-fit',
  KBD_MIN_WIDTH,
  'items-center',
  'justify-center',
  KBD_GAP,
  KBD_RADIUS,
  KBD_PADDING_X,
  KBD_FONT,
  KBD_TEXT_SIZE,
  KBD_FONT_WEIGHT,
  'select-none',
] as const;

/** Color classes for the default (standalone) appearance */
export const KBD_COLOR_CLASSES = [
  `bg-[${KBD_BG}]/60`,
  `text-[${KBD_TEXT}]/70`,
] as const;

/** Color classes when kbd is inside a tooltip content */
export const KBD_TOOLTIP_COLOR_CLASSES = [
  `in-data-[slot=tooltip-content]:bg-[${KBD_TOOLTIP_BG}]/20`,
  `in-data-[slot=tooltip-content]:text-[${KBD_TOOLTIP_TEXT}]`,
] as const;

/** Dark mode tooltip override */
export const KBD_DARK_TOOLTIP_CLASSES = [
  `dark:in-data-[slot=tooltip-content]:bg-[${KBD_TOOLTIP_BG}]/10`,
] as const;

/** SVG icon constraint within kbd */
export const KBD_SVG_CLASSES = [
  `[&_svg:not([class*='size-'])]:${KBD_SVG_SIZE}`,
] as const;

/** Group container classes */
export const KBD_GROUP_BASE_CLASSES = [
  'inline-flex',
  'items-center',
  KBD_GROUP_GAP,
] as const;