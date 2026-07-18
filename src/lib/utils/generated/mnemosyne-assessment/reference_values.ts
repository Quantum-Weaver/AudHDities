// =====================================================
// UTILITIES: ReferenceValues
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-18T23:30:03.977Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ReferenceValuesInsertSchema, ReferenceValuesUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/reference_values';
import type { ReferenceValuesInsert, ReferenceValuesRow, ReferenceValuesUpdate } from '@/types/generated/mnemosyne-assessment/reference_values';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new reference_values record
 */
export async function createReferenceValues(data: ReferenceValuesInsert): Promise<ReferenceValuesRow> {
  const validated = ReferenceValuesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('reference_values')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single reference_values record by ID
 */
export async function getReferenceValues(id: string): Promise<ReferenceValuesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('reference_values')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of reference_values records with pagination
 */
export async function listReferenceValues(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ReferenceValuesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('reference_values').select('*', { count: 'exact' });
  
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
 * Update a reference_values record
 */
export async function updateReferenceValues(id: string, data: ReferenceValuesUpdate): Promise<ReferenceValuesRow> {
  const validated = ReferenceValuesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('reference_values')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a reference_values record
 */
export async function deleteReferenceValues(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('reference_values')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
