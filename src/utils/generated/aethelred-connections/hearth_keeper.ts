// =====================================================
// UTILITIES: HearthKeeper
// DEITY: aethelred-connections
// GENERATED: 2026-04-22T05:48:50.215Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { HearthKeeperInsertSchema, HearthKeeperUpdateSchema } from '@/lib/validators/generated/aethelred-connections/hearth_keeper';
import type { HearthKeeperInsert, HearthKeeperRow, HearthKeeperUpdate } from '@/types/generated/aethelred-connections/hearth_keeper';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new hearth_keeper record
 */
export async function createHearthKeeper(data: HearthKeeperInsert): Promise<HearthKeeperRow> {
  const validated = HearthKeeperInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('hearth_keeper')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single hearth_keeper record by ID
 */
export async function getHearthKeeper(id: string): Promise<HearthKeeperRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('hearth_keeper')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of hearth_keeper records with pagination
 */
export async function listHearthKeeper(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: HearthKeeperRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('hearth_keeper').select('*', { count: 'exact' });
  
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
 * Update a hearth_keeper record
 */
export async function updateHearthKeeper(id: string, data: HearthKeeperUpdate): Promise<HearthKeeperRow> {
  const validated = HearthKeeperUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('hearth_keeper')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a hearth_keeper record
 */
export async function deleteHearthKeeper(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('hearth_keeper')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
