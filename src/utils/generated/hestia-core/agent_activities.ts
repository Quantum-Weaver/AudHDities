// =====================================================
// UTILITIES: AgentActivities
// DEITY: hestia-core
// GENERATED: 2026-04-22T05:48:49.698Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { AgentActivitiesInsertSchema, AgentActivitiesUpdateSchema } from '@/lib/validators/generated/hestia-core/agent_activities';
import type { AgentActivitiesInsert, AgentActivitiesRow, AgentActivitiesUpdate } from '@/types/generated/hestia-core/agent_activities';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new agent_activities record
 */
export async function createAgentActivities(data: AgentActivitiesInsert): Promise<AgentActivitiesRow> {
  const validated = AgentActivitiesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('agent_activities')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single agent_activities record by ID
 */
export async function getAgentActivities(id: string): Promise<AgentActivitiesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('agent_activities')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of agent_activities records with pagination
 */
export async function listAgentActivities(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: AgentActivitiesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('agent_activities').select('*', { count: 'exact' });
  
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
 * Update a agent_activities record
 */
export async function updateAgentActivities(id: string, data: AgentActivitiesUpdate): Promise<AgentActivitiesRow> {
  const validated = AgentActivitiesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('agent_activities')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a agent_activities record
 */
export async function deleteAgentActivities(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('agent_activities')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
