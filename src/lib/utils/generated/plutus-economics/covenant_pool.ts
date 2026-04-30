// =====================================================
// UTILITIES: CovenantPool
// DEITY: plutus-economics
// GENERATED: 2026-04-30T04:17:47.195Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { CovenantPoolInsertSchema, CovenantPoolUpdateSchema } from '@/lib/validators/generated/plutus-economics/covenant_pool';
import type { CovenantPoolInsert, CovenantPoolRow, CovenantPoolUpdate } from '@/types/generated/plutus-economics/covenant_pool';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new covenant_pool record
 */
export async function createCovenantPool(data: CovenantPoolInsert): Promise<CovenantPoolRow> {
  const validated = CovenantPoolInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('covenant_pool')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single covenant_pool record by ID
 */
export async function getCovenantPool(id: string): Promise<CovenantPoolRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('covenant_pool')
    .select('*')
    .eq('covenant_pool_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of covenant_pool records with pagination
 */
export async function listCovenantPool(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: CovenantPoolRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('covenant_pool').select('*', { count: 'exact' });
  
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
 * Update a covenant_pool record
 */
export async function updateCovenantPool(id: string, data: CovenantPoolUpdate): Promise<CovenantPoolRow> {
  const validated = CovenantPoolUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('covenant_pool')
    .update(validated)
    .eq('covenant_pool_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a covenant_pool record
 */
export async function deleteCovenantPool(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('covenant_pool')
    .delete()
    .eq('covenant_pool_id', id);
  
  if (error) throw error;
  return true;
}
