// =====================================================
// UTILITIES: Keywords
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.528Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { KeywordsInsertSchema, KeywordsUpdateSchema } from '@/lib/validators/generated/hestia-core/keywords';
import type { KeywordsInsert, KeywordsRow, KeywordsUpdate } from '@/types/generated/hestia-core/keywords';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new keywords record
 */
export async function createKeywords(data: KeywordsInsert): Promise<KeywordsRow> {
  const validated = KeywordsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('keywords')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single keywords record by ID
 */
export async function getKeywords(id: string): Promise<KeywordsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('keywords')
    .select('*')
    .eq('keywords_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of keywords records with pagination
 */
export async function listKeywords(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: KeywordsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('keywords').select('*', { count: 'exact' });
  
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
 * Update a keywords record
 */
export async function updateKeywords(id: string, data: KeywordsUpdate): Promise<KeywordsRow> {
  const validated = KeywordsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('keywords')
    .update(validated)
    .eq('keywords_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a keywords record
 */
export async function deleteKeywords(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('keywords')
    .delete()
    .eq('keywords_id', id);
  
  if (error) throw error;
  return true;
}
