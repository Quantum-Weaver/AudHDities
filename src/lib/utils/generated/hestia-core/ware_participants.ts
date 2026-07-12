// =====================================================
// UTILITIES: WareParticipants
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.982Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { WareParticipantsInsertSchema, WareParticipantsUpdateSchema } from '@/lib/validators/generated/hestia-core/ware_participants';
import type { WareParticipantsInsert, WareParticipantsRow, WareParticipantsUpdate } from '@/types/generated/hestia-core/ware_participants';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new ware_participants record
 */
export async function createWareParticipants(data: WareParticipantsInsert): Promise<WareParticipantsRow> {
  const validated = WareParticipantsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('ware_participants')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single ware_participants record by ID
 */
export async function getWareParticipants(id: string): Promise<WareParticipantsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('ware_participants')
    .select('*')
    .eq('ware_participants_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of ware_participants records with pagination
 */
export async function listWareParticipants(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: WareParticipantsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('ware_participants').select('*', { count: 'exact' });
  
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
 * Update a ware_participants record
 */
export async function updateWareParticipants(id: string, data: WareParticipantsUpdate): Promise<WareParticipantsRow> {
  const validated = WareParticipantsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('ware_participants')
    .update(validated)
    .eq('ware_participants_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a ware_participants record
 */
export async function deleteWareParticipants(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('ware_participants')
    .delete()
    .eq('ware_participants_id', id);
  
  if (error) throw error;
  return true;
}
