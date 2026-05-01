// =====================================================
// UTILITIES: ModerationActions
// DEITY: themis-governance
// GENERATED: 2026-05-01T03:24:41.642Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ModerationActionsInsertSchema, ModerationActionsUpdateSchema } from '@/lib/validators/generated/themis-governance/moderation_actions';
import type { ModerationActionsInsert, ModerationActionsRow, ModerationActionsUpdate } from '@/types/generated/themis-governance/moderation_actions';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new moderation_actions record
 */
export async function createModerationActions(data: ModerationActionsInsert): Promise<ModerationActionsRow> {
  const validated = ModerationActionsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('moderation_actions')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single moderation_actions record by ID
 */
export async function getModerationActions(id: string): Promise<ModerationActionsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('moderation_actions')
    .select('*')
    .eq('moderation_actions_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of moderation_actions records with pagination
 */
export async function listModerationActions(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ModerationActionsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('moderation_actions').select('*', { count: 'exact' });
  
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
 * Update a moderation_actions record
 */
export async function updateModerationActions(id: string, data: ModerationActionsUpdate): Promise<ModerationActionsRow> {
  const validated = ModerationActionsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('moderation_actions')
    .update(validated)
    .eq('moderation_actions_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a moderation_actions record
 */
export async function deleteModerationActions(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('moderation_actions')
    .delete()
    .eq('moderation_actions_id', id);
  
  if (error) throw error;
  return true;
}
