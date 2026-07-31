// src/components/asgard/domains/hestia/vessel/scene/GardenBed.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE GARDEN — blooming on its own clock, dormancy never death           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// Provenance: KP's ⚛ immersion vision, verbatim: "gardening and flowers
// blooming nothing dying, all only steps away from the creative studios."
// The audiences' law (L1-13): "No punishment. Only patience" — plants go
// dormant, never die; seeds regrow; the garden is patient. Growth is read
// from real time (planted_at × plant_stages.duration_hours) — no timers
// shown, no pressure, no red anything. Empty plots wait with dignity.

'use client';

import { Sprout } from 'lucide-react';
import type { GardenPlotsRow } from '@/types/generated/hestia-core/garden_plots';
import type { PlantStagesRow } from '@/types/generated/hestia-core/plant_stages';
import type { SeedTypesRow } from '@/types/generated/hestia-core/seed_types';
import { readGrowth } from '@/lib/utils/components/asgard/scene.utils';
import { cn } from '@/lib/utils';

export interface GardenBedProps {
  plots: GardenPlotsRow[];
  /** The stage ladder (catalog — published-read). */
  stages: PlantStagesRow[];
  /** The seed catalog (for naming what grows). */
  seeds: SeedTypesRow[];
  className?: string;
}

export default function GardenBed({ plots, stages, seeds, className }: GardenBedProps) {
  const seedById = new Map(seeds.map((s) => [s.id, s]));

  if (plots.length === 0) {
    return (
      <div
        className={cn(
          'rounded-lg border border-dashed border-star-dust/15 p-6 text-center',
          className
        )}
      >
        <Sprout className="mx-auto mb-2 h-5 w-5 text-star-dust/40" aria-hidden="true" />
        <p className="text-sm text-star-dust/60">The soil is ready when you are.</p>
        <p className="mt-1 text-xs text-star-dust/40">
          Seeds grow on their own time here. Nothing rushes, and nothing dies.
        </p>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-2 gap-3 sm:grid-cols-3', className)}>
      {plots.map((plot) => {
        const growth = readGrowth(plot.planted_at, plot.last_watered_at, stages);
        const seed = plot.seed_id ? seedById.get(plot.seed_id) : undefined;

        return (
          <div
            key={plot.id}
            className="rounded-lg border border-star-dust/10 bg-surface/70 p-4"
          >
            <p className="text-sm font-medium text-star-dust">
              {seed?.name ?? plot.name}
            </p>
            <p className="mt-0.5 text-xs text-star-dust/50">
              {!plot.planted_at
                ? 'Waiting for a seed'
                : growth.dormant
                  ? 'Resting — the garden is patient'
                  : growth.fullyGrown
                    ? 'In bloom'
                    : (growth.stage?.name ?? 'Growing')}
            </p>
            {/* The arc, shown gently — never a percentage race */}
            {plot.planted_at && !growth.fullyGrown && (
              <div
                className="mt-2 h-1 w-full overflow-hidden rounded-full bg-star-dust/10"
                role="presentation"
              >
                <div
                  className="h-full rounded-full bg-neurospark/60"
                  style={{ width: `${Math.round(growth.overallProgress * 100)}%` }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
