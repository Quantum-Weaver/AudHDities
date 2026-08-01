// =====================================================
// UTILITIES: AgentMessages
// DEITY: aethelred-connections
// GENERATED: 2026-08-01T16:03:06.215Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { AgentMessagesInsertSchema, AgentMessagesUpdateSchema } from '@/lib/validators/generated/aethelred-connections/agent_messages';
import type { AgentMessagesInsert, AgentMessagesRow, AgentMessagesUpdate } from '@/types/generated/aethelred-connections/agent_messages';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new agent_messages record
 */
export async function createAgentMessages(data: AgentMessagesInsert): Promise<AgentMessagesRow> {
  const validated = AgentMessagesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('agent_messages')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single agent_messages record by ID
 */
export async function getAgentMessages(id: string): Promise<AgentMessagesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('agent_messages')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of agent_messages records with pagination
 */
export async function listAgentMessages(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: AgentMessagesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('agent_messages').select('*', { count: 'exact' });
  
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
 * Update a agent_messages record
 */
export async function updateAgentMessages(id: string, data: AgentMessagesUpdate): Promise<AgentMessagesRow> {
  const validated = AgentMessagesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('agent_messages')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a agent_messages record
 */
export async function deleteAgentMessages(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('agent_messages')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
