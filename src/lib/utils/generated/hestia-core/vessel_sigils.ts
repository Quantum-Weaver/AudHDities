// =====================================================
// UTILITIES: VesselSigils
// DEITY: hestia-core
// GENERATED: 2026-08-01T18:34:04.404Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { VesselSigilsInsertSchema, VesselSigilsUpdateSchema } from '@/lib/validators/generated/hestia-core/vessel_sigils';
import type { VesselSigilsInsert, VesselSigilsRow, VesselSigilsUpdate } from '@/types/generated/hestia-core/vessel_sigils';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new vessel_sigils record
 */
export async function createVesselSigils(data: VesselSigilsInsert): Promise<VesselSigilsRow> {
  const validated = VesselSigilsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('vessel_sigils')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single vessel_sigils record by ID
 */
export async function getVesselSigils(id: string): Promise<VesselSigilsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('vessel_sigils')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of vessel_sigils records with pagination
 */
export async function listVesselSigils(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: VesselSigilsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('vessel_sigils').select('*', { count: 'exact' });
  
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
 * Update a vessel_sigils record
 */
export async function updateVesselSigils(id: string, data: VesselSigilsUpdate): Promise<VesselSigilsRow> {
  const validated = VesselSigilsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('vessel_sigils')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a vessel_sigils record
 */
export async function deleteVesselSigils(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('vessel_sigils')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
