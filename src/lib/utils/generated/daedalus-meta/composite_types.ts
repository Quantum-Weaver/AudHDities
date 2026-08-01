// =====================================================
// UTILITIES: CompositeTypes
// DEITY: daedalus-meta
// GENERATED: 2026-08-01T16:03:06.391Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { CompositeTypesInsertSchema, CompositeTypesUpdateSchema } from '@/lib/validators/generated/daedalus-meta/composite_types';
import type { CompositeTypesInsert, CompositeTypesRow, CompositeTypesUpdate } from '@/types/generated/daedalus-meta/composite_types';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new composite_types record
 */
export async function createCompositeTypes(data: CompositeTypesInsert): Promise<CompositeTypesRow> {
  const validated = CompositeTypesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('composite_types')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single composite_types record by ID
 */
export async function getCompositeTypes(id: string): Promise<CompositeTypesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('composite_types')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of composite_types records with pagination
 */
export async function listCompositeTypes(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: CompositeTypesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('composite_types').select('*', { count: 'exact' });
  
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
 * Update a composite_types record
 */
export async function updateCompositeTypes(id: string, data: CompositeTypesUpdate): Promise<CompositeTypesRow> {
  const validated = CompositeTypesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('composite_types')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a composite_types record
 */
export async function deleteCompositeTypes(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('composite_types')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
