// =====================================================
// UTILITIES: UserPrivate
// DEITY: hestia-core
// GENERATED: 2026-04-22T18:24:20.116Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { UserPrivateInsertSchema, UserPrivateUpdateSchema } from '@/lib/validators/generated/hestia-core/user_private';
import type { UserPrivateInsert, UserPrivateRow, UserPrivateUpdate } from '@/types/generated/hestia-core/user_private';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new user_private record
 */
export async function createUserPrivate(data: UserPrivateInsert): Promise<UserPrivateRow> {
  const validated = UserPrivateInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('user_private')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single user_private record by ID
 */
export async function getUserPrivate(id: string): Promise<UserPrivateRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('user_private')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of user_private records with pagination
 */
export async function listUserPrivate(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: UserPrivateRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('user_private').select('*', { count: 'exact' });
  
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
 * Update a user_private record
 */
export async function updateUserPrivate(id: string, data: UserPrivateUpdate): Promise<UserPrivateRow> {
  const validated = UserPrivateUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('user_private')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a user_private record
 */
export async function deleteUserPrivate(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('user_private')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
