// =====================================================
// UTILITIES: Badges
// DEITY: athena-gamification
// GENERATED: 2026-04-22T05:48:49.803Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { BadgesInsertSchema, BadgesUpdateSchema } from '@/lib/validators/generated/athena-gamification/badges';
import type { BadgesInsert, BadgesRow, BadgesUpdate } from '@/types/generated/athena-gamification/badges';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new badges record
 */
export async function createBadges(data: BadgesInsert): Promise<BadgesRow> {
  const validated = BadgesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('badges')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single badges record by ID
 */
export async function getBadges(id: string): Promise<BadgesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('badges')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of badges records with pagination
 */
export async function listBadges(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: BadgesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('badges').select('*', { count: 'exact' });
  
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
 * Update a badges record
 */
export async function updateBadges(id: string, data: BadgesUpdate): Promise<BadgesRow> {
  const validated = BadgesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('badges')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a badges record
 */
export async function deleteBadges(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('badges')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
