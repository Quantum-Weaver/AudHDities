// =====================================================
// UTILITIES: Messages
// DEITY: iris-communications
// GENERATED: 2026-08-01T18:34:04.369Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { MessagesInsertSchema, MessagesUpdateSchema } from '@/lib/validators/generated/iris-communications/messages';
import type { MessagesInsert, MessagesRow, MessagesUpdate } from '@/types/generated/iris-communications/messages';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new messages record
 */
export async function createMessages(data: MessagesInsert): Promise<MessagesRow> {
  const validated = MessagesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('messages')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single messages record by ID
 */
export async function getMessages(id: string): Promise<MessagesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of messages records with pagination
 */
export async function listMessages(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: MessagesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('messages').select('*', { count: 'exact' });
  
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
 * Update a messages record
 */
export async function updateMessages(id: string, data: MessagesUpdate): Promise<MessagesRow> {
  const validated = MessagesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('messages')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a messages record
 */
export async function deleteMessages(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
