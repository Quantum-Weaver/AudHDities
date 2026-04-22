// =====================================================
// UTILITIES: Translations
// DEITY: iris-communications
// GENERATED: 2026-04-22T18:15:10.945Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { TranslationsInsertSchema, TranslationsUpdateSchema } from '@/lib/validators/generated/iris-communications/translations';
import type { TranslationsInsert, TranslationsRow, TranslationsUpdate } from '@/types/generated/iris-communications/translations';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new translations record
 */
export async function createTranslations(data: TranslationsInsert): Promise<TranslationsRow> {
  const validated = TranslationsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('translations')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single translations record by ID
 */
export async function getTranslations(id: string): Promise<TranslationsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('translations')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of translations records with pagination
 */
export async function listTranslations(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: TranslationsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('translations').select('*', { count: 'exact' });
  
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
 * Update a translations record
 */
export async function updateTranslations(id: string, data: TranslationsUpdate): Promise<TranslationsRow> {
  const validated = TranslationsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('translations')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a translations record
 */
export async function deleteTranslations(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('translations')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
