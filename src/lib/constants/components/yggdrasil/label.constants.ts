// src/lib/constants/components/yggdrasil/label.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    LABEL CONSTANTS                                        ║
// ║                    Single source of truth — no magic values               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { DURATIONS } from '@/lib/constants/cosmic/motion';

// ─── Transition ────────────────────────────────────────────────────────────
/** Transition duration for label state changes (color, position) */
export const LABEL_TRANSITION_DURATION = `${DURATIONS.fast}ms`;

// ─── Disabled State ────────────────────────────────────────────────────────
/** Opacity applied to disabled labels */
export const LABEL_DISABLED_OPACITY = 'opacity-50';

// ─── Floating Position ─────────────────────────────────────────────────────
/** Left offset for floating labels */
export const LABEL_FLOATING_LEFT = 'left-3';

/** Top offset for floating labels when elevated */
export const LABEL_FLOATING_TOP = '-top-2.5';

// ─── After Content Indicators ──────────────────────────────────────────────
/** Spacing between label text and indicator */
export const LABEL_INDICATOR_SPACING = {
  REQUIRED: 'after:ml-0.5',
  OPTIONAL: 'after:ml-1',
} as const;

// ─── Base Classes ──────────────────────────────────────────────────────────
/** Base classes applied to all label variants */
export const LABEL_BASE_CLASSES = [
  'block',
  'font-medium',
  'transition-all',
  `duration-[${LABEL_TRANSITION_DURATION}]`,
] as const;