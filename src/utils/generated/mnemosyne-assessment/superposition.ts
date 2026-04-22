// =====================================================
// UTILITIES: Superposition
// DEITY: mnemosyne-assessment
// GENERATED: 2026-04-22T18:15:10.792Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { SuperpositionInsertSchema, SuperpositionUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/superposition';
import type { SuperpositionInsert, SuperpositionRow, SuperpositionUpdate } from '@/types/generated/mnemosyne-assessment/superposition';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new superposition record
 */
export async function createSuperposition(data: SuperpositionInsert): Promise<SuperpositionRow> {
  const validated = SuperpositionInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('superposition')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single superposition record by ID
 */
export async function getSuperposition(id: string): Promise<SuperpositionRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('superposition')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of superposition records with pagination
 */
export async function listSuperposition(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SuperpositionRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('superposition').select('*', { count: 'exact' });
  
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
 * Update a superposition record
 */
export async function updateSuperposition(id: string, data: SuperpositionUpdate): Promise<SuperpositionRow> {
  const validated = SuperpositionUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('superposition')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a superposition record
 */
export async function deleteSuperposition(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('superposition')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
