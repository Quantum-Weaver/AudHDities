// =====================================================
// UTILITIES: Localization
// DEITY: iris-communications
// GENERATED: 2026-04-30T04:17:47.563Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { LocalizationInsertSchema, LocalizationUpdateSchema } from '@/lib/validators/generated/iris-communications/localization';
import type { LocalizationInsert, LocalizationRow, LocalizationUpdate } from '@/types/generated/iris-communications/localization';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new localization record
 */
export async function createLocalization(data: LocalizationInsert): Promise<LocalizationRow> {
  const validated = LocalizationInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('localization')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single localization record by ID
 */
export async function getLocalization(id: string): Promise<LocalizationRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('localization')
    .select('*')
    .eq('localization_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of localization records with pagination
 */
export async function listLocalization(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: LocalizationRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('localization').select('*', { count: 'exact' });
  
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
 * Update a localization record
 */
export async function updateLocalization(id: string, data: LocalizationUpdate): Promise<LocalizationRow> {
  const validated = LocalizationUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('localization')
    .update(validated)
    .eq('localization_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a localization record
 */
export async function deleteLocalization(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('localization')
    .delete()
    .eq('localization_id', id);
  
  if (error) throw error;
  return true;
}
