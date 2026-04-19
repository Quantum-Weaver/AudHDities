// components/ui/Tooltip.tsx
// Tooltip Component - The guide of the interface
// Provides contextual hints on hover or focus

"use client";

import React from 'react';
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cn } from "@/lib/utils";

export type TooltipVariant = 'default' | 'dark' | 'quantum' | 'cosmic';
export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';
export type TooltipAlign = 'start' | 'center' | 'end';

export interface TooltipProviderProps extends TooltipPrimitive.Provider.Props {
  /** Delay in ms before showing tooltip */
  delay?: number;
}

/**
 * TooltipProvider - Wraps app to provide tooltip context
 * 
 * @example
 * <TooltipProvider delay={300}>
 *   <App />
 * </TooltipProvider>
 */
function TooltipProvider({ delay = 300, ...props }: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  );
}

export interface TooltipProps extends TooltipPrimitive.Root.Props {
  /** Visual variant */
  variant?: TooltipVariant;
}

/**
 * Tooltip - Root component that manages open state
 * 
 * @example
 * <Tooltip>
 *   <TooltipTrigger>Hover me</TooltipTrigger>
 *   <TooltipContent>Helpful information</TooltipContent>
 * </Tooltip>
 */
function Tooltip({ variant = 'default', ...props }: TooltipProps) {
  return <TooltipPrimitive.Root data-slot="tooltip" data-variant={variant} {...props} />;
}

export interface TooltipTriggerProps extends TooltipPrimitive.Trigger.Props {}

/**
 * TooltipTrigger - The element that triggers the tooltip
 */
function TooltipTrigger({ ...props }: TooltipTriggerProps) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

export interface TooltipContentProps extends TooltipPrimitive.Popup.Props {
  /** Side of the trigger to show the tooltip */
  side?: TooltipSide;
  /** Offset from the trigger */
  sideOffset?: number;
  /** Alignment of the tooltip */
  align?: TooltipAlign;
  /** Offset from alignment */
  alignOffset?: number;
  /** Variant of the tooltip */
  variant?: TooltipVariant;
  /** Max width of the tooltip */
  maxWidth?: string | number;
  /** Show arrow pointing to trigger */
  showArrow?: boolean;
}

/**
 * Variant styles for tooltip content
 */
const variantContentStyles: Record<TooltipVariant, string> = {
  default: 'bg-foreground text-background',
  dark: 'bg-deep-space text-star-dust border border-white/10',
  quantum: 'bg-quantum-purple text-white shadow-lg shadow-quantum-purple/20',
  cosmic: 'bg-cosmic-blue text-white shadow-lg shadow-cosmic-blue/20',
};

/**
 * TooltipContent - The content that appears in the tooltip
 * 
 * @example
 * <TooltipContent side="top" variant="quantum">
 *   This is a quantum tooltip
 * </TooltipContent>
 */
function TooltipContent({
  className,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  variant = 'default',
  maxWidth = 240,
  showArrow = true,
  children,
  ...props
}: TooltipContentProps) {
  const maxWidthStyle = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
  
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
        style={{ maxWidth: maxWidthStyle }}
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-md px-3 py-1.5 text-xs shadow-lg",
            "has-data-[slot=kbd]:pr-1.5",
            "data-[side=bottom]:slide-in-from-top-2",
            "data-[side=inline-end]:slide-in-from-left-2",
            "data-[side=inline-start]:slide-in-from-right-2",
            "data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2",
            "data-[side=top]:slide-in-from-bottom-2",
            "data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            variantContentStyles[variant],
            className
          )}
          {...props}
        >
          {children}
          {showArrow && (
            <TooltipPrimitive.Arrow 
              className={cn(
                "z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px]",
                variant === 'default' && "bg-foreground",
                variant === 'dark' && "bg-deep-space",
                variant === 'quantum' && "bg-quantum-purple",
                variant === 'cosmic' && "bg-cosmic-blue",
                "data-[side=bottom]:top-1",
                "data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2",
                "data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2",
                "data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2",
                "data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2",
                "data-[side=top]:-bottom-2.5"
              )}
            />
          )}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

// ============================================================================
// VARIANT SHORTCUTS
// ============================================================================

/**
 * DarkTooltip - Pre-configured dark variant
 */
function DarkTooltip({ children, ...props }: TooltipProps) {
  return (
    <Tooltip variant="dark" {...props}>
      {children}
    </Tooltip>
  );
}

/**
 * QuantumTooltip - Pre-configured quantum variant
 */
function QuantumTooltip({ children, ...props }: TooltipProps) {
  return (
    <Tooltip variant="quantum" {...props}>
      {children}
    </Tooltip>
  );
}

/**
 * CosmicTooltip - Pre-configured cosmic variant
 */
function CosmicTooltip({ children, ...props }: TooltipProps) {
  return (
    <Tooltip variant="cosmic" {...props}>
      {children}
    </Tooltip>
  );
}

// ============================================================================
// COMPOSITION COMPONENTS
// ============================================================================

export interface TooltipWithIconProps {
  /** Icon to display */
  icon: React.ReactNode;
  /** Tooltip content */
  content: string;
  /** Tooltip side */
  side?: TooltipSide;
  /** Tooltip variant */
  variant?: TooltipVariant;
  /** Icon wrapper className */
  className?: string;
}

/**
 * TooltipWithIcon - Pre-composed icon + tooltip
 * 
 * @example
 * <TooltipWithIcon icon={<HelpCircle />} content="Help" />
 */
// components/ui/Tooltip.tsx (corrected section)

export interface TooltipWithIconProps {
  /** Icon to display */
  icon: React.ReactNode;
  /** Tooltip content */
  content: string;
  /** Tooltip side */
  side?: TooltipSide;
  /** Tooltip variant */
  variant?: TooltipVariant;
  /** Icon wrapper className */
  className?: string;
}

/**
 * TooltipWithIcon - Pre-composed icon + tooltip
 * 
 * @example
 * <TooltipWithIcon icon={<HelpCircle />} content="Help" />
 */
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
          "inline-flex cursor-help items-center justify-center rounded-md p-1 text-white/60 transition-colors hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-cyan-400/20",
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

export interface TooltipWithShortcutProps {
  /** Label text */
  label: string;
  /** Keyboard shortcut (e.g., "⌘K") */
  shortcut: string;
  /** Tooltip side */
  side?: TooltipSide;
}

/**
 * TooltipWithShortcut - Tooltip that displays a keyboard shortcut
 * 
 * @example
 * <TooltipWithShortcut label="Search" shortcut="⌘K" />
 */
// components/ui/Tooltip.tsx (corrected section)

export interface TooltipWithShortcutProps {
  /** Label text */
  label: string;
  /** Keyboard shortcut (e.g., "⌘K") */
  shortcut: string;
  /** Tooltip side */
  side?: TooltipSide;
  /** Tooltip variant */
  variant?: TooltipVariant;
}

/**
 * TooltipWithShortcut - Tooltip that displays a keyboard shortcut
 * 
 * @example
 * <TooltipWithShortcut label="Search" shortcut="⌘K" />
 */
function TooltipWithShortcut({
  label,
  shortcut,
  side = 'top',
  variant = 'default',
}: TooltipWithShortcutProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-white/80 hover:bg-white/5 transition-colors cursor-pointer"
      >
        {label}
        <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-xs font-mono">
          {shortcut}
        </kbd>
      </TooltipTrigger>
      <TooltipContent side={side} variant={variant}>
        <span className="mr-1">{label}</span>
        <kbd className="rounded bg-white/20 px-1.5 py-0.5 text-xs font-mono">
          {shortcut}
        </kbd>
      </TooltipContent>
    </Tooltip>
  );
}

export interface TooltipGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Spacing between tooltip triggers */
  spacing?: 'sm' | 'md' | 'lg';
}

const groupSpacingClasses: Record<string, string> = {
  sm: 'gap-1',
  md: 'gap-2',
  lg: 'gap-3',
};

/**
 * TooltipGroup - Container for multiple tooltip triggers
 * 
 * @example
 * <TooltipGroup>
 *   <TooltipWithIcon icon={<SettingsIcon />} content="Settings" />
 *   <TooltipWithIcon icon={<HelpIcon />} content="Help" />
 * </TooltipGroup>
 */
function TooltipGroup({
  children,
  spacing = 'md',
  className,
  ...props
}: TooltipGroupProps) {
  return (
    <div
      className={cn('flex items-center', groupSpacingClasses[spacing], className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Export all components
export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  // Variant shortcuts
  DarkTooltip,
  QuantumTooltip,
  CosmicTooltip,
  // Composition components
  TooltipWithIcon,
  TooltipWithShortcut,
  TooltipGroup,
};