// src/components/bifrost/LearscailScroll.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE SCROLL — the Léarscáil's one door in the chrome                    ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
//      continuity bar section — opens the shared MapDialog (KP, 2026-08-27:
//      "have the map open as a dialog window of its own, centered in the
//      screen"). The roll-out grid row retired; this bar is now just the
//      button, and MapDialog (mounted once in LayoutChrome) does the rest.

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Map as MapIcon } from 'lucide-react';
import { realmOfPath } from '@/lib/constants/systems/the-street';
import { useDiscovery } from '@/hooks/useDiscovery';
import { useContinuityBeam } from '@/contexts/ContinuityBeamContext';
import { cn } from '@/lib/utils';

export default function LearscailScroll() {
  const pathname = usePathname();
  const { discover } = useDiscovery();
  const { setMapOpen } = useContinuityBeam();

  useEffect(() => {
    const realm = realmOfPath(pathname || '/');
    if (realm) discover(realm.name);
  }, [pathname, discover]);

  return (
    <div className="flex w-full justify-center border-b border-white/5 bg-(--color-deep-space)/40 backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setMapOpen(true)}
        aria-haspopup="dialog"
        className={cn(
          'flex items-center gap-1.5 px-4 py-1 text-xs text-star-dust/60',
          'transition-colors hover:text-star-dust focus-visible:text-star-dust',
          'motion-reduce:transition-none'
        )}
      >
        <MapIcon className="h-3.5 w-3.5" aria-hidden="true" />
        The map
      </button>
    </div>
  );
}
