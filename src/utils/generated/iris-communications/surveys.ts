// =====================================================
// FILE: utils/generated/iris-communications/surveys.ts
// GENERATED: 2026-04-15T01:41:08.394Z
// SOURCE: database.types.ts
// =====================================================

import type { SurveysRow, SurveysInsert, SurveysUpdate } from '@/types/generated/iris-communications/surveys.ts';
import { SurveysInsertSchema, SurveysUpdateSchema } from '@/lib/validators/generated/iris-communications/surveys.ts';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// Surveys CRUD OPERATIONS
// =====================================================

/**
 * Create a new surveys record
 */
export async function createSurveys(data: SurveysInsert): Promise<{ data: SurveysRow | null; error: string | null }> {
  try {
    const validated = SurveysInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('surveys')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating surveys:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a surveys record by ID
 */
export async function getSurveys(id: string): Promise<{ data: SurveysRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('surveys')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching surveys:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List surveys records with pagination and filters
 */
export async function listSurveys(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SurveysRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('surveys').select('*', { count: 'exact' });
    
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
    console.error('Error listing surveys:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a surveys record
 */
export async function updateSurveys(id: string, data: SurveysUpdate): Promise<{ data: SurveysRow | null; error: string | null }> {
  try {
    const validated = SurveysUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('surveys')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating surveys:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a surveys record
 */
export async function deleteSurveys(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('surveys')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting surveys:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

