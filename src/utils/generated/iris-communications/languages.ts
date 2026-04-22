// =====================================================
// UTILITIES: Languages
// DEITY: iris-communications
// GENERATED: 2026-04-22T05:15:34.790Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { LanguagesInsertSchema, LanguagesUpdateSchema } from '@/lib/validators/generated/iris-communications/languages';
import type { LanguagesInsert, LanguagesRow, LanguagesUpdate } from '@/types/generated/iris-communications/languages';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new languages record
 */
export async function createLanguages(data: LanguagesInsert): Promise<LanguagesRow> {
  const validated = LanguagesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('languages')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single languages record by ID
 */
export async function getLanguages(id: string): Promise<LanguagesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('languages')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of languages records with pagination
 */
export async function listLanguages(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: LanguagesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('languages').select('*', { count: 'exact' });
  
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
 * Update a languages record
 */
export async function updateLanguages(id: string, data: LanguagesUpdate): Promise<LanguagesRow> {
  const validated = LanguagesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('languages')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a languages record
 */
export async function deleteLanguages(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('languages')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
