// src/lib/constants/components/forging/switch.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SWITCH CONSTANTS                                       ║
// ║                    All sizing, color, and class fragments                 ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';
import { SPACING_SCALE } from '@/lib/constants/cosmic/dimensions';
import { durations } from '@/lib/constants/cosmic/motion';

// ─── Color Tokens ──────────────────────────────────────────────────────────
// Classes must be static literals — Tailwind's scanner cannot see names
// assembled at runtime.

/** Track background when unchecked */
export const SWITCH_TRACK_UNCHECKED_BG = 'bg-star-dust/20';

/** Track background when checked (default) */
export const SWITCH_TRACK_CHECKED_BG = 'bg-neurospark';

/** Thumb background */
export const SWITCH_THUMB_BG = 'bg-white';

/** Focus ring color */
export const SWITCH_FOCUS_RING = 'focus-visible:ring-neurospark/50';

/** Label text color */
export const SWITCH_LABEL_TEXT = 'text-star-dust/80';

/** Label error text color (Tailwind's own red — no `error` token in theme) */
export const SWITCH_LABEL_ERROR_TEXT = 'text-red-400';

/** Helper text color */
export const SWITCH_HELPER_TEXT = 'text-star-dust/40';

/** Disabled opacity */
export const SWITCH_DISABLED_OPACITY = 'disabled:opacity-50';

/** Disabled cursor */
export const SWITCH_DISABLED_CURSOR = 'disabled:cursor-not-allowed';

// ─── Size Tokens ───────────────────────────────────────────────────────────
/** Track dimensions per size */
export const SWITCH_TRACK_SIZE = {
  sm: {
    width: 'w-8',
    height: 'h-4',
  },
  md: {
    width: 'w-10',
    height: 'h-5',
  },
  lg: {
    width: 'w-12',
    height: 'h-6',
  },
} as const;

/** Thumb dimensions per size */
export const SWITCH_THUMB_SIZE = {
  sm: {
    width: 'w-3',
    height: 'h-3',
  },
  md: {
    width: 'w-4',
    height: 'h-4',
  },
  lg: {
    width: 'w-5',
    height: 'h-5',
  },
} as const;

/** Thumb travel per size — FULL static classes (a runtime-assembled
 *  `data-[state=checked]:${x}` never reaches the compiled CSS). */
export const SWITCH_THUMB_TRANSLATE = {
  sm: 'data-[state=checked]:translate-x-4',
  md: 'data-[state=checked]:translate-x-5',
  lg: 'data-[state=checked]:translate-x-6',
} as const;

export type SwitchSize = keyof typeof SWITCH_TRACK_SIZE;

// ─── Transition ────────────────────────────────────────────────────────────
/** Transition duration for track and thumb (static; `duration-200ms` was
 *  never a real class) */
export const SWITCH_TRANSITION_DURATION = 'duration-200';

// ─── Label Size Classes ────────────────────────────────────────────────────
export const SWITCH_LABEL_SIZE = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
} as const;

// ─── Base Classes ──────────────────────────────────────────────────────────
/** Base track classes (shared across all variants) */
export const SWITCH_TRACK_BASE = [
  'relative',
  'rounded-full',
  'transition-all',
  SWITCH_TRANSITION_DURATION,
  'focus:outline-none',
  SWITCH_FOCUS_RING,
  SWITCH_DISABLED_OPACITY,
  SWITCH_DISABLED_CURSOR,
] as const;

/** Base thumb classes (shared across all sizes) */
export const SWITCH_THUMB_BASE = [
  'absolute',
  'top-1/2',
  '-translate-y-1/2',
  'left-0.5',
  'rounded-full',
  SWITCH_THUMB_BG,
  'transition-transform',
  SWITCH_TRANSITION_DURATION,
] as const;