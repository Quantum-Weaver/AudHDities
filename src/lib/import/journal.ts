// src/lib/import/journal.ts
import { asArray, asRecord, asText, type Landing, type Supabase } from './types';

/** One row bound for journal_entries. */
export interface JournalRow {
  entry_date: string;
  title: string | null;
  body: string | null;
  tags: string[] | null;
}

const PAGE = 1000;

/** The YYYY-MM-DD of a millisecond stamp, or null when it is not a stamp. */
export function dayOf(value: unknown): string | null {
  const ms = typeof value === 'number' ? value : NaN;
  if (!Number.isFinite(ms)) return null;
  const when = new Date(ms);
  if (Number.isNaN(when.getTime())) return null;
  return when.toISOString().slice(0, 10);
}

/** The identity a row is matched by, there being no source column to match on. */
export function keyOf(row: JournalRow): string {
  return `${row.entry_date} ${row.title ?? ''} ${row.body ?? ''}`;
}

/** An echo as one journal row; null when the entry is unreadable. */
export function echoRow(value: unknown, app: string): JournalRow | null {
  const echo = asRecord(value);
  const title = asText(echo.name);
  const entryDate = dayOf(echo.timestamp);
  if (!title || !entryDate) return null;
  const tags = [app, asText(echo.sense), asText(echo.subcategory), asText(echo.emoji)].filter(
    (tag): tag is string => tag !== null
  );
  return { entry_date: entryDate, title, body: asText(echo.note), tags };
}

/** Every echo in a file that reads as one. */
export function echoRows(data: unknown, app: string): JournalRow[] {
  const rows: JournalRow[] = [];
  for (const echo of asArray(asRecord(data).echoes)) {
    const row = echoRow(echo, app);
    if (row) rows.push(row);
  }
  return rows;
}

/** Every journal key this vessel already holds. */
async function heldKeys(supabase: Supabase, uid: string): Promise<Set<string>> {
  const keys = new Set<string>();
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('entry_date, title, body')
      .eq('created_by', uid)
      .range(from, from + PAGE - 1);
    if (error) throw error;
    const page = data ?? [];
    for (const row of page) {
      keys.add(keyOf({ entry_date: row.entry_date, title: row.title, body: row.body, tags: null }));
    }
    if (page.length < PAGE) return keys;
  }
}

/** Write the rows the vessel does not already hold, and no other row. */
export async function landJournal(
  supabase: Supabase,
  uid: string,
  rows: JournalRow[],
  kind: string
): Promise<Landing> {
  const landing: Landing = { kind, table: 'journal_entries', landed: 0, held: 0 };
  if (rows.length === 0) return landing;

  const seen = await heldKeys(supabase, uid);
  const fresh: JournalRow[] = [];
  for (const row of rows) {
    const key = keyOf(row);
    if (seen.has(key)) {
      landing.held += 1;
      continue;
    }
    seen.add(key);
    fresh.push(row);
  }
  if (fresh.length === 0) return landing;

  for (let at = 0; at < fresh.length; at += PAGE) {
    const slice = fresh.slice(at, at + PAGE);
    const { error } = await supabase
      .from('journal_entries')
      .insert(slice.map((row) => ({ ...row, created_by: uid })));
    if (error) throw error;
    landing.landed += slice.length;
  }
  return landing;
}
