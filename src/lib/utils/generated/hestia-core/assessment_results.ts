// =====================================================
// UTILITIES: AssessmentResults
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.253Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { AssessmentResultsInsertSchema, AssessmentResultsUpdateSchema } from '@/lib/validators/generated/hestia-core/assessment_results';
import type { AssessmentResultsInsert, AssessmentResultsRow, AssessmentResultsUpdate } from '@/types/generated/hestia-core/assessment_results';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new assessment_results record
 */
export async function createAssessmentResults(data: AssessmentResultsInsert): Promise<AssessmentResultsRow> {
  const validated = AssessmentResultsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('assessment_results')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single assessment_results record by ID
 */
export async function getAssessmentResults(id: string): Promise<AssessmentResultsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('assessment_results')
    .select('*')
    .eq('assessment_results_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of assessment_results records with pagination
 */
export async function listAssessmentResults(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: AssessmentResultsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('assessment_results').select('*', { count: 'exact' });
  
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
 * Update a assessment_results record
 */
export async function updateAssessmentResults(id: string, data: AssessmentResultsUpdate): Promise<AssessmentResultsRow> {
  const validated = AssessmentResultsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('assessment_results')
    .update(validated)
    .eq('assessment_results_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a assessment_results record
 */
export async function deleteAssessmentResults(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('assessment_results')
    .delete()
    .eq('assessment_results_id', id);
  
  if (error) throw error;
  return true;
}
