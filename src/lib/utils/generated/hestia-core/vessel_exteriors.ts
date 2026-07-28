// =====================================================
// UTILITIES: VesselExteriors
// DEITY: hestia-core
// GENERATED: 2026-07-28T15:33:50.091Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { VesselExteriorsInsertSchema, VesselExteriorsUpdateSchema } from '@/lib/validators/generated/hestia-core/vessel_exteriors';
import type { VesselExteriorsInsert, VesselExteriorsRow, VesselExteriorsUpdate } from '@/types/generated/hestia-core/vessel_exteriors';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new vessel_exteriors record
 */
export async function createVesselExteriors(data: VesselExteriorsInsert): Promise<VesselExteriorsRow> {
  const validated = VesselExteriorsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('vessel_exteriors')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single vessel_exteriors record by ID
 */
export async function getVesselExteriors(id: string): Promise<VesselExteriorsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('vessel_exteriors')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of vessel_exteriors records with pagination
 */
export async function listVesselExteriors(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: VesselExteriorsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('vessel_exteriors').select('*', { count: 'exact' });
  
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
 * Update a vessel_exteriors record
 */
export async function updateVesselExteriors(id: string, data: VesselExteriorsUpdate): Promise<VesselExteriorsRow> {
  const validated = VesselExteriorsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('vessel_exteriors')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a vessel_exteriors record
 */
export async function deleteVesselExteriors(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('vessel_exteriors')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
