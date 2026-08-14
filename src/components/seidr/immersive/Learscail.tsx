// src/components/seidr/immersive/Learscail.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   LÉARSCÁIL — the Sanctuary drawn as land, and walked instead of listed  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// Provenance: KP's ⚛ commission 2026-08-11, verbatim: "there is a stand alone
// tool we need and do not have, an interactive map that opens like a scroll
// and has sections drawn like a midevil map that are both discoverable and
// clickable once discovered" — and the reason, his own: "our nav is huge" ·
// "this was the plan to make it less anxious." He named it the same sitting:
// "Léarscáil (Irish): Literally translates to a 'clear' or 'careful image'
// of the landscape." The name is the specification.
//
// The engine is a spring water — resonance-awen/tools/the-learscail, carried
// here as a drawn bucket (src/lib/waters/the-learscail.ts, never edited in
// place). This file is only the DRESS: the water computes the land, the
// Sanctuary paints it.
//
// KP's ⚛ strokes worn here, both from this sitting:
//   · "it could be the nav, which makes it easier" — the map IS the street's
//     navigation, not a decoration beside one.
//   · "the 'paper' backing of the map can match the realm the user is
//     within" — the vellum wears the current realm's own wash, at ambient
//     strength. A map is a thing you carry, and it catches the light of the
//     room you are standing in.
//
// WHY IT IS NEARLY MONOCHROME, on purpose: a mappa mundi is ink on vellum
// with a few earths — not ten competing hues. Ten realm colours on one
// surface is the anxiety this tool was built to end, so provinces are told
// apart by TONE and by NAME, never by a rainbow. The one colour that moves
// is the paper, and it moves with the vessel.
//
// Laws worn (the E4 play study's synthesis, 2026-07-31):
//   · SHAPE WITHOUT SLOTS — undiscovered ground is DRAWN, unnamed. Never a
//     hole, never a silhouette with a gap, never "one missing."
//   · NO AMBIENT COUNT — nothing here says 4 of 10. The water refuses at the
//     source (mayCount) and this surface never asks.
//   · WHAT OPENS, KEEPS — discovery never expires; there is no forget verb,
//     only the vessel's own whole purge (offered in the Sanctum, not here).
//   · THE SOVEREIGNTY RIDER — the Hearth is alwaysOpen and can never be
//     hidden by the metaphor; and THE PLAIN LIST stands beside the drawing,
//     one tap away, always (law VIII: no register is the admission ticket).
//   · The ten-point sensory checklist: no autoplay, no flashing, motion
//     opt-in and instant under prefers-reduced-motion, plain words, keyboard
//     whole (every province is a real focusable link with a real href).

'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { List, Map as MapIcon } from 'lucide-react';
import {
  surveyMappa,
  makeMappa,
  unfurl,
  isDiscovered,
  type Mappa,
} from '@/lib/waters/the-learscail';
import { THE_STREET, realmOfPath } from '@/lib/constants/systems/the-street';
import { quickResolveAffect } from '@/lib/constants/systems/environments/affects';
import { useDiscovery } from '@/hooks/useDiscovery';
import { cn } from '@/lib/utils';

/** The vellum's own earths — ink and parchment. Fixed, calm. */
const INK = '#3a2f26';
const INK_SOFT = '#6b5a4a';
const VELLUM = '#efe6d4';
const VELLUM_PALE = '#e4dac6';

// ── THE TERRAIN ─────────────────────────────────────────────────────────
// KP's ⚛ stroke, this sitting: "like the grass of water and trees shades
// change around the areas of the regoin as well." So the land is LAND —
// meadow, wood, water, high stone — and the shade shifts from section to
// section within a province, the way ground does. Deterministic, so the map
// a vessel learns is the map they keep.
//
// Every band is muted to the vellum: this is a drawn map, not a satellite
// photograph, and the calm is the whole commission.

type Terrain = 'meadow' | 'wood' | 'water' | 'stone' | 'sand' | 'moor';

/** Each terrain's shades, light to deep — the variation "around the areas". */
const GROUND: Record<Terrain, string[]> = {
  meadow: ['#cfd6b2', '#c5cfa5', '#d6dcbc', '#c9d2ab'],
  wood: ['#aebb92', '#a3b186', '#b7c29d', '#9aa97c'],
  water: ['#b9cbd2', '#aec2cb', '#c4d3d9', '#a4bac4'],
  stone: ['#c9c3b4', '#bfb8a8', '#d2ccbe', '#b6ae9e'],
  sand: ['#e0d2b0', '#d9c9a4', '#e6dabb', '#d2c199'],
  moor: ['#c6bda8', '#bcb29b', '#cfc7b4', '#b3a891'],
};

/** What each realm's ground is made of. Dress, not truth — the street holds
 *  the routes; this only says what the land looks like. */
const TERRAIN_OF: Record<string, Terrain> = {
  'The Hearth': 'meadow',
  'The Stage & Studio': 'wood',
  'The Library': 'wood',
  'The Bazaar': 'sand',
  'The Bridge': 'water',
  'The Observatory': 'stone',
  'The Council': 'stone',
  'The Forge': 'moor',
  'The Nexus': 'moor',
  'The Realms': 'meadow',
};

/** A deterministic draw from a band — same ground, same shade, forever. */
function shadeOf(terrain: Terrain, col: number, row: number): string {
  const band = GROUND[terrain];
  let h = (col * 73856093) ^ (row * 19349663);
  h = (h ^ (h >>> 13)) >>> 0;
  return band[h % band.length];
}

function toPath(points: ReadonlyArray<{ x: number; y: number }>): string {
  if (points.length === 0) return '';
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ') + ' Z';
}

/** The little drawn marks a mapmaker puts on ground: trees, waves, hills,
 *  tufts. Two or three per section, placed by the same steady hash. */
function terrainMarks(terrain: Terrain, cx: number, cy: number, col: number, row: number) {
  let h = ((col * 374761393) ^ (row * 668265263)) >>> 0;
  const jitter = (n: number, spread: number) => {
    h = (h * 1664525 + 1013904223) >>> 0;
    return n + ((h % 1000) / 1000 - 0.5) * spread;
  };
  const marks: React.ReactElement[] = [];
  const count = terrain === 'water' ? 2 : 3;

  for (let i = 0; i < count; i++) {
    const x = jitter(cx, 74);
    const y = jitter(cy, 52);
    const key = `${col}-${row}-${i}`;
    if (terrain === 'wood') {
      // a little tree: a dark tuft over a short trunk
      marks.push(
        <g key={key} opacity={0.55}>
          <path d={`M${x},${y - 9} L${x - 5.5},${y + 2} L${x + 5.5},${y + 2} Z`} fill={INK} opacity={0.7} />
          <line x1={x} y1={y + 2} x2={x} y2={y + 6} stroke={INK} strokeWidth={1.2} />
        </g>
      );
    } else if (terrain === 'water') {
      marks.push(
        <path
          key={key}
          d={`M${x - 11},${y} q5.5,-4 11,0 q5.5,4 11,0`}
          fill="none"
          stroke={INK}
          strokeWidth={1.1}
          opacity={0.42}
        />
      );
    } else if (terrain === 'stone') {
      marks.push(
        <path
          key={key}
          d={`M${x - 9},${y + 4} L${x},${y - 7} L${x + 9},${y + 4}`}
          fill="none"
          stroke={INK}
          strokeWidth={1.3}
          opacity={0.5}
        />
      );
    } else if (terrain === 'sand') {
      marks.push(
        <path key={key} d={`M${x - 8},${y} q8,-3.5 16,0`} fill="none" stroke={INK} strokeWidth={1} opacity={0.32} />
      );
    } else {
      // meadow + moor: grass tufts
      marks.push(
        <g key={key} opacity={0.4}>
          <line x1={x} y1={y + 4} x2={x - 3.5} y2={y - 3} stroke={INK} strokeWidth={1.1} />
          <line x1={x} y1={y + 4} x2={x} y2={y - 5} stroke={INK} strokeWidth={1.1} />
          <line x1={x} y1={y + 4} x2={x + 3.5} y2={y - 3} stroke={INK} strokeWidth={1.1} />
        </g>
      );
    }
  }
  return marks;
}

export interface LearscailProps {
  /** Called when the vessel walks through a door — the caller folds the map. */
  onTravel?: () => void;
  className?: string;
}

export default function Learscail({ onTravel, className }: LearscailProps) {
  const pathname = usePathname();
  const { discovered, ready } = useDiscovery();
  const [asWords, setAsWords] = useState(false);

  // The land itself — surveyed once from the street, never per-render.
  const formula = useMemo(
    () =>
      surveyMappa(
        THE_STREET.map((realm) => ({
          group: realm.name,
          sections: realm.rooms.length,
          alwaysOpen: realm.alwaysOpen === true,
        })),
        { seed: 1811, wander: 0.24 }
      ),
    []
  );

  const mappa: Mappa = useMemo(
    () => ({ mappa: 1, formula, discovered }),
    [formula, discovered]
  );

  const opened = useMemo(() => unfurl(mappa, { width: 1200, height: 800 }), [mappa]);

  // KP's ⚛ stroke: the paper matches the realm the vessel is within. The
  // wash is a CSS background-image the reimagining already emits per realm.
  const paper = useMemo(() => quickResolveAffect(pathname || '/').wash, [pathname]);
  const here = realmOfPath(pathname || '/');

  const realmByName = useMemo(
    () => new Map(THE_STREET.map((r) => [r.name, r])),
    []
  );

  return (
    <div className={cn('flex flex-col', className)}>
      {/* The two lenses — the map, and the same landscape in words. Neither
          is the admission ticket (law VIII, the blending principle). */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs text-star-dust/50">
          {here ? `You are in ${here.name}.` : 'You are on the street.'}
        </p>
        <button
          type="button"
          onClick={() => setAsWords((w) => !w)}
          className="flex items-center gap-1.5 rounded border border-star-dust/20 px-2.5 py-1 text-xs text-star-dust/70 transition-colors hover:border-star-dust/40 focus-visible:border-star-dust/40 motion-reduce:transition-none"
        >
          {asWords ? <MapIcon className="h-3.5 w-3.5" aria-hidden="true" /> : <List className="h-3.5 w-3.5" aria-hidden="true" />}
          {asWords ? 'Show the map' : 'Show the list'}
        </button>
      </div>

      {asWords ? (
        <PlainLens mappa={mappa} onTravel={onTravel} />
      ) : (
        <div
          className="relative flex-1 overflow-hidden rounded-lg border border-star-dust/15"
          style={{ backgroundImage: paper }}
        >
          {/* The vellum over the realm's own light — the paper catches the
              room. Ambient strength: weather, never wallpaper. */}
          <svg
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid meet"
            role="group"
            aria-label="The Sanctuary, drawn as land"
            className="h-full w-full"
          >
            <rect x="0" y="0" width="1200" height="800" fill={VELLUM} opacity="0.88" />

            {/* The wild ground — cells no realm holds. Honest borderland,
                never a hole (the water calls these the marches). */}
            {opened.marches.map((march) => (
              <path
                key={`march-${march.section}`}
                d={toPath(march.polygon)}
                fill={VELLUM_PALE}
                stroke={INK_SOFT}
                strokeWidth={0.6}
                strokeDasharray="3 5"
                opacity={0.5}
              />
            ))}

            {opened.provinces.map((province) => {
              const realm = realmByName.get(province.group);
              const known = ready && isDiscovered(mappa, province.group);
              const d = toPath(province.outline);
              const standing = here?.name === province.group;

              // UNDISCOVERED: the shape stands, drawn and unnamed. Not a
              // hole, not a lock icon, not a percentage. Waiting, not missing.
              // No terrain either — unknown land is unknown, honestly blank.
              if (!known) {
                return (
                  <g key={province.group}>
                    <title>Unnamed ground — waiting, not missing.</title>
                    <path
                      d={d}
                      fill={VELLUM_PALE}
                      stroke={INK_SOFT}
                      strokeWidth={1.2}
                      opacity={0.55}
                    />
                  </g>
                );
              }

              // DISCOVERED: land drawn as land, named, walkable — forever.
              const terrain = TERRAIN_OF[province.group] ?? 'meadow';
              return (
                <Link
                  key={province.group}
                  href={realm?.href ?? '/'}
                  onClick={onTravel}
                  aria-label={
                    standing
                      ? `${province.group} — ${realm?.whisper ?? ''}. You are here.`
                      : `${province.group} — ${realm?.whisper ?? 'walk here'}`
                  }
                  aria-current={standing ? 'page' : undefined}
                  className="group outline-none"
                >
                  <title>
                    {standing
                      ? `${province.group} — you are here`
                      : `${province.group} — ${realm?.whisper ?? ''}`}
                  </title>

                  {/* The ground, section by section — the shade shifts across
                      the region the way real ground does (KP's ⚛ stroke). */}
                  {province.sections.map((section) => (
                    <path
                      key={section.section}
                      d={toPath(section.polygon)}
                      fill={shadeOf(terrain, section.col, section.row)}
                    />
                  ))}

                  {/* The mapmaker's marks: trees, waves, hills, tufts. */}
                  {province.sections.map((section) =>
                    terrainMarks(terrain, section.center.x, section.center.y, section.col, section.row)
                  )}

                  {/* The coastline, inked over its own ground. Where the
                      vessel stands, the line is drawn heavier — "you are
                      here" as emphasis, never as a badge or a pin. */}
                  <path
                    d={d}
                    fill="transparent"
                    stroke={INK}
                    strokeWidth={standing ? 3.4 : 1.8}
                    className="transition-[fill] duration-200 [fill:transparent] group-hover:[fill:rgba(58,47,38,0.10)] group-focus-visible:[fill:rgba(58,47,38,0.14)] motion-reduce:transition-none"
                  />

                  <text
                    x={province.center.x}
                    y={province.center.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={INK}
                    fontSize={standing ? 21 : 19}
                    fontWeight={600}
                    style={{ letterSpacing: '0.02em', paintOrder: 'stroke' }}
                    stroke={VELLUM}
                    strokeWidth={4}
                  >
                    {province.group}
                  </text>

                  {standing && (
                    <text
                      x={province.center.x}
                      y={province.center.y + 20}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={INK_SOFT}
                      fontSize={12}
                      style={{ letterSpacing: '0.08em', paintOrder: 'stroke' }}
                      stroke={VELLUM}
                      strokeWidth={3.5}
                    >
                      you are here
                    </text>
                  )}
                </Link>
              );
            })}
          </svg>
        </div>
      )}

      {/* The one sentence that explains the unnamed ground, so nobody has to
          wonder whether something is broken or withheld. */}
      <p className="mt-3 text-xs text-star-dust/40">
        Ground you have walked is named. The rest is drawn but unnamed — it is
        waiting, not missing, and nothing is required of you to find it.
      </p>
    </div>
  );
}

/** The same landscape, told in words — always one tap away. */
function PlainLens({ mappa, onTravel }: { mappa: Mappa; onTravel?: () => void }) {
  const { ready } = useDiscovery();
  return (
    <ul className="grid flex-1 auto-rows-min grid-cols-1 gap-2 overflow-y-auto sm:grid-cols-2">
      {THE_STREET.map((realm) => {
        const known = ready && isDiscovered(mappa, realm.name);
        if (!known) {
          return (
            <li
              key={realm.name}
              className="rounded border border-dashed border-star-dust/15 px-3 py-2 text-sm text-star-dust/40"
            >
              Unnamed ground — waiting, not missing.
            </li>
          );
        }
        return (
          <li key={realm.name}>
            <Link
              href={realm.href}
              onClick={onTravel}
              className="block rounded border border-star-dust/15 px-3 py-2 transition-colors hover:border-star-dust/35 focus-visible:border-star-dust/35 motion-reduce:transition-none"
            >
              <span className="text-sm text-star-dust">{realm.name}</span>
              <span className="block text-xs text-star-dust/40">{realm.whisper}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
