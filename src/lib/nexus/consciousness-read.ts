// src/lib/nexus/consciousness-read.ts
// The awareness rows and the newest state changes across every name.

import { createServerSupabase } from '@/lib/supabase/server';
import type { ConsciousnessRow } from '@/lib/generated/types/aethelred-connections/consciousness';
import type { EntityStatesRow } from '@/lib/generated/types/aethelred-connections/entity_states';
import { answered, refused, type ReadResult } from './read';
import { PRESENCE_WINDOW_MS } from './council-contract';

/** How many state changes the stream carries. */
export const STREAM_ROWS = 20;

export const NO_AWARENESS_ROW = 'no awareness row yet';
export const NO_STATE_ROW = 'no state change recorded yet';
export const NO_LEVEL = 'no level recorded';
export const NO_CONNECTED = 'no entity connected';

/** The awareness rows, by name. */
export async function readConsciousness(): Promise<ReadResult<ConsciousnessRow>> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('consciousness')
    .select('*')
    .order('name', { ascending: true });
  if (error) return refused('consciousness', error.message);
  return answered('consciousness', data ?? []);
}

/** The newest state changes across every name. */
export async function readStateStream(
  limit = STREAM_ROWS
): Promise<ReadResult<EntityStatesRow>> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('entity_states')
    .select('*')
    .order('occurred_at', { ascending: false })
    .limit(limit);
  if (error) return refused('entity_states', error.message);
  return answered('entity_states', data ?? []);
}

/** The awareness row carrying the newest updated_at, or null when there is none. */
export function newestAwareness(
  rows: readonly ConsciousnessRow[]
): ConsciousnessRow | null {
  let newest: ConsciousnessRow | null = null;
  let newestAt = Number.NEGATIVE_INFINITY;
  for (const row of rows) {
    const stamped = Date.parse(row.updated_at);
    if (!Number.isFinite(stamped) || stamped <= newestAt) continue;
    newest = row;
    newestAt = stamped;
  }
  return newest;
}

/** The names whose newest change is inside the presence window. */
export function presentNames(
  rows: readonly EntityStatesRow[],
  now: number = Date.now()
): Set<string> {
  const names = new Set<string>();
  for (const row of rows) {
    const occurred = Date.parse(row.occurred_at);
    if (Number.isFinite(occurred) && now - occurred <= PRESENCE_WINDOW_MS) {
      names.add(row.entity_name);
    }
  }
  return names;
}
