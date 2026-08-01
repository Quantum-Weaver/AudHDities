// =====================================================
// UTILITIES: EmailCommunications
// DEITY: iris-communications
// GENERATED: 2026-08-01T16:03:06.459Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { EmailCommunicationsInsertSchema, EmailCommunicationsUpdateSchema } from '@/lib/validators/generated/iris-communications/email_communications';
import type { EmailCommunicationsInsert, EmailCommunicationsRow, EmailCommunicationsUpdate } from '@/types/generated/iris-communications/email_communications';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new email_communications record
 */
export async function createEmailCommunications(data: EmailCommunicationsInsert): Promise<EmailCommunicationsRow> {
  const validated = EmailCommunicationsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('email_communications')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single email_communications record by ID
 */
export async function getEmailCommunications(id: string): Promise<EmailCommunicationsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('email_communications')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of email_communications records with pagination
 */
export async function listEmailCommunications(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: EmailCommunicationsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('email_communications').select('*', { count: 'exact' });
  
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
 * Update a email_communications record
 */
export async function updateEmailCommunications(id: string, data: EmailCommunicationsUpdate): Promise<EmailCommunicationsRow> {
  const validated = EmailCommunicationsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('email_communications')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a email_communications record
 */
export async function deleteEmailCommunications(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('email_communications')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
