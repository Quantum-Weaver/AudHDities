// src/lib/nexus/health-contract.ts
// The portrait read as one glance: when it was last drawn, and what drifts.

import type { GaiaConfigRow } from '@/lib/generated/types/daedalus-meta/gaia_config';

export const HOUSE_WELL = 'the house is well';
export const PORTRAIT_UNDRAWN = 'the portrait has not been drawn';
export const PORTRAIT_UNREAD = 'the portrait is unreadable from here';
export const NO_DRIFT = 'no table drifts from the portrait';
export const NO_PORTRAIT_ROW = 'no table is in the portrait yet';
export const NOT_VERIFIED = 'not verified';
export const NO_HASH = 'no hash recorded';

/** A table stands apart from the portrait when it carries no verification. */
export function drifts(row: GaiaConfigRow): boolean {
  return !row.schema_verified_at || !row.schema_hash || Boolean(row.archived_at);
}

/** Why a table stands apart, in the portrait's own columns. */
export function driftWords(row: GaiaConfigRow): string {
  const words: string[] = [];
  if (!row.schema_verified_at) words.push('never verified');
  if (!row.schema_hash) words.push(NO_HASH);
  if (row.archived_at) words.push('archived');
  return words.join(' · ');
}

/** The newest schema_verified_at across the portrait, or null when none carries one. */
export function lastDrawn(rows: readonly GaiaConfigRow[]): string | null {
  let newest: string | null = null;
  for (const row of rows) {
    const at = row.schema_verified_at;
    if (!at) continue;
    if (!newest || Date.parse(at) > Date.parse(newest)) newest = at;
  }
  return newest;
}

export interface Portrait {
  /** The sentence the tile carries. */
  word: string;
  /** When the portrait was last drawn. */
  at: string | null;
  /** How many tables the portrait holds. */
  tables: number;
  /** The tables that stand apart from it. */
  drifting: GaiaConfigRow[];
}

/** The glance: the sentence, the stamp, the counts, the drift. */
export function portraitFrom(
  rows: readonly GaiaConfigRow[],
  fault: string | null
): Portrait {
  if (fault) return { word: PORTRAIT_UNREAD, at: null, tables: 0, drifting: [] };
  const drifting = rows.filter(drifts);
  const at = lastDrawn(rows);
  const word = rows.length === 0 ? PORTRAIT_UNDRAWN : at ? HOUSE_WELL : PORTRAIT_UNDRAWN;
  return { word, at, tables: rows.length, drifting };
}

/** The counts the portrait records for one table. */
export function schemaCounts(row: GaiaConfigRow): string {
  return [
    `${row.schema_columns_count ?? 0} columns`,
    `${row.schema_policies_count ?? 0} policies`,
    `${row.schema_indexes_count ?? 0} indexes`,
    `${row.schema_triggers_count ?? 0} triggers`,
  ].join(' · ');
}
