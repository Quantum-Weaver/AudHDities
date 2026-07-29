// =====================================================
// UTILITIES: GrantAttachments
// DEITY: plutus-economics
// GENERATED: 2026-07-29T16:16:53.801Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { GrantAttachmentsInsertSchema, GrantAttachmentsUpdateSchema } from '@/lib/validators/generated/plutus-economics/grant_attachments';
import type { GrantAttachmentsInsert, GrantAttachmentsRow, GrantAttachmentsUpdate } from '@/types/generated/plutus-economics/grant_attachments';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new grant_attachments record
 */
export async function createGrantAttachments(data: GrantAttachmentsInsert): Promise<GrantAttachmentsRow> {
  const validated = GrantAttachmentsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('grant_attachments')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single grant_attachments record by ID
 */
export async function getGrantAttachments(id: string): Promise<GrantAttachmentsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('grant_attachments')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of grant_attachments records with pagination
 */
export async function listGrantAttachments(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: GrantAttachmentsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('grant_attachments').select('*', { count: 'exact' });
  
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
 * Update a grant_attachments record
 */
export async function updateGrantAttachments(id: string, data: GrantAttachmentsUpdate): Promise<GrantAttachmentsRow> {
  const validated = GrantAttachmentsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('grant_attachments')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a grant_attachments record
 */
export async function deleteGrantAttachments(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('grant_attachments')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
