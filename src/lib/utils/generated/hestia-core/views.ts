// =====================================================
// UTILITIES: Views
// DEITY: hestia-core
// GENERATED: 2026-07-31T23:16:55.007Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ViewsInsertSchema, ViewsUpdateSchema } from '@/lib/validators/generated/hestia-core/views';
import type { ViewsInsert, ViewsRow, ViewsUpdate } from '@/types/generated/hestia-core/views';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new views record
 */
export async function createViews(data: ViewsInsert): Promise<ViewsRow> {
  const validated = ViewsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('views')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single views record by ID
 */
export async function getViews(id: string): Promise<ViewsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('views')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of views records with pagination
 */
export async function listViews(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ViewsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('views').select('*', { count: 'exact' });
  
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
 * Update a views record
 */
export async function updateViews(id: string, data: ViewsUpdate): Promise<ViewsRow> {
  const validated = ViewsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('views')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a views record
 */
export async function deleteViews(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('views')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
