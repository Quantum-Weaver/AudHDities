// src/components/asgard/domains/cosmic/environments/CrossingHall.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE CROSSING HALL — the Realms room, become a place you go             ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// Provenance: REALMS-AS-TRAVEL move 1, ruled at KP's ⚛ word 2026-07-30
// (design + ruling on the (cosmic) REALM-BUS). Picture-cards retire; each
// place stands as a DOORWAY in the hall's fixed geometry (places.ts — the
// same map at two scales as RealmMapFurniture). The doorway wears the
// SceneDoorway register in this realm's own idiom — still by default,
// threshold-light only, keyboard-walkable — without touching hestia's organ:
// visibility is the invitation, movement is a tap on the shoulder. The
// search box and mood filters retired with the cards: a hall you learn by
// heart needs no search. Law 7 rides: this room reads nothing personal and
// writes nothing.

'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { getEnvironmentAffect } from '@/lib/constants/systems/environments/affects';
import { HALL_ORDER, PLACE_DISPLAY } from '@/lib/constants/systems/environments/places';

export function CrossingHall() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-neurospark/10 px-4 py-2 rounded-full mb-4">
            <Sparkles size={14} className="text-neurospark" />
            <span className="text-neurospark text-sm">The Realms</span>
          </div>
          <h1 className="text-3xl font-bold text-star-dust mb-4">
            The Crossing Hall
          </h1>
          <p className="text-lg text-star-dust/60 max-w-xl mx-auto">
            Eleven places, standing where they always stand. Step through a
            doorway and the sky changes. Travel, not tourism.
          </p>
        </div>

        {/* The doorways — one geometry, everywhere, forever */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HALL_ORDER.map((envId) => {
            const affect = getEnvironmentAffect(envId);
            const place = PLACE_DISPLAY[envId];
            const feeling = affect.mood.slice(0, 2).join(' · ');

            return (
              <Link
                key={envId}
                href={`/environments/${envId}`}
                className="group relative block rounded-lg border border-star-dust/10 bg-white/5 p-5 pl-6 overflow-hidden transition-colors motion-reduce:transition-none hover:border-star-dust/25 focus-visible:border-star-dust/25"
              >
                {/* The threshold light — the place's own beam gradient,
                    standing still. A sliver, not a show. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1 opacity-70"
                  style={{ backgroundImage: affect.wash }}
                />
                <span className="flex items-center gap-3">
                  <span className="text-2xl">{place.icon}</span>
                  <span>
                    <span className="block text-sm font-medium text-star-dust group-hover:text-neurospark transition-colors motion-reduce:transition-none">
                      {place.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-star-dust/50">
                      {feeling}
                    </span>
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        {/* The hall's promise — the map's own words, at hall scale */}
        <p className="mt-10 text-center text-xs text-star-dust/40">
          Every doorway stays where you left it. Nothing here shuffles.
        </p>
      </div>
    </main>
  );
}
