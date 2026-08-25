// src/lib/economics/split.ts
// THE ONE PLACE a sale's split is computed. Lifted 2026-08-25 from
// PriceBreakdown.tsx (the six lines and the fee constant, unchanged in meaning)
// so the display layer and the webhook compute the same thing from the same code.
//
// THE STANDING MODEL is docs/architecture/residual-system.md. It is never
// restated differently here; these are its rules in integer arithmetic:
//
//   platform fee is a fixed percent of the sale
//   30% of that fee returns to the residual pool, 70% funds the machine
//   the residual DIAL (0-50, default 0) is the artisan's PLEDGE, taken from the
//     90% that is left after the fee, never from the fee
//   what remains of that 90% divides EQUALLY among this item's own
//     contributors, the creator among them, no per-contributor percentage
//   the covenant is each vessel's own 0-50 dial, a slice of THAT VESSEL'S OWN
//     share of a sale only
//   pool distributions arrive WHOLE and are never garnished
//
// ALL ARITHMETIC IS IN INTEGER MINOR UNITS. No float ever carries money here.
// The display layer formats; the ledger stores what this file produced.

/** Of every platform fee, this share returns to the residual pool. Fixed, always. */
export const FEE_TO_RESIDUAL_POOL_PERCENT = 30;

/**
 * THE ODD CENT — unwritten, KP's to rule.
 *
 * residual-system.md names the question and does not answer it: "The schema and
 * the code must say where the odd cent goes (a build question, asked once, never
 * silently rounded in the platform's favour)."
 *
 * Four candidate rules stand. This constant is the whole of the decision — one
 * word from KP moves it and every worked case re-runs against the new rule.
 *
 *   'to-the-contributors'    (a) the leftover minor units go to the item's
 *                                contributors, one cent each in a stable order
 *   'to-the-residual-pool'   (b) the leftover joins the pool line
 *   'to-the-covenant-pool'   (c) the leftover joins the dignity floor
 *   'held-on-the-exchange'   (d) an unallocated-cents line, carried until a
 *                                distribution can absorb it
 *
 * (a) ships until KP rules — the plainest reading of "we do not take dignity
 * away". Whichever he rules, TWO INVARIANTS HOLD AND ARE NOT OPTIONAL:
 *   1. the remainder is NEVER rounded toward the platform: the machine's 70%
 *      line never absorbs a leftover cent under any rule;
 *   2. the sum of the produced lines equals the gross, exactly, in minor units.
 */
export type OddCentRule =
  | 'to-the-contributors'
  | 'to-the-residual-pool'
  | 'to-the-covenant-pool'
  | 'held-on-the-exchange';

export const ODD_CENT_RULE: OddCentRule = 'to-the-contributors';

/** The six lines, in integer minor units. What PriceBreakdown draws. */
export interface SplitTotals {
  /** the whole sale */
  grossMinorUnits: number;
  /** gross x fee percent */
  platformFeeMinorUnits: number;
  /** 30% of the fee — rounded UP, so a leftover cent never lands on the machine */
  feeToResidualPoolMinorUnits: number;
  /** what is left of the fee */
  feeToMachineMinorUnits: number;
  /** gross minus the fee — the 90% */
  artisanProfitMinorUnits: number;
  /** the artisan's pledge, out of the 90% */
  pledgedMinorUnits: number;
  /** what is left of the 90%, to be divided equally */
  toContributorsMinorUnits: number;
}

export type SplitLineKind =
  | 'platform_fee'
  | 'fee_to_residual_pool'
  | 'fee_to_machine'
  | 'residual_pledge'
  | 'contributor_share'
  | 'covenant_pledge'
  | 'unallocated_cents';

export interface SplitLine {
  kind: SplitLineKind;
  amountMinorUnits: number;
  toSovereignId?: string;
  fromSovereignId?: string;
  toPool?: 'residual' | 'covenant';
  /**
   * Whether this line is a LEAF of the flow. The leaves sum to the gross
   * exactly. `platform_fee` is the parent of its own two lines and
   * `covenant_pledge` is a movement inside a contributor's own share, so
   * neither counts toward the sum.
   */
  countsTowardGross: boolean;
}

export interface SplitInput {
  /** integer cents, from the exchange row */
  grossMinorUnits: number;
  /** exchanges.platform_fee_percent (10) */
  platformFeePercent: number;
  /** wares.residual_pool_percent ?? 0 — this ware's own, never a default */
  residualPledgePercent: number;
  /**
   * ware_participants.user_id + wares.created_by, distinct, in a STABLE order
   * (the caller sorts by ware_participants.created_at, the creator last if they
   * are not already among them). Read by PRESENCE, not by publication:
   * is_public is a display toggle only, and a kept-quiet participant is paid.
   */
  contributorIds: string[];
  /** user_financial.covenant_pool_percent per vessel, 0-50, default 0 */
  covenantPercentByVessel?: Record<string, number>;
}

function pct(amountMinorUnits: number, percent: number): number {
  return Math.floor((amountMinorUnits * percent) / 100);
}

function pctRoundedUp(amountMinorUnits: number, percent: number): number {
  return Math.ceil((amountMinorUnits * percent) / 100);
}

/**
 * The six lines. Integer minor units in, integer minor units out.
 *
 * Every rounding here moves a cent AWAY from the machine and never toward it:
 * the fee is floored (so the leftover stays in the 90%), the pool's share of
 * the fee is rounded UP (so the leftover leaves the machine's line), and the
 * pledge is floored (so the leftover stays with the contributors).
 */
export function computeSplitTotals(
  grossMinorUnits: number,
  platformFeePercent: number,
  residualPledgePercent: number,
): SplitTotals {
  const gross = Math.max(0, Math.round(grossMinorUnits));
  const platformFee = pct(gross, platformFeePercent);
  const feeToResidualPool = pctRoundedUp(platformFee, FEE_TO_RESIDUAL_POOL_PERCENT);
  const feeToMachine = platformFee - feeToResidualPool;
  const artisanProfit = gross - platformFee;
  const pledged = pct(artisanProfit, residualPledgePercent);
  const toContributors = artisanProfit - pledged;

  return {
    grossMinorUnits: gross,
    platformFeeMinorUnits: platformFee,
    feeToResidualPoolMinorUnits: feeToResidualPool,
    feeToMachineMinorUnits: feeToMachine,
    artisanProfitMinorUnits: artisanProfit,
    pledgedMinorUnits: pledged,
    toContributorsMinorUnits: toContributors,
  };
}

/**
 * The flow's own lines, one per ledger row.
 *
 * Order is stable and is the order the ledger rows are written in:
 * platform_fee, fee_to_residual_pool, fee_to_machine, residual_pledge (only
 * when the artisan pledged), one contributor_share per contributor, then one
 * covenant_pledge per contributor whose own dial is above zero.
 */
export function computeSplit(input: SplitInput): SplitLine[] {
  const totals = computeSplitTotals(
    input.grossMinorUnits,
    input.platformFeePercent,
    input.residualPledgePercent,
  );
  const covenants = input.covenantPercentByVessel ?? {};
  const contributors = input.contributorIds.filter(
    (id, i, all) => Boolean(id) && all.indexOf(id) === i,
  );

  const lines: SplitLine[] = [
    {
      kind: 'platform_fee',
      amountMinorUnits: totals.platformFeeMinorUnits,
      countsTowardGross: false,
    },
    {
      kind: 'fee_to_residual_pool',
      amountMinorUnits: totals.feeToResidualPoolMinorUnits,
      toPool: 'residual',
      countsTowardGross: true,
    },
    {
      kind: 'fee_to_machine',
      amountMinorUnits: totals.feeToMachineMinorUnits,
      countsTowardGross: true,
    },
  ];

  if (totals.pledgedMinorUnits > 0) {
    lines.push({
      kind: 'residual_pledge',
      amountMinorUnits: totals.pledgedMinorUnits,
      toPool: 'residual',
      countsTowardGross: true,
    });
  }

  // What is left divides EQUALLY. No per-contributor percentage exists.
  const n = contributors.length;
  const each = n > 0 ? Math.floor(totals.toContributorsMinorUnits / n) : 0;
  let remainder = n > 0 ? totals.toContributorsMinorUnits - each * n : totals.toContributorsMinorUnits;

  const shares = contributors.map(() => each);

  // THE ODD CENT. One named constant decides where it lands; the machine's
  // line is not a candidate under any of them.
  if (ODD_CENT_RULE === 'to-the-contributors') {
    for (let i = 0; i < shares.length && remainder > 0; i += 1) {
      shares[i] += 1;
      remainder -= 1;
    }
  }

  contributors.forEach((id, i) => {
    lines.push({
      kind: 'contributor_share',
      amountMinorUnits: shares[i],
      toSovereignId: id,
      countsTowardGross: true,
    });
  });

  if (remainder > 0) {
    if (ODD_CENT_RULE === 'to-the-residual-pool') {
      const pool = lines.find((l) => l.kind === 'fee_to_residual_pool');
      if (pool) pool.amountMinorUnits += remainder;
      remainder = 0;
    } else if (ODD_CENT_RULE === 'to-the-covenant-pool') {
      lines.push({
        kind: 'covenant_pledge',
        amountMinorUnits: remainder,
        toPool: 'covenant',
        countsTowardGross: true,
      });
      remainder = 0;
    } else {
      // 'held-on-the-exchange', and the no-contributor case under any rule:
      // carried openly rather than absorbed anywhere.
      lines.push({
        kind: 'unallocated_cents',
        amountMinorUnits: remainder,
        countsTowardGross: true,
      });
      remainder = 0;
    }
  }

  // The covenant: a slice of a vessel's OWN share, moved to the dignity floor.
  // It is not an extra line of the sale — it is that share going somewhere
  // else — so it does not count toward the gross.
  contributors.forEach((id, i) => {
    const dial = covenants[id] ?? 0;
    if (dial <= 0) return;
    const amount = pct(shares[i], dial);
    if (amount <= 0) return;
    lines.push({
      kind: 'covenant_pledge',
      amountMinorUnits: amount,
      fromSovereignId: id,
      toPool: 'covenant',
      countsTowardGross: false,
    });
  });

  return lines;
}

/** The invariant, checkable by anyone: the leaves sum to the gross, exactly. */
export function sumOfLines(lines: SplitLine[]): number {
  return lines.reduce((t, l) => (l.countsTowardGross ? t + l.amountMinorUnits : t), 0);
}

/**
 * The display face of a minor-unit amount. Always two fraction digits, because
 * a split line reading "$0.3" where the answer is thirty cents is a number the
 * buyer has to translate. The split code produces cents; this renders them.
 */
export function formatMinorUnits(amountMinorUnits: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amountMinorUnits / 100);
}
