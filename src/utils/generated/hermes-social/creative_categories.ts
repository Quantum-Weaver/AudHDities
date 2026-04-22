// =====================================================
// UTILITIES: CreativeCategories
// DEITY: hermes-social
// GENERATED: 2026-04-22T18:15:09.774Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { CreativeCategoriesInsertSchema, CreativeCategoriesUpdateSchema } from '@/lib/validators/generated/hermes-social/creative_categories';
import type { CreativeCategoriesInsert, CreativeCategoriesRow, CreativeCategoriesUpdate } from '@/types/generated/hermes-social/creative_categories';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new creative_categories record
 */
export async function createCreativeCategories(data: CreativeCategoriesInsert): Promise<CreativeCategoriesRow> {
  const validated = CreativeCategoriesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('creative_categories')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single creative_categories record by ID
 */
export async function getCreativeCategories(id: string): Promise<CreativeCategoriesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('creative_categories')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of creative_categories records with pagination
 */
export async function listCreativeCategories(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: CreativeCategoriesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('creative_categories').select('*', { count: 'exact' });
  
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
 * Update a creative_categories record
 */
export async function updateCreativeCategories(id: string, data: CreativeCategoriesUpdate): Promise<CreativeCategoriesRow> {
  const validated = CreativeCategoriesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('creative_categories')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a creative_categories record
 */
export async function deleteCreativeCategories(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('creative_categories')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
