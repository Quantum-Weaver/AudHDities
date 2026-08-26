// @/components/bifrost/Navigation.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    NAVIGATION — THE BIFRÖST                               ║
// ║                    Realm-first navigation experience                      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// ───────────────────────────────────────────────────────────────────────────
//    (hephaestus) ]"
// ───────────────────────────────────────────────────────────────────────────

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import {
  Menu, X, Store, Shield, Compass, User,
  Map as MapIcon,
  Library,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { THE_STREET } from '@/lib/constants/systems/the-street';
import type { RealmKey } from '@/lib/constants/systems/trio';
import Learscail from '@/components/seidr/immersive/Learscail';

/**
 * The auth door. One definition, used by the signed-out Vessel item and by
 * the auth affordance on the right, so the two can never disagree.
 */
const AUTH_DOOR = '/login';

/** A realm's own front door, by its deity key. Never a second copy of a route. */
function realmDoor(realm: RealmKey): string {
  const found = THE_STREET.find((r) => r.realm === realm);
  if (!found) {
    throw new Error(`Navigation: no realm "${realm}" in THE_STREET`);
  }
  return found.href;
}

/** A named room inside a realm. Same law: read, never re-typed. */
function realmRoom(realm: RealmKey, label: string): string {
  const found = THE_STREET.find((r) => r.realm === realm);
  const room = found?.rooms.find((rm) => rm.label === label);
  if (!room) {
    throw new Error(`Navigation: no room "${label}" in realm "${realm}"`);
  }
  return room.href;
}

interface BarItem {
  label: string;
  /** Where the item goes when a vessel is signed in. */
  href: string;
  /** Where it goes to a visitor. Same as `href` for three of the four. */
  visitorHref: string;
  icon: typeof User;
}

const THE_FOUR: BarItem[] = [
  { label: 'Vessel', href: realmDoor('hestia'), visitorHref: AUTH_DOOR, icon: User },
  { label: 'Bazaar', href: realmDoor('hermes'), visitorHref: realmDoor('hermes'), icon: Store },
  { label: 'Library', href: realmDoor('athena'), visitorHref: realmDoor('athena'), icon: Library},
  {
    label: 'Sanctuary',
    href: realmRoom('hephaestus', 'The Sanctuary'),
    visitorHref: realmRoom('hephaestus', 'The Sanctuary'),
    icon: Shield,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

/** A 2px hearth-gold ring at 2px offset — 12.7:1 on the bar ground. Drawn on
 *  its own so it can never be confused with the active tint. */
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space';

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
      {/* DESKTOP — THE FOUR                                                */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <nav className={cn(
        'hidden md:flex items-center justify-center w-full h-12',
        'bg-deep-space/40 backdrop-blur-sm border-b border-white/5',
        className
      )}>
        <div className="flex items-center gap-3 h-full">
          {THE_FOUR.map((item) => {
            const Icon = item.icon;
            const href = user ? item.href : item.visitorHref;
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 motion-reduce:transition-none',
                  FOCUS_RING,
                  active
                    ? 'bg-neurospark/15 text-neurospark'
                    : 'text-star-dust/50 hover:text-star-dust/80 hover:bg-white/5'
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Divider */}
          <div className="h-5 w-px bg-white/10 mx-2" />

          {/* Right: who you are — not the same control as the Vessel item */}
          <div className="ml-auto flex items-center gap-3 pr-2">
            {user ? (
              <Link
                href={THE_FOUR[0].href}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-xs text-star-dust/62 hover:text-neurospark transition-colors motion-reduce:transition-none',
                  FOCUS_RING
                )}
              >
                <User className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{profile?.display_name || 'Vessel'}</span>
              </Link>
            ) : (
              <Link
                href={AUTH_DOOR}
                className={cn(
                  'rounded-lg px-1.5 py-1 text-xs text-star-dust/62 hover:text-star-dust transition-colors motion-reduce:transition-none',
                  FOCUS_RING
                )}
              >
                Enter
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* THE MAP, UNFOLDED — the whole street, fixed geometry              */}
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
                className={cn('rounded p-1 text-star-dust/60 hover:text-star-dust focus-visible:text-star-dust', FOCUS_RING)}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mb-6 shrink-0">
              <Learscail onTravel={closeMap} />
            </div>

            <div className="grid flex-1 auto-rows-min grid-cols-2 gap-x-8 gap-y-6 overflow-y-auto lg:grid-cols-3">
              {THE_STREET.map((realm) => (
                <section key={realm.name} aria-label={realm.name}>
                  <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-star-dust/62">
                    {realm.name}
                  </h3>
                  <ul className="space-y-1">
                    {realm.rooms.map((room) => (
                      <li key={room.href}>
                        <Link
                          href={room.href}
                          aria-current={isActive(room.href) ? 'page' : undefined}
                          className={cn(
                            'block rounded px-2 py-1 text-sm transition-colors motion-reduce:transition-none',
                            FOCUS_RING,
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
            <p className="mt-4 text-xs text-star-dust/62">
              Every door stays where you left it. Esc folds the map.
            </p>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════ */}
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
            <button onClick={() => setDrawerOpen(false)} className={cn('p-1.5 rounded-lg text-star-dust/60 hover:text-star-dust hover:bg-white/5', FOCUS_RING)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-3 px-3 flex flex-col gap-4">
            {/* THE FOUR — named at the top, the same four the bar carries */}
            <section aria-label="The four">
              <h3 className="mb-1 px-3 text-[10px] font-medium uppercase tracking-wide text-star-dust/62">
                The four
              </h3>
              <div className="flex flex-col">
                {THE_FOUR.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.label}
                      href={user ? item.href : item.visitorHref}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all motion-reduce:transition-none',
                        FOCUS_RING,
                        active
                          ? 'bg-neurospark/20 text-neurospark'
                          : 'text-star-dust/70 hover:text-star-dust hover:bg-white/5'
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </section>

            <div className="h-px bg-white/10" />

            {/* The street, whole — same map, drawer form */}
            {THE_STREET.map((realm) => (
              <section key={realm.name} aria-label={realm.name}>
                <h3 className="mb-1 px-3 text-[10px] font-medium uppercase tracking-wide text-star-dust/62">
                  {realm.name}
                </h3>
                <div className="flex flex-col">
                  {realm.rooms.map((room) => (
                    <Link
                      key={room.href}
                      href={room.href}
                      aria-current={isActive(room.href) ? 'page' : undefined}
                      className={cn(
                        'flex min-h-11 items-center rounded-lg px-3 py-2 text-sm transition-all motion-reduce:transition-none',
                        FOCUS_RING,
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

            <Link href={user ? THE_FOUR[0].href : AUTH_DOOR}
              className={cn(
                'flex min-h-11 items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-star-dust/62 hover:text-star-dust hover:bg-white/5 transition-all motion-reduce:transition-none',
                FOCUS_RING
              )}
            >
              <User className="h-5 w-5" aria-hidden="true" />
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
            'active:scale-95 transition-all duration-200 motion-reduce:transition-none motion-reduce:active:scale-100',
            FOCUS_RING,
          )}
          aria-label="Menu"
        >
          {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
    </>
  );
}
