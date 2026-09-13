// .journals/proofs/hestia-the-import/prove-import.ts
// Proves the mirrored envelope and the per-app readers' pure mapping against
// fixtures, with no base and no network.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ENVELOPE, ENVELOPE_VERSION, open as openEnvelope, seal } from '@/lib/envelope';
import { plan as bubblesPlan } from '@/lib/import/bubbles';
import { plan as echoesPlan } from '@/lib/import/echoes';
import { plan as lanternPlan } from '@/lib/import/lantern';
import { keyOf } from '@/lib/import/journal';
import { face, reads, whyNoReader } from '@/lib/import/registry';

interface Check {
  set: string;
  check: string;
  result: string;
  pass: boolean;
}

const checks: Check[] = [];

function record(set: string, check: string, pass: boolean, result: string) {
  checks.push({ set, check, result, pass });
}

function echo(over: Record<string, unknown>) {
  return {
    id: 'echo-1',
    name: 'A bell in the hall',
    sense: 'Heard',
    subcategory: 'Chime',
    emoji: '🔔',
    note: 'it rang twice',
    intensity: 4,
    timestamp: Date.UTC(2026, 8, 11, 10, 30),
    createdAt: Date.UTC(2026, 8, 11, 10, 30),
    ...over,
  };
}

// the fixtures — the shapes the apps actually write

const bubblesData = {
  echoes: [echo({}), echo({ id: 'echo-2', name: 'Low light', timestamp: Date.UTC(2026, 8, 12, 9, 0) }), echo({ id: 'echo-3', name: '' })],
  folksonomy: { '🔔': 'a small warning', '🌊': 'the tide' },
  collections: {
    daily: 12,
    max: 500,
    day: '2026-09-12',
    collected: { aurora: 3, nebula: 1, '': 7, dormant: 0 },
    found: { 'the-sky': '2026-09-10', 'the-deep': '2026-09-11' },
    sound: true,
  },
};

const echoesData = { echoes: [echo({}), echo({ id: 'echo-2', timestamp: 'not a stamp' })], folksonomy: { '🔔': 'a small warning' } };

const lanternData = {
  sessions: [
    { id: 's1', startedAt: Date.UTC(2026, 8, 10, 8, 0), durationMin: 25, referenceName: 'a hand', note: 'the thumb fought me', capturePath: '/shots/1.png', outlineId: null },
    { id: 's2', startedAt: Date.UTC(2026, 8, 11, 8, 0), durationMin: 15, referenceName: null, note: null, capturePath: null, outlineId: null },
    { id: 's3', startedAt: null, referenceName: 'a face', note: 'no date' },
  ],
  refs: [{ id: 'r1', name: 'a hand', path: '/refs/hand.png' }],
};

// the envelope, sealed by the mirrored library

const sealed = seal('resonance-bubbles', '0.1.1', bubblesData, { echoes: 3, folksonomy: 2, bubbles: 2 });

record('seal', 'the envelope carries the family marker', sealed.envelope === ENVELOPE, sealed.envelope);
record('seal', 'the envelope carries the version', sealed.envelopeVersion === ENVELOPE_VERSION, String(sealed.envelopeVersion));
record('seal', 'the envelope names the app', sealed.app === 'resonance-bubbles', sealed.app);
record('seal', 'the counts ride on the outside', sealed.counts.bubbles === 2 && sealed.counts.echoes === 3, JSON.stringify(sealed.counts));

// the reading

const reading = openEnvelope(JSON.parse(JSON.stringify(sealed)), 'resonance-bubbles');
record('open', 'the right app reads its own envelope', reading.kind === 'envelope', reading.kind);

let refusal = '';
try {
  openEnvelope(JSON.parse(JSON.stringify(sealed)), 'resonance-echoes');
} catch (thrown) {
  refusal = thrown instanceof Error ? thrown.message : String(thrown);
}
record(
  'open',
  'another app is refused in the family sentence',
  refusal === 'This file belongs to resonance-bubbles — resonance-echoes imports only its own envelopes.',
  refusal
);

let notAnEnvelope = '';
try {
  openEnvelope({ some: 'file' }, 'resonance-bubbles');
} catch (thrown) {
  notAnEnvelope = thrown instanceof Error ? thrown.message : String(thrown);
}
record('open', 'a file that is not the family envelope is refused', notAnEnvelope === 'Not a resonance-bubbles export file.', notAnEnvelope);

const shown = face(sealed);
record('face', 'the envelope shows its app before anything lands', shown?.app === 'resonance-bubbles', shown?.app ?? 'none');
record('face', 'the envelope shows its counts before anything lands', JSON.stringify(shown?.counts) === JSON.stringify(sealed.counts), JSON.stringify(shown?.counts));
record('face', 'a bare array shows no face', face([1, 2, 3]) === null, 'null');

// the bubbles reader's pure mapping

const bubbles = bubblesPlan(sealed.data, sealed.exportedAt);

record('bubbles', 'one row per popped bubble', bubbles.pops.length === 2, `${bubbles.pops.length} pops`);
record('bubbles', 'the pop count rides with the row', bubbles.pops.find((row) => row.slug === 'aurora')?.pops === 3, JSON.stringify(bubbles.pops));
record('bubbles', 'a bubble popped no times is not a row', !bubbles.pops.some((row) => row.slug === 'dormant'), 'dormant dropped');
record('bubbles', 'a nameless slug is not a row', !bubbles.pops.some((row) => row.slug === ''), 'blank dropped');
record('bubbles', 'one row per found collection', bubbles.collections.length === 2, bubbles.collections.join(' · '));
record('bubbles', 'the echoes in the file become journal rows', bubbles.journal.length === 2, `${bubbles.journal.length} journal rows`);
record('bubbles', 'a journal row carries the app as a tag', bubbles.journal[0]?.tags?.includes('resonance-bubbles') === true, (bubbles.journal[0]?.tags ?? []).join(' · '));
record('bubbles', 'a journal row carries the echo date', bubbles.journal[0]?.entry_date === '2026-09-11', bubbles.journal[0]?.entry_date ?? 'none');
record('bubbles', 'the collected date is the envelope stamp', bubbles.collectedAt === sealed.exportedAt, bubbles.collectedAt);
record(
  'bubbles',
  'the rows it would land are counted',
  bubbles.pops.length + bubbles.collections.length + bubbles.journal.length === 6,
  `${bubbles.pops.length} vessel_bubbles · ${bubbles.collections.length} vessel_collections · ${bubbles.journal.length} journal_entries`
);
record(
  'bubbles',
  'the folksonomy is told, not landed',
  bubbles.notLanded.some((one) => one.field === 'folksonomy' && one.count === 2),
  bubbles.notLanded.map((one) => `${one.field} ${one.count}`).join(' · ')
);
record(
  'bubbles',
  'the found date is told, not landed',
  bubbles.notLanded.some((one) => one.field === 'the date a collection was found'),
  bubbles.notLanded.map((one) => one.field).join(' · ')
);
record(
  'bubbles',
  'the unreadable echo is told, not landed',
  bubbles.notLanded.some((one) => one.field === 'unreadable echoes' && one.count === 1),
  'unreadable echoes 1'
);
record(
  'bubbles',
  'the sky counters are told, not landed',
  bubbles.notLanded.some((one) => one.field === 'the sky counters' && one.count === 4),
  'the sky counters 4'
);

// the echoes reader

const echoes = echoesPlan(echoesData);
record('echoes', 'an echo with a name and a stamp lands', echoes.journal.length === 1, `${echoes.journal.length} journal rows`);
record('echoes', 'an echo without a stamp does not land', echoes.notLanded.some((one) => one.field === 'unreadable echoes'), 'unreadable echoes 1');
record('echoes', 'the folksonomy is told, not landed', echoes.notLanded.some((one) => one.field === 'folksonomy'), 'folksonomy 1');

// the lantern reader

const lantern = lanternPlan(lanternData);
record('lantern', 'a session with words lands', lantern.journal.length === 1, `${lantern.journal.length} journal rows`);
record('lantern', 'a session with no date or no words does not land', lantern.notLanded.some((one) => one.field === 'sessions not landed' && one.count === 2), 'sessions not landed 2');
record('lantern', 'the reference shelf is told, not landed', lantern.notLanded.some((one) => one.field === 'reference images'), 'reference images 1');
record(
  'lantern',
  'the duration, the capture and the outline are told, not landed',
  lantern.notLanded.some((one) => one.field === 'durationMin, capturePath'),
  lantern.notLanded.map((one) => one.field).join(' · ')
);

// the merge law

const twice = bubblesPlan(sealed.data, sealed.exportedAt);
record(
  'merge',
  'the same file plans the same journal keys',
  keyOf(bubbles.journal[0]) === keyOf(twice.journal[0]),
  keyOf(bubbles.journal[0])
);
record(
  'merge',
  'two different echoes plan two different keys',
  keyOf(bubbles.journal[0]) !== keyOf(bubbles.journal[1]),
  keyOf(bubbles.journal[1])
);

// the register

record('register', 'bubbles, echoes and lantern are read', reads('resonance-bubbles') && reads('resonance-echoes') && reads('resonance-lantern'), 'three readers');
record('register', 'compass is named, not guessed at', !reads('resonance-compass') && whyNoReader('resonance-compass').includes('landing table'), whyNoReader('resonance-compass'));
record('register', 'an app nobody knows is named plainly', whyNoReader('resonance-nowhere') === 'The Sanctuary has no reader for resonance-nowhere yet.', whyNoReader('resonance-nowhere'));

// the tally

const passed = checks.filter((check) => check.pass).length;
for (const check of checks) {
  console.log(`${check.pass ? 'pass' : 'FAIL'} · ${check.set} · ${check.check} · ${check.result}`);
}
console.log(`${passed} of ${checks.length}`);

writeFileSync(
  join(__dirname, 'results.json'),
  `${JSON.stringify({ passed, total: checks.length, checks }, null, 2)}\n`
);

if (passed !== checks.length) process.exitCode = 1;
