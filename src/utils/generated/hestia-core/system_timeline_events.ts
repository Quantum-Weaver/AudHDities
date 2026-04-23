// =====================================================
// UTILITIES: SystemTimelineEvents
// DEITY: hestia-core
// GENERATED: 2026-04-23T02:16:59.204Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { SystemTimelineEventsInsertSchema, SystemTimelineEventsUpdateSchema } from '@/lib/validators/generated/hestia-core/system_timeline_events';
import type { SystemTimelineEventsInsert, SystemTimelineEventsRow, SystemTimelineEventsUpdate } from '@/types/generated/hestia-core/system_timeline_events';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new system_timeline_events record
 */
export async function createSystemTimelineEvents(data: SystemTimelineEventsInsert): Promise<SystemTimelineEventsRow> {
  const validated = SystemTimelineEventsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('system_timeline_events')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single system_timeline_events record by ID
 */
export async function getSystemTimelineEvents(id: string): Promise<SystemTimelineEventsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('system_timeline_events')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of system_timeline_events records with pagination
 */
export async function listSystemTimelineEvents(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SystemTimelineEventsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('system_timeline_events').select('*', { count: 'exact' });
  
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
 * Update a system_timeline_events record
 */
export async function updateSystemTimelineEvents(id: string, data: SystemTimelineEventsUpdate): Promise<SystemTimelineEventsRow> {
  const validated = SystemTimelineEventsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('system_timeline_events')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a system_timeline_events record
 */
export async function deleteSystemTimelineEvents(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('system_timeline_events')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
