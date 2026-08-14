// src/types/components/vegvisir/pagination.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    PAGINATION TYPES                                       ║
// ║                    All type definitions for the Pagination component      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  PaginationSize,
  PaginationVariant,
} from '@/lib/constants/components/vegvisir/pagination.variants';

// ─── Re-exports from constants/variants ────────────────────────────────────
export type { PaginationSize, PaginationVariant };

// ─── Core Props ────────────────────────────────────────────────────────────
export interface PaginationProps {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Number of page buttons on each side of current page */
  siblingCount?: number;
  /** Show first/last page buttons */
  showFirstLast?: boolean;
  /** Show page size selector */
  showPageSize?: boolean;
  /** Available page sizes */
  pageSizeOptions?: number[];
  /** Current page size */
  pageSize?: number;
  /** Callback when page size changes */
  onPageSizeChange?: (pageSize: number) => void;
  /** Size of pagination buttons */
  size?: PaginationSize;
  /** Visual variant */
  variant?: PaginationVariant;
  /** Compact mode (fewer visible buttons) */
  compact?: boolean;
  /** Disable all pagination interaction */
  disabled?: boolean;
  /** Custom className */
  className?: string;
}

// ─── Info Props ────────────────────────────────────────────────────────────
export interface PaginationInfoProps {
  /** Current page number */
  currentPage: number;
  /** Number of items per page */
  pageSize: number;
  /** Total number of items across all pages */
  totalItems: number;
  /** Custom className */
  className?: string;
}

// ─── Internal Types ────────────────────────────────────────────────────────
/** A page number or an ellipsis marker */
export type PageNumberItem = number | 'ellipsis';