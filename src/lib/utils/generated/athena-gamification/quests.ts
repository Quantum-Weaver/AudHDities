// =====================================================
// UTILITIES: Quests
// DEITY: athena-gamification
// GENERATED: 2026-07-29T16:16:53.952Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { QuestsInsertSchema, QuestsUpdateSchema } from '@/lib/validators/generated/athena-gamification/quests';
import type { QuestsInsert, QuestsRow, QuestsUpdate } from '@/types/generated/athena-gamification/quests';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new quests record
 */
export async function createQuests(data: QuestsInsert): Promise<QuestsRow> {
  const validated = QuestsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('quests')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single quests record by ID
 */
export async function getQuests(id: string): Promise<QuestsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('quests')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of quests records with pagination
 */
export async function listQuests(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: QuestsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('quests').select('*', { count: 'exact' });
  
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
 * Update a quests record
 */
export async function updateQuests(id: string, data: QuestsUpdate): Promise<QuestsRow> {
  const validated = QuestsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('quests')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a quests record
 */
export async function deleteQuests(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('quests')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
