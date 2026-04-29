// =====================================================
// UTILITIES: PathLessons
// DEITY: athena-gamification
// GENERATED: 2026-04-29T20:53:53.402Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { PathLessonsInsertSchema, PathLessonsUpdateSchema } from '@/lib/validators/generated/athena-gamification/path_lessons';
import type { PathLessonsInsert, PathLessonsRow, PathLessonsUpdate } from '@/types/generated/athena-gamification/path_lessons';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new path_lessons record
 */
export async function createPathLessons(data: PathLessonsInsert): Promise<PathLessonsRow> {
  const validated = PathLessonsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('path_lessons')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single path_lessons record by ID
 */
export async function getPathLessons(id: string): Promise<PathLessonsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('path_lessons')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of path_lessons records with pagination
 */
export async function listPathLessons(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PathLessonsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('path_lessons').select('*', { count: 'exact' });
  
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
 * Update a path_lessons record
 */
export async function updatePathLessons(id: string, data: PathLessonsUpdate): Promise<PathLessonsRow> {
  const validated = PathLessonsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('path_lessons')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a path_lessons record
 */
export async function deletePathLessons(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('path_lessons')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
