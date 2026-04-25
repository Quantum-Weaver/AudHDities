// src/lib/constants/components/forging/select.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SELECT CONSTANTS                                       ║
// ║                    Sizing, icons, color tokens                            ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';
import { SPACING_SCALE } from '@/lib/constants/cosmic/dimensions';
import { BORDER_RADII } from '@/lib/constants/cosmic/dimensions';
import { durations } from '@/lib/constants/cosmic/motion';

// ─── Color Tokens (derived from COSMIC) ────────────────────────────────────
const starDust = QUANTUM_COLORS['starDust'];       // #E0E0E0
const neurospark = QUANTUM_COLORS['neurospark'];    // #22D3EE
const error = QUANTUM_COLORS['error'];              // #E17055
const success = QUANTUM_COLORS['success'];           // #00B894
const surface = QUANTUM_COLORS['surface'];           // #1A1F35

// ─── Border & Ring Tokens ──────────────────────────────────────────────────
export const SELECT_BORDER_DEFAULT = `border-[${starDust}]/10`;
export const SELECT_BORDER_FOCUS = `focus:border-[${neurospark}]`;
export const SELECT_RING_FOCUS = `focus:ring-1 focus:ring-[${neurospark}]/50`;
export const SELECT_BORDER_ERROR = `border-[${error}]/50 focus:border-[${error}] focus:ring-1 focus:ring-[${error}]/50`;
export const SELECT_BORDER_SUCCESS = `border-[${success}]/50 focus:border-[${success}] focus:ring-1 focus:ring-[${success}]/50`;

// ─── Background Tokens ─────────────────────────────────────────────────────
export const SELECT_BG_DEFAULT = 'bg-transparent';
export const SELECT_BG_FILLED = `bg-[${starDust}]/5`;

// ─── Text Color Tokens ─────────────────────────────────────────────────────
export const SELECT_TEXT_COLOR = `text-[${starDust}]`;
export const SELECT_LABEL_COLOR = `text-[${starDust}]/80`;
export const SELECT_LABEL_ERROR_COLOR = `text-[${error}]`;
export const SELECT_REQUIRED_STAR_COLOR = `text-[${neurospark}]`;
export const SELECT_OPTIONAL_TEXT_COLOR = `text-[${starDust}]/40`;
export const SELECT_PLACEHOLDER_COLOR = `text-[${starDust}]/60`;
export const SELECT_HELPER_COLOR = `text-[${starDust}]/40`;
export const SELECT_ERROR_TEXT_COLOR = `text-[${error}]`;
export const SELECT_CHEVRON_COLOR = `text-[${starDust}]/40`;
export const SELECT_OPTION_BG = `bg-[${surface}]`;

// ─── Size Tokens (derived from SPACING_SCALE) ──────────────────────────────
export const SELECT_SIZE = {
  sm: {
    height: `h-[${SPACING_SCALE['7']}]`,   // 28px
    paddingX: `px-[${SPACING_SCALE['2']}]`, // 8px
    fontSize: 'text-xs',
  },
  md: {
    height: `h-[${SPACING_SCALE['8']}]`,    // 32px
    paddingX: `px-[${SPACING_SCALE['3']}]`, // 12px
    fontSize: 'text-sm',
  },
  lg: {
    height: `h-[${SPACING_SCALE['10']}]`,    // 40px
    paddingX: `px-[${SPACING_SCALE['4']}]`,  // 16px
    fontSize: 'text-base',
  },
} as const;

export type SelectSize = keyof typeof SELECT_SIZE;

// ─── Chevron Icon ──────────────────────────────────────────────────────────
export const SELECT_CHEVRON_SIZE = `h-[${SPACING_SCALE['4']}] w-[${SPACING_SCALE['4']}]`; // 16px

/** Data URI for the custom dropdown chevron (white, 16x16) */
export const SELECT_CHEVRON_DATA_URI =
  "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27white%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpolyline points=%276 9 12 15 18 9%27%3E%3C/polyline%3E%3C/svg%3E')]";

/** Chevron position within the select */
export const SELECT_CHEVRON_POSITION =
  'bg-[position:right_0.75rem_center] bg-[size:1rem] bg-no-repeat pr-8';

// ─── Gap Token ─────────────────────────────────────────────────────────────
export const SELECT_GAP = `gap-[${SPACING_SCALE['1.5']}]`; // 6px

// ─── Transition Token ──────────────────────────────────────────────────────
export const SELECT_TRANSITION = `transition-all duration-${durations.normal}ms`;

// ─── Border Radius ─────────────────────────────────────────────────────────
export const SELECT_BORDER_RADIUS = `rounded-[${BORDER_RADII.lg}]`; // 12px

// ─── Disabled State ────────────────────────────────────────────────────────
export const SELECT_DISABLED = 'disabled:cursor-not-allowed disabled:opacity-50';