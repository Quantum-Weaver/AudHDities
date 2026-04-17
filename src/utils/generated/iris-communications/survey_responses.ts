// =====================================================
// FILE: utils/generated/iris-communications/survey_responses.ts
// GENERATED: 2026-04-17T17:34:19.907Z
// SOURCE: database.types.ts
// =====================================================

import type { SurveyResponsesRow, SurveyResponsesInsert, SurveyResponsesUpdate } from '@/types/generated/iris-communications/survey_responses';
import { SurveyResponsesRowSchema, SurveyResponsesInsertSchema, SurveyResponsesUpdateSchema } from '@/lib/validators/generated/iris-communications/survey_responses';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// SurveyResponses CRUD OPERATIONS
// =====================================================

/**
 * Create a new survey_responses record
 */
export async function createSurveyResponses(data: SurveyResponsesInsert): Promise<{ data: SurveyResponsesRow | null; error: string | null }> {
  try {
    const validated = SurveyResponsesRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('survey_responses')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating survey_responses:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a survey_responses record by ID
 */
export async function getSurveyResponses(id: string): Promise<{ data: SurveyResponsesRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('survey_responses')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching survey_responses:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List survey_responses records with pagination and filters
 */
export async function listSurveyResponses(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SurveyResponsesRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('survey_responses').select('*', { count: 'exact' });
    
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
    console.error('Error listing survey_responses:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a survey_responses record
 */
export async function updateSurveyResponses(id: string, data: SurveyResponsesUpdate): Promise<{ data: SurveyResponsesRow | null; error: string | null }> {
  try {
    const validated = SurveyResponsesUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('survey_responses')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating survey_responses:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a survey_responses record
 */
export async function deleteSurveyResponses(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('survey_responses')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting survey_responses:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

