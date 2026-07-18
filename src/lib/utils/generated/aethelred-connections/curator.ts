// =====================================================
// UTILITIES: Curator
// DEITY: aethelred-connections
// GENERATED: 2026-07-18T21:42:54.084Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { CuratorInsertSchema, CuratorUpdateSchema } from '@/lib/validators/generated/aethelred-connections/curator';
import type { CuratorInsert, CuratorRow, CuratorUpdate } from '@/types/generated/aethelred-connections/curator';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new curator record
 */
export async function createCurator(data: CuratorInsert): Promise<CuratorRow> {
  const validated = CuratorInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('curator')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single curator record by ID
 */
export async function getCurator(id: string): Promise<CuratorRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('curator')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of curator records with pagination
 */
export async function listCurator(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: CuratorRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('curator').select('*', { count: 'exact' });
  
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
 * Update a curator record
 */
export async function updateCurator(id: string, data: CuratorUpdate): Promise<CuratorRow> {
  const validated = CuratorUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('curator')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a curator record
 */
export async function deleteCurator(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('curator')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
