// src/lib/constants/components/ui/progress.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    PROGRESS CONSTANTS                                     ║
// ║                    Single source of truth — sizes, labels, SVG            ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { BORDER_RADII, TEXT_COLORS } from '@/lib/constants/cosmic';

// ─── Sizes ──────────────────────────────────────────────────────────────────
/** Height classes per size */
export const PROGRESS_SIZE_HEIGHTS = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
} as const;

// ─── Radius ─────────────────────────────────────────────────────────────────
export const PROGRESS_RADIUS = 'rounded-full';

// ─── Overflow ───────────────────────────────────────────────────────────────
export const PROGRESS_OVERFLOW = 'overflow-hidden';

// ─── Transition ─────────────────────────────────────────────────────────────
export const PROGRESS_FILL_TRANSITION = 'transition-all duration-300 ease-out';

// ─── Label ──────────────────────────────────────────────────────────────────
export const PROGRESS_LABEL_SIZE = 'text-xs';
export const PROGRESS_LABEL_WEIGHT = 'font-medium';
export const PROGRESS_LABEL_COLOR = 'text-white/60';

// ─── Circular Label ─────────────────────────────────────────────────────────
export const PROGRESS_CIRCULAR_LABEL_SIZE = 'text-sm';
export const PROGRESS_CIRCULAR_LABEL_WEIGHT = 'font-medium';
export const PROGRESS_CIRCULAR_LABEL_COLOR = 'text-white';

// ─── Label Position Layouts ─────────────────────────────────────────────────
export const PROGRESS_LABEL_POSITION_LAYOUTS = {
  left: 'flex-row items-center gap-2',
  right: 'flex-row items-center gap-2',
  top: 'flex-col gap-1',
  bottom: 'flex-col gap-1',
} as const;

// ─── Indeterminate ──────────────────────────────────────────────────────────
export const PROGRESS_INDETERMINATE_WIDTH = '30%';

// ─── Stripe ─────────────────────────────────────────────────────────────────
export const PROGRESS_STRIPE_GRADIENT =
  'bg-gradient-to-r from-transparent via-white/20 to-transparent';
export const PROGRESS_STRIPE_SIZE = 'bg-[length:1rem_1rem]';

// ─── Circular Defaults ──────────────────────────────────────────────────────
export const PROGRESS_CIRCULAR_DEFAULT_SIZE = 60;
export const PROGRESS_CIRCULAR_DEFAULT_STROKE = 4;

// ─── SVG ────────────────────────────────────────────────────────────────────
export const PROGRESS_SVG_ROTATION = 'transform -rotate-90';
export const PROGRESS_SVG_STROKE_CAP = 'strokeLinecap="round"';

// ─── Base Classes ───────────────────────────────────────────────────────────
export const PROGRESS_BASE_CLASSES = ['w-full', PROGRESS_RADIUS, PROGRESS_OVERFLOW] as const;

export const PROGRESS_FILL_BASE_CLASSES = [
  'h-full',
  PROGRESS_RADIUS,
  PROGRESS_FILL_TRANSITION,
] as const;