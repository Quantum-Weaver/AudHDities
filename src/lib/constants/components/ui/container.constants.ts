// src/lib/constants/components/ui/container.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    CONTAINER CONSTANTS                                    ║
// ║                    Single source of truth — sizes, padding, spacing       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import {
  CONTAINER_MAX_WIDTHS,
  SPACING_SCALE,
  BREAKPOINTS,
} from '@/lib/constants/cosmic';

// ─── Size Map ───────────────────────────────────────────────────────────────
/** Maps container size keys to Tailwind max-width classes */
export const CONTAINER_SIZE_CLASSES = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-full',
  fluid: 'max-w-full',
} as const;

// ─── Horizontal Padding Map ─────────────────────────────────────────────────
/** Maps padding size to horizontal padding classes */
export const CONTAINER_PADDING_X_CLASSES = {
  none: 'px-0',
  sm: 'px-4',
  md: 'px-6',
  lg: 'px-8',
  xl: 'px-12',
} as const;

// ─── Vertical Padding Map ───────────────────────────────────────────────────
/** Maps padding size to vertical padding classes */
export const CONTAINER_PADDING_Y_CLASSES = {
  none: 'py-0',
  sm: 'py-4',
  md: 'py-6',
  lg: 'py-8',
  xl: 'py-12',
} as const;

// ─── Top Padding Map ────────────────────────────────────────────────────────
export const CONTAINER_PADDING_TOP_CLASSES = {
  none: 'pt-0',
  sm: 'pt-4',
  md: 'pt-6',
  lg: 'pt-8',
  xl: 'pt-12',
} as const;

// ─── Bottom Padding Map ─────────────────────────────────────────────────────
export const CONTAINER_PADDING_BOTTOM_CLASSES = {
  none: 'pb-0',
  sm: 'pb-4',
  md: 'pb-6',
  lg: 'pb-8',
  xl: 'pb-12',
} as const;

// ─── Responsive Horizontal Padding Map ──────────────────────────────────────
/** Maps padding size to responsive horizontal padding (larger on desktop) */
export const CONTAINER_RESPONSIVE_PADDING_X_CLASSES = {
  none: 'px-0',
  sm: 'px-4 md:px-6',
  md: 'px-6 md:px-8',
  lg: 'px-8 md:px-12',
  xl: 'px-12 md:px-16',
} as const;

// ─── Visual Modifiers ───────────────────────────────────────────────────────
export const CONTAINER_BORDER_CLASSES = 'border border-white/10';
export const CONTAINER_BACKGROUND_CLASSES = 'bg-white/5 backdrop-blur-sm';
export const CONTAINER_ELEVATED_CLASSES = 'shadow-lg';

// ─── Centering ──────────────────────────────────────────────────────────────
export const CONTAINER_CENTERED_CLASS = 'mx-auto';

// ─── Base ───────────────────────────────────────────────────────────────────
export const CONTAINER_BASE_CLASS = 'w-full';

// ─── Composition Sub-Components ─────────────────────────────────────────────
/** ContainerHeader bottom margin */
export const CONTAINER_HEADER_MARGIN_BOTTOM = 'mb-8';

/** ContainerBody gap between children */
export const CONTAINER_BODY_GAP = 'space-y-6';

/** ContainerFooter top margin */
export const CONTAINER_FOOTER_MARGIN_TOP = 'mt-8';

/** ContainerFooter top padding */
export const CONTAINER_FOOTER_PADDING_TOP = 'pt-6';

/** ContainerFooter divider */
export const CONTAINER_FOOTER_DIVIDER = 'border-t border-white/10';