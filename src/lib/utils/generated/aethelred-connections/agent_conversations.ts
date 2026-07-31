// =====================================================
// UTILITIES: AgentConversations
// DEITY: aethelred-connections
// GENERATED: 2026-07-31T01:03:40.811Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { AgentConversationsInsertSchema, AgentConversationsUpdateSchema } from '@/lib/validators/generated/aethelred-connections/agent_conversations';
import type { AgentConversationsInsert, AgentConversationsRow, AgentConversationsUpdate } from '@/types/generated/aethelred-connections/agent_conversations';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new agent_conversations record
 */
export async function createAgentConversations(data: AgentConversationsInsert): Promise<AgentConversationsRow> {
  const validated = AgentConversationsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('agent_conversations')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single agent_conversations record by ID
 */
export async function getAgentConversations(id: string): Promise<AgentConversationsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('agent_conversations')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of agent_conversations records with pagination
 */
export async function listAgentConversations(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: AgentConversationsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('agent_conversations').select('*', { count: 'exact' });
  
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
 * Update a agent_conversations record
 */
export async function updateAgentConversations(id: string, data: AgentConversationsUpdate): Promise<AgentConversationsRow> {
  const validated = AgentConversationsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('agent_conversations')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a agent_conversations record
 */
export async function deleteAgentConversations(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('agent_conversations')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
