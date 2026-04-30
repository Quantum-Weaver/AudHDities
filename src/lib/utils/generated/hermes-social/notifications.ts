// =====================================================
// UTILITIES: Notifications
// DEITY: hermes-social
// GENERATED: 2026-04-30T04:17:47.715Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { NotificationsInsertSchema, NotificationsUpdateSchema } from '@/lib/validators/generated/hermes-social/notifications';
import type { NotificationsInsert, NotificationsRow, NotificationsUpdate } from '@/types/generated/hermes-social/notifications';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new notifications record
 */
export async function createNotifications(data: NotificationsInsert): Promise<NotificationsRow> {
  const validated = NotificationsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('notifications')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single notifications record by ID
 */
export async function getNotifications(id: string): Promise<NotificationsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('notifications_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of notifications records with pagination
 */
export async function listNotifications(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: NotificationsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('notifications').select('*', { count: 'exact' });
  
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
 * Update a notifications record
 */
export async function updateNotifications(id: string, data: NotificationsUpdate): Promise<NotificationsRow> {
  const validated = NotificationsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('notifications')
    .update(validated)
    .eq('notifications_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a notifications record
 */
export async function deleteNotifications(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('notifications_id', id);
  
  if (error) throw error;
  return true;
}
