// =====================================================
// FILE: utils/generated/hestia-core/agent_conversations.ts
// GENERATED: 2026-04-17T09:51:12.698Z
// SOURCE: database.types.ts
// =====================================================

import type { AgentConversationsRow, AgentConversationsInsert, AgentConversationsUpdate } from '@/types/generated/hestia-core/agent_conversations';
import { AgentConversationsRowSchema, AgentConversationsInsertSchema, AgentConversationsUpdateSchema } from '@/lib/validators/generated/hestia-core/agent_conversations';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// AgentConversations CRUD OPERATIONS
// =====================================================

/**
 * Create a new agent_conversations record
 */
export async function createAgentConversations(data: AgentConversationsInsert): Promise<{ data: AgentConversationsRow | null; error: string | null }> {
  try {
    const validated = AgentConversationsRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('agent_conversations')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating agent_conversations:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a agent_conversations record by ID
 */
export async function getAgentConversations(id: string): Promise<{ data: AgentConversationsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('agent_conversations')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching agent_conversations:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List agent_conversations records with pagination and filters
 */
export async function listAgentConversations(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: AgentConversationsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('agent_conversations').select('*', { count: 'exact' });
    
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
    console.error('Error listing agent_conversations:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a agent_conversations record
 */
export async function updateAgentConversations(id: string, data: AgentConversationsUpdate): Promise<{ data: AgentConversationsRow | null; error: string | null }> {
  try {
    const validated = AgentConversationsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('agent_conversations')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating agent_conversations:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a agent_conversations record
 */
export async function deleteAgentConversations(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('agent_conversations')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting agent_conversations:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

