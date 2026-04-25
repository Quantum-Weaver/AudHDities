// src/lib/constants/components/ui/modal.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    MODAL CONSTANTS                                        ║
// ║                    Single source of truth — sizing, offsets, layout       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { SPACING_SCALE, BORDER_RADII } from '@/lib/constants/cosmic/dimensions';
import { durations } from '@/lib/constants/cosmic/motion';

// ─── Animation Duration ────────────────────────────────────────────────────
/** Duration for modal open/close transitions (ms) */
export const MODAL_TRANSITION_DURATION = durations.normal;

// ─── Backdrop ──────────────────────────────────────────────────────────────
/** Backdrop opacity levels */
export const MODAL_BACKDROP_OPACITY = {
  DEFAULT: '80',
  LIGHT: '50',
  HEAVY: '90',
} as const;

/** Backdrop blur amount */
export const MODAL_BACKDROP_BLUR = 'backdrop-blur-sm' as const;

// ─── Container ─────────────────────────────────────────────────────────────
/** Container border radius */
export const MODAL_CONTAINER_RADIUS = `rounded-[${BORDER_RADII.xl}]` as const;

/** Container margin from viewport edges */
export const MODAL_CONTAINER_MARGIN = `m-${SPACING_SCALE['4'].replace('px', '')}` as const;

/** Container padding */
export const MODAL_CONTAINER_PADDING = `p-${SPACING_SCALE['6'].replace('px', '')}` as const;

// ─── Header ────────────────────────────────────────────────────────────────
/** Header bottom padding */
export const MODAL_HEADER_PADDING_BOTTOM = `pb-${SPACING_SCALE['4'].replace('px', '')}` as const;

/** Header content padding when noPadding is active */
export const MODAL_HEADER_PADDING = `p-${SPACING_SCALE['4'].replace('px', '')}` as const;

// ─── Body ──────────────────────────────────────────────────────────────────
/** Body vertical padding */
export const MODAL_BODY_PADDING_Y = `py-${SPACING_SCALE['4'].replace('px', '')}` as const;

// ─── Footer ────────────────────────────────────────────────────────────────
/** Footer top padding */
export const MODAL_FOOTER_PADDING_TOP = `pt-${SPACING_SCALE['4'].replace('px', '')}` as const;

/** Footer gap between actions */
export const MODAL_FOOTER_GAP = `gap-${SPACING_SCALE['3'].replace('px', '')}` as const;

// ─── Close Button ──────────────────────────────────────────────────────────
/** Close button icon size */
export const MODAL_CLOSE_ICON_SIZE = `h-${SPACING_SCALE['5'].replace('px', '')} w-${SPACING_SCALE['5'].replace('px', '')}` as const;

// ─── Size Map (max-width tokens) ───────────────────────────────────────────
export const MODAL_SIZE_MAX_WIDTH = {
  SM: 'max-w-sm',
  MD: 'max-w-md',
  LG: 'max-w-lg',
  XL: 'max-w-xl',
  FULL: 'max-w-[90vw] w-full',
} as const;

export type ModalSizeKey = keyof typeof MODAL_SIZE_MAX_WIDTH;

// ─── Position Map ──────────────────────────────────────────────────────────
export const MODAL_POSITION_CLASSES = {
  CENTER: 'items-center',
  TOP: 'items-start pt-16',
} as const;

export type ModalPositionKey = keyof typeof MODAL_POSITION_CLASSES;

// ─── Footer Alignment ──────────────────────────────────────────────────────
export const MODAL_FOOTER_ALIGN = {
  LEFT: 'justify-start',
  CENTER: 'justify-center',
  RIGHT: 'justify-end',
} as const;

export type ModalFooterAlignKey = keyof typeof MODAL_FOOTER_ALIGN;

// ─── Border Separator ──────────────────────────────────────────────────────
export const MODAL_SEPARATOR_BORDER = 'border-white/10' as const;

// ─── Open Animation Classes ────────────────────────────────────────────────
export const MODAL_OPEN_ANIMATION = [
  'animate-in',
  'fade-in',
  'zoom-in-95',
  `duration-[${MODAL_TRANSITION_DURATION}ms]`,
].join(' ');