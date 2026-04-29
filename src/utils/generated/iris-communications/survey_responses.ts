// =====================================================
// UTILITIES: SurveyResponses
// DEITY: iris-communications
// GENERATED: 2026-04-29T20:53:53.534Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { SurveyResponsesInsertSchema, SurveyResponsesUpdateSchema } from '@/lib/validators/generated/iris-communications/survey_responses';
import type { SurveyResponsesInsert, SurveyResponsesRow, SurveyResponsesUpdate } from '@/types/generated/iris-communications/survey_responses';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new survey_responses record
 */
export async function createSurveyResponses(data: SurveyResponsesInsert): Promise<SurveyResponsesRow> {
  const validated = SurveyResponsesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('survey_responses')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single survey_responses record by ID
 */
export async function getSurveyResponses(id: string): Promise<SurveyResponsesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('survey_responses')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of survey_responses records with pagination
 */
export async function listSurveyResponses(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SurveyResponsesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('survey_responses').select('*', { count: 'exact' });
  
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
 * Update a survey_responses record
 */
export async function updateSurveyResponses(id: string, data: SurveyResponsesUpdate): Promise<SurveyResponsesRow> {
  const validated = SurveyResponsesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('survey_responses')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a survey_responses record
 */
export async function deleteSurveyResponses(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('survey_responses')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
