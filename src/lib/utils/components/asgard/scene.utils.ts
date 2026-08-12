// src/lib/utils/components/asgard/scene.utils.ts
// ============================================================================
// SCENE UTILITIES — pure logic for the scene renderer (no React, no fetch)
// ============================================================================
// Provenance: THE-FRONTEND-REIMAGINING, finishing session 2026-07-29 (study
// record: fable lanes/study/e2-the-ux-study-bus.md, round 8a work-order step
// ④). The garden's law is the audiences' own (L1-13/L3-01): patient growth
// curves, dormancy-not-death — "No punishment. Only patience." Nothing here
// ever computes a death state, because the schema and the law both refuse
// one: plants go dormant, never die.

import type { PlantStagesRow } from '@/lib/generated/types/hestia-core/plant_stages';

export interface GrowthReading {
  /** The stage the plot stands in right now (null = not yet planted). */
  stage: PlantStagesRow | null;
  /** 0–1 progress through the CURRENT stage (time-derived). */
  stageProgress: number;
  /** 0–1 progress through the whole growth arc. */
  overallProgress: number;
  /** True when every timed stage has completed — the plant rests in bloom. */
  fullyGrown: boolean;
  /** True when the plot is resting (long-unwatered). Dormant, never dead —
   *  the garden is patient; watering wakes it where the surface offers it. */
  dormant: boolean;
}

/** Days without water after which a plot RESTS (never dies). The number is
 *  gentle on purpose and 🚩 VITAL-REVISIT — tuned against real gardens once
 *  vessels live here, like every formula parameter in the house. */
export const DORMANCY_REST_DAYS = 14;

/**
 * Read a plot's growth from planted time + the stage ladder.
 * Stages are walked in stage_order; each contributes duration_hours (a null
 * duration means the stage holds until something beyond time advances it —
 * progress pauses there honestly rather than inventing a clock).
 */
export function readGrowth(
  plantedAt: string | null,
  lastWateredAt: string | null,
  stages: PlantStagesRow[],
  now: Date = new Date()
): GrowthReading {
  const ladder = [...stages].sort((a, b) => a.stage_order - b.stage_order);

  if (!plantedAt || ladder.length === 0) {
    return {
      stage: null,
      stageProgress: 0,
      overallProgress: 0,
      fullyGrown: false,
      dormant: false,
    };
  }

  const planted = new Date(plantedAt).getTime();
  const elapsedHours = Math.max(0, (now.getTime() - planted) / 36e5);

  const watered = lastWateredAt ? new Date(lastWateredAt).getTime() : planted;
  const daysSinceWater = (now.getTime() - watered) / 864e5;
  const dormant = daysSinceWater > DORMANCY_REST_DAYS;

  let hoursWalked = 0;
  for (let i = 0; i < ladder.length; i++) {
    const stage = ladder[i];
    const duration = stage.duration_hours;

    if (duration == null) {
      // An untimed stage: the plot stands here until moved by other means.
      return {
        stage,
        stageProgress: 0,
        overallProgress: (i + 0.5) / ladder.length,
        fullyGrown: false,
        dormant,
      };
    }

    if (elapsedHours < hoursWalked + duration) {
      const inStage = (elapsedHours - hoursWalked) / duration;
      return {
        stage,
        stageProgress: Math.min(1, Math.max(0, inStage)),
        overallProgress: (i + inStage) / ladder.length,
        fullyGrown: false,
        dormant,
      };
    }

    hoursWalked += duration;
  }

  // Every timed stage complete — the plant rests in bloom (nothing decays).
  return {
    stage: ladder[ladder.length - 1],
    stageProgress: 1,
    overallProgress: 1,
    fullyGrown: true,
    dormant,
  };
}

/** Stable ordering for placed things (decorations, modules): display_order
 *  first, then created_at, then id — so the scene never shuffles on its own
 *  (stability is a promise to the walker; re-siting is the dweller's act). */
export function byPlacement<
  T extends { display_order?: number | null; created_at?: string; id: string },
>(a: T, b: T): number {
  const orderA = a.display_order ?? 0;
  const orderB = b.display_order ?? 0;
  if (orderA !== orderB) return orderA - orderB;
  if (a.created_at && b.created_at && a.created_at !== b.created_at) {
    return a.created_at < b.created_at ? -1 : 1;
  }
  return a.id < b.id ? -1 : 1;
}
