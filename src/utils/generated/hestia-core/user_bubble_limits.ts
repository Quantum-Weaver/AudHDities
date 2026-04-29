// =====================================================
// UTILITIES: UserBubbleLimits
// DEITY: hestia-core
// GENERATED: 2026-04-29T20:53:53.569Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { UserBubbleLimitsInsertSchema, UserBubbleLimitsUpdateSchema } from '@/lib/validators/generated/hestia-core/user_bubble_limits';
import type { UserBubbleLimitsInsert, UserBubbleLimitsRow, UserBubbleLimitsUpdate } from '@/types/generated/hestia-core/user_bubble_limits';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new user_bubble_limits record
 */
export async function createUserBubbleLimits(data: UserBubbleLimitsInsert): Promise<UserBubbleLimitsRow> {
  const validated = UserBubbleLimitsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('user_bubble_limits')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single user_bubble_limits record by ID
 */
export async function getUserBubbleLimits(id: string): Promise<UserBubbleLimitsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('user_bubble_limits')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of user_bubble_limits records with pagination
 */
export async function listUserBubbleLimits(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: UserBubbleLimitsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('user_bubble_limits').select('*', { count: 'exact' });
  
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
 * Update a user_bubble_limits record
 */
export async function updateUserBubbleLimits(id: string, data: UserBubbleLimitsUpdate): Promise<UserBubbleLimitsRow> {
  const validated = UserBubbleLimitsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('user_bubble_limits')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a user_bubble_limits record
 */
export async function deleteUserBubbleLimits(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('user_bubble_limits')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
