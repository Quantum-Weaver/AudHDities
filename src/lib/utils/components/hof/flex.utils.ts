// src/utils/components/ui/flex.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FLEX UTILITIES                                         ║
// ║                    Class resolution, responsive gap composition           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import {
  FLEX_DIRECTION_CLASSES,
  FLEX_WRAP_CLASSES,
  FLEX_JUSTIFY_CLASSES,
  FLEX_ALIGN_CLASSES,
  FLEX_GAP_CLASSES,
  FLEX_ROW_GAP_CLASSES,
  FLEX_COLUMN_GAP_CLASSES,
  FLEX_ALIGN_SELF_CLASSES,
  FLEX_RESPONSIVE_PREFIXES,
  FLEX_DIRECTION,
  FLEX_WRAP,
  FLEX_JUSTIFY,
  FLEX_ALIGN,
  FLEX_GAP,
  FLEX_ALIGN_SELF,
} from '@/lib/constants/components/hof/flex.constants';

import type {
  FlexDirection,
  FlexWrap,
  FlexJustify,
  FlexAlign,
  FlexGap,
  FlexAlignSelf,
} from '@/types/components/hof/flex.types';

// ═══════════════════════════════════════════════════════════════════════════
// MAP RESOLVERS
// ═══════════════════════════════════════════════════════════════════════════

/** Resolve a FlexDirection value to its Tailwind class */
export function getDirectionClass(direction: FlexDirection): string {
  const key = Object.entries(FLEX_DIRECTION).find(
    ([, v]) => v === direction
  )?.[0] as keyof typeof FLEX_DIRECTION | undefined;
  return key ? FLEX_DIRECTION_CLASSES[key] : FLEX_DIRECTION_CLASSES.ROW;
}

/** Resolve a FlexWrap value to its Tailwind class */
export function getWrapClass(wrap: FlexWrap): string {
  const key = Object.entries(FLEX_WRAP).find(
    ([, v]) => v === wrap
  )?.[0] as keyof typeof FLEX_WRAP | undefined;
  return key ? FLEX_WRAP_CLASSES[key] : FLEX_WRAP_CLASSES.NOWRAP;
}

/** Resolve a FlexJustify value to its Tailwind class */
export function getJustifyClass(justify: FlexJustify): string {
  const key = Object.entries(FLEX_JUSTIFY).find(
    ([, v]) => v === justify
  )?.[0] as keyof typeof FLEX_JUSTIFY | undefined;
  return key ? FLEX_JUSTIFY_CLASSES[key] : FLEX_JUSTIFY_CLASSES.START;
}

/** Resolve a FlexAlign value to its Tailwind class */
export function getAlignClass(align: FlexAlign): string {
  const key = Object.entries(FLEX_ALIGN).find(
    ([, v]) => v === align
  )?.[0] as keyof typeof FLEX_ALIGN | undefined;
  return key ? FLEX_ALIGN_CLASSES[key] : FLEX_ALIGN_CLASSES.STRETCH;
}

/** Resolve a FlexGap value to its Tailwind gap class */
export function getGapClass(gap: FlexGap): string {
  const key = Object.entries(FLEX_GAP).find(
    ([, v]) => v === gap
  )?.[0] as keyof typeof FLEX_GAP | undefined;
  return key ? FLEX_GAP_CLASSES[key] : '';
}

/** Resolve a FlexGap value to its Tailwind row-gap class */
export function getRowGapClass(gap: FlexGap): string {
  const key = Object.entries(FLEX_GAP).find(
    ([, v]) => v === gap
  )?.[0] as keyof typeof FLEX_GAP | undefined;
  return key ? FLEX_ROW_GAP_CLASSES[key] : '';
}

/** Resolve a FlexGap value to its Tailwind column-gap class */
export function getColumnGapClass(gap: FlexGap): string {
  const key = Object.entries(FLEX_GAP).find(
    ([, v]) => v === gap
  )?.[0] as keyof typeof FLEX_GAP | undefined;
  return key ? FLEX_COLUMN_GAP_CLASSES[key] : '';
}

/** Resolve a FlexAlignSelf value to its Tailwind class */
export function getAlignSelfClass(alignSelf: FlexAlignSelf): string {
  const key = Object.entries(FLEX_ALIGN_SELF).find(
    ([, v]) => v === alignSelf
  )?.[0] as keyof typeof FLEX_ALIGN_SELF | undefined;
  return key ? FLEX_ALIGN_SELF_CLASSES[key] : '';
}

// ═══════════════════════════════════════════════════════════════════════════
// RESPONSIVE GAP COMPOSITION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Composes responsive gap classes from a responsive gap config.
 *
 * @example
 * getResponsiveGapClasses({ mobile: 'sm', tablet: 'md', desktop: 'lg' })
 * // → "gap-2 md:gap-4 lg:gap-6"
 */
export function getResponsiveGapClasses(
  responsive?: Partial<Record<'mobile' | 'tablet' | 'desktop' | 'wide', FlexGap>>
): string {
  if (!responsive) return '';

  const classes: string[] = [];
  const { MOBILE, TABLET, DESKTOP, WIDE } = FLEX_RESPONSIVE_PREFIXES;

  if (responsive.mobile) classes.push(getGapClass(responsive.mobile));
  if (responsive.tablet) classes.push(`${TABLET}${getGapClass(responsive.tablet)}`);
  if (responsive.desktop) classes.push(`${DESKTOP}${getGapClass(responsive.desktop)}`);
  if (responsive.wide) classes.push(`${WIDE}${getGapClass(responsive.wide)}`);

  return classes.join(' ');
}

// ═══════════════════════════════════════════════════════════════════════════
// FLEX ITEM BASIS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Resolves a basis value to a Tailwind arbitrary value class.
 * Numbers are treated as pixels, strings pass through.
 */
export function resolveFlexBasis(basis: string | number): string {
  if (typeof basis === 'number') {
    return `basis-[${basis}px]`;
  }
  return `basis-[${basis}]`;
}