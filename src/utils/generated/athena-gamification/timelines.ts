// =====================================================
// UTILITIES: Timelines
// DEITY: athena-gamification
// GENERATED: 2026-04-22T18:15:10.917Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { TimelinesInsertSchema, TimelinesUpdateSchema } from '@/lib/validators/generated/athena-gamification/timelines';
import type { TimelinesInsert, TimelinesRow, TimelinesUpdate } from '@/types/generated/athena-gamification/timelines';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new timelines record
 */
export async function createTimelines(data: TimelinesInsert): Promise<TimelinesRow> {
  const validated = TimelinesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('timelines')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single timelines record by ID
 */
export async function getTimelines(id: string): Promise<TimelinesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('timelines')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of timelines records with pagination
 */
export async function listTimelines(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: TimelinesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('timelines').select('*', { count: 'exact' });
  
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
 * Update a timelines record
 */
export async function updateTimelines(id: string, data: TimelinesUpdate): Promise<TimelinesRow> {
  const validated = TimelinesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('timelines')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a timelines record
 */
export async function deleteTimelines(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('timelines')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
