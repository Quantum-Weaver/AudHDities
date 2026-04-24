// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    TOOLTIP TYPES                                          ║
// ║                    All type definitions for the Tooltip component          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';
import type {
  TooltipVariant,
  TooltipPlacement,
} from '@/lib/constants/components/ui/tooltip.variants';
import type { TooltipGroupSpacing } from '@/lib/constants/components/ui/tooltip.constants';

// ─── Re-exports from constants ─────────────────────────────────────────────
export type { TooltipVariant, TooltipPlacement, TooltipGroupSpacing };

// ─── Base UI Re-exports ────────────────────────────────────────────────────
/** The state object passed to className render functions by Base UI Popup */
export type TooltipPopupState = TooltipPrimitive.Popup.State;

// ─── Side & Alignment ──────────────────────────────────────────────────────
export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';
export type TooltipAlign = 'start' | 'center' | 'end';

// ─── Provider ──────────────────────────────────────────────────────────────
export interface TooltipProviderProps
  extends TooltipPrimitive.Provider.Props {
  delay?: number;
}

// ─── Root ──────────────────────────────────────────────────────────────────
export interface TooltipRootProps
  extends TooltipPrimitive.Root.Props {
  variant?: TooltipVariant;
}

// ─── Trigger ───────────────────────────────────────────────────────────────
export interface TooltipTriggerProps
  extends TooltipPrimitive.Trigger.Props {}

// ─── Content ───────────────────────────────────────────────────────────────
export interface TooltipContentProps
  extends Omit<TooltipPrimitive.Popup.Props, 'side'> {
  side?: TooltipSide;
  sideOffset?: number;
  align?: TooltipAlign;
  alignOffset?: number;
  variant?: TooltipVariant;
  maxWidth?: string | number;
  showArrow?: boolean;
}

// ─── Composition Props ─────────────────────────────────────────────────────
export interface TooltipWithIconProps {
  icon: React.ReactNode;
  content: string;
  side?: TooltipSide;
  variant?: TooltipVariant;
  className?: string;
}

export interface TooltipWithShortcutProps {
  label: string;
  shortcut: string;
  side?: TooltipSide;
  variant?: TooltipVariant;
}

export interface TooltipGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: TooltipGroupSpacing;
}