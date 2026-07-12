// =====================================================
// UTILITIES: Scheduling
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-07-10T18:14:59.784Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { SchedulingInsertSchema, SchedulingUpdateSchema } from '@/lib/validators/generated/hephaestus-infrastructure/scheduling';
import type { SchedulingInsert, SchedulingRow, SchedulingUpdate } from '@/types/generated/hephaestus-infrastructure/scheduling';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new scheduling record
 */
export async function createScheduling(data: SchedulingInsert): Promise<SchedulingRow> {
  const validated = SchedulingInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('scheduling')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single scheduling record by ID
 */
export async function getScheduling(id: string): Promise<SchedulingRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('scheduling')
    .select('*')
    .eq('scheduling_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of scheduling records with pagination
 */
export async function listScheduling(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SchedulingRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('scheduling').select('*', { count: 'exact' });
  
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
 * Update a scheduling record
 */
export async function updateScheduling(id: string, data: SchedulingUpdate): Promise<SchedulingRow> {
  const validated = SchedulingUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('scheduling')
    .update(validated)
    .eq('scheduling_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a scheduling record
 */
export async function deleteScheduling(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('scheduling')
    .delete()
    .eq('scheduling_id', id);
  
  if (error) throw error;
  return true;
}
