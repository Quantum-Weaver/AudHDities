// =====================================================
// UTILITIES: CollectionItems
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.306Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { CollectionItemsInsertSchema, CollectionItemsUpdateSchema } from '@/lib/validators/generated/hestia-core/collection_items';
import type { CollectionItemsInsert, CollectionItemsRow, CollectionItemsUpdate } from '@/types/generated/hestia-core/collection_items';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new collection_items record
 */
export async function createCollectionItems(data: CollectionItemsInsert): Promise<CollectionItemsRow> {
  const validated = CollectionItemsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('collection_items')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single collection_items record by ID
 */
export async function getCollectionItems(id: string): Promise<CollectionItemsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('collection_items')
    .select('*')
    .eq('collection_items_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of collection_items records with pagination
 */
export async function listCollectionItems(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: CollectionItemsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('collection_items').select('*', { count: 'exact' });
  
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
 * Update a collection_items record
 */
export async function updateCollectionItems(id: string, data: CollectionItemsUpdate): Promise<CollectionItemsRow> {
  const validated = CollectionItemsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('collection_items')
    .update(validated)
    .eq('collection_items_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a collection_items record
 */
export async function deleteCollectionItems(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('collection_items')
    .delete()
    .eq('collection_items_id', id);
  
  if (error) throw error;
  return true;
}
