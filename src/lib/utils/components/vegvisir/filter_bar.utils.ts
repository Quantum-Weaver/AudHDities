// src/lib/utils/components/vegvisir/filter_bar.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FILTER BAR UTILITIES                                   ║
// ║                    Filter state, option resolution, formatters            ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  FilterOption,
} from '@/types/components/vegvisir/filter_bar.types';

import {
  FILTER_BAR_DEFAULT_ALL_LABEL,
} from '@/lib/constants/components/vegvisir/filter_bar.constants';

// ─── Selection State ───────────────────────────────────────────────────────

/**
 * Check if the "All" filter is currently selected.
 * Returns true when selectedId is null (meaning no specific filter is active).
 *
 * @example
 * isAllSelected(null) // true
 * isAllSelected("quantum") // false
 */
export function isAllSelected(selectedId: string | null): boolean {
  return selectedId === null;
}

/**
 * Check if a specific option is currently selected.
 *
 * @example
 * isOptionSelected("quantum", "quantum") // true
 * isOptionSelected("cosmic", "quantum")  // false
 */
export function isOptionSelected(
  optionId: string,
  selectedId: string | null
): boolean {
  return selectedId === optionId;
}

// ─── Option Resolution ─────────────────────────────────────────────────────

/**
 * Resolve the "All" label, using the provided override or falling back
 * to the system default from constants.
 *
 * @example
 * resolveAllLabel()              // "All"
 * resolveAllLabel("Everything")  // "Everything"
 */
export function resolveAllLabel(override?: string): string {
  return override ?? FILTER_BAR_DEFAULT_ALL_LABEL;
}

/**
 * Build the complete list of filter options, including the "All" option
 * at the beginning when showAll is true. The "All" option uses a null id.
 *
 * @example
 * buildFilterOptions(options, true, "All")
 * // [{ id: null, label: "All" }, ...options]
 */
export function buildFilterOptions(
  options: FilterOption[],
  showAll: boolean = true,
  allLabel?: string
): FilterOption[] {
  if (!showAll) return options;

  const allOption: FilterOption = {
    id: '__all__',
    label: resolveAllLabel(allLabel),
  };

  return [allOption, ...options];
}

/**
 * Get the currently active option object from the options list.
 * Returns undefined when "All" is selected (null id).
 *
 * @example
 * getActiveOption(options, "quantum") // { id: "quantum", label: "Quantum", count: 12 }
 * getActiveOption(options, null)      // undefined
 */
export function getActiveOption(
  options: FilterOption[],
  selectedId: string | null
): FilterOption | undefined {
  if (selectedId === null) return undefined;
  return options.find((option) => option.id === selectedId);
}

// ─── Count Formatting ──────────────────────────────────────────────────────

/**
 * Format a filter count for display.
 * Returns undefined if count is not provided (no badge rendered).
 *
 * @example
 * formatFilterCount(12)   // "(12)"
 * formatFilterCount(0)    // "(0)"
 * formatFilterCount(undefined) // undefined
 */
export function formatFilterCount(count?: number): string | undefined {
  if (count === undefined) return undefined;
  return `(${count})`;
}

/**
 * Check if an option has a count that should be displayed.
 *
 * @example
 * hasFilterCount({ id: "x", label: "X", count: 5 })  // true
 * hasFilterCount({ id: "x", label: "X" })             // false
 * hasFilterCount({ id: "x", label: "X", count: 0 })   // true (show zero)
 */
export function hasFilterCount(option: FilterOption): boolean {
  return option.count !== undefined;
}

// ─── URL Syncing ───────────────────────────────────────────────────────────

/**
 * Build a URL search params string from the current filter selection.
 * Omits the param entirely when "All" is selected (null id).
 *
 * @example
 * filterToSearchParam("category", "quantum") // "category=quantum"
 * filterToSearchParam("category", null)      // ""
 */
export function filterToSearchParam(
  paramName: string,
  selectedId: string | null
): string {
  if (selectedId === null) return '';
  return `${encodeURIComponent(paramName)}=${encodeURIComponent(selectedId)}`;
}

/**
 * Parse a filter selection from URL search params.
 * Returns null when the param is absent (meaning "All").
 *
 * @example
 * filterFromSearchParams("?category=quantum", "category") // "quantum"
 * filterFromSearchParams("", "category")                  // null
 */
export function filterFromSearchParams(
  searchString: string,
  paramName: string
): string | null {
  const params = new URLSearchParams(searchString);
  return params.get(paramName) ?? null;
}