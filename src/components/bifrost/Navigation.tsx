// @/components/bifrost/Navigation.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    NAVIGATION — THE BIFRÖST                               ║
// ║                    Realm-first navigation experience                      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Home, Store, Library, Music, Shield, Network, Compass, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

// ═══════════════════════════════════════════════════════════════════════════
// REALMS
// ═══════════════════════════════════════════════════════════════════════════

const REALMS = [
  { href: '/', label: 'Hearth', icon: Home },
  { href: '/bazaar', label: 'Bazaar', icon: Store },
  { href: '/library', label: 'Library', icon: Library },
  { href: '/stage', label: 'Stage', icon: Music },
  { href: '/council', label: 'Council', icon: Shield },
  { href: '/nexus', label: 'Nexus', icon: Network },
];

const SECONDARY = [
  { href: '/observatory', label: 'Observatory', icon: Compass },
  { href: '/connect', label: 'Bridge', icon: Compass },
  { href: '/studio', label: 'Studio', icon: Compass },
];

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function Navigation({ className }: { className?: string }) {
  const pathname = usePathname();
  const { user, profile } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => { setDrawerOpen(false); }, [pathname]);

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href + '/'));

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════ */}
      {/* DESKTOP — REALM BAR                                               */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <nav className={cn(
        'hidden md:flex items-center justify-center w-full h-12',
        'bg-deep-space/40 backdrop-blur-sm border-b border-white/5',
        className
      )}>
        <div className="flex items-center gap-1 h-full">
          {REALMS.map((realm) => {
            const Icon = realm.icon;
            const active = isActive(realm.href);
            return (
              <Link
                key={realm.href}
                href={realm.href}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                  active
                    ? 'bg-neurospark/15 text-neurospark'
                    : 'text-star-dust/50 hover:text-star-dust/80 hover:bg-white/5'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{realm.label}</span>
              </Link>
            );
          })}

          {/* Divider */}
          <div className="h-5 w-px bg-white/10 mx-2" />

          {/* Secondary */}
          {SECONDARY.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
                  'text-star-dust/40 hover:text-star-dust/70 hover:bg-white/5'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          {/* Right: Vessel */}
          <div className="ml-auto flex items-center gap-3 pr-2">
            {user ? (
              <Link
                href="/vessel"
                className="flex items-center gap-1.5 text-xs text-star-dust/50 hover:text-neurospark transition-colors"
              >
                <User className="h-3.5 w-3.5" />
                <span>{profile?.display_name || 'Vessel'}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-xs text-star-dust/50 hover:text-star-dust transition-colors"
              >
                Enter
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* MOBILE — FLOATING BUTTON + DRAWER                                */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden">
        {/* Overlay */}
        {drawerOpen && (
          <div
            className="fixed inset-0 z-40 bg-deep-space/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
        )}

        {/* Drawer */}
        <div className={cn(
          'fixed top-0 left-0 bottom-0 z-50 w-64 bg-deep-space/95 backdrop-blur-xl border-r border-white/10 shadow-2xl',
          'flex flex-col transition-transform duration-200',
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        )}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <Link href="/" className="text-base font-bold bg-gradient-to-r from-neurospark to-quantum-purple bg-clip-text text-transparent">
              Sanctuary
            </Link>
            <button onClick={() => setDrawerOpen(false)} className="p-1.5 rounded-lg text-star-dust/60 hover:text-star-dust hover:bg-white/5">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 overflow-y-auto py-3 px-3 flex flex-col gap-1">
            {REALMS.map((realm) => {
              const Icon = realm.icon;
              const active = isActive(realm.href);
              return (
                <Link
                  key={realm.href}
                  href={realm.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all',
                    active ? 'bg-neurospark/20 text-neurospark' : 'text-star-dust/70 hover:text-star-dust hover:bg-white/5'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{realm.label}</span>
                </Link>
              );
            })}

            <div className="h-px bg-white/10 my-2" />

            {SECONDARY.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.href} href={link.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-star-dust/50 hover:text-star-dust hover:bg-white/5 transition-all"
                >
                  <Icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className="h-px bg-white/10 my-2" />

            <Link href={user ? '/vessel' : '/login'}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-star-dust/50 hover:text-star-dust hover:bg-white/5 transition-all"
            >
              <User className="h-5 w-5" />
              <span>{user ? 'Your Vessel' : 'Enter the Sanctuary'}</span>
            </Link>
          </div>
        </div>

        {/* Floating Button */}
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className={cn(
            'fixed bottom-6 left-6 z-30 h-12 w-12 rounded-xl',
            'bg-deep-space/90 backdrop-blur-lg border border-white/10',
            'text-star-dust/80 shadow-lg',
            'flex items-center justify-center',
            'active:scale-95 transition-all duration-200'
          )}
          aria-label="Menu"
        >
          {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
    </>
  );
}