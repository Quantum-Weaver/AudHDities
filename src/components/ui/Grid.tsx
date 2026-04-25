// src/components/ui/Grid.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    GRID COMPONENT                                         ║
// ║                    The skeletal framework of the UI                       ║
// ║                    All values from COSMIC constants                       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import React from 'react';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  GridProps,
  GridItemProps,
  GridSpacing,
} from '@/types/components/ui/grid.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  GRID_ALIGN_MAP,
  GRID_JUSTIFY_MAP,
  GRID_FLOW_MAP,
} from '@/lib/constants/components/ui/grid.constants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  buildResponsiveColsClass,
  buildAutoColsClass,
  buildResponsiveGapClass,
  buildResponsiveSpanClass,
  resolveStartClass,
} from '@/utils/components/ui/grid.utils';

// ═══════════════════════════════════════════════════════════════════════════
// GRID — ROOT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Grid — Responsive column layout with consistent gaps.
 *
 * Supports fixed columns, auto-fit/fill with min column width,
 * responsive column overrides, and alignment/flow control.
 *
 * @example
 * <Grid cols={2} gap="md">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 * </Grid>
 *
 * @example
 * <Grid cols={1} colsMd={2} colsLg={3} colsXl={4} gap="lg">
 *   {products.map(p => <ProductCard key={p.id} {...p} />)}
 * </Grid>
 *
 * @example
 * <Grid minColWidth="300px" autoFit gap="md">
 *   {items.map(i => <div key={i.id}>{i.content}</div>)}
 * </Grid>
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      children,
      gap = 'md',
      cols,
      colsMd,
      colsLg,
      colsXl,
      minColWidth,
      autoFit = false,
      autoFill = false,
      align = 'stretch',
      justify = 'start',
      flow = 'row',
      rowGap,
      colGap,
      responsiveGap,
      className,
      ...props
    },
    ref
  ) => {
    // Resolve gap classes
    const gapClass = buildResponsiveGapClass(gap, rowGap, colGap, responsiveGap);

    // Resolve column classes
    let colsClass = '';

    if (minColWidth) {
      colsClass = buildAutoColsClass(minColWidth, autoFit, autoFill);
    } else {
      colsClass = buildResponsiveColsClass(cols, colsMd, colsLg, colsXl);
    }

    const baseClasses = cn(
      'grid',
      colsClass,
      gapClass,
      GRID_ALIGN_MAP[align],
      GRID_JUSTIFY_MAP[justify],
      GRID_FLOW_MAP[flow],
      className
    );

    return (
      <div ref={ref} className={baseClasses} {...props}>
        {children}
      </div>
    );
  }
);
Grid.displayName = 'Grid';

// ═══════════════════════════════════════════════════════════════════════════
// GRID ITEM
// ═══════════════════════════════════════════════════════════════════════════

/**
 * GridItem — Child of Grid with column and row spanning.
 *
 * @example
 * <Grid cols={12}>
 *   <GridItem colSpan={6}>Half width</GridItem>
 *   <GridItem colSpan={6}>Half width</GridItem>
 *   <GridItem colSpan={12}>Full width</GridItem>
 * </Grid>
 */
export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  (
    {
      children,
      colSpan,
      colSpanMd,
      colSpanLg,
      colSpanXl,
      rowSpan,
      colStart,
      rowStart,
      className,
      ...props
    },
    ref
  ) => {
    const colSpanClass = buildResponsiveSpanClass(colSpan, colSpanMd, colSpanLg, colSpanXl, 'col');
    const rowSpanClass = rowSpan ? buildResponsiveSpanClass(rowSpan, undefined, undefined, undefined, 'row') : '';
    const colStartClass = resolveStartClass(colStart, 'col');
    const rowStartClass = resolveStartClass(rowStart, 'row');

    const baseClasses = cn(
      colSpanClass,
      rowSpanClass,
      colStartClass,
      rowStartClass,
      className
    );

    return (
      <div ref={ref} className={baseClasses} {...props}>
        {children}
      </div>
    );
  }
);
GridItem.displayName = 'GridItem';

// ═══════════════════════════════════════════════════════════════════════════
// VARIANT SHORTCUTS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * ResponsiveGrid — Pre-configured 1→2→3→4 column layout.
 */
export const ResponsiveGrid = React.forwardRef<
  HTMLDivElement,
  Omit<GridProps, 'cols' | 'colsMd' | 'colsLg' | 'colsXl'>
>((props, ref) => (
  <Grid ref={ref} cols={1} colsMd={2} colsLg={3} colsXl={4} gap="md" {...props} />
));
ResponsiveGrid.displayName = 'ResponsiveGrid';

/**
 * DashboardGrid — For admin/council dashboards.
 */
export const DashboardGrid = React.forwardRef<
  HTMLDivElement,
  Omit<GridProps, 'cols' | 'colsMd' | 'colsLg'>
>((props, ref) => (
  <Grid ref={ref} cols={1} colsMd={2} colsLg={3} gap="lg" {...props} />
));
DashboardGrid.displayName = 'DashboardGrid';

/**
 * MasonryGrid — Auto-fit with minimum column width.
 */
export const MasonryGrid = React.forwardRef<
  HTMLDivElement,
  Omit<GridProps, 'autoFit' | 'autoFill'>
>(({ minColWidth = '280px', gap = 'md', ...props }, ref) => (
  <Grid ref={ref} autoFit minColWidth={minColWidth} gap={gap} {...props} />
));
MasonryGrid.displayName = 'MasonryGrid';

/**
 * FormGrid — For form layouts.
 */
export const FormGrid = React.forwardRef<
  HTMLDivElement,
  Omit<GridProps, 'cols' | 'gap'>
>((props, ref) => (
  <Grid ref={ref} cols={1} colsMd={2} gap="md" {...props} />
));
FormGrid.displayName = 'FormGrid';

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export type {
  GridProps,
  GridItemProps,
  GridSpacing,
  GridAlign,
  GridJustify,
  GridFlow,
} from '@/types/components/ui/grid.types';