// =====================================================
// UTILITIES: ResendConnection
// DEITY: aethelred-connections
// GENERATED: 2026-04-23T03:15:26.164Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ResendConnectionInsertSchema, ResendConnectionUpdateSchema } from '@/lib/validators/generated/aethelred-connections/resend_connection';
import type { ResendConnectionInsert, ResendConnectionRow, ResendConnectionUpdate } from '@/types/generated/aethelred-connections/resend_connection';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new resend_connection record
 */
export async function createResendConnection(data: ResendConnectionInsert): Promise<ResendConnectionRow> {
  const validated = ResendConnectionInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('resend_connection')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single resend_connection record by ID
 */
export async function getResendConnection(id: string): Promise<ResendConnectionRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('resend_connection')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of resend_connection records with pagination
 */
export async function listResendConnection(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ResendConnectionRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('resend_connection').select('*', { count: 'exact' });
  
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
 * Update a resend_connection record
 */
export async function updateResendConnection(id: string, data: ResendConnectionUpdate): Promise<ResendConnectionRow> {
  const validated = ResendConnectionUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('resend_connection')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a resend_connection record
 */
export async function deleteResendConnection(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('resend_connection')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
