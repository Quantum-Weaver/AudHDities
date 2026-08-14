// =====================================================
// UTILITIES: GardenPlots
// DEITY: hestia-core
// GENERATED: 2026-08-01T21:41:40.795Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { GardenPlotsInsertSchema, GardenPlotsUpdateSchema } from '@/lib/validators/generated/hestia-core/garden_plots';
import type { GardenPlotsInsert, GardenPlotsRow, GardenPlotsUpdate } from '@/types/generated/hestia-core/garden_plots';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new garden_plots record
 */
export async function createGardenPlots(data: GardenPlotsInsert): Promise<GardenPlotsRow> {
  const validated = GardenPlotsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('garden_plots')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single garden_plots record by ID
 */
export async function getGardenPlots(id: string): Promise<GardenPlotsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('garden_plots')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of garden_plots records with pagination
 */
export async function listGardenPlots(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: GardenPlotsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('garden_plots').select('*', { count: 'exact' });
  
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
 * Update a garden_plots record
 */
export async function updateGardenPlots(id: string, data: GardenPlotsUpdate): Promise<GardenPlotsRow> {
  const validated = GardenPlotsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('garden_plots')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a garden_plots record
 */
export async function deleteGardenPlots(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('garden_plots')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
