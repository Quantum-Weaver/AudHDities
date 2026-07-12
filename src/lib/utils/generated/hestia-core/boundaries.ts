// =====================================================
// UTILITIES: Boundaries
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.263Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { BoundariesInsertSchema, BoundariesUpdateSchema } from '@/lib/validators/generated/hestia-core/boundaries';
import type { BoundariesInsert, BoundariesRow, BoundariesUpdate } from '@/types/generated/hestia-core/boundaries';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new boundaries record
 */
export async function createBoundaries(data: BoundariesInsert): Promise<BoundariesRow> {
  const validated = BoundariesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('boundaries')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single boundaries record by ID
 */
export async function getBoundaries(id: string): Promise<BoundariesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('boundaries')
    .select('*')
    .eq('boundaries_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of boundaries records with pagination
 */
export async function listBoundaries(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: BoundariesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('boundaries').select('*', { count: 'exact' });
  
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
 * Update a boundaries record
 */
export async function updateBoundaries(id: string, data: BoundariesUpdate): Promise<BoundariesRow> {
  const validated = BoundariesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('boundaries')
    .update(validated)
    .eq('boundaries_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a boundaries record
 */
export async function deleteBoundaries(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('boundaries')
    .delete()
    .eq('boundaries_id', id);
  
  if (error) throw error;
  return true;
}
