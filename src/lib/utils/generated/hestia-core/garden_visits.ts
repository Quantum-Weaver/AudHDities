// =====================================================
// UTILITIES: GardenVisits
// DEITY: hestia-core
// GENERATED: 2026-07-31T23:16:54.514Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { GardenVisitsInsertSchema, GardenVisitsUpdateSchema } from '@/lib/validators/generated/hestia-core/garden_visits';
import type { GardenVisitsInsert, GardenVisitsRow, GardenVisitsUpdate } from '@/types/generated/hestia-core/garden_visits';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new garden_visits record
 */
export async function createGardenVisits(data: GardenVisitsInsert): Promise<GardenVisitsRow> {
  const validated = GardenVisitsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('garden_visits')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single garden_visits record by ID
 */
export async function getGardenVisits(id: string): Promise<GardenVisitsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('garden_visits')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of garden_visits records with pagination
 */
export async function listGardenVisits(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: GardenVisitsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('garden_visits').select('*', { count: 'exact' });
  
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
 * Update a garden_visits record
 */
export async function updateGardenVisits(id: string, data: GardenVisitsUpdate): Promise<GardenVisitsRow> {
  const validated = GardenVisitsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('garden_visits')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a garden_visits record
 */
export async function deleteGardenVisits(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('garden_visits')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
