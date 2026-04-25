// src/lib/utils/components/forging/checkbox.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    CHECKBOX UTILITIES                                     ║
// ║                    Group state management, toggle logic                   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { CheckboxGroupProps } from '@/types/components/forging/checkbox.types';

// ─── Types ─────────────────────────────────────────────────────────────────

/**
 * Normalized option with guaranteed string value.
 */
export interface CheckboxOption {
  value: string;
  label: string;
  helper?: string;
  disabled?: boolean;
}

/**
 * Result of a checkbox toggle operation.
 */
export interface ToggleResult {
  /** The new array of selected values */
  newValues: string[];
  /** Whether this toggle added or removed the value */
  action: 'added' | 'removed';
  /** The value that was toggled */
  value: string;
}

// ─── Toggle Logic ──────────────────────────────────────────────────────────

/**
 * Toggle a value in a checkbox group — add if absent, remove if present.
 *
 * @param currentValues - Currently selected values
 * @param optionValue - The value being toggled
 * @returns The new array and metadata about the toggle action
 *
 * @example
 * toggleCheckboxValue(['a', 'b'], 'c')  // → { newValues: ['a', 'b', 'c'], action: 'added', value: 'c' }
 * toggleCheckboxValue(['a', 'b'], 'a')  // → { newValues: ['b'], action: 'removed', value: 'a' }
 */
export function toggleCheckboxValue(
  currentValues: string[],
  optionValue: string
): ToggleResult {
  const exists = currentValues.includes(optionValue);

  const newValues = exists
    ? currentValues.filter((v) => v !== optionValue)
    : [...currentValues, optionValue];

  return {
    newValues,
    action: exists ? 'removed' : 'added',
    value: optionValue,
  };
}

// ─── Group Helpers ─────────────────────────────────────────────────────────

/**
 * Check if all options in a group are selected.
 */
export function areAllSelected(
  options: CheckboxOption[],
  selectedValues: string[]
): boolean {
  if (options.length === 0) return false;
  return options
    .filter((o) => !o.disabled)
    .every((o) => selectedValues.includes(o.value));
}

/**
 * Check if some (but not all) options are selected.
 */
export function isIndeterminate(
  options: CheckboxOption[],
  selectedValues: string[]
): boolean {
  const enabledOptions = options.filter((o) => !o.disabled);
  if (enabledOptions.length === 0) return false;

  const selectedCount = enabledOptions.filter((o) =>
    selectedValues.includes(o.value)
  ).length;

  return selectedCount > 0 && selectedCount < enabledOptions.length;
}

/**
 * Select all enabled options.
 */
export function selectAll(options: CheckboxOption[]): string[] {
  return options.filter((o) => !o.disabled).map((o) => o.value);
}

/**
 * Deselect all — returns empty array.
 */
export function deselectAll(): string[] {
  return [];
}

/**
 * Toggle between "all selected" and "none selected".
 * If indeterminate, selects all.
 */
export function toggleAll(
  options: CheckboxOption[],
  currentValues: string[]
): string[] {
  if (areAllSelected(options, currentValues)) {
    return deselectAll();
  }
  return selectAll(options);
}

// ─── Validation ────────────────────────────────────────────────────────────

/**
 * Validate checkbox group — returns error message if requirements not met.
 *
 * @param selectedValues - Currently selected values
 * @param options - Available options
 * @param constraints - Validation constraints
 */
export function validateCheckboxGroup(
  selectedValues: string[],
  options: CheckboxOption[],
  constraints?: {
    minRequired?: number;
    maxAllowed?: number;
    requiredMessage?: string;
    maxMessage?: string;
  }
): string | null {
  if (!constraints) return null;

  if (
    constraints.minRequired !== undefined &&
    selectedValues.length < constraints.minRequired
  ) {
    return (
      constraints.requiredMessage ??
      `Select at least ${constraints.minRequired} option${constraints.minRequired > 1 ? 's' : ''}`
    );
  }

  if (
    constraints.maxAllowed !== undefined &&
    selectedValues.length > constraints.maxAllowed
  ) {
    return (
      constraints.maxMessage ??
      `Select no more than ${constraints.maxAllowed} option${constraints.maxAllowed > 1 ? 's' : ''}`
    );
  }

  return null;
}

// ─── Display ───────────────────────────────────────────────────────────────

/**
 * Format selected values into a human-readable summary string.
 *
 * @example
 * formatSelectionSummary(['a', 'b', 'c'], { maxDisplay: 2 })
 * // → "a, b +1 more"
 */
export function formatSelectionSummary(
  selectedValues: string[],
  options: CheckboxOption[],
  config?: { maxDisplay?: number }
): string {
  const { maxDisplay = 3 } = config ?? {};

  if (selectedValues.length === 0) return 'None selected';

  const selectedLabels = options
    .filter((o) => selectedValues.includes(o.value))
    .map((o) => o.label);

  if (selectedLabels.length <= maxDisplay) {
    return selectedLabels.join(', ');
  }

  const displayed = selectedLabels.slice(0, maxDisplay);
  const remaining = selectedLabels.length - maxDisplay;

  return `${displayed.join(', ')} +${remaining} more`;
}

/**
 * Count selected items by a predicate on the option.
 */
export function countSelectedBy(
  options: CheckboxOption[],
  selectedValues: string[],
  predicate: (option: CheckboxOption) => boolean
): number {
  return options.filter(
    (o) => selectedValues.includes(o.value) && predicate(o)
  ).length;
}