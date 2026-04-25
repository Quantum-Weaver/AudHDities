// src/lib/constants/components/ui/accordion.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    ACCORDION CONSTANTS                                    ║
// ║                    Single source of truth — sizing, padding, animation    ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { SPACING_SCALE, BORDER_RADII } from '@/lib/constants/cosmic';

// ─── Size Tokens ────────────────────────────────────────────────────────────
export const ACCORDION_SIZES = {
  sm: {
    text: 'text-sm',
    triggerPadding: 'py-2 px-3',
    contentPadding: 'px-3 pb-3 pt-0',
  },
  md: {
    text: 'text-base',
    triggerPadding: 'py-3 px-4',
    contentPadding: 'px-4 pb-4 pt-0',
  },
  lg: {
    text: 'text-lg',
    triggerPadding: 'py-4 px-5',
    contentPadding: 'px-5 pb-5 pt-0',
  },
} as const;

export type AccordionSize = keyof typeof ACCORDION_SIZES;

// ─── Border Radius ──────────────────────────────────────────────────────────
export const ACCORDION_RADIUS_DEFAULT = 'rounded-lg';
export const ACCORDION_RADIUS_SEPARATED = 'rounded-xl';

// ─── Container Spacing (per variant) ────────────────────────────────────────
export const ACCORDION_CONTAINER_SPACING = {
  default: 'space-y-1',
  bordered: '', // handled by divide
  separated: 'space-y-3',
  minimal: 'space-y-0',
} as const;

// ─── Divider ────────────────────────────────────────────────────────────────
export const ACCORDION_DIVIDER_COLOR = 'divide-white/10';

// ─── Icon ───────────────────────────────────────────────────────────────────
export const ACCORDION_ICON_SIZE = 'h-4 w-4';
export const ACCORDION_ICON_TRANSITION = 'transition-transform duration-200';
export const ACCORDION_ICON_ROTATE_OPEN = 'rotate-180';

// ─── Animation ──────────────────────────────────────────────────────────────
export const ACCORDION_CONTENT_TRANSITION = 'transition-all duration-200 ease-in-out';
export const ACCORDION_CONTENT_MAX_HEIGHT_OPEN = 'max-h-[1000px]';
export const ACCORDION_CONTENT_MAX_HEIGHT_CLOSED = 'max-h-0';
export const ACCORDION_CONTENT_OPACITY_OPEN = 'opacity-100';
export const ACCORDION_CONTENT_OPACITY_CLOSED = 'opacity-0';

/** Delay before applying open animation (ms) — allows DOM mount first */
export const ACCORDION_ANIMATION_OPEN_DELAY = 10;

/** Duration of close animation before unmounting (ms) — must match duration-200 */
export const ACCORDION_ANIMATION_CLOSE_DELAY = 200;

// ─── Content Bottom Padding ─────────────────────────────────────────────────
export const ACCORDION_CONTENT_INNER_PADDING_BOTTOM = 'pb-4';

// ─── Nested Levels ──────────────────────────────────────────────────────────
export const ACCORDION_NESTED_INDENT = {
  1: 'ml-0',
  2: 'ml-4',
  3: 'ml-8',
  4: 'ml-12',
} as const;

// ─── Disabled State ─────────────────────────────────────────────────────────
export const ACCORDION_DISABLED_CLASSES = 'opacity-50 cursor-not-allowed';

// ─── Trigger Base ───────────────────────────────────────────────────────────
export const ACCORDION_TRIGGER_BASE_CLASSES = [
  'group',
  'w-full',
  'flex',
  'items-center',
  'justify-between',
  'gap-2',
  'transition-all',
] as const;

export const ACCORDION_TRIGGER_TEXT_CLASSES = 'flex-1 text-left font-medium';