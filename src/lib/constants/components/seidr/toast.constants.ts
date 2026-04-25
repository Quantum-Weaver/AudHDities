// src/lib/constants/components/seidr/toast.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    TOAST CONSTANTS                                        ║
// ║                    Single source of truth — no magic values               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { SPACING_SCALE } from '@/lib/constants/cosmic/dimensions';
import { durations } from '@/lib/constants/cosmic/motion';

// ─── Duration ──────────────────────────────────────────────────────────────
/** Default duration before auto-dismiss (ms) */
export const TOAST_DEFAULT_DURATION = durations.normal * 10; // 3000ms

/** Duration for error/warning toasts (ms) — stays longer */
export const TOAST_ERROR_DURATION = durations.slow * 10; // 5000ms

/** Duration for the close animation (ms) */
export const TOAST_CLOSE_ANIMATION_DURATION = durations.fast; // 150ms

/** Duration mapped by variant */
export const TOAST_DURATION_BY_VARIANT = {
  info: TOAST_DEFAULT_DURATION,
  success: TOAST_DEFAULT_DURATION,
  warning: TOAST_ERROR_DURATION,
  error: TOAST_ERROR_DURATION,
  quantum: durations.quantum * 5, // 3500ms
} as const;

// ─── Sizing ────────────────────────────────────────────────────────────────
/** Toast width */
export const TOAST_WIDTH = 'w-80'; // 320px = SPACING_SCALE['80']

/** Gap between stacked toasts */
export const TOAST_GAP = 'gap-2'; // 8px

/** Padding inside toast */
export const TOAST_PADDING = 'p-4'; // 16px

// ─── Positioning ───────────────────────────────────────────────────────────
/** Offset from viewport edge */
export const TOAST_VIEWPORT_OFFSET = '4'; // matches top-4, bottom-4

/** Z-index for toast layer */
export const TOAST_Z_INDEX = 'z-50';

// ─── Limits ────────────────────────────────────────────────────────────────
/** Maximum number of visible toasts */
export const TOAST_MAX_COUNT = 5;

// ─── Close Button ──────────────────────────────────────────────────────────
export const TOAST_CLOSE_BUTTON = {
  PADDING: 'p-1',
  RADIUS: 'rounded-md',
  ICON_SIZE: 'h-4 w-4',
} as const;

// ─── Icon ──────────────────────────────────────────────────────────────────
export const TOAST_ICON_SIZE = 'h-5 w-5';

// ─── Content Spacing ───────────────────────────────────────────────────────
export const TOAST_CONTENT_GAP = 'gap-3';
export const TOAST_TITLE_MARGIN = 'mt-1';
export const TOAST_ACTION_MARGIN = 'mt-2';

// ─── Base Classes ──────────────────────────────────────────────────────────
export const TOAST_BASE_CLASSES = [
  'relative',
  'flex',
  TOAST_WIDTH,
  TOAST_CONTENT_GAP,
  'rounded-lg',
  'border',
  TOAST_PADDING,
  'shadow-lg',
  'backdrop-blur-sm',
  'transition-all',
] as const;

/** Toast container base classes */
export const TOAST_CONTAINER_BASE_CLASSES = [
  'fixed',
  TOAST_Z_INDEX,
  'flex',
  'flex-col',
  TOAST_GAP,
] as const;