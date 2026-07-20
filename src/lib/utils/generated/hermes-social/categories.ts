// =====================================================
// UTILITIES: Categories
// DEITY: hermes-social
// GENERATED: 2026-07-20T04:39:10.391Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { CategoriesInsertSchema, CategoriesUpdateSchema } from '@/lib/validators/generated/hermes-social/categories';
import type { CategoriesInsert, CategoriesRow, CategoriesUpdate } from '@/types/generated/hermes-social/categories';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new categories record
 */
export async function createCategories(data: CategoriesInsert): Promise<CategoriesRow> {
  const validated = CategoriesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('categories')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single categories record by ID
 */
export async function getCategories(id: string): Promise<CategoriesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of categories records with pagination
 */
export async function listCategories(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: CategoriesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('categories').select('*', { count: 'exact' });
  
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
 * Update a categories record
 */
export async function updateCategories(id: string, data: CategoriesUpdate): Promise<CategoriesRow> {
  const validated = CategoriesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('categories')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a categories record
 */
export async function deleteCategories(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
