// src/components/ui/Stack.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    STACK COMPONENT                                         ║
// ║                    The vertebral column of the UI                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  StackProps,
  ResponsiveStackProps,
  StackSpacing,
  StackAlign,
  StackJustify,
  StackDirection,
} from '@/types/components/ui/stack.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  STACK_DIVIDER_WRAPPER_VERTICAL,
  STACK_DIVIDER_WRAPPER_HORIZONTAL,
} from '@/lib/constants/components/ui/stack.constants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import { composeStackClasses } from '@/utils/components/ui/stack.utils';

// ─── Sub-components ────────────────────────────────────────────────────────
import { Divider } from '@/components/ui/Divider';

// ═══════════════════════════════════════════════════════════════════════════
// STACK
// ═══════════════════════════════════════════════════════════════════════════

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      children,
      space = 'md',
      align = 'stretch',
      justify = 'start',
      direction = 'vertical',
      dividers = false,
      wrap = false,
      reverse = false,
      stretch = false,
      responsive,
      className,
      ...props
    },
    ref
  ) => {
    const classes = composeStackClasses({
      direction,
      space,
      align,
      justify,
      wrap,
      reverse,
      stretch,
      responsive,
      className,
    });

    // Handle dividers between children
    if (dividers) {
      const childArray = React.Children.toArray(children);
      const dividerOrientation =
        direction === 'vertical' ? 'horizontal' : 'vertical';
      const dividerWrapperClass =
        direction === 'vertical'
          ? STACK_DIVIDER_WRAPPER_VERTICAL
          : STACK_DIVIDER_WRAPPER_HORIZONTAL;

      const childrenWithDividers = childArray.reduce(
        (acc: React.ReactNode[], child, index) => {
          acc.push(child);
          if (index < childArray.length - 1) {
            acc.push(
              <div
                key={`stack-divider-${index}`}
                className={dividerWrapperClass}
              >
                <Divider orientation={dividerOrientation} />
              </div>
            );
          }
          return acc;
        },
        []
      );

      return (
        <div ref={ref} className={classes} {...props}>
          {childrenWithDividers}
        </div>
      );
    }

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Stack.displayName = 'Stack';

// ═══════════════════════════════════════════════════════════════════════════
// VARIANT SHORTCUTS
// ═══════════════════════════════════════════════════════════════════════════

export const VStack = React.forwardRef<
  HTMLDivElement,
  Omit<StackProps, 'direction'>
>((props, ref) => <Stack ref={ref} direction="vertical" {...props} />);
VStack.displayName = 'VStack';

export const HStack = React.forwardRef<
  HTMLDivElement,
  Omit<StackProps, 'direction'>
>((props, ref) => <Stack ref={ref} direction="horizontal" {...props} />);
HStack.displayName = 'HStack';

export const ResponsiveStack = React.forwardRef<
  HTMLDivElement,
  ResponsiveStackProps
>(
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
      directionTablet &&
        `md:${directionTablet === 'vertical' ? 'flex-col' : 'flex-row'}`,
      directionDesktop &&
        `lg:${directionDesktop === 'vertical' ? 'flex-col' : 'flex-row'}`
    );

    return (
      <Stack
        ref={ref}
        className={cn(directionClasses, className)}
        {...props}
      />
    );
  }
);
ResponsiveStack.displayName = 'ResponsiveStack';

// ═══════════════════════════════════════════════════════════════════════════
// TYPE EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export type {
  StackProps,
  ResponsiveStackProps,
  StackSpacing,
  StackAlign,
  StackJustify,
  StackDirection,
} from '@/types/components/ui/stack.types';