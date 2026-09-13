// src/lib/import/lantern.ts
import { dayOf, landJournal, type JournalRow } from './journal';
import {
  asArray,
  asRecord,
  asText,
  type ImportReader,
  type Landed,
  type NotLanded,
  type ReaderPlan,
  type Supabase,
} from './types';

export const APP = 'resonance-lantern';

const SESSION_FIELDS = ['durationMin', 'capturePath', 'outlineId'];

export interface LanternPlan extends ReaderPlan {
  journal: JournalRow[];
}

/** One drawing session as a journal row; null when it carries no words and no date. */
export function sessionRow(value: unknown): JournalRow | null {
  const session = asRecord(value);
  const entryDate = dayOf(session.startedAt);
  if (!entryDate) return null;
  const title = asText(session.referenceName);
  const body = asText(session.note);
  if (!title && !body) return null;
  return { entry_date: entryDate, title, body, tags: [APP] };
}

/** The rows a lantern export would land, decided without touching the base. */
export function plan(data: unknown): LanternPlan {
  const root = asRecord(data);
  const sessions = asArray(root.sessions);
  const journal: JournalRow[] = [];
  for (const session of sessions) {
    const row = sessionRow(session);
    if (row) journal.push(row);
  }

  const refs = asArray(root.refs).length;
  const dropped = SESSION_FIELDS.filter((field) =>
    sessions.some((session) => asRecord(session)[field] != null)
  );

  const notLanded: NotLanded[] = [];
  if (refs > 0) {
    notLanded.push({
      field: 'reference images',
      count: refs,
      reason: 'no table holds the reference shelf',
    });
  }
  if (dropped.length > 0) {
    notLanded.push({
      field: dropped.join(', '),
      count: sessions.length,
      reason: 'journal_entries holds no session duration, capture or outline',
    });
  }
  if (sessions.length > journal.length) {
    notLanded.push({
      field: 'sessions not landed',
      count: sessions.length - journal.length,
      reason: 'a session lands only with a start date and either a reference or a note',
    });
  }
  return { journal, notLanded };
}

async function land(supabase: Supabase, uid: string, made: LanternPlan): Promise<Landed> {
  const journal = await landJournal(supabase, uid, made.journal, 'sessions');
  return { landings: [journal], notLanded: [] };
}

export const reader: ImportReader<LanternPlan> = {
  app: APP,
  tables: ['journal_entries'],
  plan,
  land,
};
