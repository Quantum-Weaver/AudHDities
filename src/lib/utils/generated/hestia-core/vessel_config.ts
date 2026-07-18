// =====================================================
// UTILITIES: VesselConfig
// DEITY: hestia-core
// GENERATED: 2026-07-18T21:42:54.630Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { VesselConfigInsertSchema, VesselConfigUpdateSchema } from '@/lib/validators/generated/hestia-core/vessel_config';
import type { VesselConfigInsert, VesselConfigRow, VesselConfigUpdate } from '@/types/generated/hestia-core/vessel_config';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new vessel_config record
 */
export async function createVesselConfig(data: VesselConfigInsert): Promise<VesselConfigRow> {
  const validated = VesselConfigInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('vessel_config')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single vessel_config record by ID
 */
export async function getVesselConfig(id: string): Promise<VesselConfigRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('vessel_config')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of vessel_config records with pagination
 */
export async function listVesselConfig(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: VesselConfigRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('vessel_config').select('*', { count: 'exact' });
  
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
 * Update a vessel_config record
 */
export async function updateVesselConfig(id: string, data: VesselConfigUpdate): Promise<VesselConfigRow> {
  const validated = VesselConfigUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('vessel_config')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a vessel_config record
 */
export async function deleteVesselConfig(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('vessel_config')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
