// @/components/layout/Navigation.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    NAVIGATION COMPONENT                                   ║
// ║                    Zero hardcoded values                                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { Menu, X } from 'lucide-react';

import { cn } from '@/lib/utils';

import { useContinuityBeam } from '@/contexts/ContinuityBeamContext';
import {
  NAVIGATION_CONFIG,
  filterNavItems,
} from '@/lib/constants/systems/environments/navigation';
import { getPageEnvironment } from '@/lib/constants/systems/environments/page_mapping';

import AuthButton from '@/components/auth/AuthButton';

// ─── Types ─────────────────────────────────────────────────────────────────
import type { NavigationProps } from '@/types/components/bifrost/navigation.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  BRAND_NAME,
  NAVIGATION_VARIANTS,
  NAV_ITEM_STATES,
  NAV_ICON_SIZE,
  NAV_MOBILE_BREAKPOINT,
} from '@/lib/constants/components/bifrost/navigation.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  navContainerVariants,
  navBarVariants,
  navBrandVariants,
  navLinkVariants,
  navMobileMenuVariants,
  navMobileToggleVariants,
  navDividerVariants,
} from '@/lib/constants/components/bifrost/navigation.variants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  getNavItemState,
  filterNavItemsByContext,
} from '@/lib/utils/components/bifrost/navigation.utils';

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();
  const { beamConfig } = useContinuityBeam();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ─── User State ──────────────────────────────────────────────────────
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userTier, setUserTier] = useState<
    'community' | 'ally' | 'corporate' | 'council'
  >('community');
  const [sovereigntyScore, setSovereigntyScore] = useState(0);

  const currentEnvironment = getPageEnvironment(pathname);

  // ─── Fetch User ──────────────────────────────────────────────────────
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();
        setIsAuthenticated(!!data.userId);
        setIsAdmin(data.isAdmin || false);
        if (data.userTier) setUserTier(data.userTier);
        if (data.sovereigntyScore) setSovereigntyScore(data.sovereigntyScore);
      } catch {
        setIsAuthenticated(false);
      }
    };
    fetchUser();
  }, []);

  // ─── Filter Context ──────────────────────────────────────────────────
  const filterContext = useMemo(
    () => ({
      environment: currentEnvironment,
      userTier,
      isAuthenticated,
      isAdmin,
      sovereigntyScore,
    }),
    [currentEnvironment, userTier, isAuthenticated, isAdmin, sovereigntyScore]
  );

  // ─── Navigation Items ────────────────────────────────────────────────
  const primaryItems = useMemo(
    () => filterNavItemsByContext(NAVIGATION_CONFIG.primary, filterContext),
    [filterContext]
  );

  const secondaryItems = useMemo(
    () => filterNavItemsByContext(NAVIGATION_CONFIG.secondary, filterContext),
    [filterContext]
  );

  const userMenuItems = useMemo(
    () => filterNavItemsByContext(NAVIGATION_CONFIG.userMenu, filterContext),
    [filterContext]
  );

  // ─── Render ──────────────────────────────────────────────────────────
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════ */}
      {/* DESKTOP NAVIGATION                                               */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <nav
        className={cn(
          navContainerVariants({ variant: NAVIGATION_VARIANTS.DESKTOP }),
          className
        )}
      >
        <div className={navBarVariants({ variant: NAVIGATION_VARIANTS.DESKTOP })}>
          {/* Brand */}
          <Link href="/" className="flex-shrink-0">
            <span className={navBrandVariants({ size: 'desktop' })}>
              {BRAND_NAME}
            </span>
          </Link>

          {/* Primary Links */}
          <div className="flex-1 flex items-center justify-center gap-2">
            {primaryItems.map((item) => {
              const Icon = item.icon;
              const state = getNavItemState(item.href, pathname);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={navLinkVariants({
                    state,
                    variant: NAVIGATION_VARIANTS.DESKTOP,
                  })}
                >
                  <Icon className={NAV_ICON_SIZE.DESKTOP} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Auth */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <AuthButton />
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* MOBILE NAVIGATION                                                */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <div className={navContainerVariants({ variant: NAVIGATION_VARIANTS.MOBILE })}>
        <div className={navBarVariants({ variant: NAVIGATION_VARIANTS.MOBILE })}>
          {/* Brand */}
          <Link href="/" className="flex-shrink-0">
            <span className={navBrandVariants({ size: 'mobile' })}>
              {BRAND_NAME}
            </span>
          </Link>

          {/* Auth + Toggle */}
          <div className="flex items-center gap-2">
            <AuthButton />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={navMobileToggleVariants()}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={navMobileMenuVariants({ isOpen: mobileMenuOpen })}>
          <div className="py-4 flex flex-col gap-3">
            {/* Primary */}
            {primaryItems.map((item) => {
              const Icon = item.icon;
              const state = getNavItemState(item.href, pathname);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={navLinkVariants({
                    state,
                    variant: NAVIGATION_VARIANTS.MOBILE,
                  })}
                >
                  <Icon className={NAV_ICON_SIZE.MOBILE} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Divider */}
            <div className={navDividerVariants()} />

            {/* Secondary */}
            {secondaryItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={navLinkVariants({
                    state: NAV_ITEM_STATES.DEFAULT,
                    variant: NAVIGATION_VARIANTS.MOBILE,
                  })}
                >
                  <Icon className={NAV_ICON_SIZE.MOBILE} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* User Menu (if authenticated) */}
            {isAuthenticated && userMenuItems.length > 0 && (
              <>
                <div className={navDividerVariants()} />
                {userMenuItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={navLinkVariants({
                        state: NAV_ITEM_STATES.DEFAULT,
                        variant: NAVIGATION_VARIANTS.MOBILE,
                      })}
                    >
                      <Icon className={NAV_ICON_SIZE.MOBILE} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}