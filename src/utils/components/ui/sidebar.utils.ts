// src/utils/components/ui/sidebar.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SIDEBAR UTILITIES                                      ║
// ║                    Width resolution, mobile detection, item helpers       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import {
  SIDEBAR_DEFAULT_WIDTH,
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_ITEM_DEPTH_INDENT,
  SIDEBAR_ITEM_BASE_PADDING_LEFT,
  SIDEBAR_ITEM_PADDING_RIGHT,
  SIDEBAR_MOBILE_BREAKPOINT,
} from '@/lib/constants/components/ui/sidebar.constants';

// ═══════════════════════════════════════════════════════════════════════════
// WIDTH RESOLUTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Resolves the sidebar width based on collapsed state and optional overrides.
 */
export function resolveSidebarWidth(params: {
  collapsed: boolean;
  width?: number;
  collapsedWidth?: number;
}): number {
  const { collapsed, width, collapsedWidth } = params;

  if (collapsed) {
    return collapsedWidth ?? SIDEBAR_COLLAPSED_WIDTH;
  }
  return width ?? SIDEBAR_DEFAULT_WIDTH;
}

// ═══════════════════════════════════════════════════════════════════════════
// ITEM PADDING
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Calculates the left padding for a nav item based on depth.
 */
export function getSidebarItemPaddingLeft(
  depth: number,
  collapsed: boolean
): number {
  if (collapsed) return 0;
  return SIDEBAR_ITEM_BASE_PADDING_LEFT + depth * SIDEBAR_ITEM_DEPTH_INDENT;
}

/**
 * Calculates the right padding for a nav item.
 */
export function getSidebarItemPaddingRight(collapsed: boolean): number {
  return collapsed ? 0 : SIDEBAR_ITEM_PADDING_RIGHT;
}

// ═══════════════════════════════════════════════════════════════════════════
// MOBILE DETECTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Parses the mobile breakpoint string to a numeric pixel value.
 * "768px" → 768
 */
export function getMobileBreakpointPixels(): number {
  const numeric = parseInt(SIDEBAR_MOBILE_BREAKPOINT, 10);
  return isNaN(numeric) ? 768 : numeric;
}

/**
 * Checks if the current viewport is mobile based on the COSMIC breakpoint.
 */
export function isMobileViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < getMobileBreakpointPixels();
}

/**
 * Returns the translation class for mobile drawer based on open state and position.
 */
export function getMobileDrawerTranslate(
  isOpen: boolean,
  position: 'left' | 'right'
): string {
  if (isOpen) return 'translate-x-0';
  return position === 'left' ? '-translate-x-full' : 'translate-x-full';
}

// ═══════════════════════════════════════════════════════════════════════════
// ACTIVE ITEM
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Determines if a sidebar item is currently active.
 */
export function isSidebarItemActive(
  itemId: string,
  activeItemId: string | null,
  itemIsActive?: boolean
): boolean {
  return activeItemId === itemId || itemIsActive === true;
}

/**
 * Determines if a sidebar item has children.
 */
export function hasSidebarItemChildren(
  children?: Array<unknown>
): boolean {
  return Array.isArray(children) && children.length > 0;
}