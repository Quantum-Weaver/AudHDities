// src/lib/utils/components/ui/unified_grid.ts
// Add these functions if missing, or verify they exist

import type { GridVariant, GridColumnConfig } from '@/types/components/ui/grids';
import {
  GRID_VARIANTS,
  GRID_COLUMNS,
  GRID_GAPS,
  RESPONSIVE_BREAKPOINTS,
  getGridColsClass,
  type BreakpointKey,
} from '@/lib/constants/components/ui/unified_grid';

// ============================================================================
// COLUMN HELPERS
// ============================================================================

/**
 * Get columns for a specific variant and breakpoint
 */
export function getColumnsForVariant(
  variant: GridVariant,
  breakpoint: BreakpointKey
): number {
  const config = GRID_COLUMNS[variant];
  return config[breakpoint];
}

/**
 * Get all Tailwind column classes for a variant (responsive)
 */
export function getAllColumnClasses(
  variant: GridVariant,
  customColumns?: Partial<GridColumnConfig>
): string {
  // Use custom columns if provided, otherwise use default config
  const config = customColumns || GRID_COLUMNS[variant];
  const classes: string[] = [];

  // Explicitly iterate over breakpoint keys with guaranteed values
  const breakpoints: BreakpointKey[] = ['mobile', 'tablet', 'desktop', 'wide'];
  
  for (const bp of breakpoints) {
    const cols = config[bp];
    // Ensure cols is a number (should always be defined from config)
    if (cols !== undefined) {
      const prefix = RESPONSIVE_BREAKPOINTS[bp];
      classes.push(getGridColsClass(cols, prefix));
    }
  }

  return classes.join(' ');
}

// ============================================================================
// GAP HELPERS
// ============================================================================

/**
 * Get gap size for a variant (with optional custom override)
 */
export function getGapForVariant(variant: GridVariant, customGap?: string): string {
  if (customGap) return customGap;
  return GRID_GAPS[variant];
}

/**
 * Get gap as Tailwind class (e.g., 'gap-6')
 */
export function getGapClass(variant: GridVariant, customGap?: string): string {
  const gap = getGapForVariant(variant, customGap);
  return gap;
}

// ============================================================================
// VARIANT HELPERS
// ============================================================================

export function isProductGrid(variant: GridVariant): boolean {
  return variant === GRID_VARIANTS.PRODUCT;
}

export function isQuestGrid(variant: GridVariant): boolean {
  return variant === GRID_VARIANTS.QUEST;
}

export function isCourseGrid(variant: GridVariant): boolean {
  return variant === GRID_VARIANTS.COURSE;
}

export function isEventGrid(variant: GridVariant): boolean {
  return variant === GRID_VARIANTS.EVENT;
}

export function isCreatorGrid(variant: GridVariant): boolean {
  return variant === GRID_VARIANTS.CREATOR;
}

export function isVendorGrid(variant: GridVariant): boolean {
  return variant === GRID_VARIANTS.VENDOR;
}

export function isGalleryGrid(variant: GridVariant): boolean {
  return variant === GRID_VARIANTS.GALLERY;
}

export function isDashboardGrid(variant: GridVariant): boolean {
  return variant === GRID_VARIANTS.DASHBOARD;
}

export function isAdminGrid(variant: GridVariant): boolean {
  return variant === GRID_VARIANTS.ADMIN;
}

export function isCompactGrid(variant: GridVariant): boolean {
  return variant === GRID_VARIANTS.COMPACT;
}

export function isFeaturedGrid(variant: GridVariant): boolean {
  return variant === GRID_VARIANTS.FEATURED;
}

export function isMasonryGrid(variant: GridVariant): boolean {
  return variant === GRID_VARIANTS.MASONRY;
}

// ============================================================================
// RESPONSIVE UTILITIES
// ============================================================================

export function getResponsiveClass(
  baseClass: string,
  responsiveClasses: Partial<Record<BreakpointKey, string>>
): string {
  let result = baseClass;
  const breakpoints: BreakpointKey[] = ['mobile', 'tablet', 'desktop', 'wide'];
  
  for (const bp of breakpoints) {
    const responsiveClass = responsiveClasses[bp];
    if (responsiveClass) {
      const prefix = RESPONSIVE_BREAKPOINTS[bp];
      const prefixed = prefix ? `${prefix}:${responsiveClass}` : responsiveClass;
      result += ` ${prefixed}`;
    }
  }
  return result;
}

// ============================================================================
// PAGINATION HELPERS
// ============================================================================

export function paginateItems<T>(items: T[], page: number, limit: number): T[] {
  const start = (page - 1) * limit;
  return items.slice(start, start + limit);
}

export function getTotalPages(totalItems: number, limit: number): number {
  return Math.ceil(totalItems / limit);
}

// ============================================================================
// MASONRY HELPERS
// ============================================================================

export interface MasonryColumn {
  items: any[];
  height: number;
}

export function distributeMasonryItems<T>(
  items: T[],
  columnCount: number,
  getHeight?: (item: T) => number
): T[][] {
  const columns: T[][] = Array(columnCount).fill(null).map(() => []);
  const columnHeights: number[] = Array(columnCount).fill(0);

  for (const item of items) {
    // Find shortest column
    const shortestIndex = columnHeights.indexOf(Math.min(...columnHeights));
    columns[shortestIndex].push(item);
    columnHeights[shortestIndex] += getHeight?.(item) || 1;
  }

  return columns;
}
