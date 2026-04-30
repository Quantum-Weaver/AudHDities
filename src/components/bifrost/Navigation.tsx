// @/components/bifrost/Navigation.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    NAVIGATION — THE BIFRÖST                               ║
// ║                    Realm-first navigation experience                      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { Menu, X, Compass, Home, Store, Library, Music, Shield, Network } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { getPageEnvironment } from '@/lib/constants/systems/environments/page_mapping';

import type { NavigationProps } from '@/types/components/bifrost/navigation.types';
import {
  NAVIGATION_VARIANTS,
  NAV_ITEM_STATES,
} from '@/lib/constants/components/bifrost/navigation.constants';
import {
  navContainerVariants,
  navBarVariants,
  navBrandVariants,
  navLinkVariants,
  navFloatingToggleVariants,
  navDrawerOverlayVariants,
  navDrawerPanelVariants,
  navDrawerHeaderVariants,
  navDrawerCloseVariants,
  navDividerVariants,
} from '@/lib/constants/components/bifrost/navigation.variants';
import { getNavItemState } from '@/lib/utils/components/bifrost/navigation.utils';

// ═══════════════════════════════════════════════════════════════════════════
// REALM DEFINITIONS — The six primary realms of the Sanctuary
// ═══════════════════════════════════════════════════════════════════════════

const REALMS = [
  { href: '/', label: 'The Hearth', icon: Home, domain: 'home' },
  { href: '/bazaar', label: 'The Bazaar', icon: Store, domain: 'community' },
  { href: '/library', label: 'The Library', icon: Library, domain: 'library' },
  { href: '/stage', label: 'The Stage', icon: Music, domain: 'music' },
  { href: '/council', label: 'The Council', icon: Shield, domain: 'council' },
  { href: '/nexus', label: 'The Nexus', icon: Network, domain: 'architecture' },
];

const SECONDARY_LINKS = [
  { href: '/observatory', label: 'Observatory', icon: Compass },
  { href: '/connect', label: 'Bridge', icon: Compass },
  { href: '/studio', label: 'Studio', icon: Compass },
];

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();
  const { user, profile } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentEnvironment = getPageEnvironment(pathname);

  const isAuthenticated = !!user;
  const sovereigntyScore = profile?.sovereignty_score ?? 0;

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════ */}
      {/* DESKTOP — REALM BAR                                               */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <nav className={cn(navContainerVariants({ variant: NAVIGATION_VARIANTS.DESKTOP }), className)}>
        <div className={navBarVariants({ variant: NAVIGATION_VARIANTS.DESKTOP })}>
          {/* Brand */}
          <Link href="/" className="flex-shrink-0 mr-4">
            <span className={navBrandVariants({ size: 'desktop' })}>
              Sanctuary
            </span>
          </Link>

          {/* Realms */}
          <div className="flex items-center gap-1">
            {REALMS.map((realm) => {
              const Icon = realm.icon;
              const isActive = pathname === realm.href || pathname.startsWith(realm.href + '/');

              return (
                <Link
                  key={realm.href}
                  href={realm.href}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150',
                    isActive
                      ? 'bg-neurospark/20 text-neurospark'
                      : 'text-star-dust/50 hover:text-star-dust hover:bg-white/5'
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden xl:inline">{realm.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right: Sovereignty + Vessel */}
          <div className="flex items-center gap-3 ml-auto">
            {isAuthenticated && (
              <Link
                href="/vessel"
                className="flex items-center gap-1.5 text-xs text-star-dust/50 hover:text-neurospark transition-colors"
              >
                <Shield className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{sovereigntyScore.toLocaleString()}</span>
              </Link>
            )}
            <Link
              href={isAuthenticated ? '/vessel' : '/login'}
              className="text-xs text-star-dust/50 hover:text-star-dust transition-colors"
            >
              {isAuthenticated ? profile?.display_name || 'Vessel' : 'Enter'}
            </Link>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* MOBILE — FLOATING BUTTON + DRAWER                                */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden">
        {/* Overlay */}
        {mobileMenuOpen && (
          <div
            className={navDrawerOverlayVariants({ isOpen: mobileMenuOpen })}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Drawer Panel */}
        <div className={navDrawerPanelVariants({ isOpen: mobileMenuOpen })}>
          {/* Drawer Header */}
          <div className={navDrawerHeaderVariants()}>
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <span className={navBrandVariants({ size: 'mobile' })}>Sanctuary</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className={navDrawerCloseVariants()}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Realm Links */}
          <div className="flex-1 overflow-y-auto py-4 px-4 flex flex-col gap-1">
            {REALMS.map((realm) => {
              const Icon = realm.icon;
              const isActive = pathname === realm.href || pathname.startsWith(realm.href + '/');

              return (
                <Link
                  key={realm.href}
                  href={realm.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-150',
                    isActive
                      ? 'bg-neurospark/20 text-neurospark'
                      : 'text-star-dust/70 hover:text-star-dust hover:bg-white/5'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{realm.label}</span>
                </Link>
              );
            })}

            <div className={navDividerVariants()} />

            {/* Secondary */}
            {SECONDARY_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-star-dust/50 hover:text-star-dust hover:bg-white/5 transition-all"
                >
                  <Icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className={navDividerVariants()} />

            {/* Vessel / Sign In */}
            <Link
              href={isAuthenticated ? '/vessel' : '/login'}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-star-dust/50 hover:text-star-dust hover:bg-white/5 transition-all"
            >
              <Shield className="h-5 w-5" />
              <span>{isAuthenticated ? 'Your Vessel' : 'Enter the Sanctuary'}</span>
            </Link>
          </div>
        </div>

        {/* Floating Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={navFloatingToggleVariants({ isOpen: mobileMenuOpen })}
          aria-label="Menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>
    </>
  );
}