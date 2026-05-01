// src/components/seidr/Tooltip.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    TOOLTIP COMPONENT                                      ║
// ║                    The guide of the interface                             ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React from 'react';
import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  TooltipProviderProps,
  TooltipRootProps,
  TooltipTriggerProps,
  TooltipContentProps,
  TooltipWithIconProps,
  TooltipWithShortcutProps,
  TooltipGroupProps,
} from '@/types/components/seidr/tooltip.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  TOOLTIP_DEFAULT_DELAY,
  TOOLTIP_OFFSET,
  TOOLTIP_MAX_WIDTH,
  TOOLTIP_GROUP_SPACING,
  TOOLTIP_SHORTCUT_TRIGGER_CLASSES,
  TOOLTIP_SHORTCUT_KBD_CLASSES,
  TOOLTIP_SHORTCUT_KBD_INNER_CLASSES,
  TOOLTIP_ICON_TRIGGER_CLASSES,
} from '@/lib/constants/components/seidr/tooltip.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  tooltipContentVariants,
  tooltipArrowVariants,
} from '@/lib/constants/components/seidr/tooltip.variants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  composeTooltipContentClasses,
  composeTooltipArrowClasses,
  resolveTooltipMaxWidth,
} from '@/lib/utils/components/seidr/tooltip.utils';

// ═══════════════════════════════════════════════════════════════════════════
// PROVIDER
// ═══════════════════════════════════════════════════════════════════════════

function TooltipProvider({
  delay = TOOLTIP_DEFAULT_DELAY,
  ...props
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════

function Tooltip({ variant = 'default', ...props }: TooltipRootProps) {
  return (
    <TooltipPrimitive.Root
      data-slot="tooltip"
      data-variant={variant}
      {...props}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TRIGGER
// ═══════════════════════════════════════════════════════════════════════════

function TooltipTrigger({ ...props }: TooltipTriggerProps) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTENT
// ═══════════════════════════════════════════════════════════════════════════

function TooltipContent({
  className,
  side = 'top',
  sideOffset = TOOLTIP_OFFSET.SIDE,
  align = 'center',
  alignOffset = TOOLTIP_OFFSET.ALIGN,
  variant = 'default',
  maxWidth = TOOLTIP_MAX_WIDTH,
  showArrow = true,
  children,
  ...props
}: TooltipContentProps) {
  const contentVariantClass = tooltipContentVariants({ variant });
  const arrowVariantClass = tooltipArrowVariants({ variant });

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
        style={{ maxWidth: resolveTooltipMaxWidth(maxWidth) }}
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={composeTooltipContentClasses({
            variantClass: contentVariantClass,
            side,
            className,
          })}
          {...props}
        >
          {children}
          {showArrow && (
            <TooltipPrimitive.Arrow
              className={composeTooltipArrowClasses({
                variantClass: arrowVariantClass,
                side,
              })}
            />
          )}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// VARIANT SHORTCUTS
// ═══════════════════════════════════════════════════════════════════════════

function DarkTooltip({ children, ...props }: TooltipRootProps) {
  return <Tooltip variant="dark" {...props}>{children}</Tooltip>;
}

function QuantumTooltip({ children, ...props }: TooltipRootProps) {
  return <Tooltip variant="quantum" {...props}>{children}</Tooltip>;
}

function CosmicTooltip({ children, ...props }: TooltipRootProps) {
  return <Tooltip variant="cosmic" {...props}>{children}</Tooltip>;
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSITION: Icon + Tooltip
// ═══════════════════════════════════════════════════════════════════════════

function TooltipWithIcon({
  icon,
  content,
  side = 'top',
  variant = 'default',
  className,
}: TooltipWithIconProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          ...TOOLTIP_ICON_TRIGGER_CLASSES,
          className
        )}
      >
        {icon}
      </TooltipTrigger>
      <TooltipContent side={side} variant={variant}>
        {content}
      </TooltipContent>
    </Tooltip>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSITION: Shortcut + Tooltip
// ═══════════════════════════════════════════════════════════════════════════

function TooltipWithShortcut({
  label,
  shortcut,
  side = 'top',
  variant = 'default',
}: TooltipWithShortcutProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(...TOOLTIP_SHORTCUT_TRIGGER_CLASSES)}
      >
        {label}
        <kbd className={cn(...TOOLTIP_SHORTCUT_KBD_CLASSES)}>
          {shortcut}
        </kbd>
      </TooltipTrigger>
      <TooltipContent side={side} variant={variant}>
        <span className="mr-1">{label}</span>
        <kbd className={cn(...TOOLTIP_SHORTCUT_KBD_INNER_CLASSES)}>
          {shortcut}
        </kbd>
      </TooltipContent>
    </Tooltip>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSITION: Tooltip Group
// ═══════════════════════════════════════════════════════════════════════════

function TooltipGroup({
  children,
  spacing = 'MD',
  className,
  ...props
}: TooltipGroupProps) {
  return (
    <div
      className={cn(
        'flex items-center',
        TOOLTIP_GROUP_SPACING[spacing],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  DarkTooltip,
  QuantumTooltip,
  CosmicTooltip,
  TooltipWithIcon,
  TooltipWithShortcut,
  TooltipGroup,
};

export type {
  TooltipProviderProps,
  TooltipRootProps,
  TooltipTriggerProps,
  TooltipContentProps,
  TooltipWithIconProps,
  TooltipWithShortcutProps,
  TooltipGroupProps,
  TooltipSide,
  TooltipAlign,
  TooltipVariant,
  TooltipPlacement,
  TooltipGroupSpacing,
} from '@/types/components/seidr/tooltip.types';