// =====================================================
// UTILITIES: Regions
// DEITY: iris-communications
// GENERATED: 2026-07-18T23:30:03.982Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { RegionsInsertSchema, RegionsUpdateSchema } from '@/lib/validators/generated/iris-communications/regions';
import type { RegionsInsert, RegionsRow, RegionsUpdate } from '@/types/generated/iris-communications/regions';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new regions record
 */
export async function createRegions(data: RegionsInsert): Promise<RegionsRow> {
  const validated = RegionsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('regions')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single regions record by ID
 */
export async function getRegions(id: string): Promise<RegionsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('regions')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of regions records with pagination
 */
export async function listRegions(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: RegionsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('regions').select('*', { count: 'exact' });
  
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
 * Update a regions record
 */
export async function updateRegions(id: string, data: RegionsUpdate): Promise<RegionsRow> {
  const validated = RegionsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('regions')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a regions record
 */
export async function deleteRegions(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('regions')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
