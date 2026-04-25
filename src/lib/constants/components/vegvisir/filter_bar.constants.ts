// src/lib/constants/components/shared/filter_bar.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FILTER BAR CONSTANTS                                   ║
// ║                    Layout tokens, defaults, opacity                       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { SPACING_SCALE } from '@/lib/constants/cosmic/dimensions';
import { TEXT_SIZES } from '@/lib/constants/cosmic/typography';

// ─── Layout ────────────────────────────────────────────────────────────────
/** Gap between filter buttons */
export const FILTER_BAR_GAP = SPACING_SCALE['2']; // 8px

/** Margin between label and count badge */
export const FILTER_BAR_COUNT_MARGIN = SPACING_SCALE['1']; // 4px

// ─── Typography ────────────────────────────────────────────────────────────
/** Font size for the count badge */
export const FILTER_BAR_COUNT_FONT_SIZE = TEXT_SIZES.xs;

// ─── Opacity Tokens ────────────────────────────────────────────────────────
/** Opacity for the count badge text */
export const FILTER_BAR_COUNT_OPACITY = 'opacity-70';

// ─── Defaults ──────────────────────────────────────────────────────────────
/** Default label for the "show all" button */
export const FILTER_BAR_DEFAULT_ALL_LABEL = 'All';

/** Default value for showAll prop */
export const FILTER_BAR_DEFAULT_SHOW_ALL = true;