// src/lib/economics/recurrence.ts
// A LAMP CREATES NO STRIPE OBJECT. This file reads an id; it never mints one.

export type BillingInterval = 'month';

/** The three cadences standing support can take. */
export type SupportCadence = 'once' | 'month' | 'month_until';

export interface Recurrence {
  interval: BillingInterval;
  stripePriceId: string | null;
  /** The moment standing support stops, ISO, or null when it does not stop. */
  endsAt: string | null;
  /** endsAt in whole seconds — the shape Stripe's cancel_at takes. */
  cancelAt: number | null;
}

type MetadataBearing = {
  metadata?: unknown;
  billing_interval?: string | null;
  stripe_price_id?: string | null;
  support_ends_at?: string | null;
};

/** The cadence options a form offers, said the same way in every form. */
export const SUPPORT_CADENCES: Array<{ value: SupportCadence; label: string }> = [
  { value: 'once', label: 'One time — nothing repeats' },
  { value: 'month', label: 'Each month, until it is ended' },
  { value: 'month_until', label: 'Each month, until a date you set' },
];

/** The words a form says when the cadence is until a date and no date was named. */
export const SUPPORT_END_DATE_NEEDED = 'Name the day the support stops, or choose another cadence.';

/** The end moment a cadence carries: a date's ISO for month_until, null otherwise, undefined when month_until has no date. */
export function supportEndsAtForCadence(cadence: string, dateInput: string): string | null | undefined {
  if (cadence !== 'month_until') return null;
  return supportEndsAtFromDateInput(dateInput) ?? undefined;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

/** A parsable moment as ISO, or null. */
function isoOf(value: unknown): string | null {
  if (typeof value !== 'string' || value.length === 0) return null;
  const ms = Date.parse(value);
  return Number.isNaN(ms) ? null : new Date(ms).toISOString();
}

/** The Stripe Price id for a rung, from the column first and the metadata after. */
export function stripePriceIdOf(ware: MetadataBearing): string | null {
  const column = ware.stripe_price_id;
  if (typeof column === 'string' && column.length > 0) return column;
  const meta = asRecord(ware.metadata);
  const id = meta?.stripe_price_id;
  return typeof id === 'string' && id.length > 0 ? id : null;
}

/** The end of a ware's standing support, from the column first and the metadata after. */
export function supportEndsAtOf(ware: MetadataBearing): string | null {
  const column = isoOf(ware.support_ends_at);
  if (column) return column;
  const meta = asRecord(ware.metadata);
  const flat = isoOf(meta?.support_ends_at);
  if (flat) return flat;
  return isoOf(asRecord(meta?.recurring)?.ends_at);
}

/** The recurrence of a ware, or null when it is a one-time ware. */
export function recurrenceOf(ware: MetadataBearing): Recurrence | null {
  const typed = ware.billing_interval;
  const meta = asRecord(ware.metadata);
  const inherited = asRecord(meta?.recurring)?.interval;
  const repeats = typed === 'month' || inherited === 'month';
  if (!repeats) return null;

  const endsAt = supportEndsAtOf(ware);
  return {
    interval: 'month',
    stripePriceId: stripePriceIdOf(ware),
    endsAt,
    cancelAt: endsAt ? Math.floor(Date.parse(endsAt) / 1000) : null,
  };
}

export function isRecurring(ware: MetadataBearing): boolean {
  return recurrenceOf(ware) !== null;
}

/** The cadence a ware already carries, for a form that opens on it. */
export function cadenceOf(ware: MetadataBearing): SupportCadence {
  const recurrence = recurrenceOf(ware);
  if (!recurrence) return 'once';
  return recurrence.endsAt ? 'month_until' : 'month';
}

/** True when the end of standing support already lies behind the given second. */
export function supportHasEnded(recurrence: Recurrence, nowSeconds: number): boolean {
  return recurrence.cancelAt !== null && recurrence.cancelAt <= nowSeconds;
}

/** A date field's YYYY-MM-DD as the ISO moment the column holds. */
export function supportEndsAtFromDateInput(value: string): string | null {
  return isoOf(value.trim());
}

/** The ISO moment as a date field's YYYY-MM-DD. */
export function dateInputFromSupportEndsAt(value: string | null): string {
  const iso = isoOf(value);
  return iso ? iso.slice(0, 10) : '';
}

/** "each month" — said the same way everywhere. */
export function intervalPhrase(interval: BillingInterval): string {
  return interval === 'month' ? 'each month' : `each ${interval}`;
}
