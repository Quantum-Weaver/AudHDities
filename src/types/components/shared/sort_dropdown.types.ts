// src/types/components/shared/sort_dropdown.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SORT DROPDOWN TYPES                                    ║
// ║                    All type definitions                                   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { SortDropdownPanelSize } from '@/lib/constants/components/vegvisir/sort_dropdown.variants';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { SortDropdownPanelSize };

// ─── Sort Direction ────────────────────────────────────────────────────────
export type SortDirection = 'asc' | 'desc';

// ─── Sort Option ───────────────────────────────────────────────────────────
export interface SortOption {
  /** Unique identifier for this sort field */
  id: string;
  /** Display label */
  label: string;
  /** Default direction when first selected */
  defaultDirection?: SortDirection;
}

// ─── Component Props ───────────────────────────────────────────────────────
export interface SortDropdownProps {
  /** Available sort options */
  options: SortOption[];
  /** Currently selected option id */
  value: string;
  /** Current sort direction */
  direction: SortDirection;
  /** Called when selection or direction changes */
  onChange: (value: string, direction: SortDirection) => void;
  /** Optional additional classes */
  className?: string;
  /** Dropdown panel size variant */
  size?: SortDropdownPanelSize;
}