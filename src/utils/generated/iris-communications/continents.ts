// =====================================================
// UTILITIES: Continents
// DEITY: iris-communications
// GENERATED: 2026-04-22T18:15:09.732Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ContinentsInsertSchema, ContinentsUpdateSchema } from '@/lib/validators/generated/iris-communications/continents';
import type { ContinentsInsert, ContinentsRow, ContinentsUpdate } from '@/types/generated/iris-communications/continents';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new continents record
 */
export async function createContinents(data: ContinentsInsert): Promise<ContinentsRow> {
  const validated = ContinentsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('continents')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single continents record by ID
 */
export async function getContinents(id: string): Promise<ContinentsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('continents')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of continents records with pagination
 */
export async function listContinents(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ContinentsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('continents').select('*', { count: 'exact' });
  
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
 * Update a continents record
 */
export async function updateContinents(id: string, data: ContinentsUpdate): Promise<ContinentsRow> {
  const validated = ContinentsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('continents')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a continents record
 */
export async function deleteContinents(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('continents')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
