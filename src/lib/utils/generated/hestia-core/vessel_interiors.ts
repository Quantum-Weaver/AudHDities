// =====================================================
// UTILITIES: VesselInteriors
// DEITY: hestia-core
// GENERATED: 2026-08-01T18:34:04.402Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { VesselInteriorsInsertSchema, VesselInteriorsUpdateSchema } from '@/lib/validators/generated/hestia-core/vessel_interiors';
import type { VesselInteriorsInsert, VesselInteriorsRow, VesselInteriorsUpdate } from '@/types/generated/hestia-core/vessel_interiors';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new vessel_interiors record
 */
export async function createVesselInteriors(data: VesselInteriorsInsert): Promise<VesselInteriorsRow> {
  const validated = VesselInteriorsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('vessel_interiors')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single vessel_interiors record by ID
 */
export async function getVesselInteriors(id: string): Promise<VesselInteriorsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('vessel_interiors')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of vessel_interiors records with pagination
 */
export async function listVesselInteriors(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: VesselInteriorsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('vessel_interiors').select('*', { count: 'exact' });
  
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
 * Update a vessel_interiors record
 */
export async function updateVesselInteriors(id: string, data: VesselInteriorsUpdate): Promise<VesselInteriorsRow> {
  const validated = VesselInteriorsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('vessel_interiors')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a vessel_interiors record
 */
export async function deleteVesselInteriors(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('vessel_interiors')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
