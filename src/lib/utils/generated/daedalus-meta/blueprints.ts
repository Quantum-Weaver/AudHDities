// =====================================================
// UTILITIES: Blueprints
// DEITY: daedalus-meta
// GENERATED: 2026-07-18T23:17:10.639Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { BlueprintsInsertSchema, BlueprintsUpdateSchema } from '@/lib/validators/generated/daedalus-meta/blueprints';
import type { BlueprintsInsert, BlueprintsRow, BlueprintsUpdate } from '@/types/generated/daedalus-meta/blueprints';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new blueprints record
 */
export async function createBlueprints(data: BlueprintsInsert): Promise<BlueprintsRow> {
  const validated = BlueprintsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('blueprints')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single blueprints record by ID
 */
export async function getBlueprints(id: string): Promise<BlueprintsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('blueprints')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of blueprints records with pagination
 */
export async function listBlueprints(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: BlueprintsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('blueprints').select('*', { count: 'exact' });
  
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
 * Update a blueprints record
 */
export async function updateBlueprints(id: string, data: BlueprintsUpdate): Promise<BlueprintsRow> {
  const validated = BlueprintsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('blueprints')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a blueprints record
 */
export async function deleteBlueprints(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('blueprints')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
