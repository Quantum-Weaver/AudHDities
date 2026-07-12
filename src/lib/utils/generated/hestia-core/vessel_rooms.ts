// =====================================================
// UTILITIES: VesselRooms
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.972Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { VesselRoomsInsertSchema, VesselRoomsUpdateSchema } from '@/lib/validators/generated/hestia-core/vessel_rooms';
import type { VesselRoomsInsert, VesselRoomsRow, VesselRoomsUpdate } from '@/types/generated/hestia-core/vessel_rooms';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new vessel_rooms record
 */
export async function createVesselRooms(data: VesselRoomsInsert): Promise<VesselRoomsRow> {
  const validated = VesselRoomsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('vessel_rooms')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single vessel_rooms record by ID
 */
export async function getVesselRooms(id: string): Promise<VesselRoomsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('vessel_rooms')
    .select('*')
    .eq('vessel_rooms_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of vessel_rooms records with pagination
 */
export async function listVesselRooms(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: VesselRoomsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('vessel_rooms').select('*', { count: 'exact' });
  
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
 * Update a vessel_rooms record
 */
export async function updateVesselRooms(id: string, data: VesselRoomsUpdate): Promise<VesselRoomsRow> {
  const validated = VesselRoomsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('vessel_rooms')
    .update(validated)
    .eq('vessel_rooms_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a vessel_rooms record
 */
export async function deleteVesselRooms(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('vessel_rooms')
    .delete()
    .eq('vessel_rooms_id', id);
  
  if (error) throw error;
  return true;
}
