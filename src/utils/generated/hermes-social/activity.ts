// =====================================================
// UTILITIES: Activity
// DEITY: hermes-social
// GENERATED: 2026-04-22T05:48:49.635Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ActivityInsertSchema, ActivityUpdateSchema } from '@/lib/validators/generated/hermes-social/activity';
import type { ActivityInsert, ActivityRow, ActivityUpdate } from '@/types/generated/hermes-social/activity';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new activity record
 */
export async function createActivity(data: ActivityInsert): Promise<ActivityRow> {
  const validated = ActivityInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('activity')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single activity record by ID
 */
export async function getActivity(id: string): Promise<ActivityRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('activity')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of activity records with pagination
 */
export async function listActivity(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ActivityRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('activity').select('*', { count: 'exact' });
  
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
 * Update a activity record
 */
export async function updateActivity(id: string, data: ActivityUpdate): Promise<ActivityRow> {
  const validated = ActivityUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('activity')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a activity record
 */
export async function deleteActivity(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('activity')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
