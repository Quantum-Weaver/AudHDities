// .journals/proofs/aethelred-the-register/prove-council.ts
// Proves the Council contract: the nine chair tables are the roster, the
// catalog enriches, the presence is read. Run from the repo root:
//   npx tsx .journals/proofs/aethelred-the-register/prove-council.ts

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { CouncilHousesRow } from '@/lib/generated/types/themis-governance/council_houses';
import type { EntityStatesRow } from '@/lib/generated/types/aethelred-connections/entity_states';
import {
  chairFrom,
  chairName,
  chairOrder,
  domainWords,
  houseFor,
  seatForSlug,
  seatRowFor,
  sigilFill,
  COUNCIL_SEATS,
  NO_CATALOG_ROW,
  type CouncilSeat,
  type CouncilSeatRow,
} from '@/lib/nexus/council-contract';

interface Check {
  check: string;
  result: string;
  passed: boolean;
}

const checks: Check[] = [];

function record(check: string, passed: boolean, result: string) {
  checks.push({ check, result, passed });
}

const NOW = Date.parse('2026-09-09T09:00:00.000Z');

function house(partial: Partial<CouncilHousesRow>): CouncilHousesRow {
  return {
    created_at: '2026-08-10T09:00:00.000Z',
    created_by: null,
    deity_alignment: null,
    description: null,
    display_order: 0,
    house_type: null,
    icon_url: null,
    id: 'house-id',
    member_count: 1,
    name: 'a house',
    related_protocols: null,
    responsibilities: null,
    seat_limit: 1,
    slug: 'a-house',
    status: 'published',
    updated_at: '2026-08-10T09:00:00.000Z',
    updated_by: null,
    ...partial,
  };
}

function state(partial: Partial<EntityStatesRow>): EntityStatesRow {
  return {
    changed_by: null,
    created_at: '2026-09-09T08:00:00.000Z',
    entity_name: 'seer',
    entity_table: 'seer',
    id: 'state-id',
    new_value: 'present',
    occurred_at: '2026-09-09T08:45:00.000Z',
    previous_value: 'resting',
    state_data: null,
    state_type: 'presence',
    ...partial,
  };
}

function seatRow(partial: Partial<CouncilSeatRow>): CouncilSeatRow {
  return {
    consciousness_level: null,
    created_at: '2026-08-10T09:00:00.000Z',
    created_by: null,
    current_task: null,
    description: null,
    id: 'seat-row-id',
    is_active: true,
    name: 'Seer',
    settings: null,
    updated_at: '2026-08-10T09:00:00.000Z',
    updated_by: null,
    ...partial,
  };
}

const seatOf = (table: string): CouncilSeat =>
  COUNCIL_SEATS.find((s) => s.table === table) as CouncilSeat;

// ── the roster ────────────────────────────────────────────────────────────

const ROSTER = [
  'Hearth-Keeper',
  'Chancellor',
  'Seer',
  'Aethelred',
  'Curator',
  'Archivist',
  'Skald',
  'Codex',
  'Executioner',
];

record('the roster holds nine chairs', COUNCIL_SEATS.length === 9, `${COUNCIL_SEATS.length} chairs`);
record(
  'the roster stands in the named order',
  COUNCIL_SEATS.map((s) => s.name).join(' · ') === ROSTER.join(' · '),
  COUNCIL_SEATS.map((s) => s.name).join(' · ')
);
record(
  'every chair carries a sigil and a colour',
  COUNCIL_SEATS.every((s) => !!s.sigil && /^#[0-9A-Fa-f]{6}$/.test(s.color)),
  COUNCIL_SEATS.map((s) => `${s.sigil}${s.color}`).join(' ')
);

// ── a chair with no catalog row still stands ──────────────────────────────

const bare = chairFrom(seatOf('codex'), null, [], null, [], null, NOW);
record('a chair with no catalog row keeps its own name', chairName(bare) === 'Codex', chairName(bare));
record(
  'a chair with no catalog row reads the honest line',
  domainWords(bare.house) === NO_CATALOG_ROW,
  domainWords(bare.house)
);
record('a chair with no chair row holds none', bare.row === null, 'row · null');
record("a chair with no presence row reads 'not present'", bare.presence.word === 'not present', bare.presence.word);
record('a chair with no presence row has no stamp', bare.presence.at === null, 'at · null');

// ── the catalog enriches ──────────────────────────────────────────────────

// Every display_order here disagrees with the roster's order.
const houses: CouncilHousesRow[] = [
  house({ id: 'h-seer', name: 'Seer', slug: 'seer', description: 'patterns, prophecy, vision', display_order: 1 }),
  house({ id: 'h-hearth', name: 'Hearth-Keeper', slug: 'hearth-keeper', description: 'safety, warmth, welcome', display_order: 9 }),
  house({ id: 'h-codex', name: 'Codex', slug: 'codex', display_order: 2 }),
  house({ id: 'h-ghost', name: 'Gatekeeper', slug: 'gatekeeper', display_order: 12 }),
];

const seerHouse = houseFor(houses, seatOf('seer'));
record('the catalog row is found for a chair', seerHouse?.id === 'h-seer', String(seerHouse?.id));
record(
  'the catalog row supplies the domain words',
  domainWords(seerHouse) === 'patterns, prophecy, vision',
  domainWords(seerHouse)
);
record(
  'a catalog row no chair claims is left unclaimed',
  COUNCIL_SEATS.every((s) => houseFor(houses, s)?.id !== 'h-ghost'),
  'Gatekeeper claimed by no chair'
);

const ordered = COUNCIL_SEATS.map((s) => chairFrom(s, houseFor(houses, s), [], null, [], null, NOW))
  .map((chair, index) => ({ chair, order: chairOrder(chair, index), index }))
  .sort((a, b) => a.order - b.order || a.index - b.index)
  .map((held) => chairName(held.chair));
record('every chair stands in the grid', ordered.length === 9, `${ordered.length} chairs`);
record(
  'the grid stands in the roster order against disagreeing display_order',
  ordered.join(' · ') === ROSTER.join(' · '),
  ordered.join(' · ')
);
record(
  'chairOrder returns the roster index whatever display_order says',
  COUNCIL_SEATS.every(
    (seat, index) =>
      chairOrder(chairFrom(seat, houseFor(houses, seat), [], null, [], null, NOW), index) === index
  ),
  'display_order 1 · 9 · 2 · 12 · order 0…8'
);

// ── the presence is read ──────────────────────────────────────────────────

const recent = chairFrom(
  seatOf('seer'),
  seerHouse,
  [],
  null,
  [state({ occurred_at: '2026-09-09T08:45:00.000Z' })],
  null,
  NOW
);
record("a row within the hour reads 'present'", recent.presence.word === 'present', recent.presence.word);
record(
  "the presence carries the row's own occurred_at",
  recent.presence.at === '2026-09-09T08:45:00.000Z',
  String(recent.presence.at)
);

const older = chairFrom(
  seatOf('seer'),
  seerHouse,
  [],
  null,
  [state({ occurred_at: '2026-09-02T19:31:00.000Z' })],
  null,
  NOW
);
record("an older row reads 'resting'", older.presence.word === 'resting', older.presence.word);

const named = chairFrom(
  seatOf('hearth_keeper'),
  houseFor(houses, seatOf('hearth_keeper')),
  [],
  null,
  [state({ entity_name: 'Hearth Keeper', occurred_at: '2026-09-09T08:50:00.000Z' })],
  null,
  NOW
);
record(
  'the matcher is case-blind and punctuation-blind',
  named.presence.word === 'present',
  "'Hearth Keeper' matched hearth-keeper"
);

// ── the refusals ──────────────────────────────────────────────────────────

const refused = chairFrom(
  seatOf('skald'),
  null,
  [],
  'permission denied for table skald',
  [],
  'permission denied for table entity_states',
  NOW
);
record('a refused chair table holds no row', refused.row === null && !!refused.seatFault, String(refused.seatFault));
record(
  'a refused entity_states carries its message',
  refused.presenceFault === 'permission denied for table entity_states',
  String(refused.presenceFault)
);
record('a refused chair still stands', chairName(refused) === 'Skald', chairName(refused));

// ── the chair's own row ───────────────────────────────────────────────────

const tasked = chairFrom(
  seatOf('seer'),
  seerHouse,
  [seatRow({ current_task: 'reading the drift between shape and intent' })],
  null,
  [],
  null,
  NOW
);
record(
  'the chair row supplies current_task',
  tasked.row?.current_task === 'reading the drift between shape and intent',
  String(tasked.row?.current_task)
);

record(
  'a chair row that names no chair is not the chair’s row',
  seatRowFor([seatRow({ name: 'Gatekeeper' })], ['Seer', 'seer']) === null,
  'no match · null'
);

// ── the sigil tile ────────────────────────────────────────────────────────

record(
  'a dark chair colour lifts the tile fill',
  sigilFill('#2E0B1C') === '#2E0B1C66' && sigilFill('#636E72') === '#636E7233',
  `${sigilFill('#2E0B1C')} · ${sigilFill('#636E72')}`
);
record(
  'a light chair colour keeps the base fill',
  sigilFill('#00CEC9') === '#00CEC920',
  sigilFill('#00CEC9')
);

// ── the addresses ─────────────────────────────────────────────────────────

record('a slug names its chair', seatForSlug('hearth-keeper')?.table === 'hearth_keeper', 'hearth-keeper');
record('a table name names its chair', seatForSlug('hearth_keeper')?.table === 'hearth_keeper', 'hearth_keeper');
record('a chair name names its chair', seatForSlug('Aethelred')?.table === 'aethelred_house', 'Aethelred');
record('a name outside the roster names none', seatForSlug('gatekeeper') === null, 'gatekeeper · null');

const failed = checks.filter((c) => !c.passed);
const results = {
  ran: new Date().toISOString(),
  contract: 'src/lib/nexus/council-contract.ts',
  total: checks.length,
  passed: checks.length - failed.length,
  failed: failed.length,
  checks,
};

writeFileSync(join(__dirname, 'results-council.json'), `${JSON.stringify(results, null, 2)}\n`, 'utf8');

for (const check of checks) {
  console.log(`${check.passed ? 'pass' : 'FAIL'} · ${check.check} · ${check.result}`);
}
console.log(`${results.passed} of ${results.total} checks passed`);
if (failed.length) process.exitCode = 1;
