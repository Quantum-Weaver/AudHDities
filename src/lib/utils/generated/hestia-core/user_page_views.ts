// =====================================================
// UTILITIES: UserPageViews
// DEITY: hestia-core
// GENERATED: 2026-07-18T23:17:11.204Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { UserPageViewsInsertSchema, UserPageViewsUpdateSchema } from '@/lib/validators/generated/hestia-core/user_page_views';
import type { UserPageViewsInsert, UserPageViewsRow, UserPageViewsUpdate } from '@/types/generated/hestia-core/user_page_views';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new user_page_views record
 */
export async function createUserPageViews(data: UserPageViewsInsert): Promise<UserPageViewsRow> {
  const validated = UserPageViewsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('user_page_views')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single user_page_views record by ID
 */
export async function getUserPageViews(id: string): Promise<UserPageViewsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('user_page_views')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of user_page_views records with pagination
 */
export async function listUserPageViews(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: UserPageViewsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('user_page_views').select('*', { count: 'exact' });
  
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
 * Update a user_page_views record
 */
export async function updateUserPageViews(id: string, data: UserPageViewsUpdate): Promise<UserPageViewsRow> {
  const validated = UserPageViewsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('user_page_views')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a user_page_views record
 */
export async function deleteUserPageViews(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('user_page_views')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
