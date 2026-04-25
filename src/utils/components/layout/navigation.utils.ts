// src/utils/components/ui/header.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    NAVIGATION UTILITIES                                   ║
// ║                    Pure logic — no hardcoded design values                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  NavItem,
  NavItemState,
  NavigationFilterContext,
} from '@/types/components/layout/navigation.types';

import { NAV_ITEM_STATES } from '@/lib/constants/components/layout/navigation.constants';

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