// src/lib/utils/components/vegvisir/sort_dropdown.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SORT DROPDOWN UTILITIES                                ║
// ║                    Pure sort state logic — no design tokens               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  SortOption,
  SortDirection,
} from '@/types/components/vegvisir/sort_dropdown.types';

// ─── Types ─────────────────────────────────────────────────────────────────

/** Result of resolving a sort selection action */
export interface SortSelection {
  /** The selected option id */
  value: string;
  /** The resolved direction */
  direction: SortDirection;
}

// ─── Option Lookup ─────────────────────────────────────────────────────────

/**
 * Find a sort option by its id.
 * Returns the first option if no match is found.
 *
 * @example
 * const current = findSortOption(options, 'name');
 */
export function findSortOption(
  options: SortOption[],
  id: string
): SortOption {
  return options.find((o) => o.id === id) || options[0];
}

// ─── Direction Resolution ──────────────────────────────────────────────────

/**
 * Resolve the sort direction when an option is selected.
 *
 * Rules:
 * - If selecting the SAME option → toggle direction (asc ↔ desc)
 * - If selecting a DIFFERENT option → use its `defaultDirection`, fall back to 'asc'
 *
 * @example
 * const result = resolveSortSelection(options, 'name', 'name', 'asc');
 * // { value: 'name', direction: 'desc' } — toggled
 *
 * const result = resolveSortSelection(options, 'date', 'name', 'asc');
 * // { value: 'date', direction: 'desc' } — new option with default
 */
export function resolveSortSelection(
  options: SortOption[],
  selectedId: string,
  currentValue: string,
  currentDirection: SortDirection
): SortSelection {
  // Same option → toggle direction
  if (selectedId === currentValue) {
    return {
      value: selectedId,
      direction: toggleDirection(currentDirection),
    };
  }

  // Different option → use its default direction
  const option = findSortOption(options, selectedId);
  return {
    value: selectedId,
    direction: option.defaultDirection || 'asc',
  };
}

// ─── Direction Utilities ───────────────────────────────────────────────────

/**
 * Toggle a sort direction between asc and desc.
 *
 * @example
 * toggleDirection('asc')  // → 'desc'
 * toggleDirection('desc') // → 'asc'
 */
export function toggleDirection(direction: SortDirection): SortDirection {
  return direction === 'asc' ? 'desc' : 'asc';
}

/**
 * Get the display symbol for a sort direction.
 *
 * @example
 * getSortDirectionSymbol('asc')  // → '↑'
 * getSortDirectionSymbol('desc') // → '↓'
 */
export function getSortDirectionSymbol(direction: SortDirection): string {
  return direction === 'asc' ? '↑' : '↓';
}

// ─── Sort Application ──────────────────────────────────────────────────────

/**
 * Apply a sort option + direction to an array of items.
 * Generic — works with any object type.
 *
 * @example
 * const sorted = applySort(users, 'name', 'asc');
 */
export function applySort<T extends Record<string, unknown>>(
  items: T[],
  sortKey: string,
  direction: SortDirection
): T[] {
  return [...items].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return 1;
    if (bVal == null) return -1;

    let comparison = 0;
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      comparison = aVal.localeCompare(bVal);
    } else if (typeof aVal === 'number' && typeof bVal === 'number') {
      comparison = aVal - bVal;
    } else {
      comparison = String(aVal).localeCompare(String(bVal));
    }

    return direction === 'asc' ? comparison : -comparison;
  });
}

/**
 * Generate a stable, human-readable label for the current sort state.
 * Useful for aria-labels or screen reader announcements.
 *
 * @example
 * getSortAnnouncement('Name', 'asc') // → "Sorted by Name, ascending"
 */
export function getSortAnnouncement(
  label: string,
  direction: SortDirection
): string {
  const dirLabel = direction === 'asc' ? 'ascending' : 'descending';
  return `Sorted by ${label}, ${dirLabel}`;
}

/**
 * Build a query-string compatible sort parameter.
 *
 * @example
 * getSortQueryParam('name', 'desc') // → "name:desc"
 */
export function getSortQueryParam(
  key: string,
  direction: SortDirection
): string {
  return `${key}:${direction}`;
}

/**
 * Parse a query-string sort parameter back into key + direction.
 *
 * @example
 * parseSortQueryParam('name:desc') // → { key: 'name', direction: 'desc' }
 */
export function parseSortQueryParam(
  param: string
): { key: string; direction: SortDirection } | null {
  const parts = param.split(':');
  if (parts.length !== 2) return null;

  const [key, dir] = parts;
  if (dir !== 'asc' && dir !== 'desc') return null;

  return { key, direction: dir };
}