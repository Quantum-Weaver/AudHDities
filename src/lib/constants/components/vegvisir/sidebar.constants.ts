// src/lib/constants/components/ui/sidebar.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SIDEBAR CONSTANTS                                      ║
// ║                    Single source of truth — sizing, widths, breakpoints   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { SPACING_SCALE, BREAKPOINTS } from '@/lib/constants/cosmic';

// ─── Widths ─────────────────────────────────────────────────────────────────
/** Default expanded sidebar width in pixels */
export const SIDEBAR_DEFAULT_WIDTH = 260;

/** Default collapsed sidebar width in pixels */
export const SIDEBAR_COLLAPSED_WIDTH = 72;

// ─── Padding ────────────────────────────────────────────────────────────────
/** Padding when expanded — horizontal */
export const SIDEBAR_PADDING_X_EXPANDED = 'px-4';

/** Padding when expanded — vertical */
export const SIDEBAR_PADDING_Y_EXPANDED = 'py-3';

/** Padding when collapsed */
export const SIDEBAR_PADDING_COLLAPSED = 'p-2';

/** Navigation container padding when expanded */
export const SIDEBAR_NAV_PADDING_EXPANDED = 'p-3';

/** Navigation container padding when collapsed */
export const SIDEBAR_NAV_PADDING_COLLAPSED = 'p-2';

/** Footer padding when expanded */
export const SIDEBAR_FOOTER_PADDING_EXPANDED = 'p-3';

/** Footer padding when collapsed */
export const SIDEBAR_FOOTER_PADDING_COLLAPSED = 'p-2';

// ─── Item Spacing ───────────────────────────────────────────────────────────
/** Gap between nav items */
export const SIDEBAR_NAV_GAP = 'gap-1';

/** Indent per depth level in pixels */
export const SIDEBAR_ITEM_DEPTH_INDENT = 16;

/** Base padding left for items (when expanded, depth 0) in pixels */
export const SIDEBAR_ITEM_BASE_PADDING_LEFT = 12;

/** Padding right for items in pixels */
export const SIDEBAR_ITEM_PADDING_RIGHT = 12;

/** Gap between icon and label */
export const SIDEBAR_ITEM_GAP = 'gap-3';

/** Vertical padding for nav items */
export const SIDEBAR_ITEM_PADDING_Y = 'py-2';

// ─── Sub-item Indentation ───────────────────────────────────────────────────
/** Left margin for child items container */
export const SIDEBAR_CHILDREN_MARGIN_LEFT = 'ml-4';

/** Top margin for child items container */
export const SIDEBAR_CHILDREN_MARGIN_TOP = 'mt-1';

/** Gap between child items */
export const SIDEBAR_CHILDREN_GAP = 'space-y-1';

// ─── Toggle Button ──────────────────────────────────────────────────────────
/** Toggle button padding */
export const SIDEBAR_TOGGLE_PADDING = 'p-1';

/** Toggle button border radius */
export const SIDEBAR_TOGGLE_RADIUS = 'rounded-md';

// ─── Badge ──────────────────────────────────────────────────────────────────
/** Badge horizontal padding */
export const SIDEBAR_BADGE_PADDING_X = 'px-1.5';

/** Badge vertical padding */
export const SIDEBAR_BADGE_PADDING_Y = 'py-0.5';

/** Badge border radius */
export const SIDEBAR_BADGE_RADIUS = 'rounded-full';

/** Badge font size */
export const SIDEBAR_BADGE_FONT_SIZE = 'text-xs';

/** Badge font weight */
export const SIDEBAR_BADGE_FONT_WEIGHT = 'font-medium';

// ─── Group Label ────────────────────────────────────────────────────────────
/** Group label bottom margin */
export const SIDEBAR_GROUP_LABEL_MARGIN_BOTTOM = 'mb-2';

/** Group label horizontal padding */
export const SIDEBAR_GROUP_LABEL_PADDING_X = 'px-3';

/** Group label font size */
export const SIDEBAR_GROUP_LABEL_FONT_SIZE = 'text-xs';

/** Group label font weight */
export const SIDEBAR_GROUP_LABEL_FONT_WEIGHT = 'font-medium';

/** Group label text transform */
export const SIDEBAR_GROUP_LABEL_TRANSFORM = 'uppercase';

/** Group label letter spacing */
export const SIDEBAR_GROUP_LABEL_TRACKING = 'tracking-wider';

/** Group container top margin (except first) */
export const SIDEBAR_GROUP_MARGIN_TOP = 'mt-4';

// ─── Divider ────────────────────────────────────────────────────────────────
/** Divider classes for header/footer borders */
export const SIDEBAR_DIVIDER_CLASSES = 'border-white/10';

// ─── Mobile ─────────────────────────────────────────────────────────────────
/** Mobile breakpoint from COSMIC system */
export const SIDEBAR_MOBILE_BREAKPOINT = BREAKPOINTS.md;

/** Mobile overlay background */
export const SIDEBAR_MOBILE_OVERLAY_BG = 'bg-black/80';

/** Mobile toggle button padding */
export const SIDEBAR_MOBILE_TOGGLE_PADDING = 'p-2';

/** Mobile toggle button border radius */
export const SIDEBAR_MOBILE_TOGGLE_RADIUS = 'rounded-md';

/** Z-index for mobile toggle */
export const SIDEBAR_MOBILE_TOGGLE_Z = 'z-50';

/** Z-index for sidebar */
export const SIDEBAR_Z_INDEX = 'z-40';

// ─── Transition ─────────────────────────────────────────────────────────────
/** Transition duration class */
export const SIDEBAR_TRANSITION_DURATION = 'duration-300';

/** Transition property */
export const SIDEBAR_TRANSITION = 'transition-all';

/** Mobile drawer transition */
export const SIDEBAR_MOBILE_TRANSITION = 'transition-transform duration-300';

// ─── Icon Sizes ─────────────────────────────────────────────────────────────
/** Icon size when expanded (Tailwind class) */
export const SIDEBAR_ICON_SIZE_EXPANDED = 'text-lg';

/** Icon size when collapsed (Tailwind class) */
export const SIDEBAR_ICON_SIZE_COLLAPSED = 'text-xl';

/** Chevron icon size */
export const SIDEBAR_CHEVRON_SIZE = 'h-4 w-4';

/** Toggle icon size */
export const SIDEBAR_TOGGLE_ICON_SIZE = 'h-4 w-4';

/** Mobile menu icon size */
export const SIDEBAR_MOBILE_ICON_SIZE = 'h-5 w-5';

// ─── Brand ──────────────────────────────────────────────────────────────────
/** Brand text size */
export const SIDEBAR_BRAND_FONT_SIZE = 'text-lg';

/** Brand font weight */
export const SIDEBAR_BRAND_FONT_WEIGHT = 'font-bold';

// ─── User Info ──────────────────────────────────────────────────────────────
/** User name font size */
export const SIDEBAR_USER_NAME_SIZE = 'text-sm';

/** User name font weight */
export const SIDEBAR_USER_NAME_WEIGHT = 'font-medium';

/** User email font size */
export const SIDEBAR_USER_EMAIL_SIZE = 'text-xs';

/** Footer item gap */
export const SIDEBAR_FOOTER_GAP = 'gap-3';
