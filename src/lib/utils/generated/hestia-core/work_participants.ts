// =====================================================
// UTILITIES: WorkParticipants
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.996Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { WorkParticipantsInsertSchema, WorkParticipantsUpdateSchema } from '@/lib/validators/generated/hestia-core/work_participants';
import type { WorkParticipantsInsert, WorkParticipantsRow, WorkParticipantsUpdate } from '@/types/generated/hestia-core/work_participants';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new work_participants record
 */
export async function createWorkParticipants(data: WorkParticipantsInsert): Promise<WorkParticipantsRow> {
  const validated = WorkParticipantsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('work_participants')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single work_participants record by ID
 */
export async function getWorkParticipants(id: string): Promise<WorkParticipantsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('work_participants')
    .select('*')
    .eq('work_participants_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of work_participants records with pagination
 */
export async function listWorkParticipants(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: WorkParticipantsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('work_participants').select('*', { count: 'exact' });
  
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
 * Update a work_participants record
 */
export async function updateWorkParticipants(id: string, data: WorkParticipantsUpdate): Promise<WorkParticipantsRow> {
  const validated = WorkParticipantsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('work_participants')
    .update(validated)
    .eq('work_participants_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a work_participants record
 */
export async function deleteWorkParticipants(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('work_participants')
    .delete()
    .eq('work_participants_id', id);
  
  if (error) throw error;
  return true;
}
