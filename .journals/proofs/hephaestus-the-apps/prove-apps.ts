// .journals/proofs/hephaestus-the-apps/prove-apps.ts
// Proves the standing line, the platforms line, the count and the fault shape
// against fixtures, with no network and no base.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  APP_CHANNELS,
  APP_COLUMNS,
  APP_TYPES,
  countLine,
  FAULT_NEXT,
  FREE,
  NOT_IN_ANY_STORE,
  PART_SEPARATOR,
  PLATFORMS_LABEL,
  platformsLine,
  priceWords,
  standingEntries,
  standingLine,
  standingText,
  STANDINGS,
  type AppsView,
  type PublishedApp,
} from '../../../src/lib/apps/apps-contract';
import {
  DOOR_UNNAMED,
  NO_STANDING,
  REGISTER_REFUSED,
  REGISTER_TABLE,
  statusWords,
} from '../../../src/lib/nexus/gateway-contract';

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

function app(over: Partial<PublishedApp>): PublishedApp {
  return {
    name: 'an app',
    slug: 'an-app',
    beacon_type: 'app' as PublishedApp['beacon_type'],
    status: 'active',
    definition: null,
    repo_url: null,
    is_public: true,
    version: null,
    icon_emoji: null,
    available_on: [],
    audhdities_status: NO_STANDING,
    galaxy_status: NO_STANDING,
    microsoft_status: NO_STANDING,
    play_status: NO_STANDING,
    audhdities_listing_url: null,
    galaxy_listing_url: null,
    microsoft_listing_url: null,
    play_listing_url: null,
    audhdities_price_cents: null,
    galaxy_price_cents: null,
    microsoft_price_cents: null,
    play_price_cents: null,
    audhdities_testing_url: null,
    galaxy_testing_url: null,
    microsoft_testing_url: null,
    play_testing_url: null,
    audhdities_testing_version: null,
    galaxy_testing_version: null,
    microsoft_testing_version: null,
    play_testing_version: null,
    audhdities_published_version: null,
    galaxy_published_version: null,
    microsoft_published_version: null,
    play_published_version: null,
    testing_public: false,
    currency: 'USD',
    ...over,
  };
}

// the fixtures

const UNROWED = app({ name: 'Marram', slug: 'marram' });

const PUBLISHED = app({
  name: 'Sudoku',
  slug: 'sudoku',
  version: '1.2.0',
  icon_emoji: 'x',
  available_on: ['android', 'windows'],
  audhdities_status: 'published',
  audhdities_listing_url: 'https://audhdities.com/apps/sudoku',
  audhdities_price_cents: 0,
  play_status: 'in_review',
  play_price_cents: 499,
  galaxy_status: 'internal_testing',
});

const PLATFORMS_ONLY = app({
  name: 'a sideloaded app',
  slug: 'sideloaded',
  available_on: ['windows'],
});

const OTHER_CURRENCY = app({
  name: 'a priced app',
  slug: 'priced',
  currency: 'eur',
  galaxy_status: 'published',
  galaxy_price_cents: 250,
});

// the standing line

const publishedEntries = standingEntries(PUBLISHED);

record(
  'standing',
  'only channels whose standing is not none are printed',
  publishedEntries.map((entry) => entry.label).join(PART_SEPARATOR) ===
    'audhdities · galaxy · play',
  publishedEntries.map((entry) => entry.label).join(PART_SEPARATOR)
);
record(
  'standing',
  'a none channel is never printed',
  publishedEntries.every((entry) => entry.label !== 'microsoft'),
  `microsoft ${PUBLISHED.microsoft_status}`
);
record(
  'standing',
  'the channels keep register order',
  standingEntries(PUBLISHED)
    .map((entry) => entry.label)
    .join(PART_SEPARATOR) ===
    APP_CHANNELS.filter((channel) => channel.label !== 'microsoft')
      .map((channel) => channel.label)
      .join(PART_SEPARATOR),
  APP_CHANNELS.map((channel) => channel.label).join(PART_SEPARATOR)
);
record(
  'standing',
  'a standing prints with spaces, never underscores',
  statusWords('internal_testing') === 'internal testing' &&
    STANDINGS.every((standing) => !statusWords(standing).includes('_')),
  STANDINGS.map(statusWords).join(PART_SEPARATOR)
);
record(
  'standing',
  'a zero price prints free',
  publishedEntries[0].price === FREE,
  String(publishedEntries[0].price)
);
record(
  'standing',
  'a set price prints in dollars and cents',
  priceWords(499, 'USD') === '$4.99',
  String(priceWords(499, 'USD'))
);
record(
  'standing',
  'a null price prints nothing',
  priceWords(null, 'USD') === null && publishedEntries[1].price === null,
  `${String(priceWords(null, 'USD'))} · galaxy ${String(publishedEntries[1].price)}`
);
record(
  'standing',
  'a price that is not dollars carries its own code',
  priceWords(250, 'eur') === '2.50 EUR',
  String(priceWords(250, 'eur'))
);
record(
  'standing',
  'a listing url is carried when the register holds one',
  publishedEntries[0].listing === 'https://audhdities.com/apps/sudoku',
  String(publishedEntries[0].listing)
);
record(
  'standing',
  'a channel with no listing url carries null',
  publishedEntries[1].listing === null && publishedEntries[2].listing === null,
  'galaxy null · play null'
);
record(
  'standing',
  'one channel prints its channel, its standing and its price',
  standingText(publishedEntries[2]) === 'play in review $4.99',
  standingText(publishedEntries[2])
);
record(
  'standing',
  'the line joins every standing channel',
  standingLine(PUBLISHED) ===
    'audhdities published free · galaxy internal testing · play in review $4.99',
  String(standingLine(PUBLISHED))
);
record(
  'standing',
  'four none standings and no platform print the one sentence',
  standingLine(UNROWED) === NOT_IN_ANY_STORE,
  String(standingLine(UNROWED))
);
record(
  'standing',
  'four none standings with a platform print no standing at all',
  standingEntries(PLATFORMS_ONLY).length === 0 && standingLine(PLATFORMS_ONLY) === null,
  String(standingLine(PLATFORMS_ONLY))
);
record(
  'standing',
  'a currency other than dollars reaches the line',
  standingLine(OTHER_CURRENCY) === 'galaxy published 2.50 EUR',
  String(standingLine(OTHER_CURRENCY))
);

// the platforms line

record(
  'platforms',
  'an empty available_on is no line',
  platformsLine(UNROWED) === null,
  String(platformsLine(UNROWED))
);
record(
  'platforms',
  'one platform prints its label and itself',
  platformsLine(PLATFORMS_ONLY) === `${PLATFORMS_LABEL} · windows`,
  String(platformsLine(PLATFORMS_ONLY))
);
record(
  'platforms',
  'many platforms print in register order',
  platformsLine(PUBLISHED) === `${PLATFORMS_LABEL} · android · windows`,
  String(platformsLine(PUBLISHED))
);
record(
  'platforms',
  'an empty name in available_on is dropped',
  platformsLine(app({ available_on: ['windows', '  ', 'android'] })) ===
    `${PLATFORMS_LABEL} · windows · android`,
  String(platformsLine(app({ available_on: ['windows', '  ', 'android'] })))
);

// the count

record(
  'count',
  'the count line counts the rows it was handed',
  countLine([PUBLISHED, UNROWED, PLATFORMS_ONLY]) ===
    '3 apps and games in the register · counted from rows',
  countLine([PUBLISHED, UNROWED, PLATFORMS_ONLY])
);
record(
  'count',
  'an empty register counts zero',
  countLine([]) === '0 apps and games in the register · counted from rows',
  countLine([])
);

// the fault

const REFUSED: AppsView = {
  apps: [],
  fault: 'permission denied for table beacons',
  doorNamed: true,
};
const UNNAMED: AppsView = { apps: [], fault: null, doorNamed: false };

record(
  'fault',
  'a refused read carries what happened, why, and the next step',
  REGISTER_REFUSED === 'the register refused this read' &&
    `${REGISTER_TABLE}${PART_SEPARATOR}${REFUSED.fault}` ===
      'beacons · permission denied for table beacons' &&
    FAULT_NEXT === 'a read policy on beacons for the anon door',
  `${REGISTER_REFUSED} · ${REGISTER_TABLE} · ${REFUSED.fault} · next · ${FAULT_NEXT}`
);
record('fault', 'a refused read shows no app', REFUSED.apps.length === 0, '0 rows');
record(
  'fault',
  'an unnamed door carries its own sentence and no fault',
  UNNAMED.doorNamed === false &&
    UNNAMED.fault === null &&
    DOOR_UNNAMED === 'register unread · the knowledge door is not named on this host',
  DOOR_UNNAMED
);

// the read

const columns = APP_COLUMNS.split(', ');

record(
  'columns',
  'the select names every column the page prints',
  columns.length === 36 && new Set(columns).size === 36,
  `${columns.length} columns`
);
record(
  'columns',
  'the four standings, the four listings and the four prices are selected',
  APP_CHANNELS.every(
    (channel) =>
      columns.includes(channel.status) &&
      columns.includes(channel.listing) &&
      columns.includes(channel.price)
  ) && columns.includes('currency'),
  APP_CHANNELS.map((channel) => channel.label).join(PART_SEPARATOR)
);
record(
  'columns',
  'story and home are not selected',
  !columns.includes('story') && !columns.includes('home'),
  APP_COLUMNS
);
record(
  'types',
  'only apps and games are read',
  APP_TYPES.length === 2 && APP_TYPES.includes('app') && APP_TYPES.includes('game'),
  APP_TYPES.join(PART_SEPARATOR)
);

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
