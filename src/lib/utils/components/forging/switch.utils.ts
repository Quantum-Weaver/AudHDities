// src/utils/components/forging/tabs.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SWITCH UTILITIES                                       ║
// ║                    Class composition helpers                              ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cn } from '@/lib/utils';
import {
  switchTrackVariants,
  switchThumbVariants,
} from '@/lib/constants/components/forging/switch.variants';
import {
  SWITCH_LABEL_TEXT,
  SWITCH_LABEL_ERROR_TEXT,
  SWITCH_LABEL_SIZE,
  SWITCH_HELPER_TEXT,
  SWITCH_DISABLED_OPACITY,
  SWITCH_DISABLED_CURSOR,
} from '@/lib/constants/components/forging/switch.constants';
import type { SwitchSize, SwitchVariant } from '@/lib/constants/components/forging/switch.variants';

// ─── Track Class Composition ───────────────────────────────────────────────
/**
 * Composes track classes from variant + size + custom class.
 */
export function composeSwitchTrackClasses(params: {
  variant?: SwitchVariant;
  size?: SwitchSize;
  className?: string;
}): string {
  return cn(
    switchTrackVariants({
      variant: params.variant,
      size: params.size,
    }),
    params.className
  );
}

// ─── Thumb Class Composition ───────────────────────────────────────────────
/**
 * Composes thumb classes from size + checked state.
 */
export function composeSwitchThumbClasses(params: {
  size?: SwitchSize;
  isChecked: boolean;
}): string {
  return cn(
    switchThumbVariants({ size: params.size })
    // translate is handled via data-[state=checked] in CVA
  );
}

// ─── Label Class Composition ───────────────────────────────────────────────
/**
 * Composes label classes from size + state.
 */
export function composeSwitchLabelClasses(params: {
  size?: SwitchSize;
  disabled?: boolean;
  hasError?: boolean;
}): string {
  return cn(
    'cursor-pointer select-none',
    SWITCH_LABEL_TEXT,
    SWITCH_LABEL_SIZE[params.size || 'md'],
    params.disabled && [SWITCH_DISABLED_OPACITY, SWITCH_DISABLED_CURSOR],
    params.hasError && SWITCH_LABEL_ERROR_TEXT
  );
}

// ─── Helper Text Class Composition ─────────────────────────────────────────
/**
 * Composes helper/error text classes.
 */
export function composeSwitchHelperClasses(params: {
  hasError: boolean;
}): string {
  return cn(
    'text-xs pl-11',
    params.hasError ? SWITCH_LABEL_ERROR_TEXT : SWITCH_HELPER_TEXT
  );
}

// ─── ID Generation ─────────────────────────────────────────────────────────
/**
 * Generates a unique ID for the switch.
 */
export function generateSwitchId(id?: string): string {
  return id || `switch-${Math.random().toString(36).slice(2, 9)}`;
}