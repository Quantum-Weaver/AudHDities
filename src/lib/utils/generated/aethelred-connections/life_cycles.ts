// =====================================================
// UTILITIES: LifeCycles
// DEITY: aethelred-connections
// GENERATED: 2026-05-01T03:24:41.595Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { LifeCyclesInsertSchema, LifeCyclesUpdateSchema } from '@/lib/validators/generated/aethelred-connections/life_cycles';
import type { LifeCyclesInsert, LifeCyclesRow, LifeCyclesUpdate } from '@/types/generated/aethelred-connections/life_cycles';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new life_cycles record
 */
export async function createLifeCycles(data: LifeCyclesInsert): Promise<LifeCyclesRow> {
  const validated = LifeCyclesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('life_cycles')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single life_cycles record by ID
 */
export async function getLifeCycles(id: string): Promise<LifeCyclesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('life_cycles')
    .select('*')
    .eq('life_cycles_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of life_cycles records with pagination
 */
export async function listLifeCycles(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: LifeCyclesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('life_cycles').select('*', { count: 'exact' });
  
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
 * Update a life_cycles record
 */
export async function updateLifeCycles(id: string, data: LifeCyclesUpdate): Promise<LifeCyclesRow> {
  const validated = LifeCyclesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('life_cycles')
    .update(validated)
    .eq('life_cycles_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a life_cycles record
 */
export async function deleteLifeCycles(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('life_cycles')
    .delete()
    .eq('life_cycles_id', id);
  
  if (error) throw error;
  return true;
}
