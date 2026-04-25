// src/utils/components/ui/radio.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    RADIO UTILITIES                                        ║
// ║                    Context helpers, ID generation, state checks           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { RadioGroupContextValue } from '@/types/components/ui/radio.types';

/**
 * Generates a unique radio ID from a base ID or random string.
 */
export function generateRadioId(id?: string): string {
  return id || `radio-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Determines if a radio item is in an error state.
 */
export function getRadioErrorState(
  error?: string,
  isChecked?: boolean
): { hasError: boolean; errorMessage: string | undefined } {
  return {
    hasError: !!error,
    errorMessage: error,
  };
}

/**
 * Composes the helper/error description ID for aria-describedby.
 */
export function getRadioDescriptionId(
  radioId: string,
  hasError: boolean,
  hasHelper: boolean
): string | undefined {
  if (hasError) return `${radioId}-error`;
  if (hasHelper) return `${radioId}-helper`;
  return undefined;
}

/**
 * Creates a stable context value for RadioGroup.
 */
export function createRadioGroupContext(
  params: RadioGroupContextValue
): RadioGroupContextValue {
  return params;
}