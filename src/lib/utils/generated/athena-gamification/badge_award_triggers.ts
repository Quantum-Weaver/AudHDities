// =====================================================
// UTILITIES: BadgeAwardTriggers
// DEITY: athena-gamification
// GENERATED: 2026-05-01T15:31:59.463Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { BadgeAwardTriggersInsertSchema, BadgeAwardTriggersUpdateSchema } from '@/lib/validators/generated/athena-gamification/badge_award_triggers';
import type { BadgeAwardTriggersInsert, BadgeAwardTriggersRow, BadgeAwardTriggersUpdate } from '@/types/generated/athena-gamification/badge_award_triggers';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new badge_award_triggers record
 */
export async function createBadgeAwardTriggers(data: BadgeAwardTriggersInsert): Promise<BadgeAwardTriggersRow> {
  const validated = BadgeAwardTriggersInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('badge_award_triggers')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single badge_award_triggers record by ID
 */
export async function getBadgeAwardTriggers(id: string): Promise<BadgeAwardTriggersRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('badge_award_triggers')
    .select('*')
    .eq('badge_award_triggers_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of badge_award_triggers records with pagination
 */
export async function listBadgeAwardTriggers(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: BadgeAwardTriggersRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('badge_award_triggers').select('*', { count: 'exact' });
  
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
 * Update a badge_award_triggers record
 */
export async function updateBadgeAwardTriggers(id: string, data: BadgeAwardTriggersUpdate): Promise<BadgeAwardTriggersRow> {
  const validated = BadgeAwardTriggersUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('badge_award_triggers')
    .update(validated)
    .eq('badge_award_triggers_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a badge_award_triggers record
 */
export async function deleteBadgeAwardTriggers(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('badge_award_triggers')
    .delete()
    .eq('badge_award_triggers_id', id);
  
  if (error) throw error;
  return true;
}
