// components/ui/Flex.tsx
// Flex Component - The unopinionated layout foundation
// Provides complete control over flexbox behavior
// Uses COSMIC design tokens for spacing

import React from 'react';
import { cn } from '@/lib/utils';

export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';
export type FlexJustify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
export type FlexAlign = 'start' | 'end' | 'center' | 'stretch' | 'baseline';
export type FlexGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction of flex items */
  direction?: FlexDirection;
  /** Wrap behavior */
  wrap?: FlexWrap;
  /** Horizontal alignment (justify-content) */
  justify?: FlexJustify;
  /** Vertical alignment (align-items) */
  align?: FlexAlign;
  /** Gap between items */
  gap?: FlexGap;
  /** Row gap (overrides gap for rows) */
  rowGap?: FlexGap;
  /** Column gap (overrides gap for columns) */
  columnGap?: FlexGap;
  /** Responsive gap overrides */
  responsiveGap?: {
    mobile?: FlexGap;
    tablet?: FlexGap;
    desktop?: FlexGap;
    wide?: FlexGap;
  };
  /** As child element */
  asChild?: boolean;
}

/**
 * Direction classes
 */
const directionMap: Record<FlexDirection, string> = {
  row: 'flex-row',
  column: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'column-reverse': 'flex-col-reverse',
};

/**
 * Wrap classes
 */
const wrapMap: Record<FlexWrap, string> = {
  wrap: 'flex-wrap',
  nowrap: 'flex-nowrap',
  'wrap-reverse': 'flex-wrap-reverse',
};

/**
 * Justify classes
 */
const justifyMap: Record<FlexJustify, string> = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

/**
 * Align classes
 */
const alignMap: Record<FlexAlign, string> = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

/**
 * Gap classes
 */
const gapMap: Record<FlexGap, string> = {
  none: 'gap-0',
  xs: 'gap-1',      // 4px
  sm: 'gap-2',      // 8px
  md: 'gap-4',      // 16px
  lg: 'gap-6',      // 24px
  xl: 'gap-8',      // 32px
  '2xl': 'gap-12',  // 48px
  '3xl': 'gap-16',  // 64px
  '4xl': 'gap-24',  // 96px
};

const rowGapMap: Record<FlexGap, string> = {
  none: 'gap-y-0',
  xs: 'gap-y-1',
  sm: 'gap-y-2',
  md: 'gap-y-4',
  lg: 'gap-y-6',
  xl: 'gap-y-8',
  '2xl': 'gap-y-12',
  '3xl': 'gap-y-16',
  '4xl': 'gap-y-24',
};

const columnGapMap: Record<FlexGap, string> = {
  none: 'gap-x-0',
  xs: 'gap-x-1',
  sm: 'gap-x-2',
  md: 'gap-x-4',
  lg: 'gap-x-6',
  xl: 'gap-x-8',
  '2xl': 'gap-x-12',
  '3xl': 'gap-x-16',
  '4xl': 'gap-x-24',
};

/**
 * Responsive gap helper
 */
const getResponsiveGapClasses = (responsive: FlexProps['responsiveGap']): string => {
  if (!responsive) return '';
  
  const classes: string[] = [];
  
  if (responsive.mobile) classes.push(gapMap[responsive.mobile]);
  if (responsive.tablet) classes.push(`md:${gapMap[responsive.tablet]}`);
  if (responsive.desktop) classes.push(`lg:${gapMap[responsive.desktop]}`);
  if (responsive.wide) classes.push(`xl:${gapMap[responsive.wide]}`);
  
  return classes.join(' ');
};

/**
 * Flex Component
 * 
 * A powerful, unopinionated flexbox layout component.
 * 
 * @example
 * <Flex gap="md" wrap>
 *   <Button>Button 1</Button>
 *   <Button>Button 2</Button>
 *   <Button>Button 3</Button>
 * </Flex>
 * 
 * @example
 * <Flex direction="column" gap="lg" align="center">
 *   <h1>Title</h1>
 *   <p>Description</p>
 *   <Button>Action</Button>
 * </Flex>
 * 
 * @example
 * <Flex justify="between" align="center" className="w-full">
 *   <Logo />
 *   <Nav />
 *   <UserMenu />
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
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    // Determine gap classes
    let gapClass = '';
    let rowGapClass = '';
    let columnGapClass = '';
    
    if (responsiveGap) {
      gapClass = getResponsiveGapClasses(responsiveGap);
    } else if (gap) {
      gapClass = gapMap[gap];
    }
    
    if (rowGap) rowGapClass = rowGapMap[rowGap];
    if (columnGap) columnGapClass = columnGapMap[columnGap];
    
    // Base classes
    const baseClasses = cn(
      'flex',
      directionMap[direction],
      wrapMap[wrap],
      justifyMap[justify],
      alignMap[align],
      gapClass,
      rowGapClass,
      columnGapClass,
      className
    );
    
    return (
      <div ref={ref} className={baseClasses} {...props}>
        {children}
      </div>
    );
  }
);

Flex.displayName = 'Flex';

// ============================================================================
// VARIANT SHORTCUTS
// ============================================================================

/**
 * Row - Horizontal flex container
 */
export const Row = React.forwardRef<HTMLDivElement, Omit<FlexProps, 'direction'>>(
  (props, ref) => <Flex ref={ref} direction="row" {...props} />
);
Row.displayName = 'Row';

/**
 * Column - Vertical flex container
 */
export const Column = React.forwardRef<HTMLDivElement, Omit<FlexProps, 'direction'>>(
  (props, ref) => <Flex ref={ref} direction="column" {...props} />
);
Column.displayName = 'Column';

/**
 * Centered Flex - Center children on both axes
 */
export const CenteredFlex = React.forwardRef<HTMLDivElement, Omit<FlexProps, 'justify' | 'align'>>(
  (props, ref) => <Flex ref={ref} justify="center" align="center" {...props} />
);
CenteredFlex.displayName = 'CenteredFlex';

/**
 * SpaceBetween - Push children to opposite ends
 */
export const SpaceBetweenFlex = React.forwardRef<HTMLDivElement, Omit<FlexProps, 'justify'>>(
  (props, ref) => <Flex ref={ref} justify="between" {...props} />
);
SpaceBetweenFlex.displayName = 'SpaceBetweenFlex';

/**
 * WrapFlex - Wrap children to next line
 */
export const WrapFlex = React.forwardRef<HTMLDivElement, Omit<FlexProps, 'wrap'>>(
  (props, ref) => <Flex ref={ref} wrap="wrap" {...props} />
);
WrapFlex.displayName = 'WrapFlex';

/**
 * ResponsiveFlex - Changes direction at breakpoints
 */
export interface ResponsiveFlexProps extends Omit<FlexProps, 'direction'> {
  directionMobile?: FlexDirection;
  directionTablet?: FlexDirection;
  directionDesktop?: FlexDirection;
  directionWide?: FlexDirection;
}

export const ResponsiveFlex = React.forwardRef<HTMLDivElement, ResponsiveFlexProps>(
  ({
    directionMobile = 'column',
    directionTablet,
    directionDesktop,
    directionWide,
    className,
    ...props
  }, ref) => {
    const directionClasses = cn(
      directionMobile === 'row' ? 'flex-row' : 'flex-col',
      directionTablet && (directionTablet === 'row' ? 'md:flex-row' : 'md:flex-col'),
      directionDesktop && (directionDesktop === 'row' ? 'lg:flex-row' : 'lg:flex-col'),
      directionWide && (directionWide === 'row' ? 'xl:flex-row' : 'xl:flex-col')
    );
    
    return (
      <Flex ref={ref} className={cn(directionClasses, className)} {...props} />
    );
  }
);
ResponsiveFlex.displayName = 'ResponsiveFlex';

// ============================================================================
// COMPOSITION COMPONENTS
// ============================================================================

export interface FlexItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Grow factor (1-12, or true for flex-grow: 1) */
  grow?: boolean | number;
  /** Shrink factor */
  shrink?: boolean | number;
  /** Basis value */
  basis?: string | number;
  /** Order */
  order?: number;
  /** Align self override */
  alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'stretch' | 'baseline';
}

/**
 * FlexItem - Individual item with flex control
 * Use this when you need individual items to grow/shrink differently.
 * 
 * @example
 * <Flex>
 *   <FlexItem grow={2}>Twice as wide</FlexItem>
 *   <FlexItem grow={1}>Normal</FlexItem>
 * </Flex>
 */
export const FlexItem = React.forwardRef<HTMLDivElement, FlexItemProps>(
  ({ children, grow, shrink, basis, order, alignSelf, className, ...props }, ref) => {
    const alignSelfMap: Record<string, string> = {
      auto: 'self-auto',
      start: 'self-start',
      end: 'self-end',
      center: 'self-center',
      stretch: 'self-stretch',
      baseline: 'self-baseline',
    };
    
    const growClass = grow === true ? 'flex-grow' : (typeof grow === 'number' ? `flex-grow-${grow}` : '');
    const shrinkClass = shrink === true ? 'flex-shrink' : (typeof shrink === 'number' ? `flex-shrink-${shrink}` : '');
    const basisClass = basis ? `basis-[${typeof basis === 'number' ? `${basis}px` : basis}]` : '';
    const orderClass = order !== undefined ? `order-${order}` : '';
    
    const classes = cn(
      growClass,
      shrinkClass,
      basisClass,
      orderClass,
      alignSelf && alignSelfMap[alignSelf],
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