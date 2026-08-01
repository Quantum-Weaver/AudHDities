// =====================================================
// UTILITIES: VesselQuests
// DEITY: hestia-core
// GENERATED: 2026-08-01T16:03:07.155Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { VesselQuestsInsertSchema, VesselQuestsUpdateSchema } from '@/lib/validators/generated/hestia-core/vessel_quests';
import type { VesselQuestsInsert, VesselQuestsRow, VesselQuestsUpdate } from '@/types/generated/hestia-core/vessel_quests';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new vessel_quests record
 */
export async function createVesselQuests(data: VesselQuestsInsert): Promise<VesselQuestsRow> {
  const validated = VesselQuestsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('vessel_quests')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single vessel_quests record by ID
 */
export async function getVesselQuests(id: string): Promise<VesselQuestsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('vessel_quests')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of vessel_quests records with pagination
 */
export async function listVesselQuests(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: VesselQuestsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('vessel_quests').select('*', { count: 'exact' });
  
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
 * Update a vessel_quests record
 */
export async function updateVesselQuests(id: string, data: VesselQuestsUpdate): Promise<VesselQuestsRow> {
  const validated = VesselQuestsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('vessel_quests')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a vessel_quests record
 */
export async function deleteVesselQuests(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('vessel_quests')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
