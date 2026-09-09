// .journals/proofs/bifrost-the-street-tree/prove-street-tree.ts
// Proves the street tree: the grouping, the open realm, the discovery mark,
// the addresses, and the kept map-or-words choice. Run from the repo root:
//   npx tsx .journals/proofs/bifrost-the-street-tree/prove-street-tree.ts

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import StreetTree, {
  openRealms,
  streetRows,
} from '@/components/bifrost/StreetTree';
import {
  ASWORDS_SHELF,
  readAsWords,
  writeAsWords,
  type WordsShelf,
} from '@/components/seidr/immersive/Learscail';
import { THE_STREET } from '@/lib/constants/systems/the-street';

interface Check {
  check: string;
  result: string;
  passed: boolean;
}

const checks: Check[] = [];

function record(check: string, passed: boolean, result: string) {
  checks.push({ check, result, passed });
}

// ── the fixtures ──────────────────────────────────────────────────────────

/** A shelf held in memory — no window, no disk. */
function fakeShelf(): WordsShelf & { held: Map<string, string> } {
  const held = new Map<string, string>();
  return {
    held,
    getItem: (key: string) => held.get(key) ?? null,
    setItem: (key: string, value: string) => {
      held.set(key, value);
    },
  };
}

const WALKED = ['The Library', 'The Bazaar'];
const ROOM_HREFS = THE_STREET.flatMap((realm) => realm.rooms.map((room) => room.href));

// ── the grouping ──────────────────────────────────────────────────────────

const rows = streetRows('/library/quests', WALKED, true);

record('every realm of the street stands as a row', rows.length === THE_STREET.length, `${rows.length} realms`);
record(
  'the rows stand in the street order',
  rows.every((row, i) => row.realm.name === THE_STREET[i].name),
  rows.map((row) => row.realm.name).join(' · ')
);

const grouped = rows.flatMap((row) => row.realm.rooms.map((room) => `${row.realm.name}|${room.href}`));
record('every room is grouped under its realm, none lost', grouped.length === 55 && ROOM_HREFS.length === 55, `${grouped.length} of ${ROOM_HREFS.length} rooms`);
record(
  'each room is grouped under the realm that holds it',
  grouped.every((pair) => {
    const [name, href] = pair.split('|');
    const realm = THE_STREET.find((r) => r.name === name);
    return realm?.rooms.some((room) => room.href === href) === true;
  }),
  `${new Set(grouped).size} distinct pairs`
);

// ── the open realm ────────────────────────────────────────────────────────

record('the realm the path stands in is the one open', openRealms(rows).join(' · ') === 'The Library', openRealms(rows).join(' · ') || 'none');
record('no other realm is open', openRealms(rows).length === 1, `${openRealms(rows).length} open`);
record(
  'a path off the street opens nothing',
  openRealms(streetRows('/nowhere-on-the-street', WALKED, true)).length === 0,
  '0 open'
);
record(
  'a deeper path opens the realm that holds the longer room',
  openRealms(streetRows('/vessel/journal', WALKED, true)).join(' · ') === 'The Hearth',
  openRealms(streetRows('/vessel/journal', WALKED, true)).join(' · ') || 'none'
);

// ── the discovery mark ────────────────────────────────────────────────────

const byName = new Map(rows.map((row) => [row.realm.name, row]));

record('a walked realm carries the walked mark', byName.get('The Library')?.walked === true, 'The Library · walked');
record('a second walked realm carries it too', byName.get('The Bazaar')?.walked === true, 'The Bazaar · walked');
record('an unwalked realm carries the not-yet mark', byName.get('The Forge')?.walked === false, 'The Forge · not yet walked');
record(
  'the always-open realm is walked without discovery',
  byName.get('The Hearth')?.walked === true,
  'The Hearth · walked'
);
record(
  'the mark follows the set exactly',
  rows.every((row) => row.walked === (WALKED.includes(row.realm.name) || row.realm.alwaysOpen === true)),
  `${rows.filter((row) => row.walked).length} of ${rows.length} marked walked`
);
record(
  'no mark stands before the shelf is read',
  streetRows('/library', WALKED, false).every((row) => row.walked === null),
  'walked · null on every realm'
);
record(
  'every realm is named whether walked or not',
  streetRows('/library', [], false).every((row) => row.realm.name.length > 0),
  `${THE_STREET.length} names`
);

// ── the addresses, rendered ───────────────────────────────────────────────

const markup = renderToStaticMarkup(React.createElement(StreetTree, {}));
const rendered = [...markup.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);

record(
  'every rendered door is a room of the street',
  rendered.length > 0 && rendered.every((href) => ROOM_HREFS.includes(href)),
  `${rendered.length} doors`
);
record(
  'the open realm renders its own rooms',
  THE_STREET[0].rooms.every((room) => rendered.includes(room.href)),
  `${THE_STREET[0].name} · ${THE_STREET[0].rooms.length} rooms`
);
record(
  'a folded realm renders no door',
  THE_STREET[2].rooms.every((room) => !rendered.includes(room.href)),
  `${THE_STREET[2].name} · 0 doors`
);
/** A name as static markup carries it. */
const asMarkup = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

record(
  'every realm is named in the markup',
  THE_STREET.every((realm) => markup.includes(asMarkup(realm.name))),
  `${THE_STREET.length} names`
);
record(
  'every door carries a 44px hit target',
  (markup.match(/min-h-11/g) ?? []).length >= THE_STREET[0].rooms.length,
  `${(markup.match(/min-h-11/g) ?? []).length} rows at min-h-11`
);

// ── the kept choice ───────────────────────────────────────────────────────

const shelf = fakeShelf();

record('no choice on an empty shelf reads as the drawing', readAsWords(shelf) === false, 'false');
writeAsWords(true, shelf);
record('the words choice round-trips', readAsWords(shelf) === true, 'true');
record('the choice is kept under its own key', shelf.held.get(ASWORDS_SHELF) === 'true', `${ASWORDS_SHELF} = ${shelf.held.get(ASWORDS_SHELF)}`);
writeAsWords(false, shelf);
record('the drawing choice round-trips', readAsWords(shelf) === false, 'false');

const lockedShelf: WordsShelf = {
  getItem: () => {
    throw new Error('the shelf is locked');
  },
  setItem: () => {
    throw new Error('the shelf is locked');
  },
};
record('a locked shelf reads as the drawing, never a throw', readAsWords(lockedShelf) === false, 'false');
let threw = false;
try {
  writeAsWords(true, lockedShelf);
} catch {
  threw = true;
}
record('a locked shelf is written to without a throw', threw === false, 'no throw');

// ── the telling ───────────────────────────────────────────────────────────

const failed = checks.filter((c) => !c.passed);
const results = {
  ran: new Date().toISOString(),
  tree: 'src/components/bifrost/StreetTree.tsx',
  choice: 'src/components/seidr/immersive/Learscail.tsx',
  total: checks.length,
  passed: checks.length - failed.length,
  failed: failed.length,
  checks,
};

writeFileSync(join(__dirname, 'results.json'), `${JSON.stringify(results, null, 2)}\n`, 'utf8');

for (const check of checks) {
  console.log(`${check.passed ? 'pass' : 'FAIL'} · ${check.check} · ${check.result}`);
}
console.log(`${results.passed} of ${results.total} checks passed`);
if (failed.length) process.exitCode = 1;
