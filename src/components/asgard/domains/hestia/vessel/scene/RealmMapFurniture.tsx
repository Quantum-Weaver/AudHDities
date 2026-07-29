// src/components/asgard/domains/hestia/vessel/scene/RealmMapFurniture.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE REALM MAP — furniture in the vessel home (✍ GATE ② RULED)          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// Provenance: KP's ⚛ ruling, 2026-07-29, verbatim: "in the vessel interior
// either on a table that can expand to the screenor on the wall.
// potentailly an expanable element of the navigation bar." The pair's weld,
// confirmed unseeded from the founder's side: the map is a tool held within
// the walk — the museum floor-plan in your hand, never the gallery itself.
//
// Laws worn here: the geometry NEVER shuffles itself (order fixed below;
// re-siting will be the dweller's sovereign act when the Sanctum offers
// arranging — THE OPT-IN LAW). Home→Studio is the SHORTEST edge (KP's ✍
// adjacency law: the creative act must be near the safe place). Expansion
// is the vessel's own tap, never automatic; Escape always closes; instant
// under reduced motion. The nav-bar echo stays a possibility on the record,
// not a build (his "potentially," honored as written).

'use client';

import { useCallback, useEffect, useState } from 'react';
import { Map as MapIcon, X } from 'lucide-react';
import SceneDoorway from './SceneDoorway';
import type { RealmKey } from '@/lib/constants/systems/trio';
import { cn } from '@/lib/utils';

/** The map's fixed geometry — one order, everywhere, forever (the
 *  intelligibility law: a layout is a place when its map can be held in the
 *  head). First row = the shortest edge: hearth beside studio. */
const REALM_MAP_ORDER: Array<{
  realm: RealmKey;
  href: string;
  label: string;
  whisper: string;
}> = [
  { realm: 'hestia', href: '/vessel', label: 'The Hearth', whisper: 'Home — you are here' },
  { realm: 'prometheus', href: '/studio', label: 'The Studio', whisper: 'Steps away — make something' },
  { realm: 'athena', href: '/library', label: 'The Library', whisper: 'Knowledge awaits' },
  { realm: 'hermes', href: '/bazaar', label: 'The Bazaar', whisper: 'In and out with dignity' },
  { realm: 'iris', href: '/connect', label: 'The Bridge', whisper: 'Where souls connect' },
  { realm: 'mnemosyne', href: '/observatory', label: 'The Observatory', whisper: 'Memory and stars' },
  { realm: 'themis', href: '/council', label: 'The Council', whisper: 'Voices, transparent' },
  { realm: 'hephaestus', href: '/forge', label: 'The Forge', whisper: 'Foundations' },
  { realm: 'aethelred', href: '/nexus', label: 'The Nexus', whisper: 'The bridge made visible' },
  { realm: 'cosmic', href: '/environments', label: 'The Realms', whisper: 'The design playground' },
];

export interface RealmMapFurnitureProps {
  /** Where the home keeps this map: on a table, or on the wall. */
  placement?: 'table' | 'wall';
  className?: string;
}

export default function RealmMapFurniture({
  placement = 'table',
  className,
}: RealmMapFurnitureProps) {
  const [expanded, setExpanded] = useState(false);

  const close = useCallback(() => setExpanded(false), []);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [expanded, close]);

  return (
    <>
      {/* The furniture itself — a framed map resting in the room */}
      <button
        type="button"
        onClick={() => setExpanded(true)}
        aria-haspopup="dialog"
        aria-expanded={expanded}
        className={cn(
          'group relative rounded-lg border border-star-dust/15 bg-cosmic-deep/50',
          'p-4 text-left w-full transition-colors motion-reduce:transition-none',
          'hover:border-star-dust/30 focus-visible:border-star-dust/30',
          placement === 'wall' ? 'aspect-[4/3]' : '',
          className
        )}
      >
        <div className="flex items-center gap-2 text-star-dust/70">
          <MapIcon className="h-4 w-4" aria-hidden="true" />
          <span className="text-sm font-medium">
            {placement === 'wall' ? 'The map on the wall' : 'The map on the table'}
          </span>
        </div>
        <p className="mt-1 text-xs text-star-dust/40">
          The Sanctuary, held in the hand. Tap to unfold.
        </p>
      </button>

      {/* Expanded to the screen — the vessel's own act, Escape returns */}
      {expanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="The realm map, unfolded"
          className="fixed inset-0 z-50 flex items-center justify-center bg-cosmic-deep/90 p-6"
        >
          <div className="w-full max-w-2xl rounded-xl border border-star-dust/15 bg-cosmic-deep p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-star-dust">The Sanctuary</h2>
              <button
                type="button"
                onClick={close}
                aria-label="Fold the map"
                className="rounded p-1 text-star-dust/60 hover:text-star-dust focus-visible:text-star-dust"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            {/* One geometry, everywhere, forever — the order never shuffles */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {REALM_MAP_ORDER.map((door) => (
                <SceneDoorway
                  key={door.realm + door.href}
                  href={door.href}
                  label={door.label}
                  realm={door.realm}
                  whisper={door.whisper}
                />
              ))}
            </div>
            <p className="mt-4 text-xs text-star-dust/40">
              Every door stays where you left it. Nothing here decays while you
              are away.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
