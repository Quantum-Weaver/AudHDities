// =====================================================
// UTILITIES: Surveys
// DEITY: iris-communications
// GENERATED: 2026-04-22T18:15:10.837Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { SurveysInsertSchema, SurveysUpdateSchema } from '@/lib/validators/generated/iris-communications/surveys';
import type { SurveysInsert, SurveysRow, SurveysUpdate } from '@/types/generated/iris-communications/surveys';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new surveys record
 */
export async function createSurveys(data: SurveysInsert): Promise<SurveysRow> {
  const validated = SurveysInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('surveys')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single surveys record by ID
 */
export async function getSurveys(id: string): Promise<SurveysRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('surveys')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of surveys records with pagination
 */
export async function listSurveys(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SurveysRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('surveys').select('*', { count: 'exact' });
  
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
 * Update a surveys record
 */
export async function updateSurveys(id: string, data: SurveysUpdate): Promise<SurveysRow> {
  const validated = SurveysUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('surveys')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a surveys record
 */
export async function deleteSurveys(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('surveys')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
