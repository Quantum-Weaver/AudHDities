// src/utils/components/bifrist/header.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    NAVIGATION UTILITIES (UPDATED)                         ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  NavItem,
  NavItemState,
  NavigationFilterContext,
} from '@/types/components/bifrost/navigation.types';

import { NAV_ITEM_STATES } from '@/lib/constants/components/bifrost/navigation.constants';

// ─── Hover Handlers — NEW ──────────────────────────────────────────────────

export interface NavItemHoverHandlers {
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
}

/**
 * Builds hover event handlers for a single navigation item.
 * Returns handlers that toggle a boolean setter.
 *
 * Usage in component:
 *   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
 *   const handlers = buildNavItemHoverHandlers(() => setHoveredIndex(index));
 */
export function buildNavItemHoverHandlers(
  onHover: () => void,
  onUnhover: () => void
): NavItemHoverHandlers {
  return {
    handleMouseEnter: onHover,
    handleMouseLeave: onUnhover,
    handleFocus: onHover,
    handleBlur: onUnhover,
  };
}

/**
 * Creates a hover index manager for a list of navigation items.
 * Returns the current hovered index and a factory for per-item handlers.
 *
 * Usage:
 *   const { hoveredIndex, getHandlers } = useNavHoverManager();
 *   items.map((item, i) => {
 *     const { handleMouseEnter, ... } = getHandlers(i);
 *     ...
 *   });
 */
export function createNavHoverManager(
  setHoveredIndex: (index: number | null) => void
) {
  return {
    getHandlers: (index: number): NavItemHoverHandlers =>
      buildNavItemHoverHandlers(
        () => setHoveredIndex(index),
        () => setHoveredIndex(null)
      ),
  };
}

// ─── State Detection ───────────────────────────────────────────────────────

/**
 * Determine the state of a navigation item based on current path.
 */
export function getNavItemState(
  itemHref: string,
  currentPathname: string
): NavItemState {
  const isActive =
    currentPathname === itemHref ||
    (itemHref !== '/' && currentPathname.startsWith(itemHref + '/'));

  return isActive ? NAV_ITEM_STATES.ACTIVE : NAV_ITEM_STATES.DEFAULT;
}

// ─── Visibility ────────────────────────────────────────────────────────────

/**
 * Check if a nav item should be visible based on user context.
 */
export function isNavItemVisible(
  item: NavItem,
  context: NavigationFilterContext
): boolean {
  if (item.requiresAuth && !context.isAuthenticated) return false;
  if (item.requiresAdmin && !context.isAdmin) return false;

  const tierRank: Record<string, number> = {
    community: 0,
    ally: 1,
    corporate: 2,
    council: 3,
  };

  if (item.userTiers && context.userTier) {
    const requiredMinRank = Math.min(
      ...item.userTiers.map((t) => tierRank[t] ?? 0)
    );
    if ((tierRank[context.userTier] ?? 0) < requiredMinRank) {
      return false;
    }
  }

  if (
    item.minSovereignty &&
    context.sovereigntyScore < item.minSovereignty
  ) {
    return false;
  }

  return true;
}

/**
 * Filter a list of nav items based on user context.
 */
export function filterNavItemsByContext(
  items: NavItem[],
  context: NavigationFilterContext
): NavItem[] {
  return items.filter((item) => isNavItemVisible(item, context));
}