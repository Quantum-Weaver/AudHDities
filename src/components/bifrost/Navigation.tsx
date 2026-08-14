// @/components/bifrost/Navigation.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    NAVIGATION — THE BIFRÖST                               ║
// ║                    Realm-first navigation experience                      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// THE MAP ECHO (2026-07-31, at KP's ⚛ word: "we need to update the
// navigation somehow. many things are out of reach"): ✍ gate ② ruled the
// realm map is furniture in the vessel home — "potentailly an expanable
// element of the navigation bar." This is that element: the bar stays
// calm (six realms, three side-doors), and THE MAP unfolds the whole
// street — every realm, every real room, one fixed geometry that never
// shuffles (the same order the home's map-furniture keeps). The mobile
// drawer renders the same street, so nothing is out of reach anywhere.
// Every href below is a route that exists on disk — the map never lies.

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import {
  Menu, X, Home, Store, Library, Music, Shield, Network, Compass, User,
  Map as MapIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { THE_STREET } from '@/lib/constants/systems/the-street';
import Learscail from '@/components/seidr/immersive/Learscail';

// ═══════════════════════════════════════════════════════════════════════════
// THE BAR — calm, six realms + three side-doors (unchanged reach)
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
// THE STREET — the whole map, fixed geometry (the home-furniture's order:
// hearth beside studio first — the shortest edge — then the rest, forever).
// Rooms listed are real routes on disk; nothing renders that cannot be
// walked to.
// ═══════════════════════════════════════════════════════════════════════════

// THE STREET MOVED OUT (2026-08-11) — it lives at
// `@/lib/constants/systems/the-street` now, so the nav and the LÉARSCÁIL
// read one definition and cannot drift apart. Nothing about the list
// changed in the move; it only stopped being a second copy.

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function Navigation({ className }: { className?: string }) {
  const pathname = usePathname();
  const { user, profile } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
    setMapOpen(false);
  }, [pathname]);

  const closeMap = useCallback(() => setMapOpen(false), []);
  useEffect(() => {
    if (!mapOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMap();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mapOpen, closeMap]);

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
                  'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 motion-reduce:transition-none',
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
                  'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 motion-reduce:transition-none',
                  'text-star-dust/40 hover:text-star-dust/70 hover:bg-white/5'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          {/* THE MAP — gate ②'s nav echo: the whole street, one tap */}
          <button
            type="button"
            onClick={() => setMapOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={mapOpen}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 motion-reduce:transition-none',
              'text-star-dust/40 hover:text-star-dust/70 hover:bg-white/5'
            )}
          >
            <MapIcon className="h-3.5 w-3.5" />
            <span>Map</span>
          </button>

          {/* Right: Vessel */}
          <div className="ml-auto flex items-center gap-3 pr-2">
            {user ? (
              <Link
                href="/vessel"
                className="flex items-center gap-1.5 text-xs text-star-dust/50 hover:text-neurospark transition-colors motion-reduce:transition-none"
              >
                <User className="h-3.5 w-3.5" />
                <span>{profile?.display_name || 'Vessel'}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-xs text-star-dust/50 hover:text-star-dust transition-colors motion-reduce:transition-none"
              >
                Enter
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* THE MAP, UNFOLDED — the whole street, fixed geometry              */}
      {/* (~80vw × 80vh solid module, KP's ⚛ map-module ruling)             */}
      {/* ════════════════════════════════════════════════════════════════ */}
      {mapOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="The Sanctuary map"
          className="fixed inset-0 z-50 hidden md:flex items-center justify-center bg-(--color-deep-space)/90 p-6"
        >
          <div className="flex h-[80vh] w-[80vw] flex-col rounded-xl border border-star-dust/15 bg-(--color-deep-space) p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-star-dust">The Sanctuary — every door</h2>
              <button
                type="button"
                onClick={closeMap}
                aria-label="Fold the map"
                className="rounded p-1 text-star-dust/60 hover:text-star-dust focus-visible:text-star-dust"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            {/* THE LÉARSCÁIL — the land itself, drawn (KP's ⚛ commission
                2026-08-11). The room index below stays exactly as it was:
                the map is the calm way in, the index is every door, and
                neither is the admission ticket (law VIII). */}
            <div className="mb-6 shrink-0">
              <Learscail onTravel={closeMap} />
            </div>

            <div className="grid flex-1 auto-rows-min grid-cols-2 gap-x-8 gap-y-6 overflow-y-auto lg:grid-cols-3">
              {THE_STREET.map((realm) => (
                <section key={realm.name} aria-label={realm.name}>
                  <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-star-dust/40">
                    {realm.name}
                  </h3>
                  <ul className="space-y-1">
                    {realm.rooms.map((room) => (
                      <li key={room.href}>
                        <Link
                          href={room.href}
                          className={cn(
                            'block rounded px-2 py-1 text-sm transition-colors motion-reduce:transition-none',
                            isActive(room.href)
                              ? 'text-neurospark'
                              : 'text-star-dust/70 hover:text-star-dust hover:bg-white/5'
                          )}
                        >
                          {room.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
            <p className="mt-4 text-xs text-star-dust/40">
              Every door stays where you left it. Esc folds the map.
            </p>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* MOBILE — FLOATING BUTTON + DRAWER (the whole street)              */}
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
          'fixed top-0 left-0 bottom-0 z-50 w-72 bg-(--color-deep-space)/95 backdrop-blur-xl border-r border-white/10 shadow-2xl',
          'flex flex-col transition-transform duration-200 motion-reduce:transition-none',
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

          {/* The street, whole — same map, drawer form */}
          <div className="flex-1 overflow-y-auto py-3 px-3 flex flex-col gap-4">
            {THE_STREET.map((realm) => (
              <section key={realm.name} aria-label={realm.name}>
                <h3 className="mb-1 px-3 text-[10px] font-medium uppercase tracking-wide text-star-dust/40">
                  {realm.name}
                </h3>
                <div className="flex flex-col">
                  {realm.rooms.map((room) => (
                    <Link
                      key={room.href}
                      href={room.href}
                      className={cn(
                        'rounded-lg px-3 py-2 text-sm transition-all motion-reduce:transition-none',
                        isActive(room.href)
                          ? 'bg-neurospark/20 text-neurospark'
                          : 'text-star-dust/70 hover:text-star-dust hover:bg-white/5'
                      )}
                    >
                      {room.label}
                    </Link>
                  ))}
                </div>
              </section>
            ))}

            <div className="h-px bg-white/10" />

            <Link href={user ? '/vessel' : '/login'}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-star-dust/50 hover:text-star-dust hover:bg-white/5 transition-all motion-reduce:transition-none"
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
            'bg-(--color-deep-space)/90 backdrop-blur-lg border border-white/10',
            'text-star-dust/80 shadow-lg',
            'flex items-center justify-center',
            'active:scale-95 transition-all duration-200 motion-reduce:transition-none',
          )}
          aria-label="Menu"
        >
          {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
    </>
  );
}
