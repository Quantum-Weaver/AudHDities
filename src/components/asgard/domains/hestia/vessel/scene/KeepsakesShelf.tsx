// src/components/asgard/domains/hestia/vessel/scene/KeepsakesShelf.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE KEEPSAKES SHELF — the collections surface, unlocked                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// The seeding law said collections "wait for their surface" — this is the
// surface. It reads the vessel's own vessel_collections (own-only RLS)
// joined client-side to the collection_sets catalog (published-read).
// The audiences' law (L1-13) governs every pixel: collecting is "the slow
// accumulation of things that matter" — found, earned, gifted, or grown,
// NEVER bought; no completion percentages, no comparison, rarity only as
// the shimmer on some of its wonders. The empty shelf is dignified: a
// keepsake not yet kept is a wonder not yet met.

'use client';

import type { VesselCollectionsRow } from '@/lib/generated/types/hestia-core/vessel_collections';
import type { CollectionSetsRow } from '@/lib/generated/types/hestia-core/collection_sets';
import { byPlacement } from '@/lib/utils/components/asgard/scene.utils';
import { cn } from '@/lib/utils';

export interface KeepsakesShelfProps {
  /** The vessel's own kept collections (own-only rows). */
  kept: VesselCollectionsRow[];
  /** The collection catalog (published-read). */
  catalog: CollectionSetsRow[];
  className?: string;
}

export default function KeepsakesShelf({ kept, catalog, className }: KeepsakesShelfProps) {
  const setById = new Map(catalog.map((s) => [s.id, s]));
  const shown = [...kept].filter((k) => k.is_displayed).sort(byPlacement);

  if (shown.length === 0) {
    return (
      <div
        className={cn(
          'rounded-lg border border-dashed border-star-dust/15 p-6 text-center',
          className
        )}
      >
        <p className="text-sm text-star-dust/60">Nothing kept yet — and that is fine.</p>
        <p className="mt-1 text-xs text-star-dust/40">
          Keepsakes are found, earned, gifted, or grown. Never bought, never
          rushed.
        </p>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 gap-3 sm:grid-cols-2', className)}>
      {shown.map((k) => {
        const set = setById.get(k.collection_id);
        return (
          <div
            key={k.id}
            className="rounded-lg border border-star-dust/10 bg-(--color-surface)/70 p-4"
          >
            <p className="text-sm font-medium text-star-dust">
              {set?.name ?? 'A kept collection'}
            </p>
            {set?.description && (
              <p className="mt-0.5 text-xs text-star-dust/50">{set.description}</p>
            )}
            {/* Rarity is shimmer, never status — a quiet word, no badge race */}
            {set?.rarity && (
              <p className="mt-1 text-xs text-star-dust/40">{set.rarity}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
