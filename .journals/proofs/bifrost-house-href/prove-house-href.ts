// .journals/proofs/bifrost-house-href/prove-house-href.ts
// Proves the house href: the apex untouched, a realm's own prefix relative,
// a link that leaves the realm carried to the canonical host, and everything
// that is not an app path left as written. Run from the repo root:
//   npx tsx .journals/proofs/bifrost-house-href/prove-house-href.ts

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  CANONICAL_ORIGIN,
  REALM_HOSTS,
  houseHref,
  realmPrefixOf,
} from '@/lib/site/house-href';

interface Check {
  check: string;
  result: string;
  passed: boolean;
}

const checks: Check[] = [];

function record(check: string, passed: boolean, result: string) {
  checks.push({ check, result, passed });
}

/** One fixture: a path, a host, and the href expected of them. */
function expect(path: string, host: string | null | undefined, want: string, name: string) {
  const got = houseHref(path, host);
  record(name, got === want, `${String(host)} · ${path} → ${got}`);
}

// ── the table ─────────────────────────────────────────────────────────────

const GRAMMAR_HOST = 'grammar.audhdities.com';

record(
  'the table names the grammar host',
  REALM_HOSTS[GRAMMAR_HOST] === '/grammar',
  `${GRAMMAR_HOST} → ${REALM_HOSTS[GRAMMAR_HOST]}`
);
record('the canonical origin is the apex', CANONICAL_ORIGIN === 'https://audhdities.com', CANONICAL_ORIGIN);
record('the grammar host reads its prefix', realmPrefixOf(GRAMMAR_HOST) === '/grammar', String(realmPrefixOf(GRAMMAR_HOST)));
record('the apex reads no prefix', realmPrefixOf('audhdities.com') === null, String(realmPrefixOf('audhdities.com')));
record('no host reads no prefix', realmPrefixOf(null) === null, String(realmPrefixOf(null)));
record(
  'the host is read without its port and in any case',
  realmPrefixOf('GRAMMAR.AudHDities.com:3000') === '/grammar',
  String(realmPrefixOf('GRAMMAR.AudHDities.com:3000'))
);

// ── the apex and www ──────────────────────────────────────────────────────

expect('/about', 'audhdities.com', '/about', 'the apex leaves an app path alone');
expect('/grammar/explore', 'audhdities.com', '/grammar/explore', 'the apex leaves a grammar path alone');
expect('/about', 'www.audhdities.com', '/about', 'www leaves an app path alone');
expect('/about', null, '/about', 'no host leaves an app path alone');
expect('/about', undefined, '/about', 'an absent host leaves an app path alone');

// ── the realm keeps its own prefix relative ───────────────────────────────

expect('/grammar', GRAMMAR_HOST, '/grammar', "the realm's own door stays relative");
expect('/grammar/explore', GRAMMAR_HOST, '/grammar/explore', "a room under the realm's prefix stays relative");
expect('/grammar#house-words', GRAMMAR_HOST, '/grammar#house-words', "an anchor on the realm's own door stays relative");

// ── a link that leaves the realm ──────────────────────────────────────────

expect('/about', GRAMMAR_HOST, `${CANONICAL_ORIGIN}/about`, 'about leaves the realm for the canonical host');
expect('/library', GRAMMAR_HOST, `${CANONICAL_ORIGIN}/library`, 'library leaves the realm for the canonical host');
expect('/terms', GRAMMAR_HOST, `${CANONICAL_ORIGIN}/terms`, 'terms leaves the realm for the canonical host');
expect('/', GRAMMAR_HOST, `${CANONICAL_ORIGIN}/`, 'the house door leaves the realm for the canonical host');
expect('/grammarian', GRAMMAR_HOST, `${CANONICAL_ORIGIN}/grammarian`, 'a path that only begins with the prefix letters leaves the realm');

// ── what is not an app path ───────────────────────────────────────────────

expect('mailto:audhdities@proton.me', GRAMMAR_HOST, 'mailto:audhdities@proton.me', 'a mailto address is left as written');
expect('tel:+15550000000', GRAMMAR_HOST, 'tel:+15550000000', 'a tel address is left as written');
expect('https://github.com/quantum-weaver', GRAMMAR_HOST, 'https://github.com/quantum-weaver', 'an external https address is left as written');
expect('http://example.com/x', GRAMMAR_HOST, 'http://example.com/x', 'an external http address is left as written');
expect('#house-words', GRAMMAR_HOST, '#house-words', 'a bare anchor is left as written');
expect('//example.com/x', GRAMMAR_HOST, '//example.com/x', 'a protocol-relative address is left as written');

// ── an unknown subdomain ──────────────────────────────────────────────────

expect('/about', 'kp.audhdities.com', '/about', 'an unknown subdomain leaves an app path alone');
expect('/about', 'artifacts.audhdities.com', '/about', 'the artifacts host leaves an app path alone');
expect('/about', 'localhost:3000', '/about', 'localhost leaves an app path alone');

// ── the telling ───────────────────────────────────────────────────────────

const failed = checks.filter((c) => !c.passed);
const results = {
  ran: new Date().toISOString(),
  helper: 'src/lib/site/house-href.ts',
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
