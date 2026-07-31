// =====================================================
// UTILITIES: VesselCompanions
// DEITY: hestia-core
// GENERATED: 2026-07-31T23:16:54.953Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { VesselCompanionsInsertSchema, VesselCompanionsUpdateSchema } from '@/lib/validators/generated/hestia-core/vessel_companions';
import type { VesselCompanionsInsert, VesselCompanionsRow, VesselCompanionsUpdate } from '@/types/generated/hestia-core/vessel_companions';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new vessel_companions record
 */
export async function createVesselCompanions(data: VesselCompanionsInsert): Promise<VesselCompanionsRow> {
  const validated = VesselCompanionsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('vessel_companions')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single vessel_companions record by ID
 */
export async function getVesselCompanions(id: string): Promise<VesselCompanionsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('vessel_companions')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of vessel_companions records with pagination
 */
export async function listVesselCompanions(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: VesselCompanionsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('vessel_companions').select('*', { count: 'exact' });
  
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
 * Update a vessel_companions record
 */
export async function updateVesselCompanions(id: string, data: VesselCompanionsUpdate): Promise<VesselCompanionsRow> {
  const validated = VesselCompanionsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('vessel_companions')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a vessel_companions record
 */
export async function deleteVesselCompanions(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('vessel_companions')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
