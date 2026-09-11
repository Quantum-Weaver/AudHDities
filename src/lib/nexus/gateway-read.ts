// src/lib/nexus/gateway-read.ts
// The beacons register, read through the KNOWLEDGE base's anon door.

import { createApiSupabase } from '@/lib/api/supabase';
import {
  BEACON_COLUMNS,
  BEACON_COLUMNS_UNFLAGGED,
  REGISTER_TABLE,
  TESTING_FLAG_UNREAD,
  TESTING_PUBLIC_COLUMN,
  type GatewayBeacon,
} from './gateway-contract';

/** The two variables the knowledge door is named by. */
export const KNOWLEDGE_URL_VAR = 'NEXT_PUBLIC_SUPABASE_URL_KNOWLEDGE';
export const KNOWLEDGE_KEY_VAR = 'NEXT_PUBLIC_SUPABASE_ANON_KEY_KNOWLEDGE';

export interface RegisterRead<Row> {
  table: string;
  rows: Row[];
  /** The base's own message when the read was refused. */
  fault: string | null;
  doorNamed: boolean;
  /** The sentence for a register holding no testing_public column, else null. */
  tracksNote: string | null;
}

export type BeaconRead = RegisterRead<GatewayBeacon>;

interface RegisterAnswer {
  data: unknown[] | null;
  error: { message: string } | null;
}

/** One select of the register by column list. */
export type RegisterSelect = (columns: string) => PromiseLike<RegisterAnswer>;

/** True when both knowledge variables carry a value on this host. */
export function knowledgeDoorNamed(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL_KNOWLEDGE &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_KNOWLEDGE
  );
}

/** True when the base's message says the register holds no such column. */
export function columnAbsent(message: string, column: string): boolean {
  return message.includes(column) && message.includes('does not exist');
}

/** Every row with its flag as the register holds it, false where it holds none. */
function flagged<Row>(data: unknown[] | null): Row[] {
  return (data ?? []).map((row) => ({
    ...(row as Record<string, unknown>),
    testing_public: Boolean((row as Record<string, unknown>)[TESTING_PUBLIC_COLUMN]),
  })) as Row[];
}

/** The register read, read again without testing_public when the column is not there. */
export async function readRegister<Row>(
  select: RegisterSelect,
  columns: string,
  unflaggedColumns: string
): Promise<RegisterRead<Row>> {
  const answer = await select(columns);
  if (!answer.error) {
    return {
      table: REGISTER_TABLE,
      rows: flagged<Row>(answer.data),
      fault: null,
      doorNamed: true,
      tracksNote: null,
    };
  }
  if (!columnAbsent(answer.error.message, TESTING_PUBLIC_COLUMN)) {
    return {
      table: REGISTER_TABLE,
      rows: [],
      fault: answer.error.message,
      doorNamed: true,
      tracksNote: null,
    };
  }
  const again = await select(unflaggedColumns);
  if (again.error) {
    return {
      table: REGISTER_TABLE,
      rows: [],
      fault: again.error.message,
      doorNamed: true,
      tracksNote: null,
    };
  }
  return {
    table: REGISTER_TABLE,
    rows: flagged<Row>(again.data),
    fault: null,
    doorNamed: true,
    tracksNote: TESTING_FLAG_UNREAD,
  };
}

/** Every beacon the anon door answers, by name. */
export async function readBeacons(): Promise<BeaconRead> {
  if (!knowledgeDoorNamed()) {
    return { table: REGISTER_TABLE, rows: [], fault: null, doorNamed: false, tracksNote: null };
  }
  const supabase = await createApiSupabase('knowledge');
  return readRegister<GatewayBeacon>(
    (columns) => supabase.from('beacons').select(columns).order('name', { ascending: true }),
    BEACON_COLUMNS,
    BEACON_COLUMNS_UNFLAGGED
  );
}
