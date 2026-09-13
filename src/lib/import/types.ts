// src/lib/import/types.ts
import type { createServerSupabase } from '@/lib/supabase/server';

export type Supabase = Awaited<ReturnType<typeof createServerSupabase>>;

/** One thing the file carried that no column on the Sanctuary holds. */
export interface NotLanded {
  field: string;
  count: number;
  reason: string;
}

/** One table's tally: rows written, rows the vessel already held. */
export interface Landing {
  kind: string;
  table: string;
  landed: number;
  held: number;
}

/** What a reader's landing run produced. */
export interface Landed {
  landings: Landing[];
  notLanded: NotLanded[];
}

/** The rows a reader will write, decided before anything is written. */
export interface ReaderPlan {
  notLanded: NotLanded[];
}

export interface ImportReader<P extends ReaderPlan> {
  app: string;
  tables: readonly string[];
  plan(data: unknown, exportedAt: string): P;
  land(supabase: Supabase, uid: string, plan: P): Promise<Landed>;
}

/** A reader whose plan is made, ready to land. */
export interface BoundReader {
  app: string;
  tables: readonly string[];
  notLanded: NotLanded[];
  land(supabase: Supabase, uid: string): Promise<Landed>;
}

/** Make the plan now; keep the landing for later. */
export function bind<P extends ReaderPlan>(
  reader: ImportReader<P>,
  data: unknown,
  exportedAt: string
): BoundReader {
  const plan = reader.plan(data, exportedAt);
  return {
    app: reader.app,
    tables: reader.tables,
    notLanded: plan.notLanded,
    land: (supabase, uid) => reader.land(supabase, uid, plan),
  };
}

/** The rows of a record, or an empty record when the file carried none. */
export function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}

/** The members of an array, or none when the file carried none. */
export function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

/** A trimmed string, or null. */
export function asText(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}
