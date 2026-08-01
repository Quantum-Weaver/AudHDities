// =====================================================
// UTILITIES: Events
// DEITY: prometheus-stage
// GENERATED: 2026-08-01T18:34:04.345Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { EventsInsertSchema, EventsUpdateSchema } from '@/lib/validators/generated/prometheus-stage/events';
import type { EventsInsert, EventsRow, EventsUpdate } from '@/types/generated/prometheus-stage/events';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new events record
 */
export async function createEvents(data: EventsInsert): Promise<EventsRow> {
  const validated = EventsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('events')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single events record by ID
 */
export async function getEvents(id: string): Promise<EventsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of events records with pagination
 */
export async function listEvents(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: EventsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('events').select('*', { count: 'exact' });
  
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
 * Update a events record
 */
export async function updateEvents(id: string, data: EventsUpdate): Promise<EventsRow> {
  const validated = EventsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('events')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a events record
 */
export async function deleteEvents(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
