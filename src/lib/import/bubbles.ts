// src/lib/import/bubbles.ts
import type { Database } from '@/lib/generated/supabase/database.types';
import { echoRows, landJournal, type JournalRow } from './journal';
import {
  asArray,
  asRecord,
  type ImportReader,
  type Landed,
  type Landing,
  type NotLanded,
  type ReaderPlan,
  type Supabase,
} from './types';

export const APP = 'resonance-bubbles';

type PopInsert = Database['public']['Tables']['vessel_bubbles']['Insert'];
type CollectionInsert = Database['public']['Tables']['vessel_collections']['Insert'];

const CHUNK = 200;
const SKY_COUNTERS = ['daily', 'max', 'day', 'sound'];

/** One popped bubble and how many times the file says it was popped. */
export interface PopRow {
  slug: string;
  pops: number;
}

export interface BubblesPlan extends ReaderPlan {
  pops: PopRow[];
  collections: string[];
  journal: JournalRow[];
  collectedAt: string;
}

function chunks(list: string[]): string[][] {
  const pages: string[][] = [];
  for (let at = 0; at < list.length; at += CHUNK) pages.push(list.slice(at, at + CHUNK));
  return pages;
}

/** The rows a bubbles export would land, decided without touching the base. */
export function plan(data: unknown, exportedAt: string): BubblesPlan {
  const root = asRecord(data);
  const sky = asRecord(root.collections);
  const collected = asRecord(sky.collected);
  const found = asRecord(sky.found);

  const pops: PopRow[] = [];
  for (const [slug, times] of Object.entries(collected)) {
    const count = typeof times === 'number' && Number.isFinite(times) ? Math.floor(times) : 0;
    if (!slug.trim() || count < 1) continue;
    pops.push({ slug: slug.trim(), pops: count });
  }

  const collections = Object.keys(found)
    .map((slug) => slug.trim())
    .filter((slug) => slug.length > 0);

  const journal = echoRows(root, APP);
  const echoesCarried = asArray(root.echoes).length;
  const folksonomy = Object.keys(asRecord(root.folksonomy)).length;
  const counters = SKY_COUNTERS.filter((key) => key in sky).length;

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
  if (echoesCarried > journal.length) {
    notLanded.push({
      field: 'unreadable echoes',
      count: echoesCarried - journal.length,
      reason: 'an echo lands only with a name and a timestamp',
    });
  }
  if (collections.length > 0) {
    notLanded.push({
      field: 'the date a collection was found',
      count: collections.length,
      reason: 'vessel_collections has no found_at column',
    });
  }
  if (counters > 0) {
    notLanded.push({
      field: 'the sky counters',
      count: counters,
      reason: 'the Sanctuary keeps no per-device sky state',
    });
  }

  return { pops, collections, journal, collectedAt: exportedAt, notLanded };
}


const HELD_PAGE = 1000;

/** Every id of one kind this vessel already holds, read page by page. */
async function heldIds(
  supabase: Supabase,
  table: 'vessel_bubbles' | 'vessel_collections',
  column: 'bubble_id' | 'collection_id',
  uid: string,
): Promise<Set<string>> {
  const ids = new Set<string>();
  for (let from = 0; ; from += HELD_PAGE) {
    const { data, error } = await supabase
      .from(table)
      .select(column)
      .eq('user_id', uid)
      .range(from, from + HELD_PAGE - 1);
    if (error) throw error;
    const page = (data ?? []) as unknown as Array<Record<string, string | null>>;
    for (const row of page) {
      const id = row[column];
      if (id) ids.add(id);
    }
    if (page.length < HELD_PAGE) return ids;
  }
}

async function bubbleIds(supabase: Supabase, slugs: string[]): Promise<Map<string, string>> {
  const ids = new Map<string, string>();
  for (const page of chunks(slugs)) {
    const { data, error } = await supabase.from('bubbles').select('id, slug').in('slug', page);
    if (error) throw error;
    for (const row of data ?? []) ids.set(row.slug, row.id);
  }
  return ids;
}

async function collectionIds(supabase: Supabase, slugs: string[]): Promise<Map<string, string>> {
  const ids = new Map<string, string>();
  for (const page of chunks(slugs)) {
    const { data, error } = await supabase.from('collection_sets').select('id, slug').in('slug', page);
    if (error) throw error;
    for (const row of data ?? []) ids.set(row.slug, row.id);
  }
  return ids;
}

async function landPops(
  supabase: Supabase,
  uid: string,
  rows: PopRow[],
  collectedAt: string,
  notLanded: NotLanded[]
): Promise<Landing> {
  const landing: Landing = { kind: 'pops', table: 'vessel_bubbles', landed: 0, held: 0 };
  if (rows.length === 0) return landing;

  const ids = await bubbleIds(supabase, rows.map((row) => row.slug));
  const unknown = rows.filter((row) => !ids.has(row.slug)).length;
  if (unknown > 0) {
    notLanded.push({
      field: 'bubbles outside the catalogue',
      count: unknown,
      reason: 'these slugs match no row in bubbles',
    });
  }

  const already = await heldIds(supabase, 'vessel_bubbles', 'bubble_id', uid);

  const fresh: PopInsert[] = [];
  for (const row of rows) {
    const bubbleId = ids.get(row.slug);
    if (!bubbleId) continue;
    if (already.has(bubbleId)) {
      landing.held += 1;
      continue;
    }
    already.add(bubbleId);
    fresh.push({
      user_id: uid,
      bubble_id: bubbleId,
      collected_at: collectedAt,
      collection_method: 'imported',
      collection_context: { app: APP, pops: row.pops },
    });
  }
  if (fresh.length === 0) return landing;

  const { error: writeError } = await supabase.from('vessel_bubbles').insert(fresh);
  if (writeError) throw writeError;
  landing.landed = fresh.length;
  return landing;
}

async function landCollections(supabase: Supabase, uid: string, slugs: string[]): Promise<Landing> {
  const landing: Landing = { kind: 'collections', table: 'vessel_collections', landed: 0, held: 0 };
  if (slugs.length === 0) return landing;

  const ids = await collectionIds(supabase, slugs);
  const already = await heldIds(supabase, 'vessel_collections', 'collection_id', uid);

  const fresh: CollectionInsert[] = [];
  for (const slug of slugs) {
    const collectionId = ids.get(slug);
    if (!collectionId) continue;
    if (already.has(collectionId)) {
      landing.held += 1;
      continue;
    }
    already.add(collectionId);
    fresh.push({ user_id: uid, collection_id: collectionId });
  }
  if (fresh.length === 0) return landing;

  const { error: writeError } = await supabase.from('vessel_collections').insert(fresh);
  if (writeError) throw writeError;
  landing.landed = fresh.length;
  return landing;
}

async function land(supabase: Supabase, uid: string, made: BubblesPlan): Promise<Landed> {
  const notLanded: NotLanded[] = [];
  const pops = await landPops(supabase, uid, made.pops, made.collectedAt, notLanded);
  const collections = await landCollections(supabase, uid, made.collections);
  const journal = await landJournal(supabase, uid, made.journal, 'echoes');
  return { landings: [pops, collections, journal], notLanded };
}

export const reader: ImportReader<BubblesPlan> = {
  app: APP,
  tables: ['vessel_bubbles', 'vessel_collections', 'journal_entries'],
  plan,
  land,
};
