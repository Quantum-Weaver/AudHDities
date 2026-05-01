// src/utils/components/seidr/drawer.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    DRAWER UTILITIES                                       ║
// ║                    Animation resolution, size lookup, scroll lock         ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import {
  DRAWER_SIZE_CLASSES,
  DRAWER_ANIMATION_CLASSES,
  DRAWER_POSITION_CLASSES,
  DRAWER_BORDER_CLASSES,
  DRAWER_TRANSITION_DURATION,
} from '@/lib/constants/components/seidr/drawer.constants';
import type {
  DrawerSide,
  DrawerSize,
} from '@/lib/constants/components/seidr/drawer.variants';

// ═══════════════════════════════════════════════════════════════════════════
// SIZE RESOLUTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Returns the Tailwind size class for a given side and size.
 */
export function getDrawerSizeClass(side: DrawerSide, size: DrawerSize): string {
  return DRAWER_SIZE_CLASSES[side][size];
}

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATION RESOLUTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Returns the animation translate class for the current open state and side.
 */
export function getDrawerAnimationClass(
  side: DrawerSide,
  open: boolean
): string {
  const animation = DRAWER_ANIMATION_CLASSES[side];
  return open ? animation.enter : animation.exit;
}

// ═══════════════════════════════════════════════════════════════════════════
// POSITION RESOLUTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Returns the position class for a given side.
 */
export function getDrawerPositionClass(side: DrawerSide): string {
  return DRAWER_POSITION_CLASSES[side];
}

// ═══════════════════════════════════════════════════════════════════════════
// BORDER RESOLUTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Returns the border class for a given side.
 */
export function getDrawerBorderClass(side: DrawerSide): string {
  return DRAWER_BORDER_CLASSES[side];
}

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL LOCK
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Locks body scroll. Returns cleanup function.
 */
export function lockBodyScroll(): () => void {
  const originalOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  return () => {
    document.body.style.overflow = originalOverflow;
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSE CLASSES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Composes all panel classes for a drawer.
 */
export function composeDrawerPanelClasses(params: {
  side: DrawerSide;
  size: DrawerSize;
  open: boolean;
  className?: string;
}): string {
  const parts: string[] = [
    getDrawerPositionClass(params.side),
    getDrawerBorderClass(params.side),
    getDrawerSizeClass(params.side, params.size),
    getDrawerAnimationClass(params.side, params.open),
  ];

  if (params.className) {
    parts.push(params.className);
  }

  return parts.join(' ');
}