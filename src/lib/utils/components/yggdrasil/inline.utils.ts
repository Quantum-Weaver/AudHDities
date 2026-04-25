// src/lib/utils/components/yggdrasil/inline.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    INLINE UTILITIES                                       ║
// ║                    Spacing math, responsive detection                     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import {
  SCALE_MULTIPLIERS,
  BASE_UNIT,
  type ScaleKey,
} from '@/lib/constants/cosmic/dimensions';

import {
  INLINE_SPACING_KEYS,
  type InlineSpace,
  type InlineAlign,
} from '@/lib/constants/components/yggdrasil/inline.constants';

// ─── Space → Pixels ────────────────────────────────────────────────────────

/**
 * Convert an InlineSpace key to its pixel value.
 *
 * @param space - Spacing key (e.g., '4' → 16px)
 * @returns Pixel value as a number
 *
 * @example
 * getInlineSpacePixels('6')  // → 24
 * getInlineSpacePixels('0')  // → 0
 */
export function getInlineSpacePixels(space: InlineSpace): number {
  const multiplier = SCALE_MULTIPLIERS[space as ScaleKey];
  return multiplier * BASE_UNIT;
}

/**
 * Convert an InlineSpace key to a CSS-compatible pixel string.
 *
 * @example
 * getInlineSpacePx('6')  // → '24px'
 */
export function getInlineSpacePx(space: InlineSpace): string {
  return `${getInlineSpacePixels(space)}px`;
}

// ─── Space Validation ──────────────────────────────────────────────────────

/**
 * Check if a value is a valid Inline spacing key.
 * Useful for runtime validation when spacing comes from user input.
 */
export function isValidInlineSpace(value: string): value is InlineSpace {
  return INLINE_SPACING_KEYS.includes(value as InlineSpace);
}

/**
 * Clamp a spacing value to the nearest valid InlineSpace key.
 * Falls back to the default spacing if no match.
 */
export function clampInlineSpace(value: string | number): InlineSpace {
  const strValue = String(value);

  // Exact match
  if (isValidInlineSpace(strValue)) return strValue;

  // Find the closest key by numeric comparison
  const numValue = Number(strValue);
  if (isNaN(numValue)) return '4';

  const keysAsNumbers = INLINE_SPACING_KEYS.map((k) => ({
    key: k,
    value: SCALE_MULTIPLIERS[k as ScaleKey] * BASE_UNIT,
  }));

  const closest = keysAsNumbers.reduce((prev, curr) =>
    Math.abs(curr.value - numValue) < Math.abs(prev.value - numValue)
      ? curr
      : prev
  );

  return closest.key;
}

// ─── Alignment Utilities ───────────────────────────────────────────────────

/**
 * Map a flex alignment to its logical description.
 * Useful for accessibility and screen reader descriptions.
 */
export function describeInlineAlignment(align: InlineAlign): string {
  const descriptions: Record<InlineAlign, string> = {
    start: 'Left-aligned',
    center: 'Centered',
    end: 'Right-aligned',
    between: 'Spread between edges',
    around: 'Evenly distributed with half-size edge gaps',
    evenly: 'Evenly distributed',
  };

  return descriptions[align];
}

// ─── Responsive Detection ──────────────────────────────────────────────────

/**
 * Determine the recommended responsive behavior based on child count
 * and the current viewport width.
 *
 * @param childCount - Number of children in the inline container
 * @param viewportWidth - Current viewport width in pixels (optional)
 * @returns Recommended responsive variant
 */
export function getResponsiveVariant(
  childCount: number,
  viewportWidth?: number
): 'none' | 'stackOnMobile' | 'stackOnTablet' {
  if (childCount <= 1) return 'none';
  if (childCount <= 2) return 'stackOnMobile';
  if (childCount <= 4) {
    if (viewportWidth && viewportWidth < 768) return 'stackOnTablet';
    return 'stackOnMobile';
  }
  if (viewportWidth && viewportWidth < 1024) return 'stackOnTablet';
  return 'stackOnTablet';
}

/**
 * Calculate the optimal spacing for a given number of children,
 * reducing spacing as the count increases to prevent overflow.
 */
export function getOptimalSpacing(childCount: number): InlineSpace {
  if (childCount <= 2) return '6';
  if (childCount <= 3) return '4';
  if (childCount <= 5) return '3';
  if (childCount <= 8) return '2';
  return '1';
}