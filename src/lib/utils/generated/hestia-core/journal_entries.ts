// =====================================================
// UTILITIES: JournalEntries
// DEITY: hestia-core
// GENERATED: 2026-08-01T21:41:40.807Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { JournalEntriesInsertSchema, JournalEntriesUpdateSchema } from '@/lib/validators/generated/hestia-core/journal_entries';
import type { JournalEntriesInsert, JournalEntriesRow, JournalEntriesUpdate } from '@/types/generated/hestia-core/journal_entries';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new journal_entries record
 */
export async function createJournalEntries(data: JournalEntriesInsert): Promise<JournalEntriesRow> {
  const validated = JournalEntriesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('journal_entries')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single journal_entries record by ID
 */
export async function getJournalEntries(id: string): Promise<JournalEntriesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of journal_entries records with pagination
 */
export async function listJournalEntries(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: JournalEntriesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('journal_entries').select('*', { count: 'exact' });
  
  for (const [key, value] of Object.entries(filters)) {
    query = query.eq(key, value);
  }
  
  query = query.order(sort, { ascending: order === 'asc' });
  
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);
  
  const { data, error, count } = await query;
  if (error) throw error;
  
  return { data: data || [], total: count || 0 };
}

/**
 * Update a journal_entries record
 */
export async function updateJournalEntries(id: string, data: JournalEntriesUpdate): Promise<JournalEntriesRow> {
  const validated = JournalEntriesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('journal_entries')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a journal_entries record
 */
export async function deleteJournalEntries(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('journal_entries')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
