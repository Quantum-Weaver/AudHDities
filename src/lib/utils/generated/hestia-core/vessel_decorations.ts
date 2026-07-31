// =====================================================
// UTILITIES: VesselDecorations
// DEITY: hestia-core
// GENERATED: 2026-07-31T23:16:54.968Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { VesselDecorationsInsertSchema, VesselDecorationsUpdateSchema } from '@/lib/validators/generated/hestia-core/vessel_decorations';
import type { VesselDecorationsInsert, VesselDecorationsRow, VesselDecorationsUpdate } from '@/types/generated/hestia-core/vessel_decorations';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new vessel_decorations record
 */
export async function createVesselDecorations(data: VesselDecorationsInsert): Promise<VesselDecorationsRow> {
  const validated = VesselDecorationsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('vessel_decorations')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single vessel_decorations record by ID
 */
export async function getVesselDecorations(id: string): Promise<VesselDecorationsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('vessel_decorations')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of vessel_decorations records with pagination
 */
export async function listVesselDecorations(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: VesselDecorationsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('vessel_decorations').select('*', { count: 'exact' });
  
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
 * Update a vessel_decorations record
 */
export async function updateVesselDecorations(id: string, data: VesselDecorationsUpdate): Promise<VesselDecorationsRow> {
  const validated = VesselDecorationsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('vessel_decorations')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a vessel_decorations record
 */
export async function deleteVesselDecorations(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('vessel_decorations')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
