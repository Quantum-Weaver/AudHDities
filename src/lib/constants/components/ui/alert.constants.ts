// src/lib/constants/components/ui/alert.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    ALERT CONSTANTS                                        ║
// ║                    Single source of truth — sizing, spacing, icons        ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { SPACING_SCALE, BORDER_RADII, FONT_SIZES, FONT_WEIGHTS } from '@/lib/constants/cosmic';

// ─── Padding ───────────────────────────────────────────────────────────────
/** Base alert padding */
export const ALERT_PADDING = {
  DEFAULT: 'p-4',    // 16px
  COMPACT: 'p-3',    // 12px
} as const;

// ─── Flex Gap ──────────────────────────────────────────────────────────────
/** Gap between icon and content */
export const ALERT_GAP = 'gap-3'; // 12px

// ─── Border Radius ─────────────────────────────────────────────────────────
export const ALERT_BORDER_RADIUS = 'rounded-lg';

// ─── Icon Sizing ───────────────────────────────────────────────────────────
export const ALERT_ICON_SIZE = {
  DEFAULT: 'h-5 w-5',   // 20px
  DISMISS: 'h-4 w-4',   // 16px
} as const;

// ─── Dismiss Button ────────────────────────────────────────────────────────
export const ALERT_DISMISS = {
  PADDING: 'p-1',
  RADIUS: 'rounded-md',
} as const;

// ─── Typography ────────────────────────────────────────────────────────────
export const ALERT_TYPOGRAPHY = {
  TITLE: {
    DEFAULT: 'text-base',
    COMPACT: 'text-sm',
  },
  BODY: {
    DEFAULT: 'text-sm',
    COMPACT: 'text-xs',
  },
  WEIGHT: 'font-medium',
} as const;

// ─── Spacing between title and body ────────────────────────────────────────
export const ALERT_CONTENT_GAP = 'mt-1';

// ─── Group Spacing ─────────────────────────────────────────────────────────
export const ALERT_GROUP_SPACING = {
  SM: 'space-y-2',
  MD: 'space-y-3',
  LG: 'space-y-4',
} as const;

export type AlertGroupSpacing = keyof typeof ALERT_GROUP_SPACING;

// ─── Focus Ring ────────────────────────────────────────────────────────────
export const ALERT_FOCUS_RING = 'focus:outline-none focus:ring-2 focus:ring-white/20';

// ─── Dismiss Button Colors (opacity-based, component applies) ──────────────
export const ALERT_DISMISS_COLORS = {
  DEFAULT: 'text-white/40',
  HOVER: 'text-white/80 hover:bg-white/10',
} as const;

// ─── Content Text Colors ───────────────────────────────────────────────────
export const ALERT_TEXT_COLORS = {
  TITLE: 'text-white',
  BODY: 'text-white/70',
} as const;

// ─── Default Icons Map Key ─────────────────────────────────────────────────
/** Maps variant to Lucide icon component name */
export const ALERT_DEFAULT_ICONS = {
  INFO: 'Info',
  SUCCESS: 'CheckCircle',
  WARNING: 'AlertCircle',
  ERROR: 'XCircle',
  QUANTUM: 'Sparkles',
} as const;

export type AlertDefaultIcon = (typeof ALERT_DEFAULT_ICONS)[keyof typeof ALERT_DEFAULT_ICONS];