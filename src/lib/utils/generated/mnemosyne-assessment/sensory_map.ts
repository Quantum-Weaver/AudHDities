// =====================================================
// UTILITIES: SensoryMap
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-28T05:07:04.522Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { SensoryMapInsertSchema, SensoryMapUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/sensory_map';
import type { SensoryMapInsert, SensoryMapRow, SensoryMapUpdate } from '@/types/generated/mnemosyne-assessment/sensory_map';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new sensory_map record
 */
export async function createSensoryMap(data: SensoryMapInsert): Promise<SensoryMapRow> {
  const validated = SensoryMapInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('sensory_map')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single sensory_map record by ID
 */
export async function getSensoryMap(id: string): Promise<SensoryMapRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('sensory_map')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of sensory_map records with pagination
 */
export async function listSensoryMap(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SensoryMapRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('sensory_map').select('*', { count: 'exact' });
  
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
 * Update a sensory_map record
 */
export async function updateSensoryMap(id: string, data: SensoryMapUpdate): Promise<SensoryMapRow> {
  const validated = SensoryMapUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('sensory_map')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a sensory_map record
 */
export async function deleteSensoryMap(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('sensory_map')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
