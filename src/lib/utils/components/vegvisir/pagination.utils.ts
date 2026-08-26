// src/lib/utils/components/vegvisir/pagination.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    PAGINATION UTILITIES                                   ║
// ║                    Pure logic — page math, range generation               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { PageNumberItem } from '@/types/components/vegvisir/pagination.types';
import {
  PAGINATION_DEFAULT_SIBLING_COUNT,
  PAGINATION_DEFAULT_PAGE_SIZE,
  PAGINATION_DEFAULT_PAGE_SIZES,
} from '@/lib/constants/components/vegvisir/pagination.constants';

// ═══════════════════════════════════════════════════════════════════════════
// PAGE NUMBER GENERATION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Configuration for page number generation.
 */
interface PageNumberConfig {
  /** Current active page (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Number of page buttons on each side of the current page */
  siblingCount?: number;
  /** Whether to use compact mode (fewer visible buttons) */
  compact?: boolean;
}

/**
 * Generate the array of page numbers and ellipsis markers for display.
 *
 * Handles four cases:
 * 1. All pages fit — no ellipsis needed
 * 2. Right ellipsis only — near the beginning
 * 3. Left ellipsis only — near the end
 * 4. Both ellipses — somewhere in the middle
 *
 * @example
 * getPageNumbers({ currentPage: 5, totalPages: 20, siblingCount: 1 })
 * // → [1, 'ellipsis', 4, 5, 6, 'ellipsis', 20]
 *
 * @example
 * getPageNumbers({ currentPage: 1, totalPages: 10, siblingCount: 2, compact: true })
 * // → [1, 2, 3, 4, 5, 'ellipsis', 10]
 */
export function getPageNumbers(config: PageNumberConfig): PageNumberItem[] {
  const {
    currentPage,
    totalPages,
    siblingCount = PAGINATION_DEFAULT_SIBLING_COUNT,
    compact = false,
  } = config;

  // Guard: invalid inputs
  if (totalPages <= 0) return [];
  if (currentPage < 1) return [];
  if (currentPage > totalPages) return [];

  const maxVisiblePages = siblingCount * 2 + (compact ? 3 : 5);

  // Case 1: All pages fit — no ellipsis needed
  if (totalPages <= maxVisiblePages) {
    return generateRange(1, totalPages);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 2);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  // Case 2: Right ellipsis only — near the beginning
  if (!showLeftEllipsis && showRightEllipsis) {
    const leftCount = (compact ? 3 : 5) + siblingCount;
    return [...generateRange(1, leftCount), 'ellipsis', totalPages];
  }

  // Case 3: Left ellipsis only — near the end
  if (showLeftEllipsis && !showRightEllipsis) {
    const rightCount = (compact ? 3 : 5) + siblingCount;
    return [
      1,
      'ellipsis',
      ...generateRange(totalPages - rightCount + 1, totalPages),
    ];
  }

  // Case 4: Both ellipses — in the middle
  return [
    1,
    'ellipsis',
    ...generateRange(leftSibling, rightSibling),
    'ellipsis',
    totalPages,
  ];
}

/**
 * Generate a sequential array of numbers from `start` to `end` (inclusive).
 */
export function generateRange(start: number, end: number): number[] {
  if (end < start) return [];
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE BOUNDARY LOGIC
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Clamp a page number to valid bounds.
 *
 * @example
 * clampPage(0, 10)  // → 1
 * clampPage(15, 10) // → 10
 * clampPage(5, 10)  // → 5
 */
export function clampPage(page: number, totalPages: number): number {
  if (totalPages <= 0) return 1;
  return Math.max(1, Math.min(page, totalPages));
}

/**
 * Check if there is a previous page available.
 */
export function hasPreviousPage(currentPage: number): boolean {
  return currentPage > 1;
}

/**
 * Check if there is a next page available.
 */
export function hasNextPage(
  currentPage: number,
  totalPages: number
): boolean {
  return currentPage < totalPages;
}

/**
 * Get the previous page number, clamped to valid range.
 */
export function getPreviousPage(
  currentPage: number,
  totalPages: number
): number {
  return clampPage(currentPage - 1, totalPages);
}

/**
 * Get the next page number, clamped to valid range.
 */
export function getNextPage(
  currentPage: number,
  totalPages: number
): number {
  return clampPage(currentPage + 1, totalPages);
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE INFO CALCULATION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Calculate total pages from total items and page size.
 *
 * @example
 * calculateTotalPages(145, 20) // → 8
 * calculateTotalPages(0, 20)   // → 0
 */
export function calculateTotalPages(
  totalItems: number,
  pageSize: number = PAGINATION_DEFAULT_PAGE_SIZE
): number {
  if (totalItems <= 0 || pageSize <= 0) return 0;
  return Math.ceil(totalItems / pageSize);
}

/**
 * Calculate the display range for "Showing X-Y of Z items".
 *
 * @example
 * getPageRange(1, 20, 145)  // → { start: 1, end: 20 }
 * getPageRange(8, 20, 145)  // → { start: 141, end: 145 }
 * getPageRange(1, 20, 0)    // → { start: 0, end: 0 }
 */
export function getPageRange(
  currentPage: number,
  pageSize: number,
  totalItems: number
): { start: number; end: number } {
  if (totalItems <= 0) return { start: 0, end: 0 };

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return { start, end };
}

/**
 * Format the "Showing X-Y of Z items" text.
 *
 * @example
 * formatPageInfo(1, 20, 145)  // → "Showing 1 to 20 of 145 items"
 * formatPageInfo(1, 20, 0)    // → "Showing 0 items"
 */
export function formatPageInfo(
  currentPage: number,
  pageSize: number,
  totalItems: number
): string {
  if (totalItems === 0) return 'Showing 0 items';

  const { start, end } = getPageRange(currentPage, pageSize, totalItems);
  return `Showing ${start} to ${end} of ${totalItems} items`;
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE SIZE MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Validate a page size against available options.
 * Falls back to the closest valid option or the default.
 *
 * @example
 * validatePageSize(25, [10, 20, 50, 100]) // → 20 (nearest valid)
 * validatePageSize(50, [10, 20, 50, 100]) // → 50 (exact match)
 */
export function validatePageSize(
  requestedSize: number,
  options: readonly number[] = PAGINATION_DEFAULT_PAGE_SIZES
): number {
  if (options.includes(requestedSize)) return requestedSize;

  const sorted = [...options].sort((a, b) => a - b);
  const closest = sorted.reduce((prev, curr) =>
    Math.abs(curr - requestedSize) < Math.abs(prev - requestedSize)
      ? curr
      : prev
  );

  return closest;
}

/**
 * Calculate the new current page when page size changes,
 * keeping the user roughly at the same position in the dataset.
 *
 * @example
 * adjustPageForSizeChange(5, 20, 50) // → 2 (item ~81-100 moves to page 2 with 50/page)
 */
export function adjustPageForSizeChange(
  currentPage: number,
  oldPageSize: number,
  newPageSize: number
): number {
  if (oldPageSize <= 0 || newPageSize <= 0) return 1;
  if (currentPage <= 1) return 1;

  const firstItemIndex = (currentPage - 1) * oldPageSize + 1;

  return Math.ceil(firstItemIndex / newPageSize);
}

// ═══════════════════════════════════════════════════════════════════════════
// DATA SLICING
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Slice an array to the current page.
 *
 * @example
 * paginateArray(items, 1, 20) // → first 20 items
 * paginateArray(items, 2, 20) // → items 21-40
 */
export function paginateArray<T>(
  items: T[],
  currentPage: number,
  pageSize: number = PAGINATION_DEFAULT_PAGE_SIZE
): T[] {
  const start = (currentPage - 1) * pageSize;
  return items.slice(start, start + pageSize);
}