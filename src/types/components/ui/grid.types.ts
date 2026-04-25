// src/types/components/ui/grid.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    GRID TYPES                                             ║
// ║                    All type definitions for Grid components               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { ReactNode } from 'react';
import type {
  GridSpacing,
  GridAlign,
  GridJustify,
  GridFlow,
} from '@/lib/constants/components/hof/grid.constants';
import type {
  GRID_VARIANTS,
} from '@/lib/constants/components/hof/grid.variants';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type {
  GridSpacing,
  GridAlign,
  GridJustify,
  GridFlow,
};

export type GridVariant = (typeof GRID_VARIANTS)[keyof typeof GRID_VARIANTS];

// ─── Base Grid Props ───────────────────────────────────────────────────────
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gap between grid items */
  gap?: GridSpacing;
  /** Number of columns on mobile (0 = auto) */
  cols?: number | string;
  /** Number of columns on tablet (0 = auto) */
  colsMd?: number | string;
  /** Number of columns on desktop (0 = auto) */
  colsLg?: number | string;
  /** Number of columns on wide screens (0 = auto) */
  colsXl?: number | string;
  /** Minimum column width (for auto-fit/fill) */
  minColWidth?: string;
  /** Use auto-fit instead of fixed columns */
  autoFit?: boolean;
  /** Use auto-fill instead of fixed columns */
  autoFill?: boolean;
  /** Vertical alignment of grid items */
  align?: GridAlign;
  /** Horizontal alignment of grid items */
  justify?: GridJustify;
  /** Grid flow direction */
  flow?: GridFlow;
  /** Row gap (overrides gap for rows) */
  rowGap?: GridSpacing;
  /** Column gap (overrides gap for columns) */
  colGap?: GridSpacing;
  /** Responsive gap overrides */
  responsiveGap?: {
    mobile?: GridSpacing;
    tablet?: GridSpacing;
    desktop?: GridSpacing;
    wide?: GridSpacing;
  };
}

// ─── Grid Item Props ───────────────────────────────────────────────────────
export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Column span (1-12 or 'full' or 'auto') */
  colSpan?: number | 'full' | 'auto';
  /** Column span on tablet */
  colSpanMd?: number | 'full' | 'auto';
  /** Column span on desktop */
  colSpanLg?: number | 'full' | 'auto';
  /** Column span on wide screens */
  colSpanXl?: number | 'full' | 'auto';
  /** Row span (1-12 or 'full' or 'auto') */
  rowSpan?: number | 'full' | 'auto';
  /** Start column (1-12 or 'auto') */
  colStart?: number | 'auto';
  /** Start row (1-12 or 'auto') */
  rowStart?: number | 'auto';
}

// ─── Unified Grid Types ────────────────────────────────────────────────────
export interface GridBreakpointConfig {
  mobile: number;
  tablet: number;
  desktop: number;
  wide: number;
}

export interface GridColumnConfig {
  mobile: number;
  tablet: number;
  desktop: number;
  wide: number;
}

export interface UnifiedGridProps<T = unknown> {
  /** Visual variant of the grid */
  variant?: GridVariant;
  /** Array of items to display */
  items: T[];
  /** Custom render function for each item */
  renderItem: (item: T, index: number) => ReactNode;
  /** Optional key extractor */
  getKey?: (item: T, index: number) => string | number;
  /** Custom gap size (overrides variant default) */
  gap?: string;
  /** Custom column counts (overrides variant default) */
  columns?: Partial<GridColumnConfig>;
  /** Container className */
  className?: string;
  /** Grid container className */
  gridClassName?: string;
  /** Whether to animate items on mount */
  animated?: boolean;
  /** Whether items have hover effects */
  hoverable?: boolean;
  /** Empty state component */
  emptyState?: ReactNode;
  /** Loading state component */
  loadingState?: ReactNode;
  /** Whether the grid is loading */
  isLoading?: boolean;
  /** Callback when an item is clicked */
  onItemClick?: (item: T, index: number) => void;
  /** Maximum number of items to display */
  limit?: number;
  /** Whether to use masonry layout */
  masonry?: boolean;
}