// srv/lib/constants/components/ui/field_wrapper.constants.ts
// ============================================================================
// FIELD WRAPPER CONSTANTS
// Pure values only — all derived from COSMIC system
// ============================================================================

import { FONT_SIZES } from '@/lib/constants/cosmic/dimensions';
import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';

// ============================================================================
// FIELD WRAPPER SIZES
// ============================================================================

export const FIELD_WRAPPER_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

export type FieldWrapperSize = typeof FIELD_WRAPPER_SIZES[keyof typeof FIELD_WRAPPER_SIZES];

// ============================================================================
// LABEL + HELPER SIZE MAP (derived from FONT_SIZES)
// ============================================================================

/**
 * Maps FieldWrapperSize to the corresponding Label size and helper text size.
 * Label sizes use FONT_SIZES tokens; helper sizes use the size below.
 */
export const FIELD_SIZE_LABEL_MAP: Record<FieldWrapperSize, { labelSize: 'sm' | 'md' | 'lg'; helperSize: string }> = {
  sm: {
    labelSize: 'sm',
    helperSize: `text-[${FONT_SIZES.xs}]`,
  },
  md: {
    labelSize: 'md',
    helperSize: `text-[${FONT_SIZES.xs}]`,
  },
  lg: {
    labelSize: 'lg',
    helperSize: `text-[${FONT_SIZES.sm}]`,
  },
};

// ============================================================================
// LAYOUT CLASSES (derived from COSMIC tokens)
// ============================================================================

export const FIELD_WRAPPER_LAYOUT = {
  container: 'flex flex-col gap-1.5',
  fullWidth: 'w-full',
  helperText: `text-[${QUANTUM_COLORS.starDust}]/40`,
  errorText: `text-[${QUANTUM_COLORS.error}]`,
  disabled: 'opacity-50',
} as const;