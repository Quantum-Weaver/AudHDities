// src/lib/constants/components/seidr/tooltip.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    TOOLTIP CONSTANTS                                      ║
// ║                    Sourced from COSMIC dimensions + motion                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { SPACING_SCALE } from '@/lib/constants/cosmic/dimensions';

// ─── Positioning ───────────────────────────────────────────────────────────
/** Offset from trigger element in pixels */
export const TOOLTIP_OFFSET = {
  SIDE: 4,                        // 4px — minimum spacing from trigger
  ALIGN: 0,                       // 0px — centered by default
} as const;

// ─── Sizing ────────────────────────────────────────────────────────────────
/** Maximum width before text wrapping (240px = spacing-60 from COSMIC) */
export const TOOLTIP_MAX_WIDTH = 240;

// ─── Delay ─────────────────────────────────────────────────────────────────
/** Default delay before showing tooltip (300ms = COSMIC durations.normal) */
export const TOOLTIP_DEFAULT_DELAY = 300;

// ─── Arrow ─────────────────────────────────────────────────────────────────
/** Arrow dimension and transform tokens */
export const TOOLTIP_ARROW = {
  SIZE: 'size-2.5',                                         // 10px arrow
  RADIUS: 'rounded-[2px]',                                  // Slight rounding
  ROTATION: 'rotate-45',                                    // 45° diamond
  VERTICAL_OFFSET: 'translate-y-[calc(-50%-2px)]',          // Center + 2px offset
} as const;

// ─── Content Base Classes ──────────────────────────────────────────────────
/** Base classes applied to all tooltip content variants */
export const TOOLTIP_CONTENT_BASE_CLASSES = [
  'z-50',
  'inline-flex',
  'w-fit',
  'max-w-xs',
  'origin-(--transform-origin)',
  'items-center',
  'gap-1.5',
  'rounded-md',
  'text-xs',
  'shadow-lg',
] as const;

/** Applied when tooltip content contains a kbd element */
export const TOOLTIP_HAS_KBD_CLASS = 'has-data-[slot=kbd]:pr-1.5' as const;

// ─── Icon Trigger Classes ──────────────────────────────────────────────────
/** Base classes for the TooltipWithIcon trigger wrapper */
export const TOOLTIP_ICON_TRIGGER_CLASSES = [
  'inline-flex',
  'cursor-help',
  'items-center',
  'justify-center',
  'rounded-md',
  'p-1',
  'text-star-dust/60',
  'transition-colors',
  'hover:text-star-dust/80',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-neurospark/20',
] as const;

// ─── Shortcut Trigger Classes ──────────────────────────────────────────────
/** Base classes for the TooltipWithShortcut trigger */
export const TOOLTIP_SHORTCUT_TRIGGER_CLASSES = [
  'inline-flex',
  'items-center',
  'gap-2',
  'rounded-md',
  'px-3',
  'py-1.5',
  'text-sm',
  'text-star-dust/80',
  'hover:bg-white/5',
  'transition-colors',
  'cursor-pointer',
] as const;

/** Classes for the kbd element inside the trigger */
export const TOOLTIP_SHORTCUT_KBD_CLASSES = [
  'rounded',
  'bg-white/10',
  'px-1.5',
  'py-0.5',
  'text-xs',
  'font-mono',
] as const;

/** Classes for the kbd element inside the tooltip content */
export const TOOLTIP_SHORTCUT_KBD_INNER_CLASSES = [
  'rounded',
  'bg-white/20',
  'px-1.5',
  'py-0.5',
  'text-xs',
  'font-mono',
] as const;

// ─── Group Spacing ─────────────────────────────────────────────────────────
export const TOOLTIP_GROUP_SPACING = {
  SM: 'gap-1',   // 4px
  MD: 'gap-2',   // 8px
  LG: 'gap-3',   // 12px
} as const;

export type TooltipGroupSpacing = keyof typeof TOOLTIP_GROUP_SPACING;