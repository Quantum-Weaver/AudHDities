// =====================================================
// UTILITIES: UserBubblePops
// DEITY: hestia-core
// GENERATED: 2026-04-30T04:17:48.471Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { UserBubblePopsInsertSchema, UserBubblePopsUpdateSchema } from '@/lib/validators/generated/hestia-core/user_bubble_pops';
import type { UserBubblePopsInsert, UserBubblePopsRow, UserBubblePopsUpdate } from '@/types/generated/hestia-core/user_bubble_pops';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new user_bubble_pops record
 */
export async function createUserBubblePops(data: UserBubblePopsInsert): Promise<UserBubblePopsRow> {
  const validated = UserBubblePopsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('user_bubble_pops')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single user_bubble_pops record by ID
 */
export async function getUserBubblePops(id: string): Promise<UserBubblePopsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('user_bubble_pops')
    .select('*')
    .eq('user_bubble_pops_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of user_bubble_pops records with pagination
 */
export async function listUserBubblePops(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: UserBubblePopsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('user_bubble_pops').select('*', { count: 'exact' });
  
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
 * Update a user_bubble_pops record
 */
export async function updateUserBubblePops(id: string, data: UserBubblePopsUpdate): Promise<UserBubblePopsRow> {
  const validated = UserBubblePopsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('user_bubble_pops')
    .update(validated)
    .eq('user_bubble_pops_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a user_bubble_pops record
 */
export async function deleteUserBubblePops(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('user_bubble_pops')
    .delete()
    .eq('user_bubble_pops_id', id);
  
  if (error) throw error;
  return true;
}
