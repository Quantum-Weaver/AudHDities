// src/lib/nexus/gateway-read.ts
// The beacons register, read through the KNOWLEDGE base's anon door.

import { createApiSupabase } from '@/lib/api/supabase';
import { BEACON_COLUMNS, REGISTER_TABLE, type GatewayBeacon } from './gateway-contract';

/** The two variables the knowledge door is named by. */
export const KNOWLEDGE_URL_VAR = 'NEXT_PUBLIC_SUPABASE_URL_KNOWLEDGE';
export const KNOWLEDGE_KEY_VAR = 'NEXT_PUBLIC_SUPABASE_ANON_KEY_KNOWLEDGE';

export interface BeaconRead {
  table: string;
  rows: GatewayBeacon[];
  fault: string | null;
  doorNamed: boolean;
}

/** True when both knowledge variables carry a value on this host. */
export function knowledgeDoorNamed(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL_KNOWLEDGE &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_KNOWLEDGE
  );
}

/** Every beacon the anon door answers, by name. */
export async function readBeacons(): Promise<BeaconRead> {
  if (!knowledgeDoorNamed()) {
    return { table: REGISTER_TABLE, rows: [], fault: null, doorNamed: false };
  }
  const supabase = await createApiSupabase('knowledge');
  const { data, error } = await supabase
    .from('beacons')
    .select(BEACON_COLUMNS)
    .order('name', { ascending: true });
  if (error) {
    return { table: REGISTER_TABLE, rows: [], fault: error.message, doorNamed: true };
  }
  return {
    table: REGISTER_TABLE,
    rows: (data ?? []) as unknown as GatewayBeacon[],
    fault: null,
    doorNamed: true,
  };
}
