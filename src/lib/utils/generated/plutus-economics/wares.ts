// =====================================================
// UTILITIES: Wares
// DEITY: plutus-economics
// GENERATED: 2026-08-01T18:34:04.406Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { WaresInsertSchema, WaresUpdateSchema } from '@/lib/validators/generated/plutus-economics/wares';
import type { WaresInsert, WaresRow, WaresUpdate } from '@/types/generated/plutus-economics/wares';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new wares record
 */
export async function createWares(data: WaresInsert): Promise<WaresRow> {
  const validated = WaresInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('wares')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single wares record by ID
 */
export async function getWares(id: string): Promise<WaresRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('wares')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of wares records with pagination
 */
export async function listWares(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: WaresRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('wares').select('*', { count: 'exact' });
  
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
 * Update a wares record
 */
export async function updateWares(id: string, data: WaresUpdate): Promise<WaresRow> {
  const validated = WaresUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('wares')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a wares record
 */
export async function deleteWares(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('wares')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
