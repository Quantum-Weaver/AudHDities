// =====================================================
// UTILITIES: ThesaurusEntries
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-28T05:07:04.587Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ThesaurusEntriesInsertSchema, ThesaurusEntriesUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/thesaurus_entries';
import type { ThesaurusEntriesInsert, ThesaurusEntriesRow, ThesaurusEntriesUpdate } from '@/types/generated/mnemosyne-assessment/thesaurus_entries';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new thesaurus_entries record
 */
export async function createThesaurusEntries(data: ThesaurusEntriesInsert): Promise<ThesaurusEntriesRow> {
  const validated = ThesaurusEntriesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('thesaurus_entries')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single thesaurus_entries record by ID
 */
export async function getThesaurusEntries(id: string): Promise<ThesaurusEntriesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('thesaurus_entries')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of thesaurus_entries records with pagination
 */
export async function listThesaurusEntries(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ThesaurusEntriesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('thesaurus_entries').select('*', { count: 'exact' });
  
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
 * Update a thesaurus_entries record
 */
export async function updateThesaurusEntries(id: string, data: ThesaurusEntriesUpdate): Promise<ThesaurusEntriesRow> {
  const validated = ThesaurusEntriesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('thesaurus_entries')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a thesaurus_entries record
 */
export async function deleteThesaurusEntries(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('thesaurus_entries')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
