// =====================================================
// UTILITIES: Progress
// DEITY: athena-gamification
// GENERATED: 2026-05-01T15:31:59.721Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ProgressInsertSchema, ProgressUpdateSchema } from '@/lib/validators/generated/athena-gamification/progress';
import type { ProgressInsert, ProgressRow, ProgressUpdate } from '@/types/generated/athena-gamification/progress';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new progress record
 */
export async function createProgress(data: ProgressInsert): Promise<ProgressRow> {
  const validated = ProgressInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('progress')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single progress record by ID
 */
export async function getProgress(id: string): Promise<ProgressRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('progress')
    .select('*')
    .eq('progress_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of progress records with pagination
 */
export async function listProgress(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ProgressRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('progress').select('*', { count: 'exact' });
  
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
 * Update a progress record
 */
export async function updateProgress(id: string, data: ProgressUpdate): Promise<ProgressRow> {
  const validated = ProgressUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('progress')
    .update(validated)
    .eq('progress_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a progress record
 */
export async function deleteProgress(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('progress')
    .delete()
    .eq('progress_id', id);
  
  if (error) throw error;
  return true;
}
