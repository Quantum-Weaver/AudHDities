// =====================================================
// UTILITIES: Enums
// DEITY: hestia-core
// GENERATED: 2026-07-29T16:16:53.722Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { EnumsInsertSchema, EnumsUpdateSchema } from '@/lib/validators/generated/hestia-core/enums';
import type { EnumsInsert, EnumsRow, EnumsUpdate } from '@/types/generated/hestia-core/enums';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new enums record
 */
export async function createEnums(data: EnumsInsert): Promise<EnumsRow> {
  const validated = EnumsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('enums')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single enums record by ID
 */
export async function getEnums(id: string): Promise<EnumsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('enums')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of enums records with pagination
 */
export async function listEnums(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: EnumsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('enums').select('*', { count: 'exact' });
  
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
 * Update a enums record
 */
export async function updateEnums(id: string, data: EnumsUpdate): Promise<EnumsRow> {
  const validated = EnumsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('enums')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a enums record
 */
export async function deleteEnums(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('enums')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
