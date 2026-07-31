// src/components/asgard/domains/hestia/vessel/scene/SceneRenderer.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE SCENE RENDERER — the one genuinely new organ                       ║
// ║   (the vessel home: rooms as composed modules, decorations as placed     ║
// ║    objects, the garden on its own clock — over the generated hooks)      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// Provenance: THE-FRONTEND-REIMAGINING, finishing session 2026-07-29 (study
// record: fable lanes/study/e2-the-ux-study-bus.md, round 8a work-order step
// ④). KP's ⚛ words, verbatim: "we look to keep the decorations and such for
// the vessel home in the database as objects, they do not exist yet. the
// superposition supabase is built to supprt these concepts the front end
// never caught up." This is the catching-up: the backend built the world
// (vessel_interiors · vessel_rooms · vessel_decorations · garden_plots ·
// plant_stages · seed_types, all RLS'd own-only), the constants shelf built
// the wardrobe, and this organ lets a vessel STAND in it.
//
// Laws worn: on the logged-in path by RLS design (a visitor cannot window-
// peek a hearth). Empty states are dignified — the home before seeding is
// the FIRST vessel's real experience (design → then seed, KP's sequence).
// Placement is stable (byPlacement — the scene never shuffles itself;
// re-siting is the dweller's sovereign act when the Sanctum offers it).
// interior.music_url is deliberately UNWORN here: sound is opt-in by the
// sensory law, and the opt-in surface is Movement IV's Sanctum switchboard.
// The realm map rides as furniture per ✍ GATE ② (decoration_type
// 'realm_map', and present by default on the table until decorations exist
// — presence without surveillance, position without GPS).

'use client';

import { useMemo } from 'react';
import { useUser } from '@/hooks/useUser';
import {
  useVesselInteriorsList,
} from '@/hooks/generated/hestia-core/vessel_interiors';
import { useVesselRoomsList } from '@/hooks/generated/hestia-core/vessel_rooms';
import {
  useVesselDecorationsList,
} from '@/hooks/generated/hestia-core/vessel_decorations';
import { useGardenPlotsList } from '@/hooks/generated/hestia-core/garden_plots';
import { usePlantStagesList } from '@/hooks/generated/hestia-core/plant_stages';
import { useSeedTypesList } from '@/hooks/generated/hestia-core/seed_types';
import { Skeleton } from '@/components/runes/Skeleton';
import GardenBed from './GardenBed';
import RealmMapFurniture from './RealmMapFurniture';
import SceneDoorway from './SceneDoorway';
import { byPlacement } from '@/lib/utils/components/asgard/scene.utils';
import { cn } from '@/lib/utils';

export default function SceneRenderer({ className }: { className?: string }) {
  const { user, profile, isLoading: userLoading } = useUser();
  const userId = user?.id;

  // The home's own rows (RLS: own-only — the filters are honesty, the
  // policies are the wall). Params memoized on the user id, per the house
  // pattern (StatusBar's energyParams) — the generated hooks refetch on
  // params identity, so a fresh object each render would loop.
  const interiorParams = useMemo(
    () => (userId ? { filters: { user_id: userId }, limit: 1 } : undefined),
    [userId]
  );
  const roomParams = useMemo(
    () =>
      userId
        ? { filters: { created_by: userId }, sort: 'display_order', order: 'asc' as const }
        : undefined,
    [userId]
  );
  const decorationParams = useMemo(
    () =>
      userId ? { filters: { created_by: userId, is_displayed: 'true' } } : undefined,
    [userId]
  );
  const plotParams = useMemo(
    () =>
      userId ? { filters: { created_by: userId, is_active: 'true' } } : undefined,
    [userId]
  );
  const stageParams = useMemo(
    () => ({ sort: 'stage_order', order: 'asc' as const }),
    []
  );
  const seedParams = useMemo(
    () => ({ sort: 'display_order', order: 'asc' as const }),
    []
  );

  const interiors = useVesselInteriorsList(interiorParams);
  const rooms = useVesselRoomsList(roomParams);
  const decorations = useVesselDecorationsList(decorationParams);
  const plots = useGardenPlotsList(plotParams);
  // Catalogs (published-read)
  const stages = usePlantStagesList(stageParams);
  const seeds = useSeedTypesList(seedParams);

  if (userLoading) {
    return (
      <div className={cn('container mx-auto max-w-4xl px-6', className)}>
        <Skeleton variant="text" className="mb-6 h-7 w-56" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Skeleton variant="card" className="h-40" />
          <Skeleton variant="card" className="h-40" />
        </div>
      </div>
    );
  }

  if (!user) {
    // The RLS design speaking plainly: homes are for their dwellers.
    return (
      <div className={cn('container mx-auto max-w-4xl px-6 text-center', className)}>
        <p className="text-star-dust/60">
          Enter the Sanctuary to stand in your home.
        </p>
      </div>
    );
  }

  const interior = interiors.data[0] ?? null;
  const accent = interior?.accent_color ?? undefined;
  const orderedRooms = [...rooms.data]
    .filter((r) => r.is_active)
    .sort(byPlacement);
  const placedDecorations = [...decorations.data].sort(byPlacement);
  const mapDecoration = placedDecorations.find(
    (d) => d.decoration_type === 'realm_map'
  );
  const otherDecorations = placedDecorations.filter(
    (d) => d.decoration_type !== 'realm_map'
  );
  const stillLoading =
    interiors.loading || rooms.loading || decorations.loading || plots.loading;

  return (
    <div
      className={cn('container mx-auto max-w-4xl px-6', className)}
      style={accent ? ({ '--vessel-accent': accent } as React.CSSProperties) : undefined}
    >
      {/* The hearth-name of the place */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-star-dust">
          {profile?.display_name
            ? `${profile.display_name}’s home`
            : 'Your home'}
        </h1>
        <p className="mt-1 text-sm text-star-dust/50">
          Everything here stays as you left it.
        </p>
      </div>

      {stillLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Skeleton variant="card" className="h-40" />
          <Skeleton variant="card" className="h-40" />
        </div>
      ) : (
        <>
          {/* THE ROOMS — wings of the home, in their kept order */}
          {orderedRooms.length > 0 ? (
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {orderedRooms.map((room) => {
                const roomDecorations = otherDecorations.filter(
                  (d) => d.room_id === room.id
                );
                return (
                  <section
                    key={room.id}
                    aria-label={room.name}
                    className="rounded-lg border border-star-dust/10 bg-(--color-surface)/70 p-5"
                  >
                    <h2 className="text-base font-semibold text-star-dust">
                      {room.name}
                    </h2>
                    {room.description && (
                      <p className="mt-1 text-xs text-star-dust/50">
                        {room.description}
                      </p>
                    )}
                    {roomDecorations.length > 0 ? (
                      <ul className="mt-3 space-y-2">
                        {roomDecorations.map((d) => (
                          <li
                            key={d.id}
                            className="rounded border border-star-dust/10 px-3 py-2 text-sm text-star-dust/80"
                          >
                            {d.name}
                            {d.description && (
                              <span className="block text-xs text-star-dust/40">
                                {d.description}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-3 text-xs text-star-dust/40">
                        Bare walls, on purpose — yours to fill, or not.
                      </p>
                    )}
                  </section>
                );
              })}
            </div>
          ) : (
            /* The unfurnished home — the first vessel's true first sight,
               dignified (empty is waiting, never missing) */
            <div className="mb-8 rounded-lg border border-dashed border-star-dust/15 p-8 text-center">
              <p className="text-sm text-star-dust/60">
                Your home is waiting to take shape.
              </p>
              <p className="mt-1 text-xs text-star-dust/40">
                Rooms, keepsakes, and a garden will grow here — at your pace,
                by your hand, never anyone else&rsquo;s.
              </p>
            </div>
          )}

          {/* THE GARDEN — its own clock, its own patience */}
          <section aria-label="The garden" className="mb-8">
            <h2 className="mb-3 text-base font-semibold text-star-dust">
              The garden
            </h2>
            <GardenBed plots={plots.data} stages={stages.data} seeds={seeds.data} />
          </section>

          {/* THE MAP — furniture (✍ gate ②): honored from the decoration row
              when one exists; resting on the table until then */}
          <section aria-label="The realm map" className="mb-8">
            <RealmMapFurniture
              placement={
                mapDecoration?.position === 'wall' ? 'wall' : 'table'
              }
            />
          </section>

          {/* THE SHORTEST EDGE — the studio, steps away (✍ adjacency law) */}
          <section aria-label="Doorways" className="mb-8">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <SceneDoorway
                href="/studio"
                label="The Studio"
                realm="prometheus"
                whisper="Steps away — when inspiration comes"
              />
              <SceneDoorway
                href="/vessel/sanctum"
                label="The Sanctum"
                realm="hestia"
                whisper="Shape how your home feels"
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
}
