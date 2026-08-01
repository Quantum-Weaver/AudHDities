// =====================================================
// UTILITIES: Indexes
// DEITY: daedalus-meta
// GENERATED: 2026-08-01T21:41:40.806Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { IndexesInsertSchema, IndexesUpdateSchema } from '@/lib/validators/generated/daedalus-meta/indexes';
import type { IndexesInsert, IndexesRow, IndexesUpdate } from '@/types/generated/daedalus-meta/indexes';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new indexes record
 */
export async function createIndexes(data: IndexesInsert): Promise<IndexesRow> {
  const validated = IndexesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('indexes')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single indexes record by ID
 */
export async function getIndexes(id: string): Promise<IndexesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('indexes')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of indexes records with pagination
 */
export async function listIndexes(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: IndexesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('indexes').select('*', { count: 'exact' });
  
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
 * Update a indexes record
 */
export async function updateIndexes(id: string, data: IndexesUpdate): Promise<IndexesRow> {
  const validated = IndexesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('indexes')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a indexes record
 */
export async function deleteIndexes(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('indexes')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
