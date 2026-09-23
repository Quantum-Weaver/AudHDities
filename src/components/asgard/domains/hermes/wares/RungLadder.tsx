// src/components/asgard/domains/hermes/wares/RungLadder.tsx
'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { formatMinorUnits } from '@/lib/economics/split';
import { recurrenceOf, intervalPhrase } from '@/lib/economics/recurrence';
import type { Tables } from '@/lib/generated/supabase/database.helpers.js';

type WareRow = Tables<'wares'>;

export function isRung(ware: WareRow): boolean {
  return recurrenceOf(ware) !== null;
}

interface RungLadderProps {
  /** One maker's rungs. */
  rungs: WareRow[];
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

export function RungLadder({ rungs }: RungLadderProps) {
  const ladder = useMemo(
    () => [...rungs].sort((a, b) => (a.price ?? 0) - (b.price ?? 0)),
    [rungs],
  );

  if (ladder.length === 0) return null;

  const recurrence = recurrenceOf(ladder[0]);

  return (
    <div>
      <p className="text-sm text-star-dust/50 mb-3">
        No rung buys anything another does not. There are no perks, no badges, no early access and
        no name on a wall — the only difference between them is the amount.
      </p>

      <p className="text-star-dust text-lg mb-3">
        {rangeOf(ladder)}
        {recurrence && (
          <span className="text-sm text-star-dust/60"> {intervalPhrase(recurrence.interval)}</span>
        )}
      </p>

      <ul className="space-y-1" role="list">
        {ladder.map((rung) => (
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
    </div>
  );
}
