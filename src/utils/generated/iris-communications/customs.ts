// =====================================================
// UTILITIES: Customs
// DEITY: iris-communications
// GENERATED: 2026-04-22T18:15:09.833Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { CustomsInsertSchema, CustomsUpdateSchema } from '@/lib/validators/generated/iris-communications/customs';
import type { CustomsInsert, CustomsRow, CustomsUpdate } from '@/types/generated/iris-communications/customs';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new customs record
 */
export async function createCustoms(data: CustomsInsert): Promise<CustomsRow> {
  const validated = CustomsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('customs')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single customs record by ID
 */
export async function getCustoms(id: string): Promise<CustomsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('customs')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of customs records with pagination
 */
export async function listCustoms(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: CustomsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('customs').select('*', { count: 'exact' });
  
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
 * Update a customs record
 */
export async function updateCustoms(id: string, data: CustomsUpdate): Promise<CustomsRow> {
  const validated = CustomsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('customs')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a customs record
 */
export async function deleteCustoms(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('customs')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
