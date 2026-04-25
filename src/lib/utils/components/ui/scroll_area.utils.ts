// src/utils/components/ui/scroll_area.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SCROLL AREA UTILITIES                                  ║
// ║                    Size resolution, class composition                     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cn } from '@/lib/utils';
import { scrollAreaVariants } from '@/lib/constants/components/hof/scroll_area.variants';
import {
  SCROLL_SHADOW_INSET,
  SNAP_DIRECTION,
} from '@/lib/constants/components/hof/scroll_area.constants';
import type {
  ScrollOrientation,
  ScrollbarVisibility,
  ScrollbarThickness,
  ScrollAreaRoundedSize,
  SnapDirection,
} from '@/lib/constants/components/hof/scroll_area.constants';

// ─── Size Resolution ───────────────────────────────────────────────────────
/**
 * Resolves a size value to a CSS-compatible string.
 */
export function resolveScrollAreaSize(value: string | number): string {
  return typeof value === 'number' ? `${value}px` : value;
}

/**
 * Composes inline size style object for max-height/width and fixed height/width.
 */
export function getScrollAreaSizeStyle(params: {
  maxHeight?: string | number;
  maxWidth?: string | number;
  height?: string | number;
  width?: string | number;
}): React.CSSProperties {
  const style: React.CSSProperties = {};
  if (params.maxHeight) style.maxHeight = resolveScrollAreaSize(params.maxHeight);
  if (params.maxWidth) style.maxWidth = resolveScrollAreaSize(params.maxWidth);
  if (params.height) style.height = resolveScrollAreaSize(params.height);
  if (params.width) style.width = resolveScrollAreaSize(params.width);
  return style;
}

// ─── Class Composition ─────────────────────────────────────────────────────
/**
 * Composes all classes for the ScrollArea root element.
 */
export function composeScrollAreaClasses(params: {
  orientation: ScrollOrientation;
  visibility: ScrollbarVisibility;
  thickness: ScrollbarThickness;
  rounded: boolean;
  roundedSize: ScrollAreaRoundedSize;
  bordered: boolean;
  background: boolean;
  hideTrack: boolean;
  snapScroll: boolean;
  snapDirection: SnapDirection;
  isScrolled: boolean;
  shadowOnScroll: boolean;
  className?: string;
}): string {
  const variantClasses = scrollAreaVariants({
    orientation: params.orientation,
    visibility: params.visibility,
    thickness: params.thickness,
    rounded: params.rounded ? params.roundedSize : 'none',
    bordered: params.bordered,
    background: params.background,
  });

  return cn(
    variantClasses,
    // Hide track
    params.hideTrack && '[&::-webkit-scrollbar-track]:bg-transparent',
    // Snap scroll
    params.snapScroll && [
      'snap-y snap-mandatory',
      SNAP_DIRECTION[params.snapDirection],
    ],
    // Shadow on scroll
    params.shadowOnScroll && params.isScrolled && SCROLL_SHADOW_INSET,
    params.className
  );
}