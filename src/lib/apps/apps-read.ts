// src/lib/apps/apps-read.ts
// The apps and games of the beacons register, read through the KNOWLEDGE base's anon door.

import { createApiSupabase } from '@/lib/api/supabase';
import { REGISTER_TABLE } from '@/lib/nexus/gateway-contract';
import { knowledgeDoorNamed } from '@/lib/nexus/gateway-read';
import { APP_COLUMNS, APP_TYPES, type PublishedApp } from './apps-contract';

export interface AppsRead {
  table: string;
  rows: PublishedApp[];
  fault: string | null;
  doorNamed: boolean;
}

/** Every app and game the anon door answers, by name. */
export async function readPublishedApps(): Promise<AppsRead> {
  if (!knowledgeDoorNamed()) {
    return { table: REGISTER_TABLE, rows: [], fault: null, doorNamed: false };
  }
  const supabase = await createApiSupabase('knowledge');
  const { data, error } = await supabase
    .from('beacons')
    .select(APP_COLUMNS)
    .in('beacon_type', [...APP_TYPES])
    .order('name', { ascending: true });
  if (error) {
    return { table: REGISTER_TABLE, rows: [], fault: error.message, doorNamed: true };
  }
  return {
    table: REGISTER_TABLE,
    rows: (data ?? []) as unknown as PublishedApp[],
    fault: null,
    doorNamed: true,
  };
}
