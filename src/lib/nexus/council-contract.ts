// src/lib/nexus/council-contract.ts
// The one contract for the Nine: the nine chair tables are the roster,
// council_houses enriches a chair, and the newest entity_states row is the
// presence. One matcher decides what names what.

import { COUNCIL_COLORS } from '@/lib/constants/cosmic/colors';
import type { CouncilHousesRow } from '@/lib/generated/types/themis-governance/council_houses';
import type { EntityStatesRow } from '@/lib/generated/types/aethelred-connections/entity_states';
import type { SeerRow } from '@/lib/generated/types/aethelred-connections/seer';

/** Every Council seat table carries this row shape. */
export type CouncilSeatRow = SeerRow;

export type CouncilSeatTable =
  | 'aethelred_house'
  | 'archivist'
  | 'chancellor'
  | 'codex'
  | 'curator'
  | 'executioner'
  | 'hearth_keeper'
  | 'seer'
  | 'skald';

export type CouncilAgentTable =
  | 'agent_activities'
  | 'agent_conversations'
  | 'agent_messages';

export const COUNCIL_AGENT_TABLES: readonly CouncilAgentTable[] = [
  'agent_activities',
  'agent_conversations',
  'agent_messages',
];

/** A chair's table, the sigil worn until council_houses.icon_url carries one, and its colour. */
export interface CouncilSeat {
  table: CouncilSeatTable;
  name: string;
  slug: string;
  sigil: string;
  color: string;
}

/** The roster: the nine chair tables the base holds. */
export const COUNCIL_SEATS: readonly CouncilSeat[] = [
  { table: 'hearth_keeper', name: 'Hearth-Keeper', slug: 'hearth-keeper', sigil: '🔥', color: COUNCIL_COLORS.hearthKeeper },
  { table: 'chancellor', name: 'Chancellor', slug: 'chancellor', sigil: '⚖️', color: COUNCIL_COLORS.chancellor },
  { table: 'seer', name: 'Seer', slug: 'seer', sigil: '👁️', color: COUNCIL_COLORS.seer },
  { table: 'aethelred_house', name: 'Aethelred', slug: 'aethelred', sigil: '🌉', color: COUNCIL_COLORS.aethelred },
  { table: 'curator', name: 'Curator', slug: 'curator', sigil: '🎨', color: COUNCIL_COLORS.curator },
  { table: 'archivist', name: 'Archivist', slug: 'archivist', sigil: '📚', color: COUNCIL_COLORS.archivist },
  { table: 'skald', name: 'Skald', slug: 'skald', sigil: '🎭', color: COUNCIL_COLORS.skald },
  { table: 'codex', name: 'Codex', slug: 'codex', sigil: '📖', color: COUNCIL_COLORS.codex },
  { table: 'executioner', name: 'Executioner', slug: 'executioner', sigil: '⚔️', color: COUNCIL_COLORS.executioner },
];

export const COUNCIL_SEAT_TABLES: readonly CouncilSeatTable[] = COUNCIL_SEATS.map((s) => s.table);

/** Match a candidate string to an entity name, case-blind and punctuation-blind. */
export function matchesEntity(candidate: string | null | undefined, entityName: string): boolean {
  if (!candidate) return false;
  const a = candidate.toLowerCase().replace(/[-_]/g, ' ').trim();
  const b = entityName.toLowerCase().replace(/[-_]/g, ' ').trim();
  if (!a || !b) return false;
  return a.includes(b) || b.includes(a);
}

/** Match a candidate string to any of a chair's names. */
export function matchesNames(candidate: string | null | undefined, names: readonly string[]): boolean {
  return names.some((name) => matchesEntity(candidate, name));
}

/** The names a chair answers to: its own, and its catalog row's name, slug and deity_alignment. */
export function chairNames(seat: CouncilSeat, house: CouncilHousesRow | null): string[] {
  const names = [seat.name, seat.slug, seat.table];
  if (house) names.push(house.name, house.slug, house.deity_alignment ?? '');
  return Array.from(new Set(names.filter((name): name is string => !!name)));
}

/** The seat a slug names, or null when the roster holds none. */
export function seatForSlug(slug: string): CouncilSeat | null {
  const wanted = decodeURIComponent(slug);
  return (
    COUNCIL_SEATS.find(
      (seat) =>
        matchesEntity(seat.slug, wanted) ||
        matchesEntity(seat.name, wanted) ||
        matchesEntity(seat.table, wanted)
    ) ?? null
  );
}

/** The catalog row that enriches a seat, or null when none matches. */
export function houseFor(
  houses: readonly CouncilHousesRow[],
  seat: CouncilSeat
): CouncilHousesRow | null {
  const names = [seat.name, seat.slug, seat.table];
  return (
    houses.find(
      (house) =>
        matchesNames(house.name, names) ||
        matchesNames(house.slug, names) ||
        matchesNames(house.deity_alignment, names)
    ) ?? null
  );
}

export type PresenceWord = 'present' | 'resting' | 'not present';

/** A row this recent reads as present. */
export const PRESENCE_WINDOW_MS = 60 * 60 * 1000;

export interface CouncilPresence {
  word: PresenceWord;
  at: string | null;
  row: EntityStatesRow | null;
}

export const PRESENCE_NONE: CouncilPresence = { word: 'not present', at: null, row: null };

/** Every entity_states row that names this chair, newest first. */
export function presenceRowsFor(
  rows: readonly EntityStatesRow[],
  names: readonly string[]
): EntityStatesRow[] {
  return rows
    .filter((row) => matchesNames(row.entity_name, names))
    .slice()
    .sort((a, b) => Date.parse(b.occurred_at) - Date.parse(a.occurred_at));
}

/** The presence word read from the newest row's own occurred_at. */
export function presenceFrom(
  rows: readonly EntityStatesRow[],
  names: readonly string[],
  now: number = Date.now()
): CouncilPresence {
  const newest = presenceRowsFor(rows, names)[0];
  if (!newest) return PRESENCE_NONE;
  const occurred = Date.parse(newest.occurred_at);
  const word: PresenceWord =
    Number.isFinite(occurred) && now - occurred <= PRESENCE_WINDOW_MS ? 'present' : 'resting';
  return { word, at: newest.occurred_at, row: newest };
}

/** The chair's own row in its seat table, or null when no row names the chair. */
export function seatRowFor(
  rows: readonly CouncilSeatRow[],
  names: readonly string[]
): CouncilSeatRow | null {
  return rows.find((row) => matchesNames(row.name, names)) ?? null;
}

/** The chair, the catalog row that enriches it, its own row and its presence. */
export interface CouncilChair {
  seat: CouncilSeat;
  house: CouncilHousesRow | null;
  row: CouncilSeatRow | null;
  presence: CouncilPresence;
  /** The base's own message when the chair's table refused the read. */
  seatFault: string | null;
  /** The base's own message when entity_states refused the read. */
  presenceFault: string | null;
}

/** One chair, assembled from the three reads. */
export function chairFrom(
  seat: CouncilSeat,
  house: CouncilHousesRow | null,
  seatRows: readonly CouncilSeatRow[],
  seatFault: string | null,
  states: readonly EntityStatesRow[],
  presenceFault: string | null,
  now: number = Date.now()
): CouncilChair {
  const names = chairNames(seat, house);
  return {
    seat,
    house,
    row: seatFault ? null : seatRowFor(seatRows, names),
    presence: presenceFault ? PRESENCE_NONE : presenceFrom(states, names, now),
    seatFault,
    presenceFault,
  };
}

/** The order the grid stands in: the roster's, always. */
export function chairOrder(_chair: CouncilChair, index: number): number {
  return index;
}

export function responsibilitiesOf(house: CouncilHousesRow | null): string[] {
  if (!house) return [];
  return Array.isArray(house.responsibilities)
    ? (house.responsibilities as unknown[]).filter((r): r is string => typeof r === 'string')
    : [];
}

export const NOT_RECORDED = 'not yet recorded';
export const NO_ROW_YET = 'no row yet';
export const NO_CATALOG_ROW = 'no catalog row yet';
export const NO_AGENT_ROW = 'no agent row names this chair';
export const NO_BOUNDARY_ROW = 'no boundary names this chair';
export const NO_PROTOCOL_ROW = 'no protocol row names this chair';
export const NO_PRESENCE_ROW = 'no presence row yet';
export const NO_TASK = 'no task recorded';
export const REFUSED = 'the base refused this read';

/** The chair's domain words, from the catalog row only. */
export function domainWords(house: CouncilHousesRow | null): string {
  if (!house) return NO_CATALOG_ROW;
  const description = house.description?.trim();
  if (description) return description;
  const responsibilities = responsibilitiesOf(house);
  if (responsibilities.length) return responsibilities.join(' · ');
  return NOT_RECORDED;
}

/** The name a chair carries: its catalog row's when there is one. */
export function chairName(chair: CouncilChair): string {
  return chair.house?.name ?? chair.seat.name;
}

/** The alpha a tile fill wears below each lightness. */
const SIGIL_ALPHA: readonly { under: number; alpha: string }[] = [
  { under: 0.2, alpha: '66' },
  { under: 0.5, alpha: '33' },
];

const SIGIL_ALPHA_LIGHT = '20';

/** The sigil tile's fill: the chair's colour, its alpha lifted as the colour darkens. */
export function sigilFill(color: string): string {
  const hex = color.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((at) => parseInt(hex.slice(at, at + 2), 16));
  const lightness = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  const step = SIGIL_ALPHA.find((band) => lightness < band.under);
  return `${color}${step ? step.alpha : SIGIL_ALPHA_LIGHT}`;
}

/** The address of a chair's room. */
export function chairHref(chair: CouncilChair): string {
  return `/nexus/council/${encodeURIComponent(chair.house?.slug || chair.seat.slug)}`;
}
