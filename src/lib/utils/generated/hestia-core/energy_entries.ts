// =====================================================
// UTILITIES: EnergyEntries
// DEITY: hestia-core
// GENERATED: 2026-07-18T23:30:03.698Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { EnergyEntriesInsertSchema, EnergyEntriesUpdateSchema } from '@/lib/validators/generated/hestia-core/energy_entries';
import type { EnergyEntriesInsert, EnergyEntriesRow, EnergyEntriesUpdate } from '@/types/generated/hestia-core/energy_entries';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new energy_entries record
 */
export async function createEnergyEntries(data: EnergyEntriesInsert): Promise<EnergyEntriesRow> {
  const validated = EnergyEntriesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('energy_entries')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single energy_entries record by ID
 */
export async function getEnergyEntries(id: string): Promise<EnergyEntriesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('energy_entries')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of energy_entries records with pagination
 */
export async function listEnergyEntries(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: EnergyEntriesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('energy_entries').select('*', { count: 'exact' });
  
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
 * Update a energy_entries record
 */
export async function updateEnergyEntries(id: string, data: EnergyEntriesUpdate): Promise<EnergyEntriesRow> {
  const validated = EnergyEntriesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('energy_entries')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a energy_entries record
 */
export async function deleteEnergyEntries(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('energy_entries')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
