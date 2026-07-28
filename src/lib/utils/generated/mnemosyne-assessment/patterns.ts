// =====================================================
// UTILITIES: Patterns
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-28T05:07:04.389Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { PatternsInsertSchema, PatternsUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/patterns';
import type { PatternsInsert, PatternsRow, PatternsUpdate } from '@/types/generated/mnemosyne-assessment/patterns';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new patterns record
 */
export async function createPatterns(data: PatternsInsert): Promise<PatternsRow> {
  const validated = PatternsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('patterns')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single patterns record by ID
 */
export async function getPatterns(id: string): Promise<PatternsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('patterns')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of patterns records with pagination
 */
export async function listPatterns(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PatternsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('patterns').select('*', { count: 'exact' });
  
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
 * Update a patterns record
 */
export async function updatePatterns(id: string, data: PatternsUpdate): Promise<PatternsRow> {
  const validated = PatternsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('patterns')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a patterns record
 */
export async function deletePatterns(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('patterns')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
