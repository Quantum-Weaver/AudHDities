// =====================================================
// UTILITIES: LearningPaths
// DEITY: athena-gamification
// GENERATED: 2026-04-23T02:16:58.500Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { LearningPathsInsertSchema, LearningPathsUpdateSchema } from '@/lib/validators/generated/athena-gamification/learning_paths';
import type { LearningPathsInsert, LearningPathsRow, LearningPathsUpdate } from '@/types/generated/athena-gamification/learning_paths';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new learning_paths record
 */
export async function createLearningPaths(data: LearningPathsInsert): Promise<LearningPathsRow> {
  const validated = LearningPathsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('learning_paths')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single learning_paths record by ID
 */
export async function getLearningPaths(id: string): Promise<LearningPathsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('learning_paths')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of learning_paths records with pagination
 */
export async function listLearningPaths(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: LearningPathsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('learning_paths').select('*', { count: 'exact' });
  
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
 * Update a learning_paths record
 */
export async function updateLearningPaths(id: string, data: LearningPathsUpdate): Promise<LearningPathsRow> {
  const validated = LearningPathsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('learning_paths')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a learning_paths record
 */
export async function deleteLearningPaths(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('learning_paths')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
