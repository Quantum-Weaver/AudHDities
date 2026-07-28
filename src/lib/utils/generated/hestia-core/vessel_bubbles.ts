// =====================================================
// UTILITIES: VesselBubbles
// DEITY: hestia-core
// GENERATED: 2026-07-28T05:07:04.626Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { VesselBubblesInsertSchema, VesselBubblesUpdateSchema } from '@/lib/validators/generated/hestia-core/vessel_bubbles';
import type { VesselBubblesInsert, VesselBubblesRow, VesselBubblesUpdate } from '@/types/generated/hestia-core/vessel_bubbles';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new vessel_bubbles record
 */
export async function createVesselBubbles(data: VesselBubblesInsert): Promise<VesselBubblesRow> {
  const validated = VesselBubblesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('vessel_bubbles')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single vessel_bubbles record by ID
 */
export async function getVesselBubbles(id: string): Promise<VesselBubblesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('vessel_bubbles')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of vessel_bubbles records with pagination
 */
export async function listVesselBubbles(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: VesselBubblesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('vessel_bubbles').select('*', { count: 'exact' });
  
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
 * Update a vessel_bubbles record
 */
export async function updateVesselBubbles(id: string, data: VesselBubblesUpdate): Promise<VesselBubblesRow> {
  const validated = VesselBubblesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('vessel_bubbles')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a vessel_bubbles record
 */
export async function deleteVesselBubbles(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('vessel_bubbles')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
