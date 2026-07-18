// =====================================================
// UTILITIES: UserRoles
// DEITY: hestia-core
// GENERATED: 2026-07-18T23:30:04.130Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { UserRolesInsertSchema, UserRolesUpdateSchema } from '@/lib/validators/generated/hestia-core/user_roles';
import type { UserRolesInsert, UserRolesRow, UserRolesUpdate } from '@/types/generated/hestia-core/user_roles';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new user_roles record
 */
export async function createUserRoles(data: UserRolesInsert): Promise<UserRolesRow> {
  const validated = UserRolesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('user_roles')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single user_roles record by ID
 */
export async function getUserRoles(id: string): Promise<UserRolesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('user_roles')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of user_roles records with pagination
 */
export async function listUserRoles(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: UserRolesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('user_roles').select('*', { count: 'exact' });
  
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
 * Update a user_roles record
 */
export async function updateUserRoles(id: string, data: UserRolesUpdate): Promise<UserRolesRow> {
  const validated = UserRolesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('user_roles')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a user_roles record
 */
export async function deleteUserRoles(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('user_roles')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
