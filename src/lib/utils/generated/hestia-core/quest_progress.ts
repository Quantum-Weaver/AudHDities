// =====================================================
// UTILITIES: QuestProgress
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.716Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { QuestProgressInsertSchema, QuestProgressUpdateSchema } from '@/lib/validators/generated/hestia-core/quest_progress';
import type { QuestProgressInsert, QuestProgressRow, QuestProgressUpdate } from '@/types/generated/hestia-core/quest_progress';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new quest_progress record
 */
export async function createQuestProgress(data: QuestProgressInsert): Promise<QuestProgressRow> {
  const validated = QuestProgressInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('quest_progress')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single quest_progress record by ID
 */
export async function getQuestProgress(id: string): Promise<QuestProgressRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('quest_progress')
    .select('*')
    .eq('quest_progress_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of quest_progress records with pagination
 */
export async function listQuestProgress(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: QuestProgressRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('quest_progress').select('*', { count: 'exact' });
  
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
 * Update a quest_progress record
 */
export async function updateQuestProgress(id: string, data: QuestProgressUpdate): Promise<QuestProgressRow> {
  const validated = QuestProgressUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('quest_progress')
    .update(validated)
    .eq('quest_progress_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a quest_progress record
 */
export async function deleteQuestProgress(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('quest_progress')
    .delete()
    .eq('quest_progress_id', id);
  
  if (error) throw error;
  return true;
}
