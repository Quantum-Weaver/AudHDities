// =====================================================
// UTILITIES: Current
// DEITY: hestia-core
// GENERATED: 2026-07-31T01:03:41.021Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { CurrentInsertSchema, CurrentUpdateSchema } from '@/lib/validators/generated/hestia-core/current';
import type { CurrentInsert, CurrentRow, CurrentUpdate } from '@/types/generated/hestia-core/current';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new current record
 */
export async function createCurrent(data: CurrentInsert): Promise<CurrentRow> {
  const validated = CurrentInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('current')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single current record by ID
 */
export async function getCurrent(id: string): Promise<CurrentRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('current')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of current records with pagination
 */
export async function listCurrent(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: CurrentRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('current').select('*', { count: 'exact' });
  
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
 * Update a current record
 */
export async function updateCurrent(id: string, data: CurrentUpdate): Promise<CurrentRow> {
  const validated = CurrentUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('current')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a current record
 */
export async function deleteCurrent(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('current')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
