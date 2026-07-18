// =====================================================
// UTILITIES: Calendar
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-07-18T23:17:10.658Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { CalendarInsertSchema, CalendarUpdateSchema } from '@/lib/validators/generated/hephaestus-infrastructure/calendar';
import type { CalendarInsert, CalendarRow, CalendarUpdate } from '@/types/generated/hephaestus-infrastructure/calendar';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new calendar record
 */
export async function createCalendar(data: CalendarInsert): Promise<CalendarRow> {
  const validated = CalendarInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('calendar')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single calendar record by ID
 */
export async function getCalendar(id: string): Promise<CalendarRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('calendar')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of calendar records with pagination
 */
export async function listCalendar(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: CalendarRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('calendar').select('*', { count: 'exact' });
  
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
 * Update a calendar record
 */
export async function updateCalendar(id: string, data: CalendarUpdate): Promise<CalendarRow> {
  const validated = CalendarUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('calendar')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a calendar record
 */
export async function deleteCalendar(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('calendar')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
