// =====================================================
// UTILITIES: Scenes
// DEITY: athena-gamification
// GENERATED: 2026-07-20T04:39:10.823Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ScenesInsertSchema, ScenesUpdateSchema } from '@/lib/validators/generated/athena-gamification/scenes';
import type { ScenesInsert, ScenesRow, ScenesUpdate } from '@/types/generated/athena-gamification/scenes';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new scenes record
 */
export async function createScenes(data: ScenesInsert): Promise<ScenesRow> {
  const validated = ScenesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('scenes')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single scenes record by ID
 */
export async function getScenes(id: string): Promise<ScenesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('scenes')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of scenes records with pagination
 */
export async function listScenes(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ScenesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('scenes').select('*', { count: 'exact' });
  
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
 * Update a scenes record
 */
export async function updateScenes(id: string, data: ScenesUpdate): Promise<ScenesRow> {
  const validated = ScenesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('scenes')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a scenes record
 */
export async function deleteScenes(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('scenes')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
