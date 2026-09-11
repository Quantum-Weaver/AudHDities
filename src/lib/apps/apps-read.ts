// src/lib/apps/apps-read.ts
// The apps and games of the beacons register, read through the KNOWLEDGE base's anon door.

import { createApiSupabase } from '@/lib/api/supabase';
import { REGISTER_TABLE } from '@/lib/nexus/gateway-contract';
import { knowledgeDoorNamed, readRegister, type RegisterRead } from '@/lib/nexus/gateway-read';
import {
  APP_COLUMNS,
  APP_COLUMNS_UNFLAGGED,
  APP_TYPES,
  type PublishedApp,
} from './apps-contract';

export type AppsRead = RegisterRead<PublishedApp>;

/** Every app and game the anon door answers, by name. */
export async function readPublishedApps(): Promise<AppsRead> {
  if (!knowledgeDoorNamed()) {
    return { table: REGISTER_TABLE, rows: [], fault: null, doorNamed: false, tracksNote: null };
  }
  const supabase = await createApiSupabase('knowledge');
  return readRegister<PublishedApp>(
    (columns) =>
      supabase
        .from('beacons')
        .select(columns)
        .in('beacon_type', [...APP_TYPES])
        .order('name', { ascending: true }),
    APP_COLUMNS,
    APP_COLUMNS_UNFLAGGED
  );
}
