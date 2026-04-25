// src/lib/utils/components/ui/grid.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    GRID UTILITIES                                         ║
// ║                    Column resolution, gap resolution, responsive helpers  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import {
  GRID_GAP_MAP,
  GRID_ROW_GAP_MAP,
  GRID_COL_GAP_MAP,
  RESPONSIVE_PREFIX,
  GRID_MAX_SPAN,
  type GridSpacing,
} from '@/lib/constants/components/ui/grid.constants';

import type {
  GridColumnConfig,
  GridVariant,
} from '@/types/components/ui/grid.types';

import {
  GRID_COLUMNS,
  GRID_GAPS,
  RESPONSIVE_BREAKPOINTS,
  getGridColsClass,
  type BreakpointKey,
} from '@/lib/constants/components/ui/grid.variants';

// ═══════════════════════════════════════════════════════════════════════════
// COLUMN CLASS RESOLUTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Convert column count to Tailwind grid-cols class.
 */
export function resolveGridColsClass(cols: number | string | undefined): string {
  if (!cols || cols === 'auto' || cols === 0) return '';
  if (typeof cols === 'number') return `grid-cols-${cols}`;
  return cols;
}

/**
 * Build responsive column class string from breakpoint config.
 */
export function buildResponsiveColsClass(
  cols?: number | string,
  colsMd?: number | string,
  colsLg?: number | string,
  colsXl?: number | string,
): string {
  const classes: string[] = [];

  const base = resolveGridColsClass(cols);
  if (base) classes.push(base);

  const md = colsMd ? resolveGridColsClass(colsMd) : '';
  if (md) classes.push(`md:${md}`);

  const lg = colsLg ? resolveGridColsClass(colsLg) : '';
  if (lg) classes.push(`lg:${lg}`);

  const xl = colsXl ? resolveGridColsClass(colsXl) : '';
  if (xl) classes.push(`xl:${xl}`);

  return classes.join(' ');
}

/**
 * Build auto-fit/fill column class with min width.
 */
export function buildAutoColsClass(
  minColWidth: string,
  autoFit: boolean,
  autoFill: boolean,
): string {
  const repeatType = autoFit ? 'auto-fit' : autoFill ? 'auto-fill' : '';
  if (!repeatType) return '';
  return `grid-cols-[repeat(${repeatType},minmax(${minColWidth},1fr))]`;
}

// ═══════════════════════════════════════════════════════════════════════════
// GAP RESOLUTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Build responsive gap class string.
 */
export function buildResponsiveGapClass(
  gap: GridSpacing,
  rowGap?: GridSpacing,
  colGap?: GridSpacing,
  responsiveGap?: {
    mobile?: GridSpacing;
    tablet?: GridSpacing;
    desktop?: GridSpacing;
    wide?: GridSpacing;
  },
): string {
  // If responsiveGap is provided, use it
  if (responsiveGap) {
    const classes: string[] = [];
    if (responsiveGap.mobile) classes.push(GRID_GAP_MAP[responsiveGap.mobile]);
    if (responsiveGap.tablet) classes.push(`md:${GRID_GAP_MAP[responsiveGap.tablet]}`);
    if (responsiveGap.desktop) classes.push(`lg:${GRID_GAP_MAP[responsiveGap.desktop]}`);
    if (responsiveGap.wide) classes.push(`xl:${GRID_GAP_MAP[responsiveGap.wide]}`);
    if (classes.length > 0) return classes.join(' ');
  }

  // Otherwise use the base gap
  let gapClass = GRID_GAP_MAP[gap];

  if (rowGap) gapClass += ` ${GRID_ROW_GAP_MAP[rowGap]}`;
  if (colGap) gapClass += ` ${GRID_COL_GAP_MAP[colGap]}`;

  return gapClass;
}

// ═══════════════════════════════════════════════════════════════════════════
// SPAN RESOLUTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Convert span value to Tailwind col-span/row-span class.
 */
export function resolveSpanClass(
  span: number | 'full' | 'auto' | undefined,
  prefix: 'col' | 'row',
): string {
  if (span === 'full') return `${prefix}-span-full`;
  if (span === 'auto') return `${prefix}-span-auto`;
  if (typeof span === 'number') return `${prefix}-span-${span}`;
  return '';
}

/**
 * Build responsive span class string for GridItem.
 */
export function buildResponsiveSpanClass(
  span?: number | 'full' | 'auto',
  spanMd?: number | 'full' | 'auto',
  spanLg?: number | 'full' | 'auto',
  spanXl?: number | 'full' | 'auto',
  prefix: 'col' | 'row' = 'col',
): string {
  const classes: string[] = [];

  const base = resolveSpanClass(span, prefix);
  if (base) classes.push(base);

  const md = spanMd ? resolveSpanClass(spanMd, prefix) : '';
  if (md) classes.push(`md:${md}`);

  const lg = spanLg ? resolveSpanClass(spanLg, prefix) : '';
  if (lg) classes.push(`lg:${lg}`);

  const xl = spanXl ? resolveSpanClass(spanXl, prefix) : '';
  if (xl) classes.push(`xl:${xl}`);

  return classes.join(' ');
}

// ═══════════════════════════════════════════════════════════════════════════
// START RESOLUTION
// ═══════════════════════════════════════════════════════════════════════════

export function resolveStartClass(
  start: number | 'auto' | undefined,
  prefix: 'col' | 'row',
): string {
  if (!start || start === 'auto') return '';
  return `${prefix}-start-${start}`;
}

// ═══════════════════════════════════════════════════════════════════════════
// VARIANT HELPERS (from existing grid.utils.ts)
// ═══════════════════════════════════════════════════════════════════════════

export function getColumnsForVariant(
  variant: GridVariant,
  breakpoint: BreakpointKey,
): number {
  return GRID_COLUMNS[variant][breakpoint];
}

export function getAllColumnClasses(
  variant: GridVariant,
  customColumns?: Partial<GridColumnConfig>,
): string {
  const config = customColumns || GRID_COLUMNS[variant];
  const classes: string[] = [];
  const breakpoints: BreakpointKey[] = ['mobile', 'tablet', 'desktop', 'wide'];

  for (const bp of breakpoints) {
    const cols = config[bp];
    if (cols !== undefined) {
      const prefix = RESPONSIVE_BREAKPOINTS[bp];
      classes.push(getGridColsClass(cols, prefix));
    }
  }

  return classes.join(' ');
}

export function getGapForVariant(variant: GridVariant, customGap?: string): string {
  if (customGap) return customGap;
  return GRID_GAPS[variant];
}

export function getGapClass(variant: GridVariant, customGap?: string): string {
  return getGapForVariant(variant, customGap);
}
