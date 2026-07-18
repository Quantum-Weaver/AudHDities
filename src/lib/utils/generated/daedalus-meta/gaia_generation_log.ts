// =====================================================
// UTILITIES: GaiaGenerationLog
// DEITY: daedalus-meta
// GENERATED: 2026-07-18T23:09:31.209Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { GaiaGenerationLogInsertSchema, GaiaGenerationLogUpdateSchema } from '@/lib/validators/generated/daedalus-meta/gaia_generation_log';
import type { GaiaGenerationLogInsert, GaiaGenerationLogRow, GaiaGenerationLogUpdate } from '@/types/generated/daedalus-meta/gaia_generation_log';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new gaia_generation_log record
 */
export async function createGaiaGenerationLog(data: GaiaGenerationLogInsert): Promise<GaiaGenerationLogRow> {
  const validated = GaiaGenerationLogInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('gaia_generation_log')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single gaia_generation_log record by ID
 */
export async function getGaiaGenerationLog(id: string): Promise<GaiaGenerationLogRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('gaia_generation_log')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of gaia_generation_log records with pagination
 */
export async function listGaiaGenerationLog(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: GaiaGenerationLogRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('gaia_generation_log').select('*', { count: 'exact' });
  
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
 * Update a gaia_generation_log record
 */
export async function updateGaiaGenerationLog(id: string, data: GaiaGenerationLogUpdate): Promise<GaiaGenerationLogRow> {
  const validated = GaiaGenerationLogUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('gaia_generation_log')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a gaia_generation_log record
 */
export async function deleteGaiaGenerationLog(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('gaia_generation_log')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
