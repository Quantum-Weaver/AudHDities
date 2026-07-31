// =====================================================
// UTILITIES: Lessons
// DEITY: athena-gamification
// GENERATED: 2026-07-31T00:35:01.544Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { LessonsInsertSchema, LessonsUpdateSchema } from '@/lib/validators/generated/athena-gamification/lessons';
import type { LessonsInsert, LessonsRow, LessonsUpdate } from '@/types/generated/athena-gamification/lessons';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new lessons record
 */
export async function createLessons(data: LessonsInsert): Promise<LessonsRow> {
  const validated = LessonsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('lessons')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single lessons record by ID
 */
export async function getLessons(id: string): Promise<LessonsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of lessons records with pagination
 */
export async function listLessons(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: LessonsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('lessons').select('*', { count: 'exact' });
  
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
 * Update a lessons record
 */
export async function updateLessons(id: string, data: LessonsUpdate): Promise<LessonsRow> {
  const validated = LessonsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('lessons')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a lessons record
 */
export async function deleteLessons(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('lessons')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
