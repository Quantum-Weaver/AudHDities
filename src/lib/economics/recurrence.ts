// src/lib/economics/recurrence.ts
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
