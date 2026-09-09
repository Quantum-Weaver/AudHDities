// src/lib/nexus/council-read.ts
// Every Council read, through the visitor's own session, so the base's own
// policies decide what answers.

import { createServerSupabase } from '@/lib/supabase/server';
import type { CouncilHousesRow } from '@/lib/generated/types/themis-governance/council_houses';
import type { ProtocolsRow } from '@/lib/generated/types/themis-governance/protocols';
import type { EntityStatesRow } from '@/lib/generated/types/aethelred-connections/entity_states';
import type { AgentActivitiesRow } from '@/lib/generated/types/aethelred-connections/agent_activities';
import type { BoundariesRow } from '@/lib/generated/types/daedalus-meta/boundaries';
import type {
  CouncilAgentTable,
  CouncilSeatRow,
  CouncilSeatTable,
} from '@/lib/nexus/council-contract';
import { COUNCIL_AGENT_TABLES, COUNCIL_SEAT_TABLES } from '@/lib/nexus/council-contract';

/** Every agent table carries this row shape. */
export type CouncilAgentRow = AgentActivitiesRow;

/** A read that either answered rows or was refused; a refusal is never an empty. */
export interface ReadResult<T> {
  table: string;
  rows: T[];
  fault: string | null;
}

export interface AgentRead {
  table: CouncilAgentTable;
  result: ReadResult<CouncilAgentRow>;
}

export interface SeatRead {
  table: CouncilSeatTable;
  result: ReadResult<CouncilSeatRow>;
}

type SupabaseClient = Awaited<ReturnType<typeof createServerSupabase>>;

function refused(table: string, message: string): ReadResult<never> {
  return { table, rows: [], fault: message };
}

/** How many presence rows a card asks for. */
export const PRESENCE_ROWS_CARD = 20;

/** How many presence rows a chair's room asks for. */
export const PRESENCE_ROWS_ROOM = 1000;

/** The ilike patterns a chair's names reach: each name, and each name's head word. */
function namePatterns(names: readonly string[]): string[] {
  const patterns = new Set<string>();
  for (const name of names) {
    const cleaned = name.toLowerCase().replace(/[^a-z0-9 _-]/g, ' ').trim();
    if (!cleaned) continue;
    patterns.add(cleaned.replace(/[ -]/g, '_'));
    const head = cleaned.split(/[ _-]+/)[0];
    if (head) patterns.add(head);
  }
  return Array.from(patterns);
}

/** One chair's presence rows, newest first, filtered to the names it answers to. */
export async function readChairStates(
  names: readonly string[],
  limit = PRESENCE_ROWS_CARD
): Promise<ReadResult<EntityStatesRow>> {
  const patterns = namePatterns(names);
  if (!patterns.length) return { table: 'entity_states', rows: [], fault: null };
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('entity_states')
    .select('*')
    .or(patterns.map((pattern) => `entity_name.ilike.%${pattern}%`).join(','))
    .order('occurred_at', { ascending: false })
    .limit(limit);
  if (error) return refused('entity_states', error.message);
  return { table: 'entity_states', rows: data ?? [], fault: null };
}

/** The catalog, in display_order. */
export async function readCouncilHouses(): Promise<ReadResult<CouncilHousesRow>> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('council_houses')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) return refused('council_houses', error.message);
  return { table: 'council_houses', rows: data ?? [], fault: null };
}

function seatQuery(supabase: SupabaseClient, table: CouncilSeatTable) {
  switch (table) {
    case 'aethelred_house':
      return supabase.from('aethelred_house').select('*');
    case 'archivist':
      return supabase.from('archivist').select('*');
    case 'chancellor':
      return supabase.from('chancellor').select('*');
    case 'codex':
      return supabase.from('codex').select('*');
    case 'curator':
      return supabase.from('curator').select('*');
    case 'executioner':
      return supabase.from('executioner').select('*');
    case 'hearth_keeper':
      return supabase.from('hearth_keeper').select('*');
    case 'seer':
      return supabase.from('seer').select('*');
    case 'skald':
      return supabase.from('skald').select('*');
  }
}

/** One chair table. */
export async function readSeatTable(table: CouncilSeatTable): Promise<ReadResult<CouncilSeatRow>> {
  const supabase = await createServerSupabase();
  const { data, error } = await seatQuery(supabase, table);
  if (error) return refused(table, error.message);
  return { table, rows: (data ?? []) as CouncilSeatRow[], fault: null };
}

/** The nine chair tables. */
export async function readSeatTables(
  tables: readonly CouncilSeatTable[] = COUNCIL_SEAT_TABLES
): Promise<SeatRead[]> {
  return Promise.all(
    tables.map(async (table) => ({ table, result: await readSeatTable(table) }))
  );
}

function agentQuery(supabase: SupabaseClient, table: CouncilAgentTable) {
  switch (table) {
    case 'agent_activities':
      return supabase.from('agent_activities').select('*');
    case 'agent_conversations':
      return supabase.from('agent_conversations').select('*');
    case 'agent_messages':
      return supabase.from('agent_messages').select('*');
  }
}

/** The three agent tables. */
export async function readAgentTables(
  tables: readonly CouncilAgentTable[] = COUNCIL_AGENT_TABLES
): Promise<AgentRead[]> {
  const supabase = await createServerSupabase();
  return Promise.all(
    tables.map(async (table) => {
      const { data, error } = await agentQuery(supabase, table);
      if (error) return { table, result: refused(table, error.message) };
      return {
        table,
        result: { table, rows: (data ?? []) as CouncilAgentRow[], fault: null },
      };
    })
  );
}

/** The law. */
export async function readBoundaries(): Promise<ReadResult<BoundariesRow>> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('boundaries')
    .select('*')
    .order('name', { ascending: true });
  if (error) return refused('boundaries', error.message);
  return { table: 'boundaries', rows: data ?? [], fault: null };
}

/** The protocols. */
export async function readProtocols(): Promise<ReadResult<ProtocolsRow>> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('protocols')
    .select('*')
    .order('name', { ascending: true });
  if (error) return refused('protocols', error.message);
  return { table: 'protocols', rows: data ?? [], fault: null };
}
