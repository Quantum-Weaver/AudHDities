// src/lib/import/echoes.ts
import { echoRows, landJournal, type JournalRow } from './journal';
import {
  asArray,
  asRecord,
  type ImportReader,
  type Landed,
  type NotLanded,
  type ReaderPlan,
  type Supabase,
} from './types';

export const APP = 'resonance-echoes';

export interface EchoesPlan extends ReaderPlan {
  journal: JournalRow[];
}

/** The rows an echoes export would land, decided without touching the base. */
export function plan(data: unknown): EchoesPlan {
  const root = asRecord(data);
  const journal = echoRows(root, APP);
  const carried = asArray(root.echoes).length;
  const folksonomy = Object.keys(asRecord(root.folksonomy)).length;

  const notLanded: NotLanded[] = [];
  if (folksonomy > 0) {
    notLanded.push({
      field: 'folksonomy',
      count: folksonomy,
      reason: 'no table holds the personal emoji definitions',
    });
  }
  if (journal.length > 0) {
    notLanded.push({
      field: 'echo intensity',
      count: journal.length,
      reason: 'journal_entries holds no intensity, and energy_entries.energy_level runs 1 to 10 where an echo runs 1 to 5',
    });
  }
  if (carried > journal.length) {
    notLanded.push({
      field: 'unreadable echoes',
      count: carried - journal.length,
      reason: 'an echo lands only with a name and a timestamp',
    });
  }
  return { journal, notLanded };
}

async function land(supabase: Supabase, uid: string, made: EchoesPlan): Promise<Landed> {
  const journal = await landJournal(supabase, uid, made.journal, 'echoes');
  return { landings: [journal], notLanded: [] };
}

export const reader: ImportReader<EchoesPlan> = {
  app: APP,
  tables: ['journal_entries'],
  plan,
  land,
};
