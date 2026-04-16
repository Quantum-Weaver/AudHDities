// src/types/components/ui/unified_grid.ts
// PURE TYPES - No values, no logic

import type { ReactNode } from 'react';
import type { GRID_VARIANTS } from '@/lib/constants/components/ui/unified_grid';

export type GridVariant = typeof GRID_VARIANTS[keyof typeof GRID_VARIANTS];

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

export interface UnifiedGridProps<T = any> {
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

export interface GridItemProps {
  children: ReactNode;
  index: number;
  isAnimated?: boolean;
  isHoverable?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface GridContainerProps {
  variant: GridVariant;
  children: ReactNode;
  gap?: string;
  columns?: Partial<GridColumnConfig>;
  className?: string;
  animated?: boolean;
}