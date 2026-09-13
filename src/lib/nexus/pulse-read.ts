// src/lib/nexus/pulse-read.ts
// The triggers the base fires and the notices it has not had read.

import { createServerSupabase } from '@/lib/supabase/server';
import type { TriggersRow } from '@/lib/generated/types/daedalus-meta/triggers';
import type { HeraldsRow } from '@/lib/generated/types/hestia-core/heralds';
import { answered, refused, type ReadResult } from './read';

/** How many unread notices the room asks for. */
export const HERALD_ROWS = 100;

export const NO_TRIGGER_ROW = 'no trigger row yet';
export const NO_UNREAD_NOTICE = 'no unread notice';
export const NEVER_SEEN = 'never seen';

/** Every trigger the register holds, by the table it watches. */
export async function readTriggers(): Promise<ReadResult<TriggersRow>> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('triggers')
    .select('*')
    .order('table_name', { ascending: true })
    .order('name', { ascending: true });
  if (error) return refused('triggers', error.message);
  return answered('triggers', data ?? []);
}

/** The notices this visitor's session can read that carry no read mark. */
export async function readUnreadHeralds(): Promise<ReadResult<HeraldsRow>> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('heralds')
    .select('*')
    .eq('is_read', false)
    .order('created_at', { ascending: false })
    .limit(HERALD_ROWS);
  if (error) return refused('heralds', error.message);
  return answered('heralds', data ?? []);
}
