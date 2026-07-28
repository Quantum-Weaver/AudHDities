// =====================================================
// UTILITIES: VesselAnchors
// DEITY: hestia-core
// GENERATED: 2026-07-28T05:07:04.622Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { VesselAnchorsInsertSchema, VesselAnchorsUpdateSchema } from '@/lib/validators/generated/hestia-core/vessel_anchors';
import type { VesselAnchorsInsert, VesselAnchorsRow, VesselAnchorsUpdate } from '@/types/generated/hestia-core/vessel_anchors';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new vessel_anchors record
 */
export async function createVesselAnchors(data: VesselAnchorsInsert): Promise<VesselAnchorsRow> {
  const validated = VesselAnchorsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('vessel_anchors')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single vessel_anchors record by ID
 */
export async function getVesselAnchors(id: string): Promise<VesselAnchorsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('vessel_anchors')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of vessel_anchors records with pagination
 */
export async function listVesselAnchors(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: VesselAnchorsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('vessel_anchors').select('*', { count: 'exact' });
  
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
 * Update a vessel_anchors record
 */
export async function updateVesselAnchors(id: string, data: VesselAnchorsUpdate): Promise<VesselAnchorsRow> {
  const validated = VesselAnchorsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('vessel_anchors')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a vessel_anchors record
 */
export async function deleteVesselAnchors(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('vessel_anchors')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
