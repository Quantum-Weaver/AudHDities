// src/components/ui/Divider.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    DIVIDER COMPONENT                                       ║
// ║                    The pause between thoughts                               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  DividerProps,
  DividerWithTextProps,
  SectionDividerProps,
  DividerVariant,
  DividerOrientation,
  DividerLineStyle,
  DividerThickness,
  DividerLength,
  DividerSpacingSize,
} from '@/types/components/ui/divider.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  DIVIDER_LABEL_GAP,
  DIVIDER_LABEL_TEXT,
  DIVIDER_LABEL_ICON_SIZE,
  DIVIDER_SECTION_SUBTITLE,
  DIVIDER_SECTION_PADDING,
} from '@/lib/constants/components/hof/divider.constants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  composeDividerLineClasses,
  getDividerSpacingClass,
  getDividerFlexClasses,
} from '@/lib/utils/components/ui/divider.utils';

// ═══════════════════════════════════════════════════════════════════════════
// DIVIDER
// ═══════════════════════════════════════════════════════════════════════════

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      variant = 'subtle',
      orientation = 'horizontal',
      lineStyle = 'solid',
      label,
      icon,
      thickness = 'NORMAL',
      length = 'FULL',
      spaced = false,
      spacingSize = 'MD',
      animated = false,
      className,
      ...props
    },
    ref
  ) => {
    const lineClasses = composeDividerLineClasses({
      variant,
      orientation,
      thickness,
      length,
      lineStyle,
      animated,
    });

    const spacingClass = getDividerSpacingClass({
      spaced,
      spacingSize,
      orientation,
    });

    // Labeled divider
    if (label || icon) {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center',
            DIVIDER_LABEL_GAP,
            orientation === 'vertical' && 'flex-col',
            spacingClass,
            className
          )}
          {...props}
        >
          <div className={cn(lineClasses, 'flex-1')} />
          <div className={DIVIDER_LABEL_TEXT}>
            {icon && <span className={DIVIDER_LABEL_ICON_SIZE}>{icon}</span>}
            {label && <span>{label}</span>}
          </div>
          <div className={cn(lineClasses, 'flex-1')} />
        </div>
      );
    }

    // Simple divider
    return (
      <div
        ref={ref}
        className={cn(getDividerFlexClasses(orientation), spacingClass, className)}
        {...props}
      >
        <div className={lineClasses} />
      </div>
    );
  }
);

Divider.displayName = 'Divider';

// ═══════════════════════════════════════════════════════════════════════════
// VARIANT SHORTCUTS
// ═══════════════════════════════════════════════════════════════════════════

export const LightDivider = React.forwardRef<
  HTMLDivElement,
  Omit<DividerProps, 'variant'>
>((props, ref) => <Divider ref={ref} variant="light" {...props} />);
LightDivider.displayName = 'LightDivider';

export const SubtleDivider = React.forwardRef<
  HTMLDivElement,
  Omit<DividerProps, 'variant'>
>((props, ref) => <Divider ref={ref} variant="subtle" {...props} />);
SubtleDivider.displayName = 'SubtleDivider';

export const BoldDivider = React.forwardRef<
  HTMLDivElement,
  Omit<DividerProps, 'variant'>
>((props, ref) => <Divider ref={ref} variant="bold" {...props} />);
BoldDivider.displayName = 'BoldDivider';

export const GlowDivider = React.forwardRef<
  HTMLDivElement,
  Omit<DividerProps, 'variant'>
>((props, ref) => <Divider ref={ref} variant="glow" animated {...props} />);
GlowDivider.displayName = 'GlowDivider';

export const GradientDivider = React.forwardRef<
  HTMLDivElement,
  Omit<DividerProps, 'variant'>
>((props, ref) => (
  <Divider ref={ref} variant="gradient" thickness="THIN" {...props} />
));
GradientDivider.displayName = 'GradientDivider';

export const VerticalDivider = React.forwardRef<
  HTMLDivElement,
  Omit<DividerProps, 'orientation'>
>((props, ref) => <Divider ref={ref} orientation="vertical" {...props} />);
VerticalDivider.displayName = 'VerticalDivider';

export const DashedDivider = React.forwardRef<
  HTMLDivElement,
  Omit<DividerProps, 'lineStyle'>
>((props, ref) => <Divider ref={ref} lineStyle="dashed" {...props} />);
DashedDivider.displayName = 'DashedDivider';

export const DottedDivider = React.forwardRef<
  HTMLDivElement,
  Omit<DividerProps, 'lineStyle'>
>((props, ref) => <Divider ref={ref} lineStyle="dotted" {...props} />);
DottedDivider.displayName = 'DottedDivider';

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSITION COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

export const DividerWithText = React.forwardRef<
  HTMLDivElement,
  DividerWithTextProps
>(({ text, variant = 'subtle', icon, className }, ref) => (
  <Divider
    ref={ref}
    label={text}
    icon={icon}
    variant={variant}
    className={className}
  />
));
DividerWithText.displayName = 'DividerWithText';

export const SectionDivider = React.forwardRef<
  HTMLDivElement,
  SectionDividerProps
>(({ title, subtitle, variant = 'glow', className }, ref) => (
  <div ref={ref} className={cn(DIVIDER_SECTION_PADDING, className)}>
    <Divider variant={variant} label={title} />
    {subtitle && <p className={DIVIDER_SECTION_SUBTITLE}>{subtitle}</p>}
  </div>
));
SectionDivider.displayName = 'SectionDivider';

// ═══════════════════════════════════════════════════════════════════════════
// TYPE EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export type {
  DividerProps,
  DividerWithTextProps,
  SectionDividerProps,
  DividerVariant,
  DividerOrientation,
  DividerLineStyle,
  DividerThickness,
  DividerLength,
  DividerSpacingSize,
} from '@/types/components/ui/divider.types';