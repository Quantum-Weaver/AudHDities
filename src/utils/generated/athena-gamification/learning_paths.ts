// =====================================================
// FILE: utils/generated/athena-gamification/learning_paths.ts
// GENERATED: 2026-04-17T22:45:09.904Z
// SOURCE: database.types.ts
// =====================================================

import type { LearningPathsRow, LearningPathsInsert, LearningPathsUpdate } from '@/types/generated/athena-gamification/learning_paths';
import { LearningPathsRowSchema, LearningPathsInsertSchema, LearningPathsUpdateSchema } from '@/lib/validators/generated/athena-gamification/learning_paths';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// LearningPaths CRUD OPERATIONS
// =====================================================

/**
 * Create a new learning_paths record
 */
export async function createLearningPaths(data: LearningPathsInsert): Promise<{ data: LearningPathsRow | null; error: string | null }> {
  try {
    const validated = LearningPathsRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('learning_paths')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating learning_paths:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a learning_paths record by ID
 */
export async function getLearningPaths(id: string): Promise<{ data: LearningPathsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('learning_paths')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching learning_paths:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List learning_paths records with pagination and filters
 */
export async function listLearningPaths(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: LearningPathsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('learning_paths').select('*', { count: 'exact' });
    
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
    console.error('Error listing learning_paths:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a learning_paths record
 */
export async function updateLearningPaths(id: string, data: LearningPathsUpdate): Promise<{ data: LearningPathsRow | null; error: string | null }> {
  try {
    const validated = LearningPathsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('learning_paths')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating learning_paths:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a learning_paths record
 */
export async function deleteLearningPaths(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('learning_paths')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting learning_paths:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

