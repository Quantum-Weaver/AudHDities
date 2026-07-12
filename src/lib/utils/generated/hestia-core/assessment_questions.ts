// =====================================================
// UTILITIES: AssessmentQuestions
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.248Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { AssessmentQuestionsInsertSchema, AssessmentQuestionsUpdateSchema } from '@/lib/validators/generated/hestia-core/assessment_questions';
import type { AssessmentQuestionsInsert, AssessmentQuestionsRow, AssessmentQuestionsUpdate } from '@/types/generated/hestia-core/assessment_questions';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new assessment_questions record
 */
export async function createAssessmentQuestions(data: AssessmentQuestionsInsert): Promise<AssessmentQuestionsRow> {
  const validated = AssessmentQuestionsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('assessment_questions')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single assessment_questions record by ID
 */
export async function getAssessmentQuestions(id: string): Promise<AssessmentQuestionsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('assessment_questions')
    .select('*')
    .eq('assessment_questions_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of assessment_questions records with pagination
 */
export async function listAssessmentQuestions(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: AssessmentQuestionsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('assessment_questions').select('*', { count: 'exact' });
  
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
 * Update a assessment_questions record
 */
export async function updateAssessmentQuestions(id: string, data: AssessmentQuestionsUpdate): Promise<AssessmentQuestionsRow> {
  const validated = AssessmentQuestionsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('assessment_questions')
    .update(validated)
    .eq('assessment_questions_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a assessment_questions record
 */
export async function deleteAssessmentQuestions(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('assessment_questions')
    .delete()
    .eq('assessment_questions_id', id);
  
  if (error) throw error;
  return true;
}
