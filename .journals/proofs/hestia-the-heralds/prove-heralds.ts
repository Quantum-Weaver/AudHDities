// .journals/proofs/hestia-the-heralds/prove-heralds.ts
// Proves the herald seam and the dispatcher against fake clients and a fake
// fetch: the row shape, the channel each herald takes, the silence of a muted
// vessel, a failing insert that does not throw, and every road the mail can
// fail on. Nothing here reaches a base or the network.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { DEFAULT_CHANNEL, HERALD_TYPE, herald, type HeraldClient } from '../../../src/lib/heralds/write';
import { dispatch, heraldAndDeliver } from '../../../src/lib/heralds/dispatch';

interface Check {
  set: string;
  check: string;
  result: string;
  pass: boolean;
}

const checks: Check[] = [];

function record(set: string, check: string, result: unknown, expected: unknown) {
  const got = JSON.stringify(result);
  const want = JSON.stringify(expected);
  checks.push({ set, check, result: got, pass: got === want });
  if (got !== want) console.error(`FAIL ${set} · ${check}\n  got  ${got}\n  want ${want}`);
}

type Row = Record<string, unknown>;

interface FakeOptions {
  config?: { heralds_enabled: boolean; herald_channel: string } | null;
  configError?: boolean;
  insertError?: string | null;
  insertThrows?: boolean;
  email?: string | null;
  adminError?: boolean;
}

const inserted: Row[] = [];

function fakeClient(options: FakeOptions = {}): HeraldClient {
  const client = {
    from(table: string) {
      if (table === 'vessel_config') {
        return {
          select: () => ({
            eq: () => ({
              maybeSingle: async () =>
                options.configError
                  ? { data: null, error: { message: 'not readable' } }
                  : { data: options.config ?? null, error: null },
            }),
          }),
        };
      }
      return {
        insert: async (row: Row) => {
          if (options.insertThrows) throw new Error('the base refused the connection');
          inserted.push({ table, ...row });
          return options.insertError
            ? { data: null, error: { message: options.insertError } }
            : { data: null, error: null };
        },
      };
    },
    auth: {
      admin: {
        getUserById: async (id: string) =>
          options.adminError
            ? { data: { user: null }, error: { message: 'not allowed' } }
            : { data: { user: { id, email: options.email ?? null } }, error: null },
      },
    },
  };
  return client as unknown as HeraldClient;
}

const RECIPIENT = '11111111-1111-4111-8111-111111111111';
const ACTOR = '22222222-2222-4222-8222-222222222222';

const base = {
  recipient: RECIPIENT,
  type: HERALD_TYPE.ORDER_RECEIPT,
  title: 'Receipt: The Loom',
  body: 'The Loom is yours. 12 GBP paid.',
  referenceTable: 'exchanges',
  referenceId: '33333333-3333-4333-8333-333333333333',
} as const;

async function proveTheRow() {
  inserted.length = 0;
  const outcome = await herald(fakeClient(), { ...base });
  record('the row', 'a herald with no readable settings is written', outcome.written, true);
  record('the row', 'one row lands, on heralds', inserted.length === 1 && inserted[0].table, 'heralds');
  record('the row', 'the row carries every column the seam names', Object.keys(inserted[0]).sort(), [
    'body',
    'channel',
    'created_by',
    'herald_type',
    'recipient',
    'reference_id',
    'reference_table',
    'table',
    'title',
  ]);
  record('the row', 'the recipient is the vessel told', inserted[0].recipient, RECIPIENT);
  record('the row', 'created_by falls to the recipient when no actor acts', inserted[0].created_by, RECIPIENT);
  record('the row', 'the type is the kind handed', inserted[0].herald_type, 'order_receipt');
  record('the row', 'the channel falls to the house default', inserted[0].channel, DEFAULT_CHANNEL);
  record('the row', 'the reference names the row behind it', [inserted[0].reference_table, inserted[0].reference_id], [
    'exchanges',
    '33333333-3333-4333-8333-333333333333',
  ]);

  inserted.length = 0;
  await herald(fakeClient(), { recipient: RECIPIENT, type: HERALD_TYPE.BADGE_EARNED, title: 'a', body: 'b' });
  record('the row', 'a herald with no reference carries nulls', [inserted[0].reference_table, inserted[0].reference_id], [
    null,
    null,
  ]);

  inserted.length = 0;
  await herald(fakeClient(), { ...base, actor: ACTOR, type: HERALD_TYPE.MESSAGE_RECEIVED });
  record('the row', 'an actor signs the row they caused', inserted[0].created_by, ACTOR);
  record('the row', 'eight kinds are named, and no more', Object.values(HERALD_TYPE), [
    'order_receipt',
    'sale_made',
    'renewal_receipt',
    'payouts_live',
    'message_received',
    'quest_completed',
    'application_reviewed',
    'badge_earned',
  ]);
}

async function proveTheChannel() {
  inserted.length = 0;
  await herald(fakeClient({ config: { heralds_enabled: true, herald_channel: 'email' } }), { ...base });
  record('the channel', 'the vessel’s own setting is honoured', inserted[0].channel, 'email');

  inserted.length = 0;
  await herald(fakeClient({ config: { heralds_enabled: true, herald_channel: 'email' } }), {
    ...base,
    channel: 'in_app',
  });
  record('the channel', 'a channel handed by the caller stands over the setting', inserted[0].channel, 'in_app');

  inserted.length = 0;
  const muted = await herald(fakeClient({ config: { heralds_enabled: false, herald_channel: 'email' } }), { ...base });
  record('the channel', 'a vessel that keeps heralds off is not written to', [muted.written, inserted.length], [false, 0]);
  record('the channel', 'the silence says why', muted.written === false ? muted.reason : null, 'muted');

  inserted.length = 0;
  await herald(fakeClient({ configError: true }), { ...base });
  record('the channel', 'an unreadable setting falls to the default and still writes', inserted[0].channel, DEFAULT_CHANNEL);
}

async function proveTheFall() {
  inserted.length = 0;
  const failed = await herald(fakeClient({ insertError: 'new row violates row-level security policy' }), { ...base });
  record('the fall', 'a refused insert is reported, not thrown', failed.written, false);
  record(
    'the fall',
    'the fault carries the base’s own words',
    failed.written === false ? failed.note : null,
    'new row violates row-level security policy'
  );

  const threw = await herald(fakeClient({ insertThrows: true }), { ...base });
  record('the fall', 'a client that throws does not throw into the caller', threw.written, false);
  record('the fall', 'the throw is carried as a note', threw.written === false ? threw.note : null, 'the base refused the connection');
  record('the fall', 'a fallen herald is never counted written', threw.written === false ? threw.reason : null, 'not-written');
}

async function proveTheRoad() {
  const sends: Array<Record<string, unknown>> = [];
  const realFetch = globalThis.fetch;
  const realKey = process.env.RESEND_API_KEY;
  const realApp = process.env.NEXT_PUBLIC_APP_URL;
  process.env.RESEND_API_KEY = 'fake-key-for-this-proof';
  process.env.NEXT_PUBLIC_APP_URL = 'https://audhdities.test';

  globalThis.fetch = (async (url: string, init: { body?: string; headers?: Record<string, string> }) => {
    sends.push({ url, body: JSON.parse(init.body ?? '{}'), auth: init.headers?.Authorization });
    return { ok: true, status: 200, text: async () => '' };
  }) as unknown as typeof globalThis.fetch;

  const written = {
    recipient: RECIPIENT,
    herald_type: HERALD_TYPE.ORDER_RECEIPT,
    title: 'Receipt: The Loom',
    body: 'The Loom is yours.',
    channel: 'in_app' as const,
  };
  const letter = {
    from: 'AudHDities <contact@audhdities.com>',
    to: ['kin@audhdities.test'],
    subject: 'Receipt: The Loom',
    text: 'The Loom is yours.\n\nYour heralds: https://audhdities.test/notifications',
  };

  record('the road', 'an in-app herald sends nothing', await dispatch(fakeClient(), written), {
    sent: false,
    reason: 'in-app-only',
  });
  record('the road', 'a channel of none sends nothing', await dispatch(fakeClient(), { ...written, channel: 'none' }), {
    sent: false,
    reason: 'channel-silent',
  });
  record('the road', 'no send was attempted for either', sends.length, 0);

  const email = { ...written, channel: 'email' as const };
  record('the road', 'an email herald with no readable address is not sent', await dispatch(fakeClient(), email), {
    sent: false,
    reason: 'no-address',
  });
  record('the road', 'an address the caller holds is used', await dispatch(fakeClient(), email, { email: 'kin@audhdities.test' }), {
    sent: true,
    reason: 'sent',
  });
  record('the road', 'the mail goes to Resend', sends[0].url, 'https://api.resend.com/emails');
  record('the road', 'the letter carries the herald whole', sends[0].body, letter);
  record('the road', 'the key rides in the header alone', String(sends[0].auth).startsWith('Bearer '), true);

  record(
    'the road',
    'the base’s own key may read the address',
    await dispatch(fakeClient({ email: 'looked-up@audhdities.test' }), email, { lookup: true }),
    { sent: true, reason: 'sent' }
  );
  record('the road', 'the looked-up address is the one written to', sends[1].body, {
    ...letter,
    to: ['looked-up@audhdities.test'],
  });
  record(
    'the road',
    'a refused lookup leaves the herald standing and the mail unsent',
    await dispatch(fakeClient({ adminError: true }), email, { lookup: true }),
    { sent: false, reason: 'no-address' }
  );

  globalThis.fetch = (async () => {
    throw new Error('the network is gone');
  }) as unknown as typeof globalThis.fetch;
  record('the road', 'a road that throws is carried, not raised', await dispatch(fakeClient(), email, { email: 'kin@audhdities.test' }), {
    sent: false,
    reason: 'send-failed',
    note: 'the network is gone',
  });

  globalThis.fetch = (async () => ({
    ok: false,
    status: 422,
    text: async () => 'domain not verified',
  })) as unknown as typeof globalThis.fetch;
  record('the road', 'a refusal from Resend is recorded by its status', await dispatch(fakeClient(), email, { email: 'kin@audhdities.test' }), {
    sent: false,
    reason: 'send-failed',
    note: '422',
  });

  delete process.env.RESEND_API_KEY;
  record('the road', 'no key means no mail and no throw', await dispatch(fakeClient(), email, { email: 'kin@audhdities.test' }), {
    sent: false,
    reason: 'no-key',
  });

  process.env.RESEND_API_KEY = 'fake-key-for-this-proof';
  globalThis.fetch = (async () => ({ ok: true, status: 200, text: async () => '' })) as unknown as typeof globalThis.fetch;

  inserted.length = 0;
  const both = await heraldAndDeliver(
    fakeClient({ config: { heralds_enabled: true, herald_channel: 'email' } }),
    { ...base },
    { email: 'kin@audhdities.test' }
  );
  record('the road', 'the writer and the road run as one act', [both.herald.written, both.dispatch], [
    true,
    { sent: true, reason: 'sent' },
  ]);
  record('the road', 'that act wrote exactly one row', inserted.length, 1);

  inserted.length = 0;
  const none = await heraldAndDeliver(
    fakeClient({ config: { heralds_enabled: false, herald_channel: 'email' } }),
    { ...base },
    { email: 'kin@audhdities.test' }
  );
  record('the road', 'a muted vessel is neither written to nor mailed', [none.herald.written, none.dispatch, inserted.length], [
    false,
    null,
    0,
  ]);

  globalThis.fetch = realFetch;
  if (realKey === undefined) delete process.env.RESEND_API_KEY;
  else process.env.RESEND_API_KEY = realKey;
  if (realApp === undefined) delete process.env.NEXT_PUBLIC_APP_URL;
  else process.env.NEXT_PUBLIC_APP_URL = realApp;
}

async function main() {
  await proveTheRow();
  await proveTheChannel();
  await proveTheFall();
  await proveTheRoad();

  const failed = checks.filter((c) => !c.pass).length;
  writeFileSync(
    join(import.meta.dirname, 'results.json'),
    JSON.stringify({ checks: checks.length, failed, rows: checks }, null, 2)
  );
  console.log(`${checks.length} checks · ${checks.length - failed} passed · ${failed} failed`);
  process.exit(failed === 0 ? 0 : 1);
}

void main();
