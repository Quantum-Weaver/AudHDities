// =====================================================
// FILE: utils/generated/athena-gamification/path_lessons.ts
// GENERATED: 2026-04-13T21:47:21.127Z
// SOURCE: database.types.ts
// =====================================================

import type { PathLessonsRow, PathLessonsInsert, PathLessonsUpdate } from 'src/types/generated/athena-gamification/path_lessons.ts';
import { PathLessonsInsertSchema, PathLessonsUpdateSchema } from 'src/lib/validators/generated/path_lessons.ts';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, getPaginationParams, getFilters, getSortParams } from 'src/lib/api/auth';

// =====================================================
// PathLessons CRUD OPERATIONS
// =====================================================

/**
 * Create a new path_lessons record
 */
export async function createPathLessons(data: PathLessonsInsert): Promise<{ data: PathLessonsRow | null; error: string | null }> {
  try {
    const validated = PathLessonsInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('path_lessons')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating path_lessons:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a path_lessons record by ID
 */
export async function getPathLessons(id: string): Promise<{ data: PathLessonsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('path_lessons')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching path_lessons:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List path_lessons records with pagination and filters
 */
export async function listPathLessons(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PathLessonsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('path_lessons').select('*', { count: 'exact' });
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
    
    // Apply sorting
    query = query.order(sort, { ascending: order === 'asc' });
    
    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
    
    const { data, error, count } = await query;
    
    if (error) throw error;
    
    return { data: data || [], total: count || 0, error: null };
  } catch (error) {
    console.error('Error listing path_lessons:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a path_lessons record
 */
export async function updatePathLessons(id: string, data: PathLessonsUpdate): Promise<{ data: PathLessonsRow | null; error: string | null }> {
  try {
    const validated = PathLessonsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('path_lessons')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating path_lessons:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a path_lessons record
 */
export async function deletePathLessons(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('path_lessons')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting path_lessons:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

