// src/components/ui/Flex.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FLEX COMPONENT                                         ║
// ║                    The unopinionated layout foundation                    ║
// ║                    All values from COSMIC constants                       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import React from 'react';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  FlexProps,
  FlexItemProps,
  ResponsiveFlexProps,
  FlexDirection,
} from '@/types/components/hof/flex.types';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  getDirectionClass,
  getWrapClass,
  getJustifyClass,
  getAlignClass,
  getGapClass,
  getRowGapClass,
  getColumnGapClass,
  getResponsiveGapClasses,
  resolveFlexBasis,
  getAlignSelfClass,
} from '@/lib/utils/components/hof/flex.utils';

// ═══════════════════════════════════════════════════════════════════════════
// FLEX — ROOT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Flex — A powerful, unopinionated flexbox layout component.
 *
 * @example
 * <Flex gap="md" wrap="wrap">
 *   <Button>One</Button>
 *   <Button>Two</Button>
 * </Flex>
 *
 * @example
 * <Flex direction="column" gap="lg" align="center">
 *   <h1>Title</h1>
 *   <p>Description</p>
 * </Flex>
 */
export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      children,
      direction = 'row',
      wrap = 'nowrap',
      justify = 'start',
      align = 'stretch',
      gap,
      rowGap,
      columnGap,
      responsiveGap,
      className,
      ...props
    },
    ref
  ) => {
    // Resolve gap classes
    let gapClass = '';
    let rowGapClass = '';
    let columnGapClass = '';

    if (responsiveGap) {
      gapClass = getResponsiveGapClasses(responsiveGap);
    } else if (gap) {
      gapClass = getGapClass(gap);
    }

    if (rowGap) rowGapClass = getRowGapClass(rowGap);
    if (columnGap) columnGapClass = getColumnGapClass(columnGap);

    const classes = cn(
      'flex',
      getDirectionClass(direction),
      getWrapClass(wrap),
      getJustifyClass(justify),
      getAlignClass(align),
      gapClass,
      rowGapClass,
      columnGapClass,
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);
Flex.displayName = 'Flex';

// ═══════════════════════════════════════════════════════════════════════════
// VARIANT SHORTCUTS
// ═══════════════════════════════════════════════════════════════════════════

/** Row — Horizontal flex container */
export const Row = React.forwardRef<
  HTMLDivElement,
  Omit<FlexProps, 'direction'>
>((props, ref) => <Flex ref={ref} direction="row" {...props} />);
Row.displayName = 'Row';

/** Column — Vertical flex container */
export const Column = React.forwardRef<
  HTMLDivElement,
  Omit<FlexProps, 'direction'>
>((props, ref) => <Flex ref={ref} direction="column" {...props} />);
Column.displayName = 'Column';

/** CenteredFlex — Center children on both axes */
export const CenteredFlex = React.forwardRef<
  HTMLDivElement,
  Omit<FlexProps, 'justify' | 'align'>
>((props, ref) => (
  <Flex ref={ref} justify="center" align="center" {...props} />
));
CenteredFlex.displayName = 'CenteredFlex';

/** SpaceBetweenFlex — Push children to opposite ends */
export const SpaceBetweenFlex = React.forwardRef<
  HTMLDivElement,
  Omit<FlexProps, 'justify'>
>((props, ref) => <Flex ref={ref} justify="between" {...props} />);
SpaceBetweenFlex.displayName = 'SpaceBetweenFlex';

/** WrapFlex — Wrap children to next line */
export const WrapFlex = React.forwardRef<
  HTMLDivElement,
  Omit<FlexProps, 'wrap'>
>((props, ref) => <Flex ref={ref} wrap="wrap" {...props} />);
WrapFlex.displayName = 'WrapFlex';

// ═══════════════════════════════════════════════════════════════════════════
// RESPONSIVE FLEX
// ═══════════════════════════════════════════════════════════════════════════

/**
 * ResponsiveFlex — Changes direction at breakpoints.
 *
 * @example
 * <ResponsiveFlex directionMobile="column" directionDesktop="row" gap="md">
 *   <Sidebar />
 *   <Content />
 * </ResponsiveFlex>
 */
export const ResponsiveFlex = React.forwardRef<HTMLDivElement, ResponsiveFlexProps>(
  (
    {
      directionMobile = 'column',
      directionTablet,
      directionDesktop,
      directionWide,
      className,
      ...props
    },
    ref
  ) => {
    const directionClasses = cn(
      getDirectionClass(directionMobile),
      directionTablet && `md:${getDirectionClass(directionTablet)}`,
      directionDesktop && `lg:${getDirectionClass(directionDesktop)}`,
      directionWide && `xl:${getDirectionClass(directionWide)}`
    );

    return (
      <Flex ref={ref} className={cn(directionClasses, className)} {...props} />
    );
  }
);
ResponsiveFlex.displayName = 'ResponsiveFlex';

// ═══════════════════════════════════════════════════════════════════════════
// FLEX ITEM
// ═══════════════════════════════════════════════════════════════════════════

/**
 * FlexItem — Individual item with grow/shrink/basis/order/align-self control.
 *
 * @example
 * <Flex>
 *   <FlexItem grow={2}>Twice as wide</FlexItem>
 *   <FlexItem grow={1}>Normal</FlexItem>
 * </Flex>
 */
export const FlexItem = React.forwardRef<HTMLDivElement, FlexItemProps>(
  (
    {
      children,
      grow,
      shrink,
      basis,
      order,
      alignSelf,
      className,
      ...props
    },
    ref
  ) => {
    const growClass =
      grow === true
        ? 'flex-grow'
        : typeof grow === 'number'
          ? `flex-grow-${grow}`
          : '';

    const shrinkClass =
      shrink === true
        ? 'flex-shrink'
        : typeof shrink === 'number'
          ? `flex-shrink-${shrink}`
          : '';

    const basisClass = basis !== undefined ? resolveFlexBasis(basis) : '';
    const orderClass = order !== undefined ? `order-${order}` : '';
    const alignSelfClass = alignSelf ? getAlignSelfClass(alignSelf) : '';

    const classes = cn(
      growClass,
      shrinkClass,
      basisClass,
      orderClass,
      alignSelfClass,
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);
FlexItem.displayName = 'FlexItem';

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export type {
  FlexProps,
  FlexItemProps,
  ResponsiveFlexProps,
  FlexDirection,
  FlexWrap,
  FlexJustify,
  FlexAlign,
  FlexGap,
  FlexAlignSelf,
} from '@/types/components/hof/flex.types';