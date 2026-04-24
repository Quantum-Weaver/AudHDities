// src/lib/constants/components/ui/tabs.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    TABS CONSTANTS                                         ║
// ║                    All sizing, color tokens, class fragments              ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';
import { SPACING_SCALE, BORDER_RADII, BUTTON_DIMENSIONS } from '@/lib/constants/cosmic/dimensions';
import { SHADOWS } from '@/lib/constants/cosmic/effects';
import { durations } from '@/lib/constants/cosmic/motion';

// ─── Color Tokens (derived from COSMIC) ────────────────────────────────────
const neurospark = QUANTUM_COLORS['neurospark'];   // #22D3EE — active state
const starDust = QUANTUM_COLORS['starDust'];       // #E0E0E0 — text/backgrounds
const success = QUANTUM_COLORS['success'];          // #00B894
const warning = QUANTUM_COLORS['warning'];          // #FDCB6E

// ─── Active State Colors ───────────────────────────────────────────────────
export const TABS_ACTIVE_BORDER = `border-[${neurospark}]`;
export const TABS_ACTIVE_TEXT = `text-[${neurospark}]`;
export const TABS_ACTIVE_BG_PILL = `bg-[${neurospark}]/20`;
export const TABS_ACTIVE_BG_BORDERED = `bg-[${starDust}]/10`;
export const TABS_ACTIVE_SHADOW = SHADOWS.sm;
export const TABS_ACTIVE_BAR = `bg-[${neurospark}]`;

// ─── Inactive State Colors ─────────────────────────────────────────────────
export const TABS_INACTIVE_TEXT = `text-[${starDust}]/60`;
export const TABS_INACTIVE_HOVER_TEXT = `hover:text-[${starDust}]`;
export const TABS_INACTIVE_HOVER_BORDER = `hover:border-[${starDust}]/20`;
export const TABS_INACTIVE_HOVER_BG = `hover:bg-[${starDust}]/5`;
export const TABS_INACTIVE_BORDER = 'border-transparent';

// ─── Focus Ring ────────────────────────────────────────────────────────────
export const TABS_FOCUS_RING = `focus-visible:ring-2 focus-visible:ring-[${neurospark}] focus-visible:ring-offset-2`;

// ─── Disabled State ────────────────────────────────────────────────────────
export const TABS_DISABLED = 'disabled:opacity-50 disabled:cursor-not-allowed';

// ─── List Colors ───────────────────────────────────────────────────────────
export const TABS_LIST_BORDER = `border-[${starDust}]/10`;
export const TABS_LIST_BG_BORDERED = `bg-[${starDust}]/5`;

// ─── Size Tokens (horizontal height, vertical width) ───────────────────────
export const TABS_SIZE = {
  sm: {
    dimension: 'h-9',     // 36px
    fontSize: 'text-sm',  // 14px
  },
  md: {
    dimension: 'h-10',    // 40px
    fontSize: 'text-base', // 16px
  },
  lg: {
    dimension: 'h-11',    // 44px
    fontSize: 'text-lg',  // 20px
  },
} as const;

export type TabsSize = keyof typeof TABS_SIZE;

// ─── Orientation Classes ───────────────────────────────────────────────────
export const TABS_ORIENTATION = {
  horizontal: {
    container: 'flex-col',
    list: `flex-row border-b ${TABS_LIST_BORDER}`,
    listFullWidth: 'w-full',
    triggerPadding: 'px-4',
    panelMargin: '',
  },
  vertical: {
    container: 'flex-row',
    list: `flex-col border-r ${TABS_LIST_BORDER}`,
    listFullWidth: '',
    triggerPadding: 'px-3 py-2',
    panelMargin: 'flex-1 pl-6',
  },
} as const;

export type TabsOrientation = keyof typeof TABS_ORIENTATION;

// ─── Variant Classes (per sub-component) ───────────────────────────────────
export const TABS_LIST_VARIANT = {
  underline: '',
  pill: 'gap-2',
  bordered: `gap-1 p-1 ${BORDER_RADII.lg} ${TABS_LIST_BG_BORDERED}`,
  minimal: 'gap-4',
} as const;

export type TabsVariant = keyof typeof TABS_LIST_VARIANT;

// ─── Trigger Variant Classes ───────────────────────────────────────────────
export const TABS_TRIGGER_VARIANT = {
  underline: {
    active: `border-b-2 -mb-px ${TABS_ACTIVE_BORDER} ${TABS_ACTIVE_TEXT}`,
    inactive: `border-b-2 -mb-px ${TABS_INACTIVE_BORDER} ${TABS_INACTIVE_TEXT} ${TABS_INACTIVE_HOVER_TEXT} ${TABS_INACTIVE_HOVER_BORDER}`,
  },
  pill: {
    active: `rounded-full ${TABS_ACTIVE_BG_PILL} ${TABS_ACTIVE_TEXT}`,
    inactive: `rounded-full ${TABS_INACTIVE_TEXT} ${TABS_INACTIVE_HOVER_TEXT} ${TABS_INACTIVE_HOVER_BG}`,
  },
  bordered: {
    active: `rounded-md ${TABS_ACTIVE_BG_BORDERED} text-[${starDust}] ${TABS_ACTIVE_SHADOW}`,
    inactive: `rounded-md ${TABS_INACTIVE_TEXT} ${TABS_INACTIVE_HOVER_TEXT} ${TABS_INACTIVE_HOVER_BG}`,
  },
  minimal: {
    active: `relative ${TABS_ACTIVE_TEXT} after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 ${TABS_ACTIVE_BAR}`,
    inactive: `${TABS_INACTIVE_TEXT} ${TABS_INACTIVE_HOVER_TEXT}`,
  },
} as const;

// ─── Badge Variant Colors ──────────────────────────────────────────────────
export const TABS_BADGE_VARIANT = {
  default: {
    bg: `bg-[${starDust}]/20`,
    text: `text-[${starDust}]`,
  },
  primary: {
    bg: `bg-[${neurospark}]/20`,
    text: `text-[${neurospark}]`,
  },
  success: {
    bg: `bg-[${success}]/20`,
    text: `text-[${success}]`,
  },
  warning: {
    bg: `bg-[${warning}]/20`,
    text: `text-[${warning}]`,
  },
} as const;

export type TabsBadgeVariant = keyof typeof TABS_BADGE_VARIANT;

// ─── Badge Size Tokens ─────────────────────────────────────────────────────
export const TABS_BADGE_CLASSES = 'ml-2 px-1.5 py-0.5 text-xs rounded-full';

// ─── Animation Tokens ──────────────────────────────────────────────────────
export const TABS_ANIMATION_DURATION = durations.fast; // 150ms
export const TABS_ANIMATION_MOUNT_DELAY = 10;          // ms before animating in

// ─── Base Trigger Classes ──────────────────────────────────────────────────
export const TABS_TRIGGER_BASE = [
  'inline-flex items-center justify-center whitespace-nowrap font-medium transition-all',
  TABS_FOCUS_RING,
  TABS_DISABLED,
  'cursor-pointer',
] as const;

// ─── Base Panel Classes ────────────────────────────────────────────────────
export const TABS_PANEL_BASE = [
  TABS_FOCUS_RING,
] as const;