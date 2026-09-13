// .journals/proofs/aethelred-the-poured/prove-poured.ts
// The poured reader and the shapes the Bridge and Integrations wear, proved
// against the artifact files on disk. No network, no base, no proxy.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { liftBlock, parseBlock } from '../../../src/lib/nexus/poured-read';
import { pouredView, sectionNames } from '../../../src/lib/nexus/poured-contract';
import { BRIDGE_SHAPES, HANDS, ORGANS, SWITCHBOARD } from '../../../src/lib/nexus/bridge-contract';
import {
  INTEGRATIONS_SHAPE,
  keyNames,
  standing,
  KEYS_MARK,
} from '../../../src/lib/nexus/integrations-contract';

const here = dirname(fileURLToPath(import.meta.url));
const ARTIFACTS = join(here, '..', '..', '..', '..', 'resonance-progenatrix', 'artifacts');

interface Check {
  name: string;
  pass: boolean;
  detail: string;
}

const checks: Check[] = [];

function check(name: string, pass: boolean, detail: string) {
  checks.push({ name, pass, detail });
}

function blockOf(slug: string) {
  const html = readFileSync(join(ARTIFACTS, `${slug}.html`), 'utf8');
  const text = liftBlock(html);
  check(`${slug} · the page carries a register block`, text !== null, text ? 'lifted' : 'absent');
  return parseBlock(slug, text ?? '');
}

// ── the reader ──────────────────────────────────────────────────────────────
const organs = blockOf(ORGANS);
const switchboard = blockOf(SWITCHBOARD);
const hands = blockOf(HANDS);

for (const block of [organs, switchboard, hands]) {
  check(`${block.slug} · the block parsed`, block.fault === null, block.fault ?? 'no fault');
  check(`${block.slug} · the block names itself`, block.artifact === block.slug, `${block.artifact}`);
  check(`${block.slug} · the block carries a published stamp`, Boolean(block.published), `${block.published}`);
  check(`${block.slug} · the block carries rows`, block.rows.length > 0, `${block.rows.length} rows`);
}

check(
  'a page with no block answers a fault, never an empty',
  liftBlock('<html><body>nothing</body></html>') === null,
  'no block found'
);
check(
  'a block that is not JSON answers a fault',
  parseBlock('x', '{not json').fault !== null,
  parseBlock('x', '{not json').fault ?? ''
);
check(
  'a block with no rows answers a fault',
  parseBlock('x', '{"artifact":"x"}').fault !== null,
  parseBlock('x', '{"artifact":"x"}').fault ?? ''
);

// ── the Bridge ──────────────────────────────────────────────────────────────
const blocks = { [ORGANS]: organs, [SWITCHBOARD]: switchboard, [HANDS]: hands };

for (const shape of BRIDGE_SHAPES) {
  const view = pouredView(shape, blocks[shape.slug]);
  check(
    `${shape.slug} · every poured row became a register row`,
    view.rows.length === blocks[shape.slug].rows.length,
    `${view.rows.length} of ${blocks[shape.slug].rows.length}`
  );
  check(
    `${shape.slug} · every row stands in a section`,
    view.rows.every((row) => row.section.length > 0),
    `${view.sections.length} sections`
  );
  check(
    `${shape.slug} · every row carries a key`,
    view.rows.every((row) => row.key.length > 0),
    'all keyed'
  );
  check(
    `${shape.slug} · every section the rows name has a section card`,
    new Set(view.rows.map((row) => row.section)).size === view.sections.length,
    `${view.sections.length} sections`
  );
  check(
    `${shape.slug} · no ord repeats inside a section`,
    view.rows.every(
      (row, at) => !view.rows.some((other, otherAt) => otherAt !== at && other.section === row.section && other.ord === row.ord)
    ),
    'ords distinct per section'
  );
}

check(
  'a refused poured read stands as one section with its three parts',
  (() => {
    const view = pouredView(BRIDGE_SHAPES[0], { ...organs, rows: [], fault: 'the proxy answered 403' });
    return (
      view.rows.length === 0 &&
      view.sections.length === 1 &&
      view.sections[0].fault === 'the proxy answered 403' &&
      Boolean(view.sections[0].faultWhat) &&
      Boolean(view.sections[0].faultNext)
    );
  })(),
  'what, why, next'
);

// ── the lamps and the hands carry no session id ─────────────────────────────
const lamps = pouredView(BRIDGE_SHAPES[1], switchboard);
const sessionIds = new Set(switchboard.rows.map((row) => String(row.session_id)));
check(
  'the lamps show no session id',
  !JSON.stringify(lamps.rows).split('"').some((piece) => sessionIds.has(piece)),
  'none on the page'
);

// ── Integrations ────────────────────────────────────────────────────────────
const keys = pouredView(INTEGRATIONS_SHAPE, organs);
const naming = organs.rows.filter((row) => String(row.note ?? '').includes(KEYS_MARK));

check(
  'every entry that names a key is listed',
  keys.rows.length === naming.length,
  `${keys.rows.length} of ${naming.length}`
);
check(
  'every line in the register gets a section, including those naming no key',
  keys.sections.length === sectionNames(organs.rows).length,
  `${keys.sections.length} sections`
);
check(
  'a line naming no key prints its own sentence',
  keys.sections
    .filter((section) => !keys.rows.some((row) => row.section === section.section))
    .every((section) => section.empty === INTEGRATIONS_SHAPE.empty),
  `${keys.sections.filter((s) => !keys.rows.some((r) => r.section === s.section)).length} lines name none`
);
check(
  'the key names are read off the mark',
  keyNames('dry · --deliver · keys: A · B') === 'A · B',
  'names lifted'
);
check(
  'the standing is read off the head',
  standing('dry · --deliver · keys: A · B') === 'dry · --deliver',
  'standing lifted'
);
check('a note with no mark names no key', keyNames('live') === null, 'null');
check(
  'no listed value is longer than a name list',
  keys.rows.every((row) => typeof row.value === 'string' && !row.value.includes('=')),
  'no assignment on the page'
);

// ── the tally ───────────────────────────────────────────────────────────────
const passed = checks.filter((c) => c.pass).length;
for (const c of checks) {
  console.log(`${c.pass ? 'pass' : 'FAIL'} · ${c.name} · ${c.detail}`);
}
console.log(`\n${passed} of ${checks.length}`);
writeFileSync(
  join(here, 'results.json'),
  JSON.stringify({ passed, total: checks.length, checks }, null, 2) + '\n',
  'utf8'
);
if (passed !== checks.length) process.exit(1);
