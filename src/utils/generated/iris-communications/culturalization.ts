// =====================================================
// UTILITIES: Culturalization
// DEITY: iris-communications
// GENERATED: 2026-04-22T05:15:34.560Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { CulturalizationInsertSchema, CulturalizationUpdateSchema } from '@/lib/validators/generated/iris-communications/culturalization';
import type { CulturalizationInsert, CulturalizationRow, CulturalizationUpdate } from '@/types/generated/iris-communications/culturalization';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new culturalization record
 */
export async function createCulturalization(data: CulturalizationInsert): Promise<CulturalizationRow> {
  const validated = CulturalizationInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('culturalization')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single culturalization record by ID
 */
export async function getCulturalization(id: string): Promise<CulturalizationRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('culturalization')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of culturalization records with pagination
 */
export async function listCulturalization(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: CulturalizationRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('culturalization').select('*', { count: 'exact' });
  
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
 * Update a culturalization record
 */
export async function updateCulturalization(id: string, data: CulturalizationUpdate): Promise<CulturalizationRow> {
  const validated = CulturalizationUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('culturalization')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a culturalization record
 */
export async function deleteCulturalization(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('culturalization')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
