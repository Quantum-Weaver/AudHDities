// .journals/proofs/tiers-the-standing-support/prove-tiers.ts
// Proves the three cadences of standing support and the ledger's work road.
// Every input is a fixture: no Stripe, no base, no network. Run from the repo root:
//   npx tsx .journals/proofs/tiers-the-standing-support/prove-tiers.ts

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/generated/supabase/database.types';
import {
  SUPPORT_CADENCES,
  cadenceOf,
  dateInputFromSupportEndsAt,
  recurrenceOf,
  supportEndsAtFromDateInput,
  supportEndsAtOf,
  supportHasEnded,
} from '@/lib/economics/recurrence';
import { writeLedgerRowsForExchange } from '@/lib/economics/ledger';

interface Check {
  check: string;
  result: string;
  passed: boolean;
}

const checks: Check[] = [];

function record(check: string, passed: boolean, result: string) {
  checks.push({ check, result, passed });
}

// ── the three cadences ────────────────────────────────────────────────────

const ONCE = { billing_interval: null, stripe_price_id: null, support_ends_at: null };
const MONTHLY = { billing_interval: 'month', stripe_price_id: 'price_rung', support_ends_at: null };
const MONTHLY_UNTIL = {
  billing_interval: 'month',
  stripe_price_id: 'price_rung',
  support_ends_at: '2027-01-01',
};

const onceR = recurrenceOf(ONCE);
const monthlyR = recurrenceOf(MONTHLY);
const untilR = recurrenceOf(MONTHLY_UNTIL);

record('a one-time ware reads no recurrence', onceR === null, String(onceR));
record('a one-time ware reads the once cadence', cadenceOf(ONCE) === 'once', cadenceOf(ONCE));
record(
  'a monthly ware reads the month interval',
  monthlyR?.interval === 'month',
  String(monthlyR?.interval),
);
record(
  'a monthly ware reads its own Price id',
  monthlyR?.stripePriceId === 'price_rung',
  String(monthlyR?.stripePriceId),
);
record('a monthly ware reads no end', monthlyR?.endsAt === null, String(monthlyR?.endsAt));
record(
  'a monthly ware reads no cancel second',
  monthlyR?.cancelAt === null,
  String(monthlyR?.cancelAt),
);
record('a monthly ware reads the month cadence', cadenceOf(MONTHLY) === 'month', cadenceOf(MONTHLY));
record(
  'a monthly-until ware reads the month interval',
  untilR?.interval === 'month',
  String(untilR?.interval),
);
record(
  'a monthly-until ware reads its end as ISO',
  untilR?.endsAt === '2027-01-01T00:00:00.000Z',
  String(untilR?.endsAt),
);
record(
  'a monthly-until ware reads its end in whole seconds',
  untilR?.cancelAt === 1798761600,
  String(untilR?.cancelAt),
);
record(
  'a monthly-until ware reads the month_until cadence',
  cadenceOf(MONTHLY_UNTIL) === 'month_until',
  cadenceOf(MONTHLY_UNTIL),
);
record(
  'the form offers the three cadences',
  SUPPORT_CADENCES.map((c) => c.value).join(',') === 'once,month,month_until',
  SUPPORT_CADENCES.map((c) => c.value).join(','),
);

// ── what each case sends ──────────────────────────────────────────────────

record('once takes the payment mode', onceR === null, 'mode=payment');
record(
  'monthly takes the subscription mode with no end',
  monthlyR !== null && monthlyR.cancelAt === null,
  'mode=subscription · subscription_data={metadata}',
);
record(
  'monthly-until takes the subscription mode carrying its end',
  untilR !== null && untilR.cancelAt === 1798761600,
  `mode=subscription · subscription_data={metadata + supportEndsAt=${untilR?.endsAt} cancelAt=${untilR?.cancelAt}}`,
);

// ── the end as the column, the metadata and the date field ────────────────

const META_FLAT = { billing_interval: 'month', metadata: { support_ends_at: '2027-01-01' } };
const META_BLOCK = { metadata: { recurring: { interval: 'month', ends_at: '2027-06-30' } } };
const BOTH = { support_ends_at: '2027-01-01', metadata: { support_ends_at: '2030-01-01' } };

record(
  'the end is read from the metadata when no column carries it',
  supportEndsAtOf(META_FLAT) === '2027-01-01T00:00:00.000Z',
  String(supportEndsAtOf(META_FLAT)),
);
record(
  'the end is read from the metadata recurring block',
  supportEndsAtOf(META_BLOCK) === '2027-06-30T00:00:00.000Z',
  String(supportEndsAtOf(META_BLOCK)),
);
record(
  'the column wins over the metadata',
  supportEndsAtOf(BOTH) === '2027-01-01T00:00:00.000Z',
  String(supportEndsAtOf(BOTH)),
);
record(
  'an unreadable end reads as none',
  supportEndsAtOf({ support_ends_at: 'not a day' }) === null,
  String(supportEndsAtOf({ support_ends_at: 'not a day' })),
);
record(
  'an empty date field reads as none',
  supportEndsAtFromDateInput('  ') === null,
  String(supportEndsAtFromDateInput('  ')),
);
record(
  'a date field becomes the ISO moment',
  supportEndsAtFromDateInput('2027-01-01') === '2027-01-01T00:00:00.000Z',
  String(supportEndsAtFromDateInput('2027-01-01')),
);
record(
  'the ISO moment becomes the date field again',
  dateInputFromSupportEndsAt('2027-01-01T00:00:00.000Z') === '2027-01-01',
  dateInputFromSupportEndsAt('2027-01-01T00:00:00.000Z'),
);
record(
  'no end leaves the date field empty',
  dateInputFromSupportEndsAt(null) === '',
  `"${dateInputFromSupportEndsAt(null)}"`,
);

const NOON = Math.floor(Date.parse('2026-09-13T12:00:00.000Z') / 1000);
const ENDED = recurrenceOf({ billing_interval: 'month', support_ends_at: '2026-01-01' });

record('an end still ahead has not passed', untilR !== null && !supportHasEnded(untilR, NOON), 'false');
record('an end already behind has passed', ENDED !== null && supportHasEnded(ENDED, NOON), 'true');
record(
  'a monthly ware with no end never passes',
  monthlyR !== null && !supportHasEnded(monthlyR, NOON),
  'false',
);

// ── the fake base ─────────────────────────────────────────────────────────

type Row = Record<string, unknown>;

/** One read: eq and in narrow the fixture, await yields the rows. */
class FakeQuery {
  private rows: Row[];

  constructor(rows: Row[]) {
    this.rows = [...rows];
  }

  select(): FakeQuery {
    return this;
  }

  eq(column: string, value: unknown): FakeQuery {
    this.rows = this.rows.filter((r) => r[column] === value);
    return this;
  }

  in(column: string, values: unknown[]): FakeQuery {
    this.rows = this.rows.filter((r) => values.includes(r[column]));
    return this;
  }

  order(): FakeQuery {
    return this;
  }

  limit(n: number): FakeQuery {
    this.rows = this.rows.slice(0, n);
    return this;
  }

  maybeSingle(): Promise<{ data: Row | null; error: null }> {
    return Promise.resolve({ data: this.rows[0] ?? null, error: null });
  }

  then<T>(onfulfilled: (value: { data: Row[]; error: null }) => T): Promise<T> {
    return Promise.resolve({ data: this.rows, error: null }).then(onfulfilled);
  }
}

/** The tables the ledger reads, and the rows it handed to the insert. */
class FakeDb {
  readonly written: Row[] = [];

  constructor(private readonly tables: Record<string, Row[]>) {}

  from(table: string) {
    const rows = this.tables[table] ?? [];
    return {
      select: () => new FakeQuery(rows),
      insert: (written: Row[]) => {
        this.written.push(...written);
        return Promise.resolve({ error: null });
      },
    };
  }
}

function asDb(db: FakeDb): SupabaseClient<Database> {
  return db as unknown as SupabaseClient<Database>;
}

const EVENT_AT = '2026-09-13T12:00:00.000Z';

const WORK_TABLES: Record<string, Row[]> = {
  ledger: [],
  works: [{
    id: 'work-1',
    name: 'The Long Piece',
    created_by: 'vessel-a',
    residual_pool_percent: 10,
  }],
  work_participants: [
    { user_id: 'vessel-a', work_id: 'work-1', created_at: '2026-01-01T00:00:00.000Z' },
    { user_id: 'vessel-b', work_id: 'work-1', created_at: '2026-02-01T00:00:00.000Z' },
  ],
  ware_participants: [],
  user_financial: [{ created_by: 'vessel-b', covenant_pool_percent: 10 }],
  residual_pool: [{ id: 'residual-pool-1', is_active: true }],
  covenant_pool: [{ id: 'covenant-pool-1', is_active: true }],
};

const WORK_EXCHANGE = {
  id: 'exchange-work-1',
  buyer_id: 'vessel-buyer',
  ware_id: null,
  work_id: 'work-1',
  gross_amount: 40,
  currency: 'usd',
  platform_fee_percent: 10,
};

/** The ledger reads and writes through awaits; they run inside one road. */
async function main() {
  const workDb = new FakeDb(WORK_TABLES);
  const workOutcome = await writeLedgerRowsForExchange(asDb(workDb), WORK_EXCHANGE, null, EVENT_AT);

  record(
    'a work exchange is no longer skipped',
    workOutcome.skipped === null,
    String(workOutcome.skipped),
  );
  record(
    'a work exchange with two participants writes seven rows',
    workOutcome.wrote === 7,
    String(workOutcome.wrote),
  );

  const kinds = workDb.written.map((r) => String(r.entry_type)).join(', ');
  record(
    'the seven rows are the flow’s own lines',
    kinds === 'platform_fee, fee_to_residual_pool, fee_to_machine, residual_pledge, '
      + 'contributor_share, contributor_share, covenant_pledge',
    kinds,
  );

  const amounts = workDb.written.map((r) => Number(r.amount));
  record(
    'the amounts are the split of forty',
    amounts.join(' · ') === '4 · 1.2 · 2.8 · 3.6 · 16.2 · 16.2 · 1.62',
    amounts.map((a) => a.toFixed(2)).join(' · '),
  );

  const leaves = amounts[1] + amounts[2] + amounts[3] + amounts[4] + amounts[5];
  record(
    'the leaves sum to the gross exactly',
    Math.round(leaves * 100) === 4000,
    `${leaves.toFixed(2)} of 40.00`,
  );

  const shares = workDb.written.filter((r) => r.entry_type === 'contributor_share');
  record(
    'both participants hold a share',
    shares.map((r) => String(r.to_sovereign_id)).join(',') === 'vessel-a,vessel-b',
    shares.map((r) => String(r.to_sovereign_id)).join(','),
  );
  record(
    'the covenant comes out of the second vessel’s own share',
    workDb.written.some(
      (r) => r.entry_type === 'covenant_pledge'
        && r.from_sovereign_id === 'vessel-b'
        && r.to_pool_id === 'covenant-pool-1',
    ),
    'vessel-b → covenant-pool-1 · 1.62',
  );
  record(
    'the platform fee comes from the buyer',
    workDb.written[0]?.from_sovereign_id === 'vessel-buyer',
    String(workDb.written[0]?.from_sovereign_id),
  );
  record(
    'every row carries the exchange as its key',
    workDb.written.every(
      (r) => r.reference_table === 'exchanges' && r.reference_id === 'exchange-work-1',
    ),
    'exchanges · exchange-work-1',
  );
  record(
    'every row carries the event moment it was handed',
    workDb.written.every((r) => r.event_at === EVENT_AT),
    EVENT_AT,
  );

  const workBreakdown = workDb.written[0]?.breakdown as Row;
  record(
    'the breakdown names the work, not a ware',
    workBreakdown?.subject_kind === 'work'
      && workBreakdown?.work_id === 'work-1'
      && workBreakdown?.work_name === 'The Long Piece'
      && workBreakdown?.ware_id === null,
    `subject_kind=${String(workBreakdown?.subject_kind)} work_id=${String(workBreakdown?.work_id)} ware_id=${String(workBreakdown?.ware_id)}`,
  );

  // ── the ware road, unchanged ──────────────────────────────────────────────

  const WARE_TABLES: Record<string, Row[]> = {
    ledger: [],
    work_participants: [],
    ware_participants: [
      { user_id: 'vessel-a', ware_id: 'ware-1', created_at: '2026-01-01T00:00:00.000Z' },
      { user_id: 'vessel-b', ware_id: 'ware-1', created_at: '2026-02-01T00:00:00.000Z' },
    ],
    user_financial: [{ created_by: 'vessel-b', covenant_pool_percent: 10 }],
    residual_pool: [{ id: 'residual-pool-1', is_active: true }],
    covenant_pool: [{ id: 'covenant-pool-1', is_active: true }],
  };

  const wareDb = new FakeDb(WARE_TABLES);
  const wareOutcome = await writeLedgerRowsForExchange(
    asDb(wareDb),
    { ...WORK_EXCHANGE, id: 'exchange-ware-1', ware_id: 'ware-1', work_id: null },
    { id: 'ware-1', name: 'The Rung', created_by: 'vessel-a', residual_pool_percent: 10 },
    EVENT_AT,
  );
  const wareBreakdown = wareDb.written[0]?.breakdown as Row;

  record('a ware exchange still writes seven rows', wareOutcome.wrote === 7, String(wareOutcome.wrote));
  record(
    'the ware breakdown still names the ware',
    wareBreakdown?.ware_id === 'ware-1' && wareBreakdown?.work_id === null,
    `ware_id=${String(wareBreakdown?.ware_id)} work_id=${String(wareBreakdown?.work_id)}`,
  );

  // ── the three roads that write nothing ────────────────────────────────────

  const writtenDb = new FakeDb({
    ...WORK_TABLES,
    ledger: [{ id: 'ledger-1', reference_table: 'exchanges', reference_id: 'exchange-work-1' }],
  });
  const writtenOutcome = await writeLedgerRowsForExchange(
    asDb(writtenDb),
    WORK_EXCHANGE,
    null,
    EVENT_AT,
  );
  record(
    'a work exchange already written writes nothing twice',
    writtenOutcome.skipped === 'already-written' && writtenDb.written.length === 0,
    `${String(writtenOutcome.skipped)} · ${writtenDb.written.length} rows`,
  );

  const barrenDb = new FakeDb(WORK_TABLES);
  const barrenOutcome = await writeLedgerRowsForExchange(
    asDb(barrenDb),
    { ...WORK_EXCHANGE, id: 'exchange-barren', ware_id: null, work_id: null },
    null,
    EVENT_AT,
  );
  record(
    'an exchange with neither ware nor work writes nothing',
    barrenOutcome.skipped === 'no-subject' && barrenDb.written.length === 0,
    `${String(barrenOutcome.skipped)} · ${barrenDb.written.length} rows`,
  );

  const missingDb = new FakeDb({ ...WORK_TABLES, works: [] });
  const missingOutcome = await writeLedgerRowsForExchange(
    asDb(missingDb),
    { ...WORK_EXCHANGE, id: 'exchange-missing' },
    null,
    EVENT_AT,
  );
  record(
    'an exchange whose work is gone writes nothing',
    missingOutcome.skipped === 'no-subject' && missingDb.written.length === 0,
    `${String(missingOutcome.skipped)} · ${missingDb.written.length} rows`,
  );

  // ── the tally ─────────────────────────────────────────────────────────────

  const passed = checks.filter((c) => c.passed).length;
  for (const c of checks) {
    console.log(`${c.passed ? 'PASS' : 'FAIL'}  ${c.check} — ${c.result}`);
  }
  console.log(`\n${passed} of ${checks.length} checks passed.`);

  writeFileSync(
    join(process.cwd(), '.journals/proofs/tiers-the-standing-support/results.json'),
    `${JSON.stringify({ passed, total: checks.length, checks }, null, 2)}\n`,
    'utf-8',
  );

  if (passed !== checks.length) process.exitCode = 1;
}

void main();
