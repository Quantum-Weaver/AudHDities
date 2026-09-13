// src/components/asgard/domains/hermes/wares/RungLadder.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { formatMinorUnits } from '@/lib/economics/split';
import { recurrenceOf, intervalPhrase } from '@/lib/economics/recurrence';
import type { Tables } from '@/lib/generated/supabase/database.helpers.js';

type WareRow = Tables<'wares'>;

export function isRung(ware: WareRow): boolean {
  return recurrenceOf(ware) !== null;
}

/** One maker's rungs, gathered under the profile or the hand that made them. */
interface Ladder {
  key: string;
  artisanProfileId: string | null;
  rungs: WareRow[];
}

interface RungLadderProps {
  rungs: WareRow[];
  heading?: string;
}

function amountOf(rung: WareRow): string {
  return rung.price !== null && rung.price > 0
    ? formatMinorUnits(Math.round(rung.price * 100))
    : 'Price not set';
}

function rangeOf(rungs: WareRow[]): string {
  const priced = rungs.filter((r) => r.price !== null && r.price > 0);
  if (priced.length === 0) return 'Price not set';
  const low = amountOf(priced[0]);
  const high = amountOf(priced[priced.length - 1]);
  return low === high ? low : `${low} to ${high}`;
}

export function RungLadder({ rungs, heading = 'Standing at this loom' }: RungLadderProps) {
  const [names, setNames] = useState<Record<string, string>>({});

  const ladders = useMemo<Ladder[]>(() => {
    const byMaker = new Map<string, Ladder>();
    for (const rung of rungs) {
      const profileId = rung.artisan_profile_id;
      const key = profileId ?? rung.created_by;
      const ladder = byMaker.get(key) ?? { key, artisanProfileId: profileId, rungs: [] };
      ladder.rungs.push(rung);
      byMaker.set(key, ladder);
    }
    return Array.from(byMaker.values()).map((ladder) => ({
      ...ladder,
      rungs: [...ladder.rungs].sort((a, b) => (a.price ?? 0) - (b.price ?? 0)),
    }));
  }, [rungs]);

  useEffect(() => {
    const ids = ladders.map((l) => l.artisanProfileId).filter((id): id is string => Boolean(id));
    if (ids.length === 0) return;
    let alive = true;

    Promise.all(
      ids.map(async (id) => {
        const result = await fetch(`/api/generated/hermes-social/artisan_profiles/${id}`)
          .then((r) => r.json())
          .catch(() => null);
        return [id, result?.success ? result.data?.artisan_name ?? null : null] as const;
      }),
    ).then((pairs) => {
      if (!alive) return;
      const found: Record<string, string> = {};
      for (const [id, name] of pairs) if (name) found[id] = name;
      setNames(found);
    });

    return () => { alive = false; };
  }, [ladders]);

  if (ladders.length === 0) return null;

  return (
    <section className="mb-10" aria-labelledby="rung-ladder-heading">
      <h2 id="rung-ladder-heading" className="text-lg font-semibold text-star-dust mb-2">
        {heading}
      </h2>
      <p className="text-sm text-star-dust/50 mb-5 max-w-2xl">
        No rung buys anything another does not. There are no perks, no badges, no early access and
        no name on a wall — the only difference between them is the amount.
      </p>

      <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
        {ladders.map((ladder) => {
          const recurrence = recurrenceOf(ladder.rungs[0]);
          const makerName = ladder.artisanProfileId ? names[ladder.artisanProfileId] : undefined;
          return (
            <li
              key={ladder.key}
              className="h-full bg-white/5 border border-white/10 rounded-xl p-5"
            >
              <h3 className="text-base font-semibold text-star-dust mb-1">
                {makerName || 'A weaver of the Sanctuary'}
              </h3>
              <p className="text-star-dust text-lg mb-3">
                {rangeOf(ladder.rungs)}
                {recurrence && (
                  <span className="text-sm text-star-dust/60"> {intervalPhrase(recurrence.interval)}</span>
                )}
              </p>

              <ul className="space-y-1 mb-3" role="list">
                {ladder.rungs.map((rung) => (
                  <li key={rung.id}>
                    <Link
                      href={`/bazaar/wares/${rung.id}`}
                      className="flex items-baseline justify-between gap-3 text-sm text-star-dust/70 hover:text-star-dust focus:outline-none focus-visible:ring-2 focus-visible:ring-neurospark rounded"
                    >
                      <span className="truncate">
                        {rung.icon_emoji && <span aria-hidden="true">{rung.icon_emoji} </span>}
                        {rung.name}
                      </span>
                      <span className="shrink-0">{amountOf(rung)}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {ladder.artisanProfileId && (
                <Link
                  href={`/bazaar/artisans/${ladder.artisanProfileId}`}
                  className="text-sm text-neurospark hover:underline"
                >
                  The weaver →
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
