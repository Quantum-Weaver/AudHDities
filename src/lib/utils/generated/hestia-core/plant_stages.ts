// =====================================================
// UTILITIES: PlantStages
// DEITY: hestia-core
// GENERATED: 2026-07-18T23:09:31.400Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { PlantStagesInsertSchema, PlantStagesUpdateSchema } from '@/lib/validators/generated/hestia-core/plant_stages';
import type { PlantStagesInsert, PlantStagesRow, PlantStagesUpdate } from '@/types/generated/hestia-core/plant_stages';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new plant_stages record
 */
export async function createPlantStages(data: PlantStagesInsert): Promise<PlantStagesRow> {
  const validated = PlantStagesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('plant_stages')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single plant_stages record by ID
 */
export async function getPlantStages(id: string): Promise<PlantStagesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('plant_stages')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of plant_stages records with pagination
 */
export async function listPlantStages(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PlantStagesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('plant_stages').select('*', { count: 'exact' });
  
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
 * Update a plant_stages record
 */
export async function updatePlantStages(id: string, data: PlantStagesUpdate): Promise<PlantStagesRow> {
  const validated = PlantStagesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('plant_stages')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a plant_stages record
 */
export async function deletePlantStages(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('plant_stages')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
