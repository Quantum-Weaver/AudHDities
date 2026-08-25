// src/lib/economics/ledger.ts
// THE LEDGER ROWS (SPEC §5).
//
// KP ⚛ 2026-08-24: "when hermes is refined, we will make certain the ledger
// rows are being created for our transparency."
//
// Read with "checkout is using stripe, why would we duplicate the data
// capture?", the two rulings compose and do not collide: Stripe holds the
// payment, the webhook completes the ONE exchanges row, and DOWNSTREAM of that
// completed exchange the ledger rows are written. A ledger row written AT
// CHECKOUT, beside the row the webhook was already completing, is what stays
// refused.
//
// THE LAWS THESE ROWS OBEY
//   written server-side, in the webhook handler, never by a client;
//   IDEMPOTENT on the exchange id — reference_table='exchanges' +
//     reference_id is the key, read before any write, and a re-fired webhook
//     writes nothing twice;
//   nothing is ever deleted — append-only, and a refund would be a new row;
//   a pool distribution is never garnished;
//   no per-vessel balance table is created — the pool is the balance.
//
// Whether residual_pool.current_balance and covenant_pool.current_balance are
// incremented here or derived from the ledger at read time is
// unwritten — his to rule. This file writes the ledger rows ONLY and leaves
// the pool rows untouched: the derivation is honest and reversible, an
// increment is neither.
import { computeSplit, ODD_CENT_RULE, type SplitLine } from './split';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/generated/supabase/database.types';

/** The server-side client the webhook already holds. Never a browser client. */
type Db = SupabaseClient<Database>;

export interface ExchangeForLedger {
  id: string;
  buyer_id: string;
  ware_id: string | null;
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

export interface LedgerOutcome {
  wrote: number;
  skipped: 'already-written' | 'no-ware' | null;
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
 * Write the flow's own lines for one COMPLETED exchange.
 *
 * Reads first: if any ledger row already carries this exchange's id, it writes
 * nothing and says so. This is the same fact the .eq('status','pending') guard
 * protects at the exchanges row.
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

  if (!ware) {
    return {
      wrote: 0,
      skipped: 'no-ware',
      note: 'The exchange carries no ware; nothing was written and nothing was lost.',
    };
  }

  // ── the contributors, read by PRESENCE ────────────────────────────────
  // is_public is a display toggle only; existence is economics. A kept-quiet
  // participant is paid. The creator is enrolled as a contributor to their own
  // ware automatically (residual-system.md, rule 2).
  const participants = await db
    .from('ware_participants')
    .select('user_id, created_at')
    .eq('ware_id', ware.id)
    .order('created_at', { ascending: true });

  const contributorIds: string[] = [];
  if (Array.isArray(participants.data)) {
    for (const row of participants.data as Array<{ user_id: string }>) {
      if (row?.user_id && !contributorIds.includes(row.user_id)) {
        contributorIds.push(row.user_id);
      }
    }
  }
  if (ware.created_by && !contributorIds.includes(ware.created_by)) {
    contributorIds.push(ware.created_by);
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
    residualPledgePercent: ware.residual_pool_percent ?? 0,
    contributorIds,
    covenantPercentByVessel,
  });

  const breakdown = {
    gross_minor_units: grossMinorUnits,
    platform_fee_percent: exchange.platform_fee_percent ?? 10,
    residual_pledge_percent: ware.residual_pool_percent ?? 0,
    contributor_headcount: contributorIds.length,
    odd_cent_rule: ODD_CENT_RULE,
    ware_id: ware.id,
    ware_name: ware.name,
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

function firstId(data: unknown): string | null {
  if (Array.isArray(data) && data.length > 0) {
    const row = data[0] as { id?: string };
    return row?.id ?? null;
  }
  return null;
}
