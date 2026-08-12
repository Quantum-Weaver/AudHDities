// src/components/bifrost/LearscailScroll.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE SCROLL — the Léarscáil unfurling from the bottom of the chrome     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// Provenance: KP's ⚛ strokes, 2026-08-11, verbatim:
//   · "it holds a button on the navigation too, and we can up the nav better
//      if this works well and just have it scroll out from the bottom of the
//      continuity bar section"
//   · "or statsus bar, whichever is the botom of the stack,"
//   · "it could be the nav, which makes it easier"
//
// So this component lives at the END of the sticky chrome stack (Header →
// ContinuityBeam → StatusBar → here) and unfurls DOWNWARD from whatever the
// bottom of that stack turns out to be. It never has to know which chrome is
// showing: it is simply last, so it always hangs from the true bottom edge.
//
// TWO DUTIES, and they are deliberately together:
//   ① The handle + the scroll — the map, one tap away from every page.
//   ② THE DISCOVERY WITNESS — walking into a realm names its ground on the
//      vessel's map, forever. Discovery follows LIVING (KP's ⚛ ruling this
//      sitting), never a task and never an errand. It rides here because
//      this component is already mounted on every page, so no page has to
//      remember to report itself.
//
// Laws worn: motion opt-in and instant under prefers-reduced-motion · Escape
// always folds the map · the handle is a real button with a real label ·
// nothing about the map is ever pre-opened (THE OPT-IN LAW: the vessel taps
// or the scroll stays rolled).

'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Map as MapIcon, ChevronUp } from 'lucide-react';
import Learscail from '@/components/seidr/immersive/Learscail';
import { realmOfPath } from '@/lib/constants/systems/the-street';
import { useDiscovery } from '@/hooks/useDiscovery';
import { cn } from '@/lib/utils';

export default function LearscailScroll() {
  const pathname = usePathname();
  const { discover } = useDiscovery();
  const [open, setOpen] = useState(false);

  // ② THE DISCOVERY WITNESS — you walked here, so this ground is yours to
  // see from now on. Nothing is asked of the vessel; nothing is recorded
  // anywhere but their own glass (see useDiscovery's own note).
  useEffect(() => {
    const realm = realmOfPath(pathname || '/');
    if (realm) discover(realm.name);
  }, [pathname, discover]);

  // The map folds when the vessel walks through one of its doors.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const fold = useCallback(() => setOpen(false), []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fold();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, fold]);

  return (
    <div className="w-full">
      {/* THE HANDLE — the bottom edge of the chrome, and the map's one door */}
      <div className="flex w-full justify-center border-b border-white/5 bg-(--color-deep-space)/40 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="the-learscail"
          className={cn(
            'flex items-center gap-1.5 px-4 py-1 text-xs text-star-dust/60',
            'transition-colors hover:text-star-dust focus-visible:text-star-dust',
            'motion-reduce:transition-none'
          )}
        >
          {open ? (
            <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <MapIcon className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {open ? 'Roll the map' : 'The map'}
        </button>
      </div>

      {/* THE SCROLL — unfurling downward from the bottom of the stack.
          grid-rows 0fr→1fr is the one honest way to animate to auto height;
          under reduced motion it simply is, with no travel at all. */}
      <div
        id="the-learscail"
        className={cn(
          'grid w-full overflow-hidden border-b border-white/5 bg-(--color-deep-space)/95 backdrop-blur-sm',
          'transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] border-b-0'
        )}
      >
        <div className="min-h-0">
          {open && (
            <div className="mx-auto max-h-[70vh] w-full max-w-5xl overflow-y-auto p-5">
              <Learscail onTravel={fold} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
