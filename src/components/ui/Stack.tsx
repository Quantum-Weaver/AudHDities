// components/ui/Stack.tsx
// Stack Layout Component - The vertebral column of the UI
// Provides consistent vertical spacing between children
// Uses COSMIC design tokens for spacing values

import React from 'react';
import { cn } from '@/lib/utils';

export type StackSpacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Space between children */
  space?: StackSpacing;
  /** Vertical alignment of children */
  align?: StackAlign;
  /** Horizontal alignment of children (when direction is vertical) */
  justify?: StackJustify;
  /** Direction of the stack */
  direction?: 'vertical' | 'horizontal';
  /** Show dividers between children */
  dividers?: boolean;
  /** Custom divider component */
  divider?: React.ReactNode;
  /** Wrap children on multiple lines (horizontal only) */
  wrap?: boolean;
  /** Reverse order of children */
  reverse?: boolean;
  /** Stretch children to fill available space (vertical only) */
  stretch?: boolean;
  /** Responsive spacing overrides */
  responsive?: {
    mobile?: StackSpacing;
    tablet?: StackSpacing;
    desktop?: StackSpacing;
  };
  /** As child element (render as child instead of div) */
  asChild?: boolean;
}

const spacingMap: Record<StackSpacing, string> = {
  xs: 'gap-1',      // 4px
  sm: 'gap-2',      // 8px
  md: 'gap-4',      // 16px
  lg: 'gap-6',      // 24px
  xl: 'gap-8',      // 32px
  '2xl': 'gap-12',  // 48px
  none: 'gap-0',
};

const alignMap: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyMapVertical: Record<StackJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

const justifyMapHorizontal: Record<StackJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

const responsiveSpacingMap: Record<StackSpacing, string> = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
  none: 'gap-0',
};

/**
 * Stack Component
 * 
 * A flexible layout component for consistent vertical or horizontal spacing.
 * 
 * @example
 * <Stack space="md">
 *   <div>First item</div>
 *   <div>Second item</div>
 *   <div>Third item</div>
 * </Stack>
 * 
 * @example
 * <Stack space="lg" dividers align="center">
 *   <div>Centered items with dividers</div>
 *   <div>Between each item</div>
 * </Stack>
 * 
 * @example
 * <Stack direction="horizontal" space="sm" wrap>
 *   <Button>Button 1</Button>
 *   <Button>Button 2</Button>
 *   <Button>Button 3</Button>
 * </Stack>
 */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      children,
      space = 'md',
      align = 'stretch',
      justify = 'start',
      direction = 'vertical',
      dividers = false,
      divider,
      wrap = false,
      reverse = false,
      stretch = false,
      responsive,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    // Determine spacing class
    let spacingClass = spacingMap[space];
    
    // Apply responsive spacing if provided
    if (responsive) {
      const classes: string[] = [];
      if (responsive.mobile) classes.push(responsiveSpacingMap[responsive.mobile]);
      if (responsive.tablet) classes.push(`md:${responsiveSpacingMap[responsive.tablet]}`);
      if (responsive.desktop) classes.push(`lg:${responsiveSpacingMap[responsive.desktop]}`);
      if (classes.length > 0) spacingClass = classes.join(' ');
    }
    
    // Base classes
    const baseClasses = cn(
      'flex',
      direction === 'vertical' ? 'flex-col' : 'flex-row',
      spacingClass,
      alignMap[align],
      direction === 'vertical' ? justifyMapVertical[justify] : justifyMapHorizontal[justify],
      wrap && 'flex-wrap',
      reverse && direction === 'vertical' && 'flex-col-reverse',
      reverse && direction === 'horizontal' && 'flex-row-reverse',
      stretch && direction === 'vertical' && '[&>*]:flex-1',
      className
    );
    
    // Handle dividers
    if (dividers) {
      const childArray = React.Children.toArray(children);
      const dividerElement = divider || <Divider direction={direction === 'vertical' ? 'horizontal' : 'vertical'} />;
      
      const childrenWithDividers = childArray.reduce((acc: React.ReactNode[], child, index) => {
        acc.push(child);
        if (index < childArray.length - 1) {
          acc.push(
            <div key={`divider-${index}`} className={direction === 'vertical' ? 'w-full' : 'h-full'}>
              {dividerElement}
            </div>
          );
        }
        return acc;
      }, []);
      
      return (
        <div ref={ref} className={baseClasses} {...props}>
          {childrenWithDividers}
        </div>
      );
    }
    
    // Standard render
    return (
      <div ref={ref} className={baseClasses} {...props}>
        {children}
      </div>
    );
  }
);

Stack.displayName = 'Stack';

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface DividerProps {
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

const Divider = ({ direction = 'horizontal', className }: DividerProps) => {
  return (
    <div
      className={cn(
        direction === 'horizontal' 
          ? 'h-px w-full bg-white/10' 
          : 'w-px h-full bg-white/10',
        className
      )}
    />
  );
};

// ============================================================================
// VARIANT SHORTCUTS
// ============================================================================

/**
 * Vertical Stack - Pre-configured vertical layout
 */
export const VStack = React.forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="vertical" {...props} />
);
VStack.displayName = 'VStack';

/**
 * Horizontal Stack - Pre-configured horizontal layout
 */
export const HStack = React.forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="horizontal" {...props} />
);
HStack.displayName = 'HStack';

/**
 * Responsive Stack - Changes direction based on breakpoint
 */
export interface ResponsiveStackProps extends Omit<StackProps, 'direction'> {
  directionMobile?: 'vertical' | 'horizontal';
  directionTablet?: 'vertical' | 'horizontal';
  directionDesktop?: 'vertical' | 'horizontal';
}

export const ResponsiveStack = React.forwardRef<HTMLDivElement, ResponsiveStackProps>(
  (
    {
      directionMobile = 'vertical',
      directionTablet,
      directionDesktop,
      className,
      ...props
    },
    ref
  ) => {
    const directionClasses = cn(
      directionMobile === 'vertical' ? 'flex-col' : 'flex-row',
      directionTablet && `md:${directionTablet === 'vertical' ? 'flex-col' : 'flex-row'}`,
      directionDesktop && `lg:${directionDesktop === 'vertical' ? 'flex-col' : 'flex-row'}`
    );
    
    return (
      <Stack ref={ref} className={cn(directionClasses, className)} {...props} />
    );
  }
);
ResponsiveStack.displayName = 'ResponsiveStack';