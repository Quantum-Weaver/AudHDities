// =====================================================
// UTILITIES: GaiaConfig
// DEITY: daedalus-meta
// GENERATED: 2026-08-01T21:41:40.793Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { GaiaConfigInsertSchema, GaiaConfigUpdateSchema } from '@/lib/validators/generated/daedalus-meta/gaia_config';
import type { GaiaConfigInsert, GaiaConfigRow, GaiaConfigUpdate } from '@/types/generated/daedalus-meta/gaia_config';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new gaia_config record
 */
export async function createGaiaConfig(data: GaiaConfigInsert): Promise<GaiaConfigRow> {
  const validated = GaiaConfigInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('gaia_config')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single gaia_config record by ID
 */
export async function getGaiaConfig(id: string): Promise<GaiaConfigRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('gaia_config')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of gaia_config records with pagination
 */
export async function listGaiaConfig(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: GaiaConfigRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('gaia_config').select('*', { count: 'exact' });
  
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
 * Update a gaia_config record
 */
export async function updateGaiaConfig(id: string, data: GaiaConfigUpdate): Promise<GaiaConfigRow> {
  const validated = GaiaConfigUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('gaia_config')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a gaia_config record
 */
export async function deleteGaiaConfig(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('gaia_config')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
