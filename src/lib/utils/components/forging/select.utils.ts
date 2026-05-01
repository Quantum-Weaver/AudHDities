// src/utils/components/forging/select.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SELECT UTILITIES                                       ║
// ║                    Class composition helpers                              ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cn } from '@/lib/utils';
import { selectVariants } from '@/lib/constants/components/forging/select.variants';
import {
  SELECT_LABEL_COLOR,
  SELECT_LABEL_ERROR_COLOR,
  SELECT_REQUIRED_STAR_COLOR,
  SELECT_OPTIONAL_TEXT_COLOR,
  SELECT_CHEVRON_COLOR,
  SELECT_CHEVRON_SIZE,
  SELECT_HELPER_COLOR,
  SELECT_ERROR_TEXT_COLOR,
  SELECT_GAP,
} from '@/lib/constants/components/forging/select.constants';
import type { SelectSizeVariant, SelectVariant } from '@/lib/constants/components/forging/select.variants';

/**
 * Composes the trigger (select element) classes.
 */
export function composeSelectTriggerClasses(params: {
  variant: SelectVariant;
  size: SelectSizeVariant;
  native: boolean;
  fullWidth: boolean;
  hasError: boolean;
  className?: string;
}): string {
  return cn(
    selectVariants({
      variant: params.hasError ? 'error' : params.variant,
      size: params.size,
      native: params.native,
    }),
    params.fullWidth && 'w-full',
    params.className
  );
}

/**
 * Composes label classes based on error state.
 */
export function composeSelectLabelClasses(hasError: boolean): string {
  return cn(
    'text-sm font-medium',
    SELECT_LABEL_COLOR,
    hasError && SELECT_LABEL_ERROR_COLOR
  );
}

/**
 * Returns the required indicator element if applicable.
 */
export function getSelectRequiredIndicator(required: boolean): string {
  return required ? `${SELECT_REQUIRED_STAR_COLOR} ml-1` : '';
}

/**
 * Returns the optional indicator element if applicable.
 */
export function getSelectOptionalIndicator(optional: boolean): string {
  return optional ? `${SELECT_OPTIONAL_TEXT_COLOR} ml-1 text-xs` : '';
}