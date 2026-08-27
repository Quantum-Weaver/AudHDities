// src/components/bifrost/MapDialog.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE MAP DIALOG — one Léarscáil, centered, opened from any door          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
//      KP, 2026-08-27: "we can always just have the map open as a dialog
//      window of its own, centered in the screen maxed to fit the screen
//      size x 80%." Mounted once (in LayoutChrome); opened by any trigger
//      that flips ContinuityBeamContext's mapOpen — today, only the chrome
//      bar's "The map" button (LearscailScroll).

'use client';

import { useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import Learscail from '@/components/seidr/immersive/Learscail';
import { THE_STREET } from '@/lib/constants/systems/the-street';
import { useContinuityBeam } from '@/contexts/ContinuityBeamContext';
import { cn } from '@/lib/utils';
import { FOCUS_RING } from './Navigation';

export default function MapDialog() {
  const pathname = usePathname();
  const { mapOpen, setMapOpen } = useContinuityBeam();
  const ref = useRef<HTMLDialogElement>(null);

  const close = useCallback(() => setMapOpen(false), [setMapOpen]);

  // The map folds when the vessel walks through one of its doors.
  useEffect(() => {
    setMapOpen(false);
  }, [pathname, setMapOpen]);

  // mapOpen is the one source of truth; the native <dialog> just paints it.
  // showModal()/close() also hand us Esc and a11y focus-trapping for free.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (mapOpen && !el.open) el.showModal();
    else if (!mapOpen && el.open) el.close();
  }, [mapOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href + '/'));

  return (
    <dialog
      ref={ref}
      aria-label="The Sanctuary map"
      onClose={close}
      onClick={(e) => {
        // A click that lands on the <dialog> element itself is the
        // backdrop (the panel below stops propagation) — fold on it.
        if (e.target === ref.current) close();
      }}
      className={cn(
        'h-[80vh] w-[80vw] max-w-none max-h-none rounded-xl border border-star-dust/15',
        'bg-(--color-deep-space)',
        'backdrop:bg-(--color-deep-space)/80 backdrop:backdrop-blur-sm'
      )}
      // globals.css carries an unlayered `* { margin: 0; padding: 0 }` reset
      // (src/app/globals.css:21) that sits outside any @layer, so it beats
      // every Tailwind margin/padding utility app-wide regardless of
      // specificity — confirmed by computed style (m-auto/p-6 both measured
      // as 0). Inline styles are the one thing that reliably outranks it.
      style={{ margin: 'auto', padding: '1.5rem' }}
    >
      <div className="flex h-full flex-col gap-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex shrink-0 items-center justify-between">
          <h2 className="text-base font-semibold text-star-dust">The Sanctuary — every door</h2>
          <button
            type="button"
            onClick={close}
            aria-label="Fold the map"
            style={{ padding: '0.25rem' }}
            className={cn('rounded text-star-dust/60 hover:text-star-dust focus-visible:text-star-dust', FOCUS_RING)}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="min-h-0 flex-1">
          <Learscail onTravel={close} className="h-full" />
        </div>

        <div className="max-h-[24vh] shrink-0 overflow-y-auto">
          <div className="grid auto-rows-min grid-cols-2 gap-x-8 gap-y-6 lg:grid-cols-3">
            {THE_STREET.map((realm) => (
              <section key={realm.name} aria-label={realm.name} className="flex flex-col gap-2">
                <h3 className="text-xs font-medium uppercase tracking-wide text-star-dust/62">
                  {realm.name}
                </h3>
                <ul className="flex flex-col gap-1">
                  {realm.rooms.map((room) => (
                    <li key={room.href}>
                      <Link
                        href={room.href}
                        aria-current={isActive(room.href) ? 'page' : undefined}
                        onClick={close}
                        style={{ padding: '0.25rem 0.5rem' }}
                        className={cn(
                          'block rounded text-sm transition-colors motion-reduce:transition-none',
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
        </div>

        <p className="shrink-0 text-xs text-star-dust/62">
          Every door stays where you left it. Esc folds the map.
        </p>
      </div>
    </dialog>
  );
}
