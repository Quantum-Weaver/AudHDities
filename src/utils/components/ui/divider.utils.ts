// src/utils/components/ui/divider.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    DIVIDER UTILITIES                                      ║
// ║                    Class composers, orientation resolvers                 ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cn } from '@/lib/utils';
import type { DividerOrientation } from '@/types/components/ui/divider.types';
import {
  DIVIDER_THICKNESS,
  DIVIDER_THICKNESS_VERTICAL,
  DIVIDER_LENGTH_HORIZONTAL,
  DIVIDER_LENGTH_VERTICAL,
  DIVIDER_SPACING_HORIZONTAL,
  DIVIDER_SPACING_VERTICAL,
  DIVIDER_LINE_BASE,
} from '@/lib/constants/components/ui/divider.constants';
import type {
  DividerThickness,
  DividerLength,
  DividerSpacingSize,
  DividerLineStyle,
  DividerVariant,
} from '@/types/components/ui/divider.types';
import {
  dividerColorVariants,
  dividerColorVerticalVariants,
  dividerLineStyleVariants,
  dividerLineStyleVerticalVariants,
} from '@/lib/constants/components/ui/divider.variants';

// ═══════════════════════════════════════════════════════════════════════════
// PUBLIC API
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Resolves the color class for a given variant and orientation.
 */
export function getDividerColorClass(params: {
  variant: DividerVariant;
  orientation: DividerOrientation;
}): string {
  return params.orientation === 'horizontal'
    ? dividerColorVariants({ variant: params.variant })
    : dividerColorVerticalVariants({ variant: params.variant });
}

/**
 * Resolves the thickness class for a given thickness and orientation.
 */
export function getDividerThicknessClass(params: {
  thickness: DividerThickness;
  orientation: DividerOrientation;
}): string {
  return params.orientation === 'horizontal'
    ? DIVIDER_THICKNESS[params.thickness]
    : DIVIDER_THICKNESS_VERTICAL[params.thickness];
}

/**
 * Resolves the length class for a given length and orientation.
 */
export function getDividerLengthClass(params: {
  length: DividerLength;
  orientation: DividerOrientation;
}): string {
  return params.orientation === 'horizontal'
    ? DIVIDER_LENGTH_HORIZONTAL[params.length]
    : DIVIDER_LENGTH_VERTICAL[params.length];
}

/**
 * Resolves the line style class for a given style and orientation.
 */
export function getDividerLineStyleClass(params: {
  lineStyle: DividerLineStyle;
  orientation: DividerOrientation;
}): string {
  return params.orientation === 'horizontal'
    ? dividerLineStyleVariants({ lineStyle: params.lineStyle })
    : dividerLineStyleVerticalVariants({ lineStyle: params.lineStyle });
}

/**
 * Resolves the spacing class for a given size and orientation.
 * Returns empty string if not spaced.
 */
export function getDividerSpacingClass(params: {
  spaced: boolean;
  spacingSize: DividerSpacingSize;
  orientation: DividerOrientation;
}): string {
  if (!params.spaced) return '';
  return params.orientation === 'horizontal'
    ? DIVIDER_SPACING_HORIZONTAL[params.spacingSize]
    : DIVIDER_SPACING_VERTICAL[params.spacingSize];
}

/**
 * Composes the complete line class string for a divider element.
 */
export function composeDividerLineClasses(params: {
  variant: DividerVariant;
  orientation: DividerOrientation;
  thickness: DividerThickness;
  length: DividerLength;
  lineStyle: DividerLineStyle;
  animated?: boolean;
}): string {
  return cn(
    getDividerColorClass({
      variant: params.variant,
      orientation: params.orientation,
    }),
    getDividerThicknessClass({
      thickness: params.thickness,
      orientation: params.orientation,
    }),
    getDividerLengthClass({
      length: params.length,
      orientation: params.orientation,
    }),
    getDividerLineStyleClass({
      lineStyle: params.lineStyle,
      orientation: params.orientation,
    }),
    params.lineStyle !== 'solid' && DIVIDER_LINE_BASE,
    params.animated && 'animate-fadeIn scale-in'
  );
}

/**
 * Returns the flex wrapper classes for a divider based on orientation.
 */
export function getDividerFlexClasses(orientation: DividerOrientation): string {
  return cn(
    orientation === 'horizontal' ? 'w-full' : 'h-full',
    'flex',
    orientation === 'horizontal' ? 'flex-row' : 'flex-col'
  );
}