// src/components/hof/Spacer.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SPACER COMPONENT                                       ║
// ║                    The breath between components                          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  SpacerProps,
  VSpacerProps,
  HSpacerProps,
  FlexSpacerProps,
  DirectionalSpacerProps,
  SpacerGroupProps,
  SpacerAxis,
  SpacerDirection,
} from '@/types/components/hof/spacer.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  SPACER_AXIS,
  SPACER_DIRECTION,
  SPACER_FLEX_CLASSES,
} from '@/lib/constants/components/hof/spacer.constants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import { composeSpacerClasses } from '@/lib/utils/components/hof/spacer.utils';

// ═══════════════════════════════════════════════════════════════════════════
// SPACER
// ═══════════════════════════════════════════════════════════════════════════

export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  (
    {
      size = 'MD',
      axis = 'both',
      direction = 'all',
      grow = false,
      shrink = false,
      px,
      responsive,
      className,
      ...props
    },
    ref
  ) => {
    const classes = composeSpacerClasses({
      size,
      axis: axis as SpacerAxis,
      direction: direction as SpacerDirection,
      px,
      grow,
      shrink,
      responsive,
      className,
    });

    return <div ref={ref} className={classes} aria-hidden="true" {...props} />;
  }
);

Spacer.displayName = 'Spacer';

// ═══════════════════════════════════════════════════════════════════════════
// SHORTCUTS
// ═══════════════════════════════════════════════════════════════════════════

export const VSpacer = React.forwardRef<HTMLDivElement, VSpacerProps>(
  (props, ref) => <Spacer ref={ref} axis="vertical" {...props} />
);
VSpacer.displayName = 'VSpacer';

export const HSpacer = React.forwardRef<HTMLDivElement, HSpacerProps>(
  (props, ref) => <Spacer ref={ref} axis="horizontal" {...props} />
);
HSpacer.displayName = 'HSpacer';

export const FlexSpacer = React.forwardRef<HTMLDivElement, FlexSpacerProps>(
  (props, ref) => <Spacer ref={ref} grow size="XS" {...props} />
);
FlexSpacer.displayName = 'FlexSpacer';

export const TopSpacer = React.forwardRef<HTMLDivElement, DirectionalSpacerProps>(
  (props, ref) => <Spacer ref={ref} direction="top" {...props} />
);
TopSpacer.displayName = 'TopSpacer';

export const BottomSpacer = React.forwardRef<HTMLDivElement, DirectionalSpacerProps>(
  (props, ref) => <Spacer ref={ref} direction="bottom" {...props} />
);
BottomSpacer.displayName = 'BottomSpacer';

export const LeftSpacer = React.forwardRef<HTMLDivElement, DirectionalSpacerProps>(
  (props, ref) => <Spacer ref={ref} direction="left" {...props} />
);
LeftSpacer.displayName = 'LeftSpacer';

export const RightSpacer = React.forwardRef<HTMLDivElement, DirectionalSpacerProps>(
  (props, ref) => <Spacer ref={ref} direction="right" {...props} />
);
RightSpacer.displayName = 'RightSpacer';

// ═══════════════════════════════════════════════════════════════════════════
// SPACER GROUP
// ═══════════════════════════════════════════════════════════════════════════

export const SpacerGroup = React.forwardRef<HTMLDivElement, SpacerGroupProps>(
  ({ children, spacing = 'MD', direction = 'horizontal', className }, ref) => {
    const childArray = React.Children.toArray(children);
    const isHorizontal = direction === 'horizontal';

    return (
      <div
        ref={ref}
        className={cn(
          SPACER_FLEX_CLASSES.FLEX,
          isHorizontal ? SPACER_FLEX_CLASSES.ROW : SPACER_FLEX_CLASSES.COL,
          className
        )}
      >
        {childArray.map((child, index) => (
          <React.Fragment key={index}>
            {child}
            {index < childArray.length - 1 &&
              (isHorizontal ? (
                <HSpacer size={spacing} />
              ) : (
                <VSpacer size={spacing} />
              ))}
          </React.Fragment>
        ))}
      </div>
    );
  }
);
SpacerGroup.displayName = 'SpacerGroup';

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export type {
  SpacerProps,
  VSpacerProps,
  HSpacerProps,
  FlexSpacerProps,
  DirectionalSpacerProps,
  SpacerGroupProps,
  SpacerSize,
  SpacerAxis,
  SpacerDirection,
  SpacerResponsiveBreakpoint,
} from '@/types/components/hof/spacer.types';