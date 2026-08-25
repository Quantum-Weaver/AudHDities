// src/lib/economics/recurrence.ts
// A RUNG IS A WARE THAT REPEATS (SPEC §6).
//
// Until KP runs docs/sql/023-the-bazaar-refined-DRAFT.sql, two facts about a
// recurring ware live in wares.metadata, which is Json and untyped:
//
//   metadata.recurring       = { interval: 'month' }
//   metadata.stripe_price_id = the Price KP created by his own hand
//
// That is tolerable for a POINTER TO STRIPE — Stripe is the authority on its
// own price object anyway — and intolerable for money the ledger must prove,
// which is why renewal idempotency waits on a typed, unique
// exchanges.stripe_invoice_id and does not ship in metadata.
//
// After the DRAFT runs, wares.billing_interval is the typed home of the first
// fact and this reader prefers it. Deliberately NOT a fifth pricing_model
// value: a rung is priced `fixed`, what differs is that it repeats.
//
// A LAMP CREATES NO STRIPE OBJECT. This file reads an id; it never mints one.

export type BillingInterval = 'month';

export interface Recurrence {
  interval: BillingInterval;
  stripePriceId: string | null;
}

type MetadataBearing = {
  metadata?: unknown;
  /** present only after the DRAFT's step 1 has run and GAIA has regenerated */
  billing_interval?: string | null;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

/** The Stripe Price id for a rung, or null. Never minted, only read. */
export function stripePriceIdOf(ware: MetadataBearing): string | null {
  const meta = asRecord(ware.metadata);
  const id = meta?.stripe_price_id;
  return typeof id === 'string' && id.length > 0 ? id : null;
}

/**
 * The recurrence of a ware, or null when it is a one-time ware — which is
 * every ware in the base today.
 */
export function recurrenceOf(ware: MetadataBearing): Recurrence | null {
  const typed = ware.billing_interval;
  if (typeof typed === 'string' && typed === 'month') {
    return { interval: 'month', stripePriceId: stripePriceIdOf(ware) };
  }

  const meta = asRecord(ware.metadata);
  const recurring = asRecord(meta?.recurring);
  const interval = recurring?.interval;
  if (interval === 'month') {
    return { interval: 'month', stripePriceId: stripePriceIdOf(ware) };
  }
  return null;
}

export function isRecurring(ware: MetadataBearing): boolean {
  return recurrenceOf(ware) !== null;
}

/** "each month" — said the same way everywhere, so no room invents its own. */
export function intervalPhrase(interval: BillingInterval): string {
  return interval === 'month' ? 'each month' : `each ${interval}`;
}
