// src/utils/components/ui/spacer.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SPACER UTILITIES                                       ║
// ║                    Class composers, responsive resolver                   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cn } from '@/lib/utils';
import {
  SPACER_SIZES,
  SPACER_PX_MAP,
  SPACER_FULL_CLASSES,
  RESPONSIVE_PREFIX_MAP,
  SPACER_FLEX_CLASSES,
  type SpacerSize,
  type SpacerAxis,
  type SpacerDirection,
  type SpacerResponsiveBreakpoint,
} from '@/lib/constants/components/hof/spacer.constants';
import { buildDirectionClass } from '@/lib/constants/components/hof/spacer.variants';

// ═══════════════════════════════════════════════════════════════════════════
// DIRECTIONAL CLASS RESOLVER
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Returns the Tailwind classes for a given size + direction + axis combination.
 */
export function resolveDirectionClass(
  size: SpacerSize,
  direction: SpacerDirection,
  axis: SpacerAxis
): string {
  const px = SPACER_PX_MAP[size];
  return buildDirectionClass(px, direction, axis);
}

// ═══════════════════════════════════════════════════════════════════════════
// CUSTOM PIXEL RESOLVER
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Returns classes for a custom pixel value.
 */
export function resolveCustomPixelClass(
  px: number,
  axis: SpacerAxis,
  direction: SpacerDirection
): string {
  return buildDirectionClass(px, direction, axis);
}

// ═══════════════════════════════════════════════════════════════════════════
// RESPONSIVE CLASS COMPOSER
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Composes responsive size classes from a responsive config map.
 */
export function composeResponsiveClasses(
  responsive: Partial<Record<SpacerResponsiveBreakpoint, SpacerSize>> | undefined,
  axis: SpacerAxis,
  direction: SpacerDirection
): string {
  if (!responsive) return '';

  const classes: string[] = [];

  for (const [breakpoint, size] of Object.entries(responsive) as [
    SpacerResponsiveBreakpoint,
    SpacerSize
  ][]) {
    const prefix = RESPONSIVE_PREFIX_MAP[breakpoint];
    const cls = resolveDirectionClass(size, direction, axis);
    if (cls) {
      classes.push(prefix ? `${prefix}${cls}` : cls);
    }
  }

  return classes.join(' ');
}

// ═══════════════════════════════════════════════════════════════════════════
// FLEX CLASS COMPOSER
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Composes flex grow/shrink classes.
 */
export function composeFlexClasses(grow: boolean, shrink: boolean): string {
  return cn(
    grow && SPACER_FLEX_CLASSES.GROW,
    shrink && SPACER_FLEX_CLASSES.SHRINK
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPLETE CLASS COMPOSER
// ═══════════════════════════════════════════════════════════════════════════

export interface ComposeSpacerClassesParams {
  size: SpacerSize;
  axis: SpacerAxis;
  direction: SpacerDirection;
  px?: number;
  grow: boolean;
  shrink: boolean;
  responsive?: Partial<Record<SpacerResponsiveBreakpoint, SpacerSize>>;
  className?: string;
}

/**
 * Composes all spacer classes into a single class string.
 */
export function composeSpacerClasses(params: ComposeSpacerClassesParams): string {
  const { size, axis, direction, px, grow, shrink, responsive, className } = params;

  // Base size class
  const baseClass =
    px !== undefined
      ? resolveCustomPixelClass(px, axis, direction)
      : resolveDirectionClass(size, direction, axis);

  // Responsive overrides
  const responsiveClass = composeResponsiveClasses(responsive, axis, direction);

  // Flex behavior
  const flexClass = composeFlexClasses(grow, shrink);

  return cn(baseClass, responsiveClass, flexClass, className);
}