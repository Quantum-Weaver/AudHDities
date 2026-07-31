// =====================================================
// UTILITIES: UserFinancial
// DEITY: hestia-core
// GENERATED: 2026-07-31T01:03:41.748Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { UserFinancialInsertSchema, UserFinancialUpdateSchema } from '@/lib/validators/generated/hestia-core/user_financial';
import type { UserFinancialInsert, UserFinancialRow, UserFinancialUpdate } from '@/types/generated/hestia-core/user_financial';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new user_financial record
 */
export async function createUserFinancial(data: UserFinancialInsert): Promise<UserFinancialRow> {
  const validated = UserFinancialInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('user_financial')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single user_financial record by ID
 */
export async function getUserFinancial(id: string): Promise<UserFinancialRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('user_financial')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of user_financial records with pagination
 */
export async function listUserFinancial(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: UserFinancialRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('user_financial').select('*', { count: 'exact' });
  
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
 * Update a user_financial record
 */
export async function updateUserFinancial(id: string, data: UserFinancialUpdate): Promise<UserFinancialRow> {
  const validated = UserFinancialUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('user_financial')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a user_financial record
 */
export async function deleteUserFinancial(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('user_financial')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
