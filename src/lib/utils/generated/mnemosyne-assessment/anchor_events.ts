// =====================================================
// UTILITIES: AnchorEvents
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-31T23:16:54.246Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { AnchorEventsInsertSchema, AnchorEventsUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/anchor_events';
import type { AnchorEventsInsert, AnchorEventsRow, AnchorEventsUpdate } from '@/types/generated/mnemosyne-assessment/anchor_events';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new anchor_events record
 */
export async function createAnchorEvents(data: AnchorEventsInsert): Promise<AnchorEventsRow> {
  const validated = AnchorEventsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('anchor_events')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single anchor_events record by ID
 */
export async function getAnchorEvents(id: string): Promise<AnchorEventsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('anchor_events')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of anchor_events records with pagination
 */
export async function listAnchorEvents(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: AnchorEventsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('anchor_events').select('*', { count: 'exact' });
  
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
 * Update a anchor_events record
 */
export async function updateAnchorEvents(id: string, data: AnchorEventsUpdate): Promise<AnchorEventsRow> {
  const validated = AnchorEventsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('anchor_events')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a anchor_events record
 */
export async function deleteAnchorEvents(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('anchor_events')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
