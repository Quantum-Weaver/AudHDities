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
//
// THE SHAPING (2026-07-31, at KP's ⚛ word "we are ready to finish hestia"):
// the garden grew hands — ready a plot, plant a seed, water. All gestures
// are the vessel's own taps (deliberate, keyboard-whole: native select, real
// buttons); there is NO delete verb anywhere, because dormancy-not-death
// has no use for one. Watering a resting plot wakes it — that is the whole
// of the "punishment" system: there isn't one.

'use client';

import { useState } from 'react';
import { Droplets, Sprout } from 'lucide-react';
import type { GardenPlotsRow } from '@/lib/generated/types/hestia-core/garden_plots';
import type { PlantStagesRow } from '@/lib/generated/types/hestia-core/plant_stages';
import type { SeedTypesRow } from '@/lib/generated/types/hestia-core/seed_types';
import { readGrowth } from '@/lib/utils/components/asgard/scene.utils';
import { cn } from '@/lib/utils';

export interface GardenBedProps {
  plots: GardenPlotsRow[];
  /** The stage ladder (catalog — published-read). */
  stages: PlantStagesRow[];
  /** The seed catalog (for naming what grows, and for planting). */
  seeds: SeedTypesRow[];
  /** Ready a new plot (the shaping gesture; absent = read-only scene). */
  onReadyPlot?: () => void;
  /** Plant a chosen seed in a waiting plot. */
  onPlant?: (plotId: string, seedId: string) => void;
  /** Water a plot (wakes a resting one — no other effect needed). */
  onWater?: (plotId: string) => void;
  /** True while any gesture is in flight (buttons wait politely). */
  shaping?: boolean;
  className?: string;
}

/** One waiting plot's planting control — native select + a plain button,
 *  keyboard-whole, nothing custom to trap focus in. */
function PlantingRow({
  plotId,
  seeds,
  onPlant,
  shaping,
}: {
  plotId: string;
  seeds: SeedTypesRow[];
  onPlant: (plotId: string, seedId: string) => void;
  shaping?: boolean;
}) {
  const [seedId, setSeedId] = useState('');

  return (
    <div className="mt-2 flex items-center gap-2">
      <label className="sr-only" htmlFor={`seed-for-${plotId}`}>
        Choose a seed for this plot
      </label>
      <select
        id={`seed-for-${plotId}`}
        value={seedId}
        onChange={(e) => setSeedId(e.target.value)}
        className="min-w-0 flex-1 rounded border border-star-dust/20 bg-(--color-surface) px-2 py-1 text-xs text-star-dust"
      >
        <option value="">Choose a seed…</option>
        {seeds.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
      <button
        type="button"
        disabled={!seedId || shaping}
        onClick={() => onPlant(plotId, seedId)}
        className="rounded border border-star-dust/20 px-2 py-1 text-xs text-star-dust/80 transition-colors hover:border-star-dust/40 disabled:opacity-40 motion-reduce:transition-none"
      >
        Plant
      </button>
    </div>
  );
}

export default function GardenBed({
  plots,
  stages,
  seeds,
  onReadyPlot,
  onPlant,
  onWater,
  shaping,
  className,
}: GardenBedProps) {
  const seedById = new Map(seeds.map((s) => [s.id, s]));

  const readyPlotButton = onReadyPlot && (
    <button
      type="button"
      disabled={shaping}
      onClick={onReadyPlot}
      className="rounded-lg border border-dashed border-star-dust/20 px-4 py-2 text-xs text-star-dust/60 transition-colors hover:border-star-dust/40 hover:text-star-dust/80 disabled:opacity-40 motion-reduce:transition-none"
    >
      <Sprout className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />
      Ready a new plot
    </button>
  );

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
        {readyPlotButton && <div className="mt-4">{readyPlotButton}</div>}
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {plots.map((plot) => {
          const growth = readGrowth(plot.planted_at, plot.last_watered_at, stages);
          const seed = plot.seed_id ? seedById.get(plot.seed_id) : undefined;

          return (
            <div
              key={plot.id}
              className="rounded-lg border border-star-dust/10 bg-(--color-surface)/70 p-4"
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

              {/* The gestures — the vessel's own taps, nothing demanded */}
              {!plot.planted_at && onPlant && (
                <PlantingRow
                  plotId={plot.id}
                  seeds={seeds}
                  onPlant={onPlant}
                  shaping={shaping}
                />
              )}
              {plot.planted_at && onWater && (
                <button
                  type="button"
                  disabled={shaping}
                  onClick={() => onWater(plot.id)}
                  className="mt-2 rounded border border-star-dust/20 px-2 py-1 text-xs text-star-dust/70 transition-colors hover:border-star-dust/40 disabled:opacity-40 motion-reduce:transition-none"
                >
                  <Droplets className="mr-1 inline h-3 w-3" aria-hidden="true" />
                  {growth.dormant ? 'Water — it will wake' : 'Water'}
                </button>
              )}
            </div>
          );
        })}
      </div>
      {readyPlotButton && <div className="mt-3">{readyPlotButton}</div>}
    </div>
  );
}
