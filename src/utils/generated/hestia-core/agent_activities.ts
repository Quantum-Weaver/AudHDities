// =====================================================
// FILE: utils/generated/hestia-core/agent_activities.ts
// GENERATED: 2026-04-17T09:51:12.697Z
// SOURCE: database.types.ts
// =====================================================

import type { AgentActivitiesRow, AgentActivitiesInsert, AgentActivitiesUpdate } from '@/types/generated/hestia-core/agent_activities';
import { AgentActivitiesRowSchema, AgentActivitiesInsertSchema, AgentActivitiesUpdateSchema } from '@/lib/validators/generated/hestia-core/agent_activities';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// AgentActivities CRUD OPERATIONS
// =====================================================

/**
 * Create a new agent_activities record
 */
export async function createAgentActivities(data: AgentActivitiesInsert): Promise<{ data: AgentActivitiesRow | null; error: string | null }> {
  try {
    const validated = AgentActivitiesRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('agent_activities')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating agent_activities:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a agent_activities record by ID
 */
export async function getAgentActivities(id: string): Promise<{ data: AgentActivitiesRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('agent_activities')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching agent_activities:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List agent_activities records with pagination and filters
 */
export async function listAgentActivities(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: AgentActivitiesRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('agent_activities').select('*', { count: 'exact' });
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
    
    // Apply sorting
    query = query.order(sort, { ascending: order === 'asc' });
    
    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
    
    const { data, error, count } = await query;
    
    if (error) throw error;
    
    return { data: data || [], total: count || 0, error: null };
  } catch (error) {
    console.error('Error listing agent_activities:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a agent_activities record
 */
export async function updateAgentActivities(id: string, data: AgentActivitiesUpdate): Promise<{ data: AgentActivitiesRow | null; error: string | null }> {
  try {
    const validated = AgentActivitiesUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('agent_activities')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating agent_activities:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a agent_activities record
 */
export async function deleteAgentActivities(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('agent_activities')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting agent_activities:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

