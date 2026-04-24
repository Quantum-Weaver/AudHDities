// src/lib/constants/components/ui/checkbox.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    CHECKBOX CONSTANTS                                     ║
// ║                    Single source of truth — sizing, icons, text           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { SPACING_SCALE } from '@/lib/constants/cosmic/dimensions';
import { FONT_SIZES } from '@/lib/constants/cosmic/dimensions';

// ─── Checkbox Container Dimensions ─────────────────────────────────────────
/** Map size key to Tailwind width/height class */
export const CHECKBOX_SIZE = {
  SM: 'w-3.5 h-3.5',
  MD: 'w-4 h-4',
  LG: 'w-5 h-5',
} as const;

// ─── Check Icon Dimensions ─────────────────────────────────────────────────
/** Map size key to Tailwind icon size classes */
export const CHECK_ICON_SIZE = {
  SM: 'h-2 w-2',
  MD: 'h-2.5 w-2.5',
  LG: 'h-3 w-3',
} as const;

// ─── Label Text Sizes ──────────────────────────────────────────────────────
/** Map size key to label font size */
export const CHECKBOX_LABEL_SIZE = {
  SM: 'text-xs',
  MD: 'text-sm',
  LG: 'text-base',
} as const;

// ─── Layout Spacing ────────────────────────────────────────────────────────
export const CHECKBOX_SPACING = {
  /** Gap between checkbox and label */
  GAP: 'gap-1.5',
  /** Left padding for helper/error text (aligns with checkbox width + gap) */
  HELPER_INDENT: 'pl-[26px]',
} as const;

// ─── Label/Text Opacity Tokens ─────────────────────────────────────────────
export const CHECKBOX_TEXT_OPACITY = {
  LABEL: 'text-star-dust/80',
  HELPER: 'text-star-dust/40',
  DISABLED: 'opacity-50',
} as const;

// ─── Error Tokens ──────────────────────────────────────────────────────────
export const CHECKBOX_ERROR = {
  BORDER: 'border-fire-base',
  TEXT: 'text-fire-base',
} as const;

export type CheckboxSize = keyof typeof CHECKBOX_SIZE;