// .journals/proofs/03-hermes/build/2026-09-02-the-seal-on-every-ware.proof.ts
//
// A small, real proof that a drawn the-sphragis licence parses through
// src/lib/wares/sphragis.ts — the hand-written reader the ware page uses —
// exactly the way it would once the sphragis column lands on a live
// public.wares row (20260902_the_seal_on_every_ware.sql).
//
// Run: npx tsx .journals/proofs/03-hermes/build/2026-09-02-the-seal-on-every-ware.proof.ts
//
// Nothing here touches Supabase. `ware` below is a plain object standing in
// for a fetched row — the shape sphragisOf() actually reads.

import { draw, HOUSE_SPLIT, type Sphragis } from '../../../../src/lib/sphragis';
import { sphragisOf, isSphragis } from '../../../../src/lib/wares/sphragis';

let ok = 0;
let total = 0;
function check(name: string, pass: boolean) {
  total += 1;
  if (pass) { ok += 1; console.log(`  TRUE  ${name}`); }
  else console.log(`  FALSE ${name}`);
}

console.log('THE SEAL ON EVERY WARE — proof\n');

// 1 · a real ware row, shaped as the-books-as-digital-wares.sql draws them,
//     carrying a drawn licence in its (new) sphragis column.
const licence: Sphragis = draw({
  ergon: { id: 'the-poems', name: 'The Poems', kind: 'ware' },
  holder: 'KP, the Quantum Weaver',
  split: HOUSE_SPLIT,
  permits: {
    'artist-to-platform': ['host', 'sell', 'administer-licensing'],
    'platform-to-listener': ['read'],
    'artist-to-buyer': ['download'],
  },
  collaborators: {
    of: 'artist-share',
    parts: [
      { who: { name: 'KP, the Quantum Weaver' }, role: 'author', points: 10000 },
    ],
  },
});

const wareRowSealed = {
  id: 'w1', slug: 'the-poems', name: 'The Poems', status: 'draft',
  sphragis: licence,
};

const wareRowUnsealed = {
  id: 'w2', slug: 'the-lyrics', name: 'The Lyrics', status: 'draft',
  sphragis: null,
};

const wareRowBeforeThisColumn = {
  id: 'w3', slug: 'the-philosophies', name: 'The Philosophies', status: 'draft',
  // no sphragis key at all — a row fetched before the migration ran
};

const wareRowJsonString = {
  id: 'w4', slug: 'the-poems-json', name: 'The Poems (json)', status: 'draft',
  sphragis: JSON.stringify(licence),
};

const wareRowMalformed = {
  id: 'w5', slug: 'malformed', name: 'Malformed', status: 'draft',
  sphragis: { not: 'a sphragis' },
};

// 2 · sphragisOf reads each defensively
const read1 = sphragisOf(wareRowSealed);
check('a drawn Sphragis parses through sphragisOf()', read1 !== null);
check('the parsed document carries all three grants', !!read1 && read1.grants.length === 3);
check('the parsed document carries the LAWYER_GATE in flagged', !!read1 && read1.flagged.some((f) => f.includes('LAWYER GATE') || f.toLowerCase().includes('lawyer')));
check('the parsed document carries collaborators as columns', !!read1?.collaborators && read1.collaborators.parts.length === 1);
check('isSphragis() agrees the read document is well-formed', !!read1 && isSphragis(read1));

check('a null sphragis reads back as null, not thrown', sphragisOf(wareRowUnsealed) === null);
check('an absent sphragis column reads back as null (pre-migration row)', sphragisOf(wareRowBeforeThisColumn) === null);
check('a JSON-string sphragis (unparsed jsonb) still parses', sphragisOf(wareRowJsonString) !== null);
check('a malformed sphragis value reads back as null, never thrown', sphragisOf(wareRowMalformed) === null);
check('sphragisOf(null) is null, never thrown', sphragisOf(null) === null);
check('sphragisOf(undefined) is null, never thrown', sphragisOf(undefined) === null);

// 3 · canonical() proves identical terms parse identically every time —
//     the law the tool states, checked here through the site's own mirror.
const twin = draw({
  ergon: { id: 'the-poems', name: 'The Poems', kind: 'ware' },
  holder: 'KP, the Quantum Weaver',
  split: HOUSE_SPLIT,
  permits: {
    'artist-to-platform': ['administer-licensing', 'sell', 'host'], // same set, different order
    'platform-to-listener': ['read'],
    'artist-to-buyer': ['download'],
  },
  collaborators: {
    of: 'artist-share',
    parts: [
      { who: { name: 'KP, the Quantum Weaver' }, role: 'author', points: 10000 },
    ],
  },
});
const twinRead = sphragisOf({ id: 'w6', sphragis: twin });
check('two declarations of the same terms produce byte-identical rendered documents through this reader', JSON.stringify(read1) === JSON.stringify(twinRead));

console.log(`\n${ok}/${total} TRUE`);
if (ok !== total) process.exit(1);
