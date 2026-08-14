// src/types/components/bifrost/navigation.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    NAVIGATION TYPES                                       ║
// ║                    Pure interfaces — imports from constants               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  NAVIGATION_VARIANTS,
  NAV_ITEM_STATES,
} from '@/lib/constants/components/bifrost/navigation.constants';

// ─── Variant types derived from constants ──────────────────────────────────
export type NavVariant =
  (typeof NAVIGATION_VARIANTS)[keyof typeof NAVIGATION_VARIANTS];

export type NavItemState =
  (typeof NAV_ITEM_STATES)[keyof typeof NAV_ITEM_STATES];

// ─── Navigation Item (matches navigation config shape) ─────────────────────
export interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  environments?: string[];
  userTiers?: ('community' | 'ally' | 'corporate' | 'council')[];
  requiresAuth?: boolean;
  requiresAdmin?: boolean;
  minSovereignty?: number;
}

// ─── Component Props ───────────────────────────────────────────────────────
export interface NavigationProps {
  /** Additional CSS classes */
  className?: string;
}

// ─── User State (for filtering) ────────────────────────────────────────────
export interface NavigationUserState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  userTier: 'community' | 'ally' | 'corporate' | 'council';
  sovereigntyScore: number;
}

// ─── Filter Context ────────────────────────────────────────────────────────
export interface NavigationFilterContext extends NavigationUserState {
  environment: string;
}