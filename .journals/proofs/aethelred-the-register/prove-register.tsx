// .journals/proofs/aethelred-the-register/prove-register.tsx
// Renders the Register against two differently-shaped row sets and writes
// its checks beside itself. Run from the repo root:
//   npx tsx .journals/proofs/aethelred-the-register/prove-register.tsx

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  Register,
  type RegisterRow,
  type RegisterSection,
} from '@/components/asgard/domains/aethelred/nexus/Register';

interface Check {
  set: string;
  check: string;
  result: string;
  passed: boolean;
}

const checks: Check[] = [];

function record(set: string, check: string, passed: boolean, result: string) {
  checks.push({ set, check, result, passed });
}

function countTile(html: string, section: string): string | null {
  const at = html.indexOf(`>${section}</span>`);
  if (at === -1) return null;
  const tile = /<div class="[^"]*rounded-full[^"]*">(\d+)<\/div>/.exec(html.slice(at, at + 500));
  return tile ? tile[1] : null;
}

// ── set one: the chair's room, long format with stamps and a refusal ───────

const SEAT = 'The seat as carved';
const RECORD = 'The presence record';
const AGENTS = 'The agent rows';
const BOUNDS = 'The boundaries that bind';

const chairSections: RegisterSection[] = [
  { section: SEAT, source: 'live · council_houses', empty: 'not yet recorded' },
  {
    section: RECORD,
    source: 'live · entity_states, newest first',
    empty: 'no presence row yet',
    tally: 'the whole record, nothing summarised',
  },
  { section: AGENTS, source: 'live · agent_activities', empty: 'no agent row names this chair' },
  {
    section: BOUNDS,
    source: 'live · boundaries',
    empty: 'no boundary names this chair',
    fault: 'permission denied for table boundaries',
    faultTable: 'boundaries',
  },
];

const chairRows: RegisterRow[] = [
  { section: SEAT, ord: 2, key: 'responsibilities', value: 'pattern recognition · cross-substrate vision' },
  { section: SEAT, ord: 1, key: 'duty', value: 'patterns, prophecy, vision' },
  { section: SEAT, ord: 3, key: 'status', value: 'active', at: '2026-08-10T09:15:00.000Z' },
  {
    section: RECORD,
    ord: 1,
    key: 'presence',
    value: 'resting → present',
    note: 'changed by KP',
    at: '2026-09-09T08:12:00.000Z',
  },
  {
    section: RECORD,
    ord: 2,
    key: 'task',
    value: 'none → reading the drift between shape and intent',
    at: '2026-09-08T23:40:00.000Z',
  },
];

const chairHtml = renderToStaticMarkup(
  React.createElement(Register, { sections: chairSections, rows: chairRows })
);

record('chair', 'every section heading rendered', [SEAT, RECORD, AGENTS, BOUNDS].every((s) => chairHtml.includes(s)), [SEAT, RECORD, AGENTS, BOUNDS].join(' · '));
record('chair', 'the seat count tile counts its rows', countTile(chairHtml, SEAT) === '3', `tile ${countTile(chairHtml, SEAT)} of 3 rows`);
record('chair', 'the record count tile counts its rows', countTile(chairHtml, RECORD) === '2', `tile ${countTile(chairHtml, RECORD)} of 2 rows`);
record('chair', 'the agent section prints its honest empty', chairHtml.includes('no agent row names this chair'), 'no agent row names this chair');
record('chair', 'the refused section prints three parts', ['the base refused this read', 'boundaries · permission denied for table boundaries', 'next · a read policy on boundaries for this visitor'].every((p) => chairHtml.includes(p)), 'what happened · why · next step');
record('chair', 'the refused section never prints its empty', !chairHtml.includes('no boundary names this chair'), 'unreadable, never empty');
record('chair', 'rows render in ord order', chairHtml.indexOf('patterns, prophecy, vision') < chairHtml.indexOf('pattern recognition'), 'duty before responsibilities');
record('chair', "each stamp is the row's own, YYYY-MM-DD · HH:MM", chairHtml.includes('2026-09-09 · 08:12') && chairHtml.includes('2026-09-08 · 23:40') && chairHtml.includes('2026-08-10 · 09:15'), '2026-09-09 · 08:12 · 2026-09-08 · 23:40 · 2026-08-10 · 09:15');
record('chair', 'the tally counts the rows it stands under', chairHtml.includes('2 rows · the whole record, nothing summarised'), '2 rows · the whole record, nothing summarised');
record('chair', 'the house word carries its footnote', /KP<a[^>]+href="\/about"/.test(chairHtml), 'KP → /about');
record('chair', 'no percentage anywhere', !chairHtml.includes('%'), 'no % in the markup');

// ── set two: a board, the same format wearing mark · seat · ref · closed ───

const ORGANS = 'The organs';
const LAMPS = 'The lamps';

const boardSections: RegisterSection[] = [
  { section: ORGANS, source: 'poured · organs_page', empty: 'no organ row yet', tally: 'the whole board' },
  { section: LAMPS, source: 'poured · switchboard', empty: 'no lamp row yet' },
];

const boardRows: RegisterRow[] = [
  {
    section: ORGANS,
    ord: 1,
    key: 'the bridge',
    value: 'fifty-four tools by line',
    note: 'standing · lit',
    ref: '/nexus/bridge',
    mark: 'poured',
    seat: 'aethelred',
    at: '2026-09-08T19:02:00.000Z',
  },
  {
    section: ORGANS,
    ord: 2,
    key: 'the hands',
    value: 'twenty-four agents and skills',
    ref: 'https://audhdities.com/nexus/bridge',
    closed: 'closed 2026-09-01',
  },
  { section: ORGANS, ord: 3, key: 'the boards', value: 'three hundred and forty-seven rows' },
];

const boardHtml = renderToStaticMarkup(
  React.createElement(Register, { sections: boardSections, rows: boardRows })
);

record('board', 'both section headings rendered', boardHtml.includes(ORGANS) && boardHtml.includes(LAMPS), `${ORGANS} · ${LAMPS}`);
record('board', 'the organs count tile counts its rows', countTile(boardHtml, ORGANS) === '3', `tile ${countTile(boardHtml, ORGANS)} of 3 rows`);
record('board', 'the empty section prints its honest empty', boardHtml.includes('no lamp row yet'), 'no lamp row yet');
record('board', 'the empty section counts zero', countTile(boardHtml, LAMPS) === '0', `tile ${countTile(boardHtml, LAMPS)}`);
record('board', 'an internal ref renders as an address', boardHtml.includes('href="/nexus/bridge"'), 'href="/nexus/bridge"');
record('board', 'an external ref renders as an address', boardHtml.includes('href="https://audhdities.com/nexus/bridge"'), 'href="https://audhdities.com/nexus/bridge"');
record('board', 'mark renders as a pill', boardHtml.includes('poured'), 'mark · poured');
record('board', 'seat renders beside the key', boardHtml.includes('aethelred'), 'seat · aethelred');
record('board', 'closed renders beside the value', boardHtml.includes('closed 2026-09-01'), 'closed · 2026-09-01');
record('board', "the row's own stamp renders", boardHtml.includes('2026-09-08 · 19:02'), '2026-09-08 · 19:02');
record('board', 'a row without a stamp shows none', !boardHtml.includes('Invalid Date'), 'no invented stamp');
record('board', 'no percentage anywhere', !boardHtml.includes('%'), 'no % in the markup');

// ── set three: the footnote on every string a row renders ──────────────────

const KEYS = 'The keys';

const keyHtml = renderToStaticMarkup(
  React.createElement(Register, {
    sections: [{ section: KEYS, source: 'poured · a board', empty: 'no row yet' }],
    rows: [
      {
        section: KEYS,
        ord: 1,
        key: 'KP the Quantum Weaver',
        value: 'a name',
        mark: 'KP',
        seat: 'KP',
        closed: 'closed by KP',
      },
    ],
  })
);

const footnotes = keyHtml.match(/KP<a[^>]+href="\/about"/g) ?? [];
record(
  'keys',
  'key · seat · mark · closed each carry the footnote',
  footnotes.length === 4,
  `${footnotes.length} of 4 strings`
);

const failed = checks.filter((c) => !c.passed);
const results = {
  ran: new Date().toISOString(),
  component: 'src/components/asgard/domains/aethelred/nexus/Register.tsx',
  sets: ['chair', 'board', 'keys'],
  total: checks.length,
  passed: checks.length - failed.length,
  failed: failed.length,
  checks,
};

writeFileSync(join(__dirname, 'results.json'), `${JSON.stringify(results, null, 2)}\n`, 'utf8');

for (const check of checks) {
  console.log(`${check.passed ? 'pass' : 'FAIL'} · ${check.set} · ${check.check} · ${check.result}`);
}
console.log(`${results.passed} of ${results.total} checks passed`);
if (failed.length) process.exitCode = 1;
