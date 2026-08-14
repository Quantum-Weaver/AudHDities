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
// never caught up." This organ is the catching-up.
//
// THE SHAPING (2026-07-31, KP's ⚛ word: "we are ready to finish hestia
// please check out the current state and complete the ux") — the home grew
// hands: found a room · move a room (sovereign ordering, deliberate
// gestures, no drag) · ready/plant/water the garden · place the map (table
// or wall — the vessel's own realm_map decoration row, created at first
// choice) · hearth music worn at last (opt-in at the tap itself) · the
// keepsakes shelf (the collections surface, unlocking its seed condition).
//
// Laws worn: on the logged-in path by RLS design (a visitor cannot window-
// peek a hearth). Empty states are dignified. Placement is stable
// (byPlacement — the scene never shuffles ITSELF; every re-siting is the
// dweller's own tap). No delete verbs anywhere in the home — nothing here
// has a death state. All writes ride the generated hooks (ownership set
// server-side; the policies are the wall).

'use client';

import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, Home } from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import {
  useVesselInteriorsList,
} from '@/lib/generated/hooks/hestia-core/vessel_interiors';
import {
  useVesselRoomsList,
  useCreateVesselRooms,
  useUpdateVesselRooms,
} from '@/lib/generated/hooks/hestia-core/vessel_rooms';
import {
  useVesselDecorationsList,
  useCreateVesselDecorations,
  useUpdateVesselDecorations,
} from '@/lib/generated/hooks/hestia-core/vessel_decorations';
import {
  useGardenPlotsList,
  useCreateGardenPlots,
  useUpdateGardenPlots,
} from '@/lib/generated/hooks/hestia-core/garden_plots';
import { usePlantStagesList } from '@/lib/generated/hooks/hestia-core/plant_stages';
import { useSeedTypesList } from '@/lib/generated/hooks/hestia-core/seed_types';
import {
  useVesselCollectionsList,
} from '@/lib/generated/hooks/hestia-core/vessel_collections';
import {
  useCollectionSetsList,
} from '@/lib/generated/hooks/hestia-core/collection_sets';
import { Skeleton } from '@/components/runes/Skeleton';
import GardenBed from './GardenBed';
import HearthMusic from './HearthMusic';
import KeepsakesShelf from './KeepsakesShelf';
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
    () => (userId ? { filters: { created_by: userId } } : undefined),
    [userId]
  );
  const plotParams = useMemo(
    () =>
      userId ? { filters: { created_by: userId, is_active: 'true' } } : undefined,
    [userId]
  );
  const keptParams = useMemo(
    () => (userId ? { filters: { user_id: userId } } : undefined),
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
  const setsParams = useMemo(
    () => ({ sort: 'display_order', order: 'asc' as const }),
    []
  );

  const interiors = useVesselInteriorsList(interiorParams);
  const rooms = useVesselRoomsList(roomParams);
  const decorations = useVesselDecorationsList(decorationParams);
  const plots = useGardenPlotsList(plotParams);
  const kept = useVesselCollectionsList(keptParams);
  // Catalogs (published-read)
  const stages = usePlantStagesList(stageParams);
  const seeds = useSeedTypesList(seedParams);
  const sets = useCollectionSetsList(setsParams);

  // The shaping hands (writes ride the generated hooks; ownership is set
  // server-side, RLS is the wall)
  const { create: createRoom } = useCreateVesselRooms();
  const { update: updateRoom } = useUpdateVesselRooms();
  const { create: createPlot } = useCreateGardenPlots();
  const { update: updatePlot } = useUpdateGardenPlots();
  const { create: createDecoration } = useCreateVesselDecorations();
  const { update: updateDecoration } = useUpdateVesselDecorations();

  const [shaping, setShaping] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [gestureNote, setGestureNote] = useState<string | null>(null);

  /** Run one shaping gesture: polite busy state, plain-worded failure
   *  (what happened / how to try again — the error grammar), refetch after. */
  const gesture = async (
    act: () => Promise<{ error: string | null } | { data: unknown; error: string | null }>,
    refetch: () => Promise<void> | void,
    failWord: string
  ) => {
    setShaping(true);
    setGestureNote(null);
    try {
      const result = await act();
      if (result.error) {
        setGestureNote(`${failWord} It is safe to try again.`);
      } else {
        await refetch();
      }
    } catch {
      setGestureNote(`${failWord} It is safe to try again.`);
    } finally {
      setShaping(false);
    }
  };

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
    (d) => d.decoration_type !== 'realm_map' && d.is_displayed
  );
  const mapPlacement = mapDecoration?.position === 'wall' ? 'wall' : 'table';
  const stillLoading =
    interiors.loading || rooms.loading || decorations.loading || plots.loading;

  // ─── The gestures ────────────────────────────────────────────────────

  const foundRoom = async () => {
    const name = newRoomName.trim();
    if (!name) return;
    await gesture(
      () =>
        createRoom({
          name,
          display_order: orderedRooms.length,
          is_active: true,
          // The API sets ownership server-side from the session; the insert
          // type asks for it too — same value either way, RLS the wall.
          created_by: user.id,
        }),
      rooms.refetch,
      'The room was not founded this time.'
    );
    setNewRoomName('');
  };

  /** Sovereign ordering — a deliberate tap, one step at a time. The whole
   *  list re-numbers by index so the kept order is always unambiguous. */
  const moveRoom = async (roomId: string, direction: -1 | 1) => {
    const index = orderedRooms.findIndex((r) => r.id === roomId);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= orderedRooms.length) return;
    const reordered = [...orderedRooms];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(target, 0, moved);
    await gesture(
      async () => {
        for (let i = 0; i < reordered.length; i++) {
          if (reordered[i].display_order !== i) {
            const result = await updateRoom(reordered[i].id, { display_order: i });
            if (result.error) return result;
          }
        }
        return { data: null, error: null };
      },
      rooms.refetch,
      'The room did not move this time.'
    );
  };

  const readyPlot = () =>
    gesture(
      () =>
        createPlot({
          name: `Plot ${plots.data.length + 1}`,
          is_active: true,
          created_by: user.id,
        }),
      plots.refetch,
      'The plot was not readied this time.'
    );

  const plantSeed = (plotId: string, seedId: string) => {
    const now = new Date().toISOString();
    return gesture(
      () => updatePlot(plotId, { seed_id: seedId, planted_at: now, last_watered_at: now }),
      plots.refetch,
      'The seed was not planted this time.'
    );
  };

  const waterPlot = (plotId: string) =>
    gesture(
      () => updatePlot(plotId, { last_watered_at: new Date().toISOString() }),
      plots.refetch,
      'The watering did not land this time.'
    );

  /** The map is the vessel's own furniture: the first placement choice
   *  CREATES their realm_map row (no seed needed — ✍ gate ②'s furniture,
   *  sovereign from the first tap). */
  const placeMap = (placement: 'table' | 'wall') => {
    if (placement === mapPlacement && mapDecoration) return;
    return gesture(
      () =>
        mapDecoration
          ? updateDecoration(mapDecoration.id, { position: placement })
          : createDecoration({
              name: 'The Realm Map',
              decoration_type: 'realm_map',
              position: placement,
              is_displayed: true,
              display_order: 0,
              created_by: user.id,
            }),
      decorations.refetch,
      'The map stayed where it was.'
    );
  };

  // ─── The scene ───────────────────────────────────────────────────────

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
        {interior?.music_url && (
          <HearthMusic src={interior.music_url} className="mt-3" />
        )}
      </div>

      {/* A gesture that didn't land says so plainly, once, and moves on */}
      {gestureNote && (
        <p role="status" className="mb-4 text-xs text-star-dust/60">
          {gestureNote}
        </p>
      )}

      {stillLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Skeleton variant="card" className="h-40" />
          <Skeleton variant="card" className="h-40" />
        </div>
      ) : (
        <>
          {/* THE ROOMS — wings of the home, in the order the dweller keeps */}
          {orderedRooms.length > 0 ? (
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {orderedRooms.map((room, index) => {
                const roomDecorations = otherDecorations.filter(
                  (d) => d.room_id === room.id
                );
                return (
                  <section
                    key={room.id}
                    aria-label={room.name}
                    className="rounded-lg border border-star-dust/10 bg-(--color-surface)/70 p-5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-base font-semibold text-star-dust">
                        {room.name}
                      </h2>
                      {/* Sovereign ordering — quiet, deliberate, keyboard-whole */}
                      <div className="flex gap-1">
                        <button
                          type="button"
                          aria-label={`Move ${room.name} earlier`}
                          disabled={shaping || index === 0}
                          onClick={() => moveRoom(room.id, -1)}
                          className="rounded p-1 text-star-dust/40 transition-colors hover:text-star-dust/80 disabled:opacity-30 motion-reduce:transition-none"
                        >
                          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          aria-label={`Move ${room.name} later`}
                          disabled={shaping || index === orderedRooms.length - 1}
                          onClick={() => moveRoom(room.id, 1)}
                          className="rounded p-1 text-star-dust/40 transition-colors hover:text-star-dust/80 disabled:opacity-30 motion-reduce:transition-none"
                        >
                          <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
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
            /* The unfurnished home — dignified (empty is waiting, never missing) */
            <div className="mb-4 rounded-lg border border-dashed border-star-dust/15 p-8 text-center">
              <p className="text-sm text-star-dust/60">
                Your home is waiting to take shape.
              </p>
              <p className="mt-1 text-xs text-star-dust/40">
                Rooms, keepsakes, and a garden grow here — at your pace, by
                your hand, never anyone else&rsquo;s.
              </p>
            </div>
          )}

          {/* FOUNDING — one calm form: a name, nothing else demanded */}
          <form
            className="mb-8 flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              void foundRoom();
            }}
          >
            <label className="sr-only" htmlFor="new-room-name">
              Name a new room
            </label>
            <input
              id="new-room-name"
              type="text"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              placeholder="Name a new room…"
              className="min-w-0 flex-1 rounded border border-star-dust/20 bg-(--color-surface) px-3 py-1.5 text-sm text-star-dust placeholder:text-star-dust/30 sm:max-w-xs"
            />
            <button
              type="submit"
              disabled={shaping || !newRoomName.trim()}
              className="rounded border border-star-dust/20 px-3 py-1.5 text-xs text-star-dust/80 transition-colors hover:border-star-dust/40 disabled:opacity-40 motion-reduce:transition-none"
            >
              <Home className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />
              Found the room
            </button>
          </form>

          {/* THE GARDEN — its own clock, its own patience, now with hands */}
          <section aria-label="The garden" className="mb-8">
            <h2 className="mb-3 text-base font-semibold text-star-dust">
              The garden
            </h2>
            <GardenBed
              plots={plots.data}
              stages={stages.data}
              seeds={seeds.data}
              onReadyPlot={readyPlot}
              onPlant={plantSeed}
              onWater={waterPlot}
              shaping={shaping}
            />
          </section>

          {/* THE KEEPSAKES — the collections surface (L1-13's slow
              accumulation of things that matter) */}
          <section aria-label="Keepsakes" className="mb-8">
            <h2 className="mb-3 text-base font-semibold text-star-dust">
              Keepsakes
            </h2>
            <KeepsakesShelf kept={kept.data} catalog={sets.data} />
          </section>

          {/* THE MAP — furniture (✍ gate ②), placed by the dweller's hand */}
          <section aria-label="The realm map" className="mb-8">
            <RealmMapFurniture placement={mapPlacement} />
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-star-dust/40">Keep the map:</span>
              <button
                type="button"
                disabled={shaping || mapPlacement === 'table'}
                onClick={() => placeMap('table')}
                aria-pressed={mapPlacement === 'table'}
                className="rounded border border-star-dust/20 px-2 py-1 text-xs text-star-dust/70 transition-colors hover:border-star-dust/40 disabled:opacity-40 motion-reduce:transition-none"
              >
                on the table
              </button>
              <button
                type="button"
                disabled={shaping || mapPlacement === 'wall'}
                onClick={() => placeMap('wall')}
                aria-pressed={mapPlacement === 'wall'}
                className="rounded border border-star-dust/20 px-2 py-1 text-xs text-star-dust/70 transition-colors hover:border-star-dust/40 disabled:opacity-40 motion-reduce:transition-none"
              >
                on the wall
              </button>
            </div>
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
