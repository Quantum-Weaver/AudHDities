// .journals/proofs/aethelred-the-gateway/prove-tracks.tsx
// Proves the four channels' track columns through the contract, the register
// read that meets no testing_public column, the Gateway's tracks strip and the
// apps page's Test it line. Fixtures only: no base, no network. Run from the
// repo root:
//   npx tsx .journals/proofs/aethelred-the-gateway/prove-tracks.tsx

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  BEACON_COLUMNS,
  BEACON_COLUMNS_UNFLAGGED,
  NO_STANDING,
  PUBLISHED_WORD,
  REGISTER_TABLE,
  showsTracks,
  TESTING_FLAG_CLICK,
  TEST_IT,
  TESTING_FLAG_UNREAD,
  TESTING_LINK_WORD,
  TESTING_PUBLIC_COLUMN,
  TESTING_TRACKS,
  TESTING_WORD,
  testItLinks,
  trackCells,
  type GatewayBeacon,
  type GatewayView,
} from '@/lib/nexus/gateway-contract';
import { readRegister } from '@/lib/nexus/gateway-read';
import { APP_COLUMNS, APP_COLUMNS_UNFLAGGED, type PublishedApp } from '@/lib/apps/apps-contract';
import { RepoConstellation } from '@/components/asgard/domains/aethelred/nexus/RepoConstellation';
import { AppCard } from '@/components/asgard/domains/hephaestus/apps/AppCard';

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

function beacon(over: Partial<GatewayBeacon>): GatewayBeacon {
  return {
    name: 'a beacon',
    slug: 'a-beacon',
    beacon_type: 'app' as GatewayBeacon['beacon_type'],
    status: 'flowing',
    definition: null,
    repo_url: null,
    is_public: true,
    version: null,
    icon_emoji: null,
    available_on: [],
    play_status: NO_STANDING,
    play_testing_version: null,
    play_published_version: null,
    play_testing_url: null,
    play_listing_url: null,
    galaxy_status: NO_STANDING,
    galaxy_testing_version: null,
    galaxy_published_version: null,
    galaxy_testing_url: null,
    galaxy_listing_url: null,
    microsoft_status: NO_STANDING,
    microsoft_testing_version: null,
    microsoft_published_version: null,
    microsoft_testing_url: null,
    microsoft_listing_url: null,
    audhdities_status: NO_STANDING,
    audhdities_testing_version: null,
    audhdities_published_version: null,
    audhdities_testing_url: null,
    audhdities_listing_url: null,
    testing_public: false,
    ...over,
  };
}

function app(over: Partial<PublishedApp>): PublishedApp {
  return {
    ...beacon({}),
    audhdities_price_cents: null,
    galaxy_price_cents: null,
    microsoft_price_cents: null,
    play_price_cents: null,
    currency: 'USD',
    ...over,
  };
}

// the fixtures

const ECHOES_LINK = 'https://play.google.com/apps/testing/com.audhdities.echoes';
const LANTERN_LINK = 'https://galaxystore.samsung.com/beta/lantern';

const ECHOES = beacon({
  name: 'resonance-echoes',
  slug: 'resonance-echoes',
  play_status: 'closed_testing',
  play_testing_version: '1.4.1',
  play_testing_url: ECHOES_LINK,
  play_listing_url: 'https://play.google.com/store/apps/details?id=com.audhdities.echoes',
  audhdities_status: 'published',
  audhdities_published_version: '1.4.0',
  testing_public: true,
});

const SIRENS = beacon({
  name: 'resonance-sirens',
  slug: 'resonance-sirens',
  play_status: 'closed_testing',
  testing_public: true,
});

const LANTERN = beacon({
  name: 'resonance-lantern',
  slug: 'resonance-lantern',
  galaxy_status: 'internal_testing',
  galaxy_testing_url: LANTERN_LINK,
});

const BRIDGE = beacon({
  name: 'resonance-bridge',
  slug: 'resonance-bridge',
  beacon_type: 'tool' as GatewayBeacon['beacon_type'],
});

const GRAMMAR = beacon({
  name: 'resonance-grammar',
  slug: 'resonance-grammar',
  beacon_type: 'tool' as GatewayBeacon['beacon_type'],
  microsoft_status: 'in_review',
});

// the cells

const echoesCells = trackCells(ECHOES);

record(
  'cells',
  'one cell per store, in strip order',
  echoesCells.map((cell) => cell.label).join(' · ') === 'Play · Galaxy · Microsoft · AudHDities',
  echoesCells.map((cell) => cell.label).join(' · ')
);
record(
  'cells',
  'a status prints in plain words',
  echoesCells[0].status === 'closed testing',
  echoesCells[0].status
);
record(
  'cells',
  'an empty column reads none, never blank',
  echoesCells[1].status === NO_STANDING && echoesCells[2].status === NO_STANDING,
  `Galaxy ${echoesCells[1].status} · Microsoft ${echoesCells[2].status}`
);
record(
  'cells',
  'a column holding only spaces reads none',
  trackCells(beacon({ play_status: '   ' }))[0].status === NO_STANDING,
  trackCells(beacon({ play_status: '   ' }))[0].status
);
record(
  'cells',
  'the testing version is carried where the register holds one',
  echoesCells[0].testingVersion === '1.4.1' && echoesCells[3].testingVersion === null,
  `Play ${String(echoesCells[0].testingVersion)} · AudHDities ${String(echoesCells[3].testingVersion)}`
);
record(
  'cells',
  'the published version is carried where the register holds one',
  echoesCells[3].publishedVersion === '1.4.0' && echoesCells[0].publishedVersion === null,
  `AudHDities ${String(echoesCells[3].publishedVersion)} · Play ${String(echoesCells[0].publishedVersion)}`
);
record(
  'cells',
  'the testing link is carried where the register holds one',
  echoesCells[0].testingUrl === ECHOES_LINK && echoesCells[1].testingUrl === null,
  `Play ${String(echoesCells[0].testingUrl)} · Galaxy ${String(echoesCells[1].testingUrl)}`
);
record(
  'cells',
  'a store that stands is marked, a none store is not',
  echoesCells[0].stands && echoesCells[3].stands && !echoesCells[1].stands,
  'Play true · AudHDities true · Galaxy false'
);
record('strip', 'an app prints a strip', showsTracks(ECHOES) && showsTracks(app({})), 'app');
record(
  'strip',
  'a beacon of another type in no store prints none',
  !showsTracks(BRIDGE),
  `${BRIDGE.beacon_type} · no store`
);
record(
  'strip',
  'a beacon of another type standing in one store prints none',
  !showsTracks(GRAMMAR),
  `${GRAMMAR.beacon_type} · microsoft ${GRAMMAR.microsoft_status}`
);

// the flag

record(
  'flag',
  'a link reaches a public face only when the flag is true',
  testItLinks(LANTERN).length === 0 && LANTERN.galaxy_testing_url === LANTERN_LINK,
  `testing_public ${String(LANTERN.testing_public)} · 0 links`
);
record(
  'flag',
  'the flag alone shows nothing when no link stands',
  testItLinks(SIRENS).length === 0,
  `testing_public ${String(SIRENS.testing_public)} · 0 links`
);
record(
  'flag',
  'a flagged row names the store of every link it holds',
  testItLinks(ECHOES).length === 1 &&
    testItLinks(ECHOES)[0].label === 'Play' &&
    testItLinks(ECHOES)[0].url === ECHOES_LINK,
  `${testItLinks(ECHOES)[0].label} · ${testItLinks(ECHOES)[0].url}`
);
record(
  'flag',
  'two links keep strip order',
  testItLinks(beacon({ ...ECHOES, galaxy_testing_url: LANTERN_LINK }))
    .map((link) => link.label)
    .join(' · ') === 'Play · Galaxy',
  testItLinks(beacon({ ...ECHOES, galaxy_testing_url: LANTERN_LINK }))
    .map((link) => link.label)
    .join(' · ')
);

// the select

const gatewayColumns = BEACON_COLUMNS.split(', ');
const appColumns = APP_COLUMNS.split(', ');
const trackColumns = TESTING_TRACKS.flatMap((channel) => [
  channel.status,
  channel.testingVersion,
  channel.publishedVersion,
  channel.testingUrl,
  channel.listingUrl,
]);

record(
  'columns',
  'the Gateway selects every track column and the flag',
  trackColumns.every((column) => gatewayColumns.includes(column)) &&
    gatewayColumns.includes(TESTING_PUBLIC_COLUMN),
  `${trackColumns.length} track columns · ${TESTING_PUBLIC_COLUMN}`
);
record(
  'columns',
  'the apps page selects the same track columns and the flag',
  trackColumns.every((column) => appColumns.includes(column)) &&
    appColumns.includes(TESTING_PUBLIC_COLUMN),
  `${trackColumns.length} track columns · ${TESTING_PUBLIC_COLUMN}`
);
record(
  'columns',
  'no column is named twice in either select',
  new Set(gatewayColumns).size === gatewayColumns.length &&
    new Set(appColumns).size === appColumns.length,
  `${gatewayColumns.length} · ${appColumns.length}`
);
record(
  'columns',
  'the unflagged selects name every track column and no flag',
  !BEACON_COLUMNS_UNFLAGGED.split(', ').includes(TESTING_PUBLIC_COLUMN) &&
    !APP_COLUMNS_UNFLAGGED.split(', ').includes(TESTING_PUBLIC_COLUMN) &&
    trackColumns.every((column) => BEACON_COLUMNS_UNFLAGGED.split(', ').includes(column)) &&
    trackColumns.every((column) => APP_COLUMNS_UNFLAGGED.split(', ').includes(column)),
  `${BEACON_COLUMNS_UNFLAGGED.split(', ').length} · ${APP_COLUMNS_UNFLAGGED.split(', ').length}`
);

async function main() {
  // the read

  const asked: string[] = [];

  function answering(answers: { data: unknown[] | null; error: { message: string } | null }[]) {
    let call = 0;
    return async (columns: string) => {
      asked.push(columns);
      const answer = answers[Math.min(call, answers.length - 1)];
      call += 1;
      return answer;
    };
  }

  asked.length = 0;
  const held = await readRegister<GatewayBeacon>(
    answering([{ data: [{ ...ECHOES }], error: null }]),
    BEACON_COLUMNS,
    BEACON_COLUMNS_UNFLAGGED
  );
  record(
    'read',
    'a register holding the flag is read once, the flag as it stands',
    asked.length === 1 && held.rows[0].testing_public === true && held.tracksNote === null,
    `${asked.length} read · testing_public ${String(held.rows[0].testing_public)}`
  );

  asked.length = 0;
  const absent = await readRegister<GatewayBeacon>(
    answering([
      { data: null, error: { message: 'column beacons.testing_public does not exist' } },
      { data: [{ ...ECHOES, testing_public: undefined }], error: null },
    ]),
    BEACON_COLUMNS,
    BEACON_COLUMNS_UNFLAGGED
  );
  record(
    'read',
    'a register holding no flag column is read again without it',
    asked.length === 2 && asked[1] === BEACON_COLUMNS_UNFLAGGED,
    `${asked.length} reads · the second unflagged`
  );
  record(
    'read',
    'every row of that read carries the flag false, and its tracks stand',
    absent.rows.length === 1 &&
      absent.rows[0].testing_public === false &&
      absent.rows[0].play_testing_version === '1.4.1' &&
      absent.fault === null,
    `1 row · testing_public false · play testing ${String(absent.rows[0].play_testing_version)}`
  );
  record(
    'read',
    'that read says what is missing in one sentence',
    absent.tracksNote === TESTING_FLAG_UNREAD && absent.fault === null,
    String(absent.tracksNote)
  );
  record(
    'read',
    'the sentence names the column and the click that earns it',
    TESTING_FLAG_UNREAD.includes(`${REGISTER_TABLE}.${TESTING_PUBLIC_COLUMN}`) &&
      TESTING_FLAG_UNREAD.includes(TESTING_FLAG_CLICK),
    TESTING_FLAG_UNREAD
  );

  asked.length = 0;
  const bothRefused = await readRegister<GatewayBeacon>(
    answering([
      { data: null, error: { message: 'column beacons.testing_public does not exist' } },
      { data: null, error: { message: 'permission denied for table beacons' } },
    ]),
    BEACON_COLUMNS,
    BEACON_COLUMNS_UNFLAGGED
  );
  record(
    'read',
    'a refused second read carries the base message alone, never two sentences',
    asked.length === 2 &&
      bothRefused.fault === 'permission denied for table beacons' &&
      bothRefused.tracksNote === null &&
      bothRefused.rows.length === 0,
    `${String(bothRefused.fault)} · no second sentence`
  );

  asked.length = 0;
  const refused = await readRegister<GatewayBeacon>(
    answering([{ data: null, error: { message: 'permission denied for table beacons' } }]),
    BEACON_COLUMNS,
    BEACON_COLUMNS_UNFLAGGED
  );
  record(
    'read',
    'any other refusal is carried whole and read no second time',
    asked.length === 1 &&
      refused.fault === 'permission denied for table beacons' &&
      refused.rows.length === 0 &&
      refused.tracksNote === null,
    `${asked.length} read · ${String(refused.fault)}`
  );

  asked.length = 0;
  const empty = await readRegister<GatewayBeacon>(
    answering([{ data: [], error: null }]),
    BEACON_COLUMNS,
    BEACON_COLUMNS_UNFLAGGED
  );
  record(
    'read',
    'an empty answer is no row, no fault and no sentence',
    empty.rows.length === 0 && empty.fault === null && empty.tracksNote === null,
    '0 rows · no fault'
  );

  // the Gateway strip, rendered

  function gatewayView(rows: GatewayBeacon[], tracksNote: string | null = null): GatewayView {
    return {
      groups: [
        {
          key: 'open',
          label: 'Open',
          empty: 'no beacon in the register is public with a repo',
          cards: rows.map((row) => ({ beacon: row, github: null })),
        },
      ],
      faces: [],
      fault: null,
      tracksNote,
      doorNamed: true,
      signedIn: true,
    };
  }

  function gatewayHtml(rows: GatewayBeacon[], tracksNote: string | null = null): string {
    return renderToStaticMarkup(
      React.createElement(RepoConstellation, { view: gatewayView(rows, tracksNote) })
    );
  }

  const echoesHtml = gatewayHtml([ECHOES]);
  record(
    'gateway',
    'the strip names all four stores',
    ['Play', 'Galaxy', 'Microsoft', 'AudHDities'].every((label) =>
      echoesHtml.includes(`>${label}</span>`)
    ),
    'Play · Galaxy · Microsoft · AudHDities'
  );
  record(
    'gateway',
    'the status prints in plain words, never with an underscore',
    echoesHtml.includes('>closed testing</span>') && !echoesHtml.includes('closed_testing'),
    'closed testing'
  );
  record(
    'gateway',
    'an empty store prints none',
    (echoesHtml.match(/>none<\/span>/g) ?? []).length === 2,
    `${(echoesHtml.match(/>none<\/span>/g) ?? []).length} none cells of 2`
  );
  record(
    'gateway',
    'the testing version and the published version print with their words',
    echoesHtml.includes(`${TESTING_WORD} 1.4.1`) && echoesHtml.includes(`${PUBLISHED_WORD} 1.4.0`),
    `${TESTING_WORD} 1.4.1 · ${PUBLISHED_WORD} 1.4.0`
  );
  record(
    'gateway',
    'the testing link is a link',
    echoesHtml.includes(`href="${ECHOES_LINK}"`) && echoesHtml.includes(TESTING_LINK_WORD),
    TESTING_LINK_WORD
  );
  record(
    'gateway',
    'the strip stands whatever the flag says',
    gatewayHtml([LANTERN]).includes(`href="${LANTERN_LINK}"`),
    `testing_public ${String(LANTERN.testing_public)} · the link stands on the Gateway`
  );
  const bridgeHtml = gatewayHtml([BRIDGE]);
  record(
    'gateway',
    'a beacon of another type in no store prints no strip',
    !bridgeHtml.includes('>Play</span>') && bridgeHtml.includes(BRIDGE.slug),
    `${BRIDGE.slug} · no strip`
  );
  record(
    'gateway',
    'a beacon of another type standing in one store prints no strip',
    !gatewayHtml([GRAMMAR]).includes('>in review</span>') &&
      gatewayHtml([GRAMMAR]).includes(GRAMMAR.slug),
    `${GRAMMAR.slug} · no strip`
  );
  record(
    'gateway',
    'the sentence for a register with no flag column prints once',
    gatewayHtml([ECHOES], TESTING_FLAG_UNREAD).includes(TESTING_FLAG_UNREAD) &&
      !echoesHtml.includes(TESTING_FLAG_UNREAD),
    TESTING_FLAG_UNREAD
  );

  // the Test it line, rendered

  function appHtml(row: PublishedApp): string {
    return renderToStaticMarkup(React.createElement(AppCard, { app: row }));
  }

  const openHtml = appHtml(app({ ...ECHOES }));
  record(
    'apps',
    'a flagged row with a link prints the line, the store and the link',
    openHtml.includes(`>${TEST_IT}<`) &&
      /<a [^>]*>Play</.test(openHtml) &&
      openHtml.includes(`href="${ECHOES_LINK}"`),
    `${TEST_IT} · Play · the link`
  );
  const shutHtml = appHtml(app({ ...LANTERN }));
  record(
    'apps',
    'an unflagged row with a link prints nothing, not even a heading',
    !shutHtml.includes(TEST_IT) && !shutHtml.includes(LANTERN_LINK),
    `testing_public ${String(LANTERN.testing_public)} · nothing`
  );
  const linklessHtml = appHtml(app({ ...SIRENS }));
  record(
    'apps',
    'a flagged row with no link prints nothing, not even a heading',
    !linklessHtml.includes(TEST_IT),
    'nothing'
  );
  record(
    'apps',
    'nothing counted rides the line',
    !/\d+\s+(testers?|tests?|bugs?)/.test(openHtml),
    'the store named, nothing counted'
  );

  // the tally

  const passed = checks.filter((check) => check.pass).length;
  for (const check of checks) {
    console.log(`${check.pass ? 'pass' : 'FAIL'} · ${check.set} · ${check.check} · ${check.result}`);
  }
  console.log(`${passed} of ${checks.length}`);

  writeFileSync(
    join(__dirname, 'results-tracks.json'),
    `${JSON.stringify({ passed, total: checks.length, checks }, null, 2)}\n`
  );

  if (passed !== checks.length) process.exitCode = 1;
}

main();
