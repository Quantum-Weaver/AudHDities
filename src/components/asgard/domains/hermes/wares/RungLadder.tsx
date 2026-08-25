// src/components/asgard/domains/hermes/wares/RungLadder.tsx
// THE RUNGS (SPEC §6) — one artisan's recurring wares, shown together as one
// ladder instead of five separate stalls.
//
// KP ⚛ 2026-08-24: "retire the donate and create subscription tiers for me
// rather than the platform". They are ONE ARTISAN'S RECURRING WARE at one
// artisan's stall — not a platform product. The platform takes its 10% from
// them exactly as from any other ware, and 30% of that returns to the pool
// exactly the same way.
//
// EQUAL WEIGHT, ALWAYS. No rung marked popular, recommended or best value;
// none drawn larger or brighter; the order is the price's own order and
// nothing else. The only difference between them is the amount.
//
// The rows render from wares carrying a recurrence. None exist until KP seeds
// them by his own hand after the DRAFT runs, so this draws nothing today, and
// says nothing about that.
'use client';

import Link from 'next/link';
import { formatMinorUnits } from '@/lib/economics/split';
import { recurrenceOf, intervalPhrase } from '@/lib/economics/recurrence';
import type { Tables } from '@/lib/generated/supabase/database.helpers.js';

type WareRow = Tables<'wares'>;

export function isRung(ware: WareRow): boolean {
  return recurrenceOf(ware) !== null;
}

interface RungLadderProps {
  rungs: WareRow[];
  heading?: string;
}

export function RungLadder({ rungs, heading = 'Standing at this loom' }: RungLadderProps) {
  if (rungs.length === 0) return null;

  const ordered = [...rungs].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));

  return (
    <section className="mb-10" aria-labelledby="rung-ladder-heading">
      <h2 id="rung-ladder-heading" className="text-lg font-semibold text-star-dust mb-2">
        {heading}
      </h2>
      <p className="text-sm text-star-dust/50 mb-5 max-w-2xl">
        No rung buys anything another does not. There are no perks, no badges, no early access and
        no name on a wall — the only difference between the five is the amount.
      </p>

      <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
        {ordered.map((rung) => {
          const recurrence = recurrenceOf(rung);
          const amount = rung.price !== null && rung.price > 0
            ? formatMinorUnits(Math.round(rung.price * 100))
            : 'Price not set';
          return (
            <li key={rung.id}>
              <Link
                href={`/bazaar/wares/${rung.id}`}
                className="block h-full bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-neurospark"
              >
                <div className="flex items-baseline gap-2 mb-2">
                  {rung.icon_emoji && <span aria-hidden="true">{rung.icon_emoji}</span>}
                  <span className="text-base font-semibold text-star-dust">{rung.name}</span>
                </div>
                <p className="text-star-dust text-lg">
                  {amount}
                  {recurrence && (
                    <span className="text-sm text-star-dust/60"> {intervalPhrase(recurrence.interval)}</span>
                  )}
                </p>
                {rung.description && (
                  <p className="text-sm text-star-dust/50 mt-2">{rung.description}</p>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
