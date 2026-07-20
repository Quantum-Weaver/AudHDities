// =====================================================
// UTILITIES: VesselCollections
// DEITY: hestia-core
// GENERATED: 2026-07-20T04:39:10.966Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { VesselCollectionsInsertSchema, VesselCollectionsUpdateSchema } from '@/lib/validators/generated/hestia-core/vessel_collections';
import type { VesselCollectionsInsert, VesselCollectionsRow, VesselCollectionsUpdate } from '@/types/generated/hestia-core/vessel_collections';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new vessel_collections record
 */
export async function createVesselCollections(data: VesselCollectionsInsert): Promise<VesselCollectionsRow> {
  const validated = VesselCollectionsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('vessel_collections')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single vessel_collections record by ID
 */
export async function getVesselCollections(id: string): Promise<VesselCollectionsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('vessel_collections')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of vessel_collections records with pagination
 */
export async function listVesselCollections(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: VesselCollectionsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('vessel_collections').select('*', { count: 'exact' });
  
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
 * Update a vessel_collections record
 */
export async function updateVesselCollections(id: string, data: VesselCollectionsUpdate): Promise<VesselCollectionsRow> {
  const validated = VesselCollectionsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('vessel_collections')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a vessel_collections record
 */
export async function deleteVesselCollections(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('vessel_collections')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
