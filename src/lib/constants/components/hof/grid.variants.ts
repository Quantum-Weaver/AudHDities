// src/lib/constants/components/hof/grid.variants.ts

import {
  BREAKPOINTS,
  SPACING_SCALE,
  CONTAINER_MAX_WIDTHS,
  SCREEN_CATEGORIES,
} from '@/lib/constants/cosmic/dimensions';

import {
  DOMAIN_COLORS,
  MOOD_COLORS,
  STATUS_COLORS,
} from '@/lib/constants/cosmic/colors';

import {
  durations,
  easing,
  quickAnimations,
} from '@/lib/constants/cosmic/motion';

// ============================================================================
// GRID VARIANTS
// ============================================================================

export const GRID_VARIANTS = {
  PRODUCT: 'product',
  QUEST: 'quest',
  COURSE: 'course',
  EVENT: 'event',
  CREATOR: 'creator',
  VENDOR: 'vendor',
  GALLERY: 'gallery',
  DASHBOARD: 'dashboard',
  ADMIN: 'admin',
  COMPACT: 'compact',
  FEATURED: 'featured',
  MASONRY: 'masonry',
} as const;

export type GridVariant = typeof GRID_VARIANTS[keyof typeof GRID_VARIANTS];

// ============================================================================
// BREAKPOINT KEYS (for consistent access)
// ============================================================================

export const BREAKPOINT_KEYS = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
  WIDE: 'wide',
} as const;

export type BreakpointKey = typeof BREAKPOINT_KEYS[keyof typeof BREAKPOINT_KEYS];

export const GRID_COLUMNS: Record<
  GridVariant,
  {
    mobile: number;   // < 768px
    tablet: number;   // 768px - 1023px
    desktop: number;  // 1024px - 1279px
    wide: number;     // 1280px+
  }
> = {
  [GRID_VARIANTS.PRODUCT]: { mobile: 1, tablet: 2, desktop: 3, wide: 4 },
  [GRID_VARIANTS.QUEST]: { mobile: 1, tablet: 2, desktop: 3, wide: 4 },
  [GRID_VARIANTS.COURSE]: { mobile: 1, tablet: 2, desktop: 2, wide: 3 },
  [GRID_VARIANTS.EVENT]: { mobile: 1, tablet: 2, desktop: 3, wide: 4 },
  [GRID_VARIANTS.CREATOR]: { mobile: 2, tablet: 3, desktop: 4, wide: 6 },
  [GRID_VARIANTS.VENDOR]: { mobile: 2, tablet: 3, desktop: 4, wide: 6 },
  [GRID_VARIANTS.GALLERY]: { mobile: 2, tablet: 3, desktop: 4, wide: 6 },
  [GRID_VARIANTS.DASHBOARD]: { mobile: 1, tablet: 2, desktop: 2, wide: 3 },
  [GRID_VARIANTS.ADMIN]: { mobile: 1, tablet: 1, desktop: 1, wide: 1 },
  [GRID_VARIANTS.COMPACT]: { mobile: 2, tablet: 3, desktop: 4, wide: 6 },
  [GRID_VARIANTS.FEATURED]: { mobile: 1, tablet: 1, desktop: 2, wide: 2 },
  [GRID_VARIANTS.MASONRY]: { mobile: 1, tablet: 2, desktop: 3, wide: 4 },
};

export const GRID_GAPS: Record<GridVariant, string> = {
  [GRID_VARIANTS.PRODUCT]: SPACING_SCALE['6'],   // 24px
  [GRID_VARIANTS.QUEST]: SPACING_SCALE['6'],     // 24px
  [GRID_VARIANTS.COURSE]: SPACING_SCALE['8'],    // 32px
  [GRID_VARIANTS.EVENT]: SPACING_SCALE['6'],     // 24px
  [GRID_VARIANTS.CREATOR]: SPACING_SCALE['4'],   // 16px
  [GRID_VARIANTS.VENDOR]: SPACING_SCALE['4'],    // 16px
  [GRID_VARIANTS.GALLERY]: SPACING_SCALE['2'],   // 8px
  [GRID_VARIANTS.DASHBOARD]: SPACING_SCALE['4'], // 16px
  [GRID_VARIANTS.ADMIN]: SPACING_SCALE['2'],     // 8px
  [GRID_VARIANTS.COMPACT]: SPACING_SCALE['2'],   // 8px
  [GRID_VARIANTS.FEATURED]: SPACING_SCALE['8'],  // 32px
  [GRID_VARIANTS.MASONRY]: SPACING_SCALE['4'],   // 16px
};

// ============================================================================
// CONTAINER MAX WIDTHS BY VARIANT
// ============================================================================

export const GRID_CONTAINER_WIDTHS: Record<GridVariant, string> = {
  [GRID_VARIANTS.PRODUCT]: CONTAINER_MAX_WIDTHS['2xl'],
  [GRID_VARIANTS.QUEST]: CONTAINER_MAX_WIDTHS['2xl'],
  [GRID_VARIANTS.COURSE]: CONTAINER_MAX_WIDTHS.xl,
  [GRID_VARIANTS.EVENT]: CONTAINER_MAX_WIDTHS['2xl'],
  [GRID_VARIANTS.CREATOR]: CONTAINER_MAX_WIDTHS.xl,
  [GRID_VARIANTS.VENDOR]: CONTAINER_MAX_WIDTHS.xl,
  [GRID_VARIANTS.GALLERY]: CONTAINER_MAX_WIDTHS.full,
  [GRID_VARIANTS.DASHBOARD]: CONTAINER_MAX_WIDTHS.xl,
  [GRID_VARIANTS.ADMIN]: CONTAINER_MAX_WIDTHS.xl,
  [GRID_VARIANTS.COMPACT]: CONTAINER_MAX_WIDTHS['2xl'],
  [GRID_VARIANTS.FEATURED]: CONTAINER_MAX_WIDTHS.xl,
  [GRID_VARIANTS.MASONRY]: CONTAINER_MAX_WIDTHS.full,
};

// ============================================================================
// VARIANT CLASSES (Borders, backgrounds, hover effects)
// ============================================================================

export const GRID_VARIANT_CLASSES: Record<GridVariant, string> = {
  [GRID_VARIANTS.PRODUCT]: `border-[${DOMAIN_COLORS.quantum.base}]/20 hover:border-[${DOMAIN_COLORS.quantum.base}]/40`,
  [GRID_VARIANTS.QUEST]: `border-[${MOOD_COLORS.mystical}]/20 hover:border-[${MOOD_COLORS.mystical}]/40`,
  [GRID_VARIANTS.COURSE]: `border-[${DOMAIN_COLORS.library.base}]/20 hover:border-[${DOMAIN_COLORS.library.base}]/40`,
  [GRID_VARIANTS.EVENT]: `border-[${DOMAIN_COLORS.music.base}]/20 hover:border-[${DOMAIN_COLORS.music.base}]/40`,
  [GRID_VARIANTS.CREATOR]: `border-[${DOMAIN_COLORS.community.base}]/20 hover:border-[${DOMAIN_COLORS.community.base}]/40`,
  [GRID_VARIANTS.VENDOR]: `border-[${DOMAIN_COLORS.library.base}]/20 hover:border-[${DOMAIN_COLORS.library.base}]/40`,
  [GRID_VARIANTS.GALLERY]: `border-transparent hover:border-[${DOMAIN_COLORS.quantum.base}]/30`,
  [GRID_VARIANTS.DASHBOARD]: `border-[${DOMAIN_COLORS.architecture.base}]/20 hover:border-[${DOMAIN_COLORS.architecture.base}]/40`,
  [GRID_VARIANTS.ADMIN]: `border-[${STATUS_COLORS.planned}]/20 hover:border-[${STATUS_COLORS.planned}]/40`,
  [GRID_VARIANTS.COMPACT]: `border-[${DOMAIN_COLORS.void.base}]/20 hover:border-[${DOMAIN_COLORS.void.base}]/40`,
  [GRID_VARIANTS.FEATURED]: `border-[${DOMAIN_COLORS.bifrost.base}]/30 shadow-lg shadow-[${DOMAIN_COLORS.bifrost.base}]/10`,
  [GRID_VARIANTS.MASONRY]: `border-transparent`,
};

// ============================================================================
// ANIMATION CONFIGURATIONS
// ============================================================================

// Framer Motion easing values (using built-in strings)
export const FRAMER_EASING = {
  quantum: [0.4, 0, 0.2, 1],      // cubic-bezier(0.4, 0, 0.2, 1) as array
  sovereign: [0.175, 0.885, 0.32, 1.275],  // cubic-bezier(0.175, 0.885, 0.32, 1.275)
  cosmic: [0.175, 0.885, 0.32, 1.275],
  linear: [0, 0, 1, 1],
} as const;

export const GRID_ANIMATIONS = {
  container: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: durations.normal / 1000,
      ease: FRAMER_EASING.quantum,
      staggerChildren: 0.05,
    },
  },
  item: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: durations.fast / 1000,
      ease: FRAMER_EASING.sovereign,
    },
  },
  featuredItem: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: durations.normal / 1000,
      ease: FRAMER_EASING.cosmic,
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: durations.controlHover / 1000,
      ease: FRAMER_EASING.quantum,
    },
  },
} as const;

// ============================================================================
// RESPONSIVE BREAKPOINT MAP (Tailwind class suffixes)
// ============================================================================

export const RESPONSIVE_BREAKPOINTS = {
  mobile: '',           // base (no prefix)
  tablet: 'md',
  desktop: 'lg',
  wide: 'xl',
} as const;

// ============================================================================
// TAILWIND GRID CLASS GENERATORS
// ============================================================================

export function getGridColsClass(cols: number, breakpoint: string = ''): string {
  const prefix = breakpoint ? `${breakpoint}:` : '';
  return `${prefix}grid-cols-${cols}`;
}

export function getGridGapClass(gap: string): string {
  // gap is already a Tailwind spacing class like 'gap-6'
  return gap;
}

// ============================================================================
// DEFAULT VALUES
// ============================================================================

export const DEFAULT_GRID_VARIANT = GRID_VARIANTS.PRODUCT;
export const DEFAULT_GRID_GAP = GRID_GAPS[DEFAULT_GRID_VARIANT];
export const DEFAULT_CONTAINER_CLASS = 'container mx-auto px-4';