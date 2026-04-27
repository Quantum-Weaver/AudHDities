// @/components/bifrost/Navigation.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    NAVIGATION COMPONENT (UPDATED)                         ║
// ║                    Desktop + Mobile aligned                               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { Menu, X } from 'lucide-react';

import { cn } from '@/lib/utils';

import {
  NAVIGATION_CONFIG,
} from '@/lib/constants/systems/environments/navigation';
import { getPageEnvironment } from '@/lib/constants/systems/environments/page_mapping';


// ─── Types ─────────────────────────────────────────────────────────────────
import type { NavigationProps } from '@/types/components/bifrost/navigation.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  BRAND_NAME,
  NAVIGATION_VARIANTS,
  NAV_ITEM_STATES,
  NAV_ICON_SIZE,
  NAV_FLOATING_ICON_SIZE,
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
  navFloatingToggleVariants,
  navDrawerOverlayVariants,
  navDrawerPanelVariants,
  navDrawerHeaderVariants,
  navDrawerCloseVariants,
  navDrawerContentVariants,
} from '@/lib/constants/components/bifrost/navigation.variants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  getNavItemState,
  filterNavItemsByContext,
  createNavHoverManager,
} from '@/lib/utils/components/bifrost/navigation.utils';

// ═══════════════════════════════════════════════════════════════════════════
// NAV LINK HELPER
// ═══════════════════════════════════════════════════════════════════════════

interface NavLinkItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavLinkRenderProps {
  item: NavLinkItem;
  state: ReturnType<typeof getNavItemState>;
  isHovered: boolean;
  variant: 'desktop' | 'mobile';
  iconSize: string;
  handlers: {
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    handleFocus: () => void;
    handleBlur: () => void;
  };
  onClick?: () => void;
}

function NavLinkRenderer({
  item,
  state,
  isHovered,
  variant,
  iconSize,
  handlers,
  onClick,
}: NavLinkRenderProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      onMouseEnter={handlers.handleMouseEnter}
      onMouseLeave={handlers.handleMouseLeave}
      onFocus={handlers.handleFocus}
      onBlur={handlers.handleBlur}
      className={navLinkVariants({
        state,
        variant:
          variant === 'desktop'
            ? NAVIGATION_VARIANTS.DESKTOP
            : NAVIGATION_VARIANTS.MOBILE,
        isHovered,
      })}
    >
      <Icon className={iconSize} />
      <span>{item.label}</span>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ─── User State ──────────────────────────────────────────────────────
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userTier, setUserTier] = useState<
    'community' | 'ally' | 'corporate' | 'council'
  >('community');
  const [sovereigntyScore, setSovereigntyScore] = useState(0);

  const currentEnvironment = getPageEnvironment(pathname);

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

  // ─── Hover State ─────────────────────────────────────────────────────
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { getHandlers } = createNavHoverManager(setHoveredIndex);

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

          {/* Primary Links + Auth — same row, auth auto-spaced right */}
          <div className="flex-1 flex items-center justify-center gap-2">
            {primaryItems.map((item, index) => {
              const state = getNavItemState(item.href, pathname);
              const handlers = getHandlers(index);

              return (
                <NavLinkRenderer
                  key={item.href}
                  item={item}
                  state={state}
                  isHovered={hoveredIndex === index}
                  variant="desktop"
                  iconSize={NAV_ICON_SIZE.DESKTOP}
                  handlers={handlers}
                />
              );
            })}
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* MOBILE — FLOATING BUTTON + POPUP (legacy pattern)                */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-4 left-4 z-50 md:hidden">
        {/* Popup Menu — absolutely positioned relative to fixed container */}
        {mobileMenuOpen && (
          <div className="absolute bottom-16 left-0 bg-deep-space/95 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-2xl w-64 mb-2">
            <div className="flex flex-col gap-1">
              {/* Primary */}
              {primaryItems.map((item, index) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href + '/'));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                      isActive
                        ? 'bg-neurospark/20 text-neurospark'
                        : 'text-star-dust/80 hover:text-star-dust hover:bg-white/5 active:bg-white/10'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Divider */}
              <div className="h-px bg-white/10 my-1" />

              {/* Secondary */}
              {secondaryItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-star-dust/60 hover:text-star-dust hover:bg-white/5 active:bg-white/10 transition-all duration-150"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* User Menu */}
              {isAuthenticated && userMenuItems.length > 0 && (
                <>
                  <div className="h-px bg-white/10 my-1" />
                  {userMenuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-star-dust/60 hover:text-star-dust hover:bg-white/5 active:bg-white/10 transition-all duration-150"
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        )}

        {/* Floating Action Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={cn(
            'w-14 h-14 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center',
            'active:scale-95 touch-manipulation',
            mobileMenuOpen
              ? 'bg-hearth-gold/80 rotate-45'
              : 'bg-quantum-purple/90'
          )}
          aria-label="Menu"
        >
          <span className="text-xl text-star-dust">
            {mobileMenuOpen ? '✕' : '☰'}
          </span>
        </button>
      </div>
    </>
  );
}