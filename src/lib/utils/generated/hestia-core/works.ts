// =====================================================
// UTILITIES: Works
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:15:00.004Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { WorksInsertSchema, WorksUpdateSchema } from '@/lib/validators/generated/hestia-core/works';
import type { WorksInsert, WorksRow, WorksUpdate } from '@/types/generated/hestia-core/works';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new works record
 */
export async function createWorks(data: WorksInsert): Promise<WorksRow> {
  const validated = WorksInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('works')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single works record by ID
 */
export async function getWorks(id: string): Promise<WorksRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('works')
    .select('*')
    .eq('works_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of works records with pagination
 */
export async function listWorks(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: WorksRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('works').select('*', { count: 'exact' });
  
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
 * Update a works record
 */
export async function updateWorks(id: string, data: WorksUpdate): Promise<WorksRow> {
  const validated = WorksUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('works')
    .update(validated)
    .eq('works_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a works record
 */
export async function deleteWorks(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('works')
    .delete()
    .eq('works_id', id);
  
  if (error) throw error;
  return true;
}
