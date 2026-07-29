// =====================================================
// UTILITIES: CollectionSets
// DEITY: hestia-core
// GENERATED: 2026-07-29T16:16:53.642Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { CollectionSetsInsertSchema, CollectionSetsUpdateSchema } from '@/lib/validators/generated/hestia-core/collection_sets';
import type { CollectionSetsInsert, CollectionSetsRow, CollectionSetsUpdate } from '@/types/generated/hestia-core/collection_sets';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new collection_sets record
 */
export async function createCollectionSets(data: CollectionSetsInsert): Promise<CollectionSetsRow> {
  const validated = CollectionSetsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('collection_sets')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single collection_sets record by ID
 */
export async function getCollectionSets(id: string): Promise<CollectionSetsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('collection_sets')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of collection_sets records with pagination
 */
export async function listCollectionSets(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: CollectionSetsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('collection_sets').select('*', { count: 'exact' });
  
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
 * Update a collection_sets record
 */
export async function updateCollectionSets(id: string, data: CollectionSetsUpdate): Promise<CollectionSetsRow> {
  const validated = CollectionSetsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('collection_sets')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a collection_sets record
 */
export async function deleteCollectionSets(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('collection_sets')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
