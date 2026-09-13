// src/lib/economics/ledger.ts
import { computeSplit, ODD_CENT_RULE, type SplitLine } from './split';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/generated/supabase/database.types';

/** The server-side client the webhook already holds. Never a browser client. */
type Db = SupabaseClient<Database>;

export interface ExchangeForLedger {
  id: string;
  buyer_id: string;
  ware_id: string | null;
  work_id: string | null;
  gross_amount: number;
  currency: string;
  platform_fee_percent: number;
}

export interface WareForLedger {
  id: string;
  name: string;
  created_by: string;
  residual_pool_percent: number | null;
}

/** The ware or the work the exchange carried across, read the same way. */
interface SubjectForLedger extends WareForLedger {
  kind: 'ware' | 'work';
}

export interface LedgerOutcome {
  wrote: number;
  skipped: 'already-written' | 'no-subject' | null;
  note?: string;
}

const DESCRIPTIONS: Record<string, string> = {
  platform_fee: 'The platform fee on this exchange.',
  fee_to_residual_pool: 'The share of the fee that returns to the residual pool.',
  fee_to_machine: 'The share of the fee that funds the machine.',
  residual_pledge: "The artisan's pledge to the residual pool, out of this ware's own profit.",
  contributor_share: "A contributor's equal share of what is left.",
  covenant_pledge: "A vessel's own covenant, a slice of their own share.",
  unallocated_cents: 'Cents that no line could take whole, carried openly.',
};

/**
 * Write the flow's own lines for one COMPLETED exchange, for a ware or a work.
 *
 * Reads first: if any ledger row already carries this exchange's id, it writes
 * nothing and says so. This is the same fact the .eq('status','pending') guard
 * protects at the exchanges row.
 *
 * A ware is handed in; a work is read from the exchange's own work_id.
 */
export async function writeLedgerRowsForExchange(
  db: Db,
  exchange: ExchangeForLedger,
  ware: WareForLedger | null,
  eventAtIso: string,
): Promise<LedgerOutcome> {
  // ── idempotency, first ────────────────────────────────────────────────
  const existing = await db
    .from('ledger')
    .select('id')
    .eq('reference_table', 'exchanges')
    .eq('reference_id', exchange.id);
  const alreadyWritten = Array.isArray(existing.data) && existing.data.length > 0;
  if (alreadyWritten) {
    return { wrote: 0, skipped: 'already-written' };
  }

  // ── the ware, or the work when no ware stands ─────────────────────────
  const subject = await subjectOf(db, exchange, ware);
  if (!subject) {
    return {
      wrote: 0,
      skipped: 'no-subject',
      note: 'The exchange carries no ware and no work; nothing was written and nothing was lost.',
    };
  }

  // ── the contributors, read by PRESENCE ────────────────────────────────
  const contributorIds: string[] = [];
  for (const row of await participantsOf(db, subject)) {
    if (row?.user_id && !contributorIds.includes(row.user_id)) {
      contributorIds.push(row.user_id);
    }
  }
  if (subject.created_by && !contributorIds.includes(subject.created_by)) {
    contributorIds.push(subject.created_by);
  }

  // ── each vessel's own covenant dial ───────────────────────────────────
  const covenantPercentByVessel: Record<string, number> = {};
  if (contributorIds.length > 0) {
    const financial = await db
      .from('user_financial')
      .select('created_by, covenant_pool_percent')
      .in('created_by', contributorIds);
    if (Array.isArray(financial.data)) {
      for (const row of financial.data as Array<{ created_by: string | null; covenant_pool_percent: number | null }>) {
        if (row?.created_by) {
          covenantPercentByVessel[row.created_by] = row.covenant_pool_percent ?? 0;
        }
      }
    }
  }

  // ── the pools ─────────────────────────────────────────────────────────
  const residualPool = await db.from('residual_pool').select('id').eq('is_active', true).limit(1);
  const covenantPool = await db.from('covenant_pool').select('id').eq('is_active', true).limit(1);
  const residualPoolId = firstId(residualPool.data);
  const covenantPoolId = firstId(covenantPool.data);

  // ── the split, from the one function ──────────────────────────────────
  const grossMinorUnits = Math.round((exchange.gross_amount ?? 0) * 100);
  const lines = computeSplit({
    grossMinorUnits,
    platformFeePercent: exchange.platform_fee_percent ?? 10,
    residualPledgePercent: subject.residual_pool_percent ?? 0,
    contributorIds,
    covenantPercentByVessel,
  });

  const breakdown = {
    gross_minor_units: grossMinorUnits,
    platform_fee_percent: exchange.platform_fee_percent ?? 10,
    residual_pledge_percent: subject.residual_pool_percent ?? 0,
    contributor_headcount: contributorIds.length,
    odd_cent_rule: ODD_CENT_RULE,
    subject_kind: subject.kind,
    ware_id: subject.kind === 'ware' ? subject.id : null,
    ware_name: subject.kind === 'ware' ? subject.name : null,
    work_id: subject.kind === 'work' ? subject.id : null,
    work_name: subject.kind === 'work' ? subject.name : null,
  };

  const rows = lines
    .filter((l) => l.amountMinorUnits > 0)
    .map((line: SplitLine) => ({
      amount: line.amountMinorUnits / 100,
      currency: exchange.currency || 'usd',
      entry_type: line.kind,
      description: DESCRIPTIONS[line.kind] ?? line.kind,
      // The webhook's own event timestamp, never now().
      event_at: eventAtIso,
      breakdown: breakdown as never,
      from_sovereign_id: line.fromSovereignId ?? (line.kind === 'platform_fee' ? exchange.buyer_id : null),
      to_sovereign_id: line.toSovereignId ?? null,
      from_pool_id: null,
      to_pool_id:
        line.toPool === 'residual' ? residualPoolId
          : line.toPool === 'covenant' ? covenantPoolId
            : null,
      // THE IDEMPOTENCY KEY. Always this pair, on every row.
      reference_table: 'exchanges',
      reference_id: exchange.id,
    }));

  if (rows.length === 0) {
    return { wrote: 0, skipped: null, note: 'The split produced no line above zero.' };
  }

  const written = await db.from('ledger').insert(rows);
  if (written.error) {
    console.error('The ledger rows were not written:', written.error);
    return { wrote: 0, skipped: null, note: 'The insert was refused; nothing was written.' };
  }

  return { wrote: rows.length, skipped: null };
}

/** The ware when one was handed over, else the work the exchange names. */
async function subjectOf(
  db: Db,
  exchange: ExchangeForLedger,
  ware: WareForLedger | null,
): Promise<SubjectForLedger | null> {
  if (ware) return { kind: 'ware', ...ware };
  if (!exchange.work_id) return null;

  const work = await db
    .from('works')
    .select('id, name, created_by, residual_pool_percent')
    .eq('id', exchange.work_id)
    .maybeSingle();

  const row = work.data;
  if (!row) return null;
  return {
    kind: 'work',
    id: row.id,
    name: row.name,
    created_by: row.created_by,
    residual_pool_percent: row.residual_pool_percent,
  };
}

/** ware_participants for a ware, work_participants for a work, oldest first. */
async function participantsOf(
  db: Db,
  subject: SubjectForLedger,
): Promise<Array<{ user_id: string }>> {
  const read = subject.kind === 'ware'
    ? await db
      .from('ware_participants')
      .select('user_id, created_at')
      .eq('ware_id', subject.id)
      .order('created_at', { ascending: true })
    : await db
      .from('work_participants')
      .select('user_id, created_at')
      .eq('work_id', subject.id)
      .order('created_at', { ascending: true });

  return Array.isArray(read.data) ? (read.data as Array<{ user_id: string }>) : [];
}

function firstId(data: unknown): string | null {
  if (Array.isArray(data) && data.length > 0) {
    const row = data[0] as { id?: string };
    return row?.id ?? null;
  }
  return null;
}
