// src/lib/wares/sphragis.ts
//
// A ware's `sphragis` column, read DEFENSIVELY. Hand-written, not generated
// — gaia's WaresRow type (src/lib/generated/types/plutus-economics/wares.ts)
// does not yet carry this column, and this file exists so nothing has to
// edit that generated file to reach it. The column was added additive-only
// in supabase/migrations/20260902_the_seal_on_every_ware.sql.
//
// `Sphragis` is the-sphragis's own document shape, mirrored byte-faithfully
// at src/lib/sphragis/index.ts (see the MIRROR.md beside it) — this file
// imports the type only and validates nothing the tool did not already
// design: a licence is well-formed when it has a holder, exactly the three
// grants in GRANT_ORDER, and a split. Anything else — an absent column, a
// stray shape, a row from before this column existed — reads back as
// `null`, calmly, never a throw.

import { GRANT_ORDER, type GrantName, type Sphragis } from '@/lib/sphragis';

/** The shape this reader asks of a ware row: an optional, unknown
 *  `sphragis` field. Any ware object — generated or not — satisfies this by
 *  structural typing, because the field is optional. */
export interface WareWithSphragis {
  sphragis?: unknown;
  [key: string]: unknown;
}

function isGrantName(value: unknown): value is GrantName {
  return typeof value === 'string' && (GRANT_ORDER as readonly string[]).includes(value);
}

function looksLikeGrants(value: unknown): boolean {
  if (!Array.isArray(value) || value.length !== GRANT_ORDER.length) return false;
  const names = value.map((g) => (g && typeof g === 'object' ? (g as { name?: unknown }).name : undefined));
  return GRANT_ORDER.every((name) => names.includes(name)) && value.every((g) => g && typeof g === 'object' && isGrantName((g as { name?: unknown }).name));
}

function looksLikeSplit(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false;
  const split = value as { artist?: unknown; platform?: unknown };
  return typeof split.artist === 'number' && typeof split.platform === 'number';
}

/** Does this unknown value hold up as a drawn Sphragis? Checked structurally
 *  — the fields the-sphragis's own laws guarantee `draw()` always produces
 *  (a holder, exactly three named grants in order, a split, a flagged
 *  array) — never re-validated against the tool's business rules, because
 *  that is the tool's job and this reader's is only to tell a well-formed
 *  document from a malformed or absent one. */
export function isSphragis(value: unknown): value is Sphragis {
  if (!value || typeof value !== 'object') return false;
  const doc = value as Record<string, unknown>;
  if (typeof doc.holder !== 'string' || doc.holder.length === 0) return false;
  if (!looksLikeGrants(doc.grants)) return false;
  if (!looksLikeSplit(doc.split)) return false;
  if (!Array.isArray(doc.flagged)) return false;
  if (!doc.ergon || typeof doc.ergon !== 'object') return false;
  return true;
}

/** Read a ware's licence, defensively: unknown -> Sphragis | null. Never
 *  throws. A ware with no `sphragis` column, a NULL value, or anything that
 *  does not hold up as a drawn document all come back `null` alike — the
 *  ware page renders nothing for any of them, exactly as it did before this
 *  column existed. */
export function sphragisOf(ware: WareWithSphragis | null | undefined): Sphragis | null {
  if (!ware) return null;
  const value = ware.sphragis;
  if (value === null || value === undefined) return null;
  // a row fetched as a JSON string (rather than parsed jsonb) is read too —
  // told apart from a malformed value rather than silently dropped.
  let candidate: unknown = value;
  if (typeof value === 'string') {
    try {
      candidate = JSON.parse(value);
    } catch {
      return null;
    }
  }
  return isSphragis(candidate) ? (candidate as Sphragis) : null;
}
