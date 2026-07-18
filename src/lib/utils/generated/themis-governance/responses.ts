// =====================================================
// UTILITIES: Responses
// DEITY: themis-governance
// GENERATED: 2026-07-18T21:42:54.461Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ResponsesInsertSchema, ResponsesUpdateSchema } from '@/lib/validators/generated/themis-governance/responses';
import type { ResponsesInsert, ResponsesRow, ResponsesUpdate } from '@/types/generated/themis-governance/responses';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new responses record
 */
export async function createResponses(data: ResponsesInsert): Promise<ResponsesRow> {
  const validated = ResponsesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('responses')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single responses record by ID
 */
export async function getResponses(id: string): Promise<ResponsesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('responses')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of responses records with pagination
 */
export async function listResponses(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ResponsesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('responses').select('*', { count: 'exact' });
  
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
 * Update a responses record
 */
export async function updateResponses(id: string, data: ResponsesUpdate): Promise<ResponsesRow> {
  const validated = ResponsesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('responses')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a responses record
 */
export async function deleteResponses(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('responses')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
