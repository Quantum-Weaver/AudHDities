// src/utils/components/forging/form_validation.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FORM VALIDATION UTILITIES                              ║
// ║                    Async validation, error filtering                      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { ValidatorFunction } from '@/types/components/forging/form_validation.types';

// ═══════════════════════════════════════════════════════════════════════════
// VALIDATOR EXECUTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Runs a validator function and normalizes the result to a string or null.
 * Handles both sync and async validators.
 */
export async function executeValidator(
  validator: ValidatorFunction,
  value: any,
  allValues?: Record<string, any>
): Promise<string | null> {
  try {
    const result = await validator(value, allValues);
    return result ?? null;
  } catch (err) {
    return err instanceof Error ? err.message : 'Validation error';
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ERROR FILTERING
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Filters errors to only include those for fields that have been touched.
 */
export function filterTouchedErrors(
  errors: Record<string, string>,
  touched: Record<string, boolean>
): Record<string, string> {
  const visible: Record<string, string> = {};
  for (const [field, message] of Object.entries(errors)) {
    if (touched[field]) {
      visible[field] = message;
    }
  }
  return visible;
}

/**
 * Returns whether the form has any visible (touched) errors.
 */
export function hasVisibleErrors(
  errors: Record<string, string>,
  touched: Record<string, boolean>
): boolean {
  return Object.keys(filterTouchedErrors(errors, touched)).length > 0;
}

// ═══════════════════════════════════════════════════════════════════════════
// FIELD HELPERS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Creates a standard error message for required fields.
 */
export function requiredError(fieldName: string): string {
  return `${fieldName} is required`;
}

/**
 * Creates a standard error message for minimum length.
 */
export function minLengthError(fieldName: string, min: number): string {
  return `${fieldName} must be at least ${min} characters`;
}

/**
 * Creates a standard error message for invalid email.
 */
export function emailError(): string {
  return 'Please enter a valid email address';
}