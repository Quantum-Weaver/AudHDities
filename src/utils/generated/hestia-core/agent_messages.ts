// =====================================================
// FILE: utils/generated/hestia-core/agent_messages.ts
// GENERATED: 2026-04-17T20:50:06.645Z
// SOURCE: database.types.ts
// =====================================================

import type { AgentMessagesRow, AgentMessagesInsert, AgentMessagesUpdate } from '@/types/generated/hestia-core/agent_messages';
import { AgentMessagesRowSchema, AgentMessagesInsertSchema, AgentMessagesUpdateSchema } from '@/lib/validators/generated/hestia-core/agent_messages';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// AgentMessages CRUD OPERATIONS
// =====================================================

/**
 * Create a new agent_messages record
 */
export async function createAgentMessages(data: AgentMessagesInsert): Promise<{ data: AgentMessagesRow | null; error: string | null }> {
  try {
    const validated = AgentMessagesRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('agent_messages')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating agent_messages:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a agent_messages record by ID
 */
export async function getAgentMessages(id: string): Promise<{ data: AgentMessagesRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('agent_messages')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching agent_messages:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List agent_messages records with pagination and filters
 */
export async function listAgentMessages(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: AgentMessagesRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('agent_messages').select('*', { count: 'exact' });
    
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
    console.error('Error listing agent_messages:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a agent_messages record
 */
export async function updateAgentMessages(id: string, data: AgentMessagesUpdate): Promise<{ data: AgentMessagesRow | null; error: string | null }> {
  try {
    const validated = AgentMessagesUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('agent_messages')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating agent_messages:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a agent_messages record
 */
export async function deleteAgentMessages(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('agent_messages')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting agent_messages:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

