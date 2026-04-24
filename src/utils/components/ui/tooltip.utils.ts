// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    TOOLTIP UTILITIES                                      ║
// ║                    Animation composers, arrow positioning, slide logic     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cn } from '@/lib/utils';
import type { TooltipSide } from '@/types/components/ui/tooltip.types';
import type { TooltipPopupState } from '@/types/components/ui/tooltip.types';

// ─── ClassName type (matches Base UI Popup className signature) ─────────────
type PopupClassName =
  | string
  | ((state: TooltipPopupState) => string | undefined)
  | undefined;

// ─── Slide-in Animation Map ────────────────────────────────────────────────
const SLIDE_ANIMATION_MAP: Record<TooltipSide, string> = {
  top: 'data-[side=top]:slide-in-from-bottom-2',
  right: 'data-[side=right]:slide-in-from-left-2',
  bottom: 'data-[side=bottom]:slide-in-from-top-2',
  left: 'data-[side=left]:slide-in-from-right-2',
};

const INLINE_SLIDE_MAP: Record<string, string> = {
  'inline-end': 'data-[side=inline-end]:slide-in-from-left-2',
  'inline-start': 'data-[side=inline-start]:slide-in-from-right-2',
};

// ─── Open/Close Animation Classes ──────────────────────────────────────────
const OPEN_ANIMATION_CLASSES = [
  'data-[state=delayed-open]:animate-in',
  'data-[state=delayed-open]:fade-in-0',
  'data-[state=delayed-open]:zoom-in-95',
  'data-open:animate-in',
  'data-open:fade-in-0',
  'data-open:zoom-in-95',
] as const;

const CLOSE_ANIMATION_CLASSES = [
  'data-closed:animate-out',
  'data-closed:fade-out-0',
  'data-closed:zoom-out-95',
] as const;

// ─── Arrow Side Positioning Map ────────────────────────────────────────────
const ARROW_SIDE_POSITION_MAP: Record<TooltipSide, string> = {
  top: '-bottom-2.5',
  right: 'top-1/2! -left-1 -translate-y-1/2',
  bottom: 'top-1',
  left: 'top-1/2! -right-1 -translate-y-1/2',
};

// ═══════════════════════════════════════════════════════════════════════════
// PUBLIC API
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Composes the complete set of animation classes for tooltip content.
 * Includes slide-in, open, and close animations.
 */
export function getTooltipAnimationClasses(side: TooltipSide): string {
  return cn(
    SLIDE_ANIMATION_MAP[side],
    INLINE_SLIDE_MAP['inline-end'],
    INLINE_SLIDE_MAP['inline-start'],
    ...OPEN_ANIMATION_CLASSES,
    ...CLOSE_ANIMATION_CLASSES
  );
}

/**
 * Returns the arrow positioning class for a given side.
 */
export function getTooltipArrowPosition(side: TooltipSide): string {
  return ARROW_SIDE_POSITION_MAP[side];
}

/**
 * Resolves a maxWidth value to a CSS-compatible string.
 */
export function resolveTooltipMaxWidth(maxWidth: string | number): string {
  return typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
}

/**
 * Composes all content classes: variants + animations + custom class.
 * Accepts the full Base UI Popup className type including state-dependent functions.
 */
export function composeTooltipContentClasses(params: {
  variantClass: string;
  side: TooltipSide;
  className?: PopupClassName;
}): string {
  return cn(
    params.variantClass,
    getTooltipAnimationClasses(params.side),
    params.className
  );
}

/**
 * Composes all arrow classes: variant + side positioning.
 */
export function composeTooltipArrowClasses(params: {
  variantClass: string;
  side: TooltipSide;
}): string {
  return cn(params.variantClass, getTooltipArrowPosition(params.side));
}