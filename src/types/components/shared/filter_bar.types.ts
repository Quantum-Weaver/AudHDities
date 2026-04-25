// src/types/components/shared/filter_bar.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FILTER BAR TYPES                                       ║
// ║                    All type definitions for FilterBar                      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  FilterBarDensity,
  FilterBarAlign,
  FilterBarCountPosition,
} from '@/lib/constants/components/shared/filter_bar.variants';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { FilterBarDensity, FilterBarAlign, FilterBarCountPosition };

// ─── Filter Option ─────────────────────────────────────────────────────────
export interface FilterOption {
  /** Unique identifier for the filter */
  id: string;
  /** Display label */
  label: string;
  /** Optional count badge */
  count?: number;
}

// ─── Filter Bar Props ──────────────────────────────────────────────────────
export interface FilterBarProps {
  /** Available filter options */
  options: FilterOption[];
  /** Currently selected option ID (null = "All") */
  selectedId: string | null;
  /** Selection handler — pass null to select "All" */
  onSelect: (id: string | null) => void;
  /** Whether to show the "All" button */
  showAll?: boolean;
  /** Label for the "All" button */
  allLabel?: string;
  /** Spacing density between buttons */
  density?: FilterBarDensity;
  /** Horizontal alignment */
  align?: FilterBarAlign;
  /** Position of count badges */
  countPosition?: FilterBarCountPosition;
  /** Additional container classes */
  className?: string;
}