// =====================================================
// UTILITIES: SupabaseConnection
// DEITY: aethelred-connections
// GENERATED: 2026-04-30T04:17:48.296Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { SupabaseConnectionInsertSchema, SupabaseConnectionUpdateSchema } from '@/lib/validators/generated/aethelred-connections/supabase_connection';
import type { SupabaseConnectionInsert, SupabaseConnectionRow, SupabaseConnectionUpdate } from '@/types/generated/aethelred-connections/supabase_connection';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new supabase_connection record
 */
export async function createSupabaseConnection(data: SupabaseConnectionInsert): Promise<SupabaseConnectionRow> {
  const validated = SupabaseConnectionInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('supabase_connection')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single supabase_connection record by ID
 */
export async function getSupabaseConnection(id: string): Promise<SupabaseConnectionRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('supabase_connection')
    .select('*')
    .eq('supabase_connection_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of supabase_connection records with pagination
 */
export async function listSupabaseConnection(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SupabaseConnectionRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('supabase_connection').select('*', { count: 'exact' });
  
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
 * Update a supabase_connection record
 */
export async function updateSupabaseConnection(id: string, data: SupabaseConnectionUpdate): Promise<SupabaseConnectionRow> {
  const validated = SupabaseConnectionUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('supabase_connection')
    .update(validated)
    .eq('supabase_connection_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a supabase_connection record
 */
export async function deleteSupabaseConnection(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('supabase_connection')
    .delete()
    .eq('supabase_connection_id', id);
  
  if (error) throw error;
  return true;
}
