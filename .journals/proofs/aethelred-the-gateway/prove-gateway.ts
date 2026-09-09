// .journals/proofs/aethelred-the-gateway/prove-gateway.ts
// Proves the Gateway's grouping, the GitHub degrade, and the request contract
// against fixtures, with no network and no base.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { Constants } from '../../../src/lib/generated/supabase/database.types';
import {
  admitRequest,
  boundSlug,
  groupBeacons,
  faceBeacon,
  groupKeyFor,
  isFace,
  missLine,
  parseRepoAddress,
  readableOnGitHub,
  requestMessage,
  requestSubject,
  REQUEST_CATEGORY,
  REQUEST_STATUS,
  REQUEST_TABLE,
  BEACON_COLUMNS,
  NOT_PRIVATE,
  SLUG_MAX,
  type GatewayBeacon,
} from '../../../src/lib/nexus/gateway-contract';
import {
  readBeaconFacts,
  readRepoFacts,
  readUserFacts,
  type GatewayFetch,
  type GatewayResponse,
} from '../../../src/lib/nexus/gateway-github';

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
    status: 'active',
    definition: null,
    repo_url: null,
    is_public: true,
    version: null,
    icon_emoji: null,
    available_on: [],
    audhdities_status: 'none',
    galaxy_status: 'none',
    microsoft_status: 'none',
    play_status: 'none',
    ...over,
  };
}

// ── the fixtures ───────────────────────────────────────────────────────────

const ROWS: GatewayBeacon[] = [
  beacon({
    name: 'AudHDities',
    slug: 'audhdities',
    is_public: true,
    repo_url: 'https://github.com/Quantum-Weaver/AudHDities',
    definition: 'Where neurodivergent minds build digital sovereignty together.',
    version: '2.0.0',
    icon_emoji: '🌿',
    available_on: ['web'],
  }),
  beacon({
    name: 'resonance-bridge',
    slug: 'resonance-bridge',
    is_public: true,
    repo_url: 'https://github.com/Quantum-Weaver/resonance-bridge.git',
    definition: 'The MCP server for the Sanctuary.',
  }),
  beacon({
    name: 'resonance-progenatrix',
    slug: 'resonance-progenatrix',
    is_public: false,
    repo_url: 'https://github.com/Quantum-Weaver/resonance-progenatrix',
    definition: "KP keeps the working record here.",
  }),
  beacon({
    name: 'mimirs-well',
    slug: 'mimirs-well',
    is_public: false,
    repo_url: null,
    definition: 'The archive.',
  }),
  beacon({
    name: 'a beacon with no repo',
    slug: 'no-repo-beacon',
    is_public: true,
    repo_url: null,
  }),
  beacon({
    name: 'Quantum-Weaver',
    slug: 'quantum-weaver',
    is_public: true,
    repo_url: 'https://github.com/Quantum-Weaver/Quantum-Weaver',
    definition: 'The front door of the org, a single README.',
  }),
  beacon({
    name: 'aethelred-cello',
    slug: 'aethelred-cello',
    is_public: true,
    repo_url: 'https://github.com/aethelred-cello/aethelred-cello',
    definition: 'His own page, a single README.',
  }),
];

// ── the grouping ───────────────────────────────────────────────────────────

const groups = groupBeacons(ROWS);
const byKey = Object.fromEntries(groups.map((group) => [group.key, group]));

record(
  'grouping',
  'three groups, in order',
  groups.map((group) => group.key).join(' · ') === 'open · private · no-repo',
  groups.map((group) => group.key).join(' · ')
);
record('grouping', 'open counts its rows', byKey.open.beacons.length === 2, `${byKey.open.beacons.length} of 2`);
record(
  'grouping',
  'private counts its rows',
  byKey.private.beacons.length === 1,
  `${byKey.private.beacons.length} of 1`
);
record(
  'grouping',
  'no repo counts its rows',
  byKey['no-repo'].beacons.length === 2,
  `${byKey['no-repo'].beacons.length} of 2`
);
record(
  'grouping',
  'every row but the two faces lands in exactly one group',
  groups.reduce((total, group) => total + group.beacons.length, 0) === ROWS.length - 2,
  `${groups.reduce((total, group) => total + group.beacons.length, 0)} of ${ROWS.length - 2}`
);
record(
  'grouping',
  'a private beacon with no repo is never dropped',
  groupKeyFor(ROWS[3]) === 'no-repo' && byKey['no-repo'].beacons.some((row) => row.slug === 'mimirs-well'),
  'mimirs-well · no repo'
);
record(
  'grouping',
  'an empty group carries its own sentence',
  groupBeacons([])[1].empty.length > 0,
  groupBeacons([])[1].empty
);

record(
  'faces',
  'the two faces are named as faces',
  isFace(ROWS[5]) && isFace(ROWS[6]) && !isFace(ROWS[0]),
  'quantum-weaver · aethelred-cello'
);
record(
  'faces',
  'neither face lands in any group',
  !groups.some((group) => group.beacons.some((row) => isFace(row))),
  'open · private · no-repo hold none'
);
record(
  'faces',
  'neither face counts in a tally',
  byKey.open.beacons.length === 2,
  `open ${byKey.open.beacons.length} of 2, the faces uncounted`
);
record(
  'faces',
  'a face finds its own register row',
  faceBeacon(ROWS, 'quantum-weaver')?.name === 'Quantum-Weaver' &&
    faceBeacon(ROWS, 'aethelred-cello')?.name === 'aethelred-cello',
  'Quantum-Weaver · aethelred-cello'
);
record(
  'faces',
  'a face with no register row is null, never invented',
  faceBeacon([], 'quantum-weaver') === null,
  'null'
);

// ── the addresses ──────────────────────────────────────────────────────────

record(
  'address',
  'owner and repo parsed from a github url',
  JSON.stringify(parseRepoAddress('https://github.com/Quantum-Weaver/AudHDities')) ===
    JSON.stringify({ owner: 'Quantum-Weaver', repo: 'AudHDities' }),
  JSON.stringify(parseRepoAddress('https://github.com/Quantum-Weaver/AudHDities'))
);
record(
  'address',
  'a .git suffix is cut',
  parseRepoAddress('https://github.com/Quantum-Weaver/resonance-bridge.git')?.repo === 'resonance-bridge',
  String(parseRepoAddress('https://github.com/Quantum-Weaver/resonance-bridge.git')?.repo)
);
record(
  'address',
  'a non-github address is no address',
  parseRepoAddress('https://gitlab.com/a/b') === null,
  'null'
);
record('address', 'null is no address', parseRepoAddress(null) === null, 'null');

async function main() {
  // ── the GitHub reads ───────────────────────────────────────────────────────

  function answering(status: number, body: unknown): GatewayFetch {
    return async () =>
      ({
        ok: status >= 200 && status < 300,
        status,
        json: async () => body,
      }) as GatewayResponse;
  }

  const throwing: GatewayFetch = async () => {
    throw new Error('no route to host');
  };

  let calls = 0;
  const counting: GatewayFetch = async (url) => {
    calls += 1;
    return answering(200, { description: 'counted', full_name: url })(url);
  };

  const ok = await readRepoFacts(
    { owner: 'Quantum-Weaver', repo: 'AudHDities' },
    answering(200, {
      description: 'Where neurodivergent minds build digital sovereignty together.',
      pushed_at: '2026-09-08T21:14:00Z',
      stargazers_count: 12,
      language: 'TypeScript',
      open_issues_count: 3,
      archived: false,
    })
  );
  record(
    'github',
    'a 200 carries every fact the card shows',
    ok.facts?.language === 'TypeScript' &&
      ok.facts?.stargazers_count === 12 &&
      ok.facts?.open_issues_count === 3 &&
      ok.facts?.pushed_at === '2026-09-08T21:14:00Z' &&
      ok.facts?.archived === false,
    'TypeScript · 12 stars · 3 open · 2026-09-08T21:14:00Z · not archived'
  );

  const rateLimited = await readRepoFacts({ owner: 'a', repo: 'b' }, answering(403, {}));
  record(
    'github',
    'a 403 prints one calm line',
    rateLimited.facts === null && rateLimited.miss === missLine(403),
    String(rateLimited.miss)
  );

  const tooMany = await readRepoFacts({ owner: 'a', repo: 'b' }, answering(429, {}));
  record(
    'github',
    'a 429 prints one calm line',
    tooMany.facts === null && tooMany.miss === missLine(429),
    String(tooMany.miss)
  );

  const unreached = await readRepoFacts({ owner: 'a', repo: 'b' }, throwing);
  record(
    'github',
    'a thrown fetch prints one calm line',
    unreached.facts === null && unreached.miss === missLine('no answer'),
    String(unreached.miss)
  );

  const shapeless = await readRepoFacts({ owner: 'a', repo: 'b' }, answering(200, 'not an object'));
  record(
    'github',
    'a shapeless body degrades to nulls, never to invention',
    shapeless.facts !== null &&
      shapeless.facts.description === null &&
      shapeless.facts.stargazers_count === null &&
      shapeless.facts.archived === false,
    'description null · stars null · archived false'
  );

  calls = 0;
  const privateRead = await readBeaconFacts(ROWS[2], counting);
  record(
    'github',
    'a private repo is never called',
    privateRead === null && calls === 0,
    `${calls} calls`
  );

  calls = 0;
  const noRepoRead = await readBeaconFacts(ROWS[4], counting);
  record(
    'github',
    'a beacon with no repo is never called',
    noRepoRead === null && calls === 0,
    `${calls} calls`
  );

  calls = 0;
  const openRead = await readBeaconFacts(ROWS[0], counting);
  record(
    'github',
    'an open repo is called once',
    openRead !== null && calls === 1,
    `${calls} call`
  );
  record(
    'github',
    'readableOnGitHub agrees with the group',
    readableOnGitHub(ROWS[0]) && !readableOnGitHub(ROWS[2]) && !readableOnGitHub(ROWS[4]),
    'open true · private false · no repo false'
  );

  const face = await readUserFacts(
    'Quantum-Weaver',
    answering(200, { name: 'KP', bio: 'Consciousness architect', public_repos: 41, followers: 9 })
  );
  record(
    'faces',
    'a profile carries name, bio, repos, followers',
    face.facts?.name === 'KP' &&
      face.facts?.bio === 'Consciousness architect' &&
      face.facts?.public_repos === 41 &&
      face.facts?.followers === 9,
    'KP · Consciousness architect · 41 · 9'
  );
  const faceMiss = await readUserFacts('Quantum-Weaver', answering(429, {}));
  record(
    'faces',
    'a profile degrades the same way',
    faceMiss.facts === null && faceMiss.miss === missLine(429),
    String(faceMiss.miss)
  );

  // ── the request ────────────────────────────────────────────────────────────

  record(
    'request',
    'the status is a legal content_status',
    (Constants.public.Enums.content_status as readonly string[]).includes(REQUEST_STATUS),
    `${REQUEST_STATUS} ∈ ${Constants.public.Enums.content_status.join(' | ')}`
  );
  record(
    'request',
    'the category column takes free text, not an enum',
    !Object.keys(Constants.public.Enums).some((name) => name.includes('contact_category')),
    `${REQUEST_TABLE}.category · text · ${REQUEST_CATEGORY}`
  );
  record(
    'request',
    'application_type admits no collaboration value',
    !(Constants.public.Enums.application_type as readonly string[]).includes('collaboration'),
    Constants.public.Enums.application_type.join(' | ')
  );
  record(
    'request',
    'the subject carries the beacon slug',
    requestSubject('resonance-progenatrix') === 'collaborate · resonance-progenatrix',
    requestSubject('resonance-progenatrix')
  );
  record(
    'request',
    'the message carries the beacon and the note',
    requestMessage('resonance-progenatrix', 'resonance-progenatrix', 'i would like to help').includes(
      'i would like to help'
    ),
    requestMessage('resonance-progenatrix', 'resonance-progenatrix', 'i would like to help').split('\n')[0]
  );
  record(
    'request',
    'a message with no note carries the beacon alone',
    requestMessage('mimirs-well', 'mimirs-well', '   ').split('\n').length === 1,
    requestMessage('mimirs-well', 'mimirs-well', '   ')
  );

  // ── the admission ──────────────────────────────────────────────────────────

  const admittedPrivate = admitRequest(ROWS, 'resonance-progenatrix');
  record(
    'admission',
    'a private slug is admitted, its name taken from the register',
    admittedPrivate.admitted === true &&
      admittedPrivate.slug === 'resonance-progenatrix' &&
      admittedPrivate.beaconName === 'resonance-progenatrix',
    admittedPrivate.admitted ? `${admittedPrivate.slug} · ${admittedPrivate.beaconName}` : 'refused'
  );
  record(
    'admission',
    'a private slug with no repo is admitted',
    admitRequest(ROWS, 'mimirs-well').admitted === true,
    'mimirs-well'
  );

  const publicSlug = admitRequest(ROWS, 'audhdities');
  record(
    'admission',
    'a public slug is refused',
    publicSlug.admitted === false && publicSlug.refusal.what === NOT_PRIVATE,
    publicSlug.admitted ? 'admitted' : publicSlug.refusal.why
  );

  const unknownSlug = admitRequest(ROWS, 'no-such-beacon');
  record(
    'admission',
    'an unknown slug is refused',
    unknownSlug.admitted === false && unknownSlug.refusal.what === NOT_PRIVATE,
    unknownSlug.admitted ? 'admitted' : unknownSlug.refusal.why
  );

  const faceSlug = admitRequest(ROWS, 'aethelred-cello');
  record(
    'admission',
    'a face slug is refused',
    faceSlug.admitted === false && faceSlug.refusal.what === NOT_PRIVATE,
    faceSlug.admitted ? 'admitted' : faceSlug.refusal.why
  );

  const overLong = admitRequest(ROWS, 'a'.repeat(SLUG_MAX + 1));
  record(
    'admission',
    'an over-long slug is refused before any lookup',
    overLong.admitted === false && boundSlug('a'.repeat(SLUG_MAX + 1)) === null,
    overLong.admitted ? 'admitted' : `${SLUG_MAX + 1} characters · ${overLong.refusal.why}`
  );

  const punctuated = admitRequest(ROWS, "mimirs-well'); drop table beacons;--");
  record(
    'admission',
    'a punctuated slug is refused before any lookup',
    punctuated.admitted === false && boundSlug("mimirs-well'); drop table beacons;--") === null,
    punctuated.admitted ? 'admitted' : punctuated.refusal.why
  );
  record(
    'admission',
    'an empty slug is refused',
    admitRequest(ROWS, '   ').admitted === false && boundSlug('   ') === null,
    'null'
  );
  record(
    'admission',
    'a slug is matched lowercased',
    admitRequest(ROWS, '  RESONANCE-Progenatrix  ').admitted === true,
    String(boundSlug('  RESONANCE-Progenatrix  '))
  );

  record(
    'columns',
    'story and home are not selected',
    !BEACON_COLUMNS.split(', ').includes('story') && !BEACON_COLUMNS.split(', ').includes('home'),
    BEACON_COLUMNS
  );

  // ── the tally ──────────────────────────────────────────────────────────────

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

}

main();
