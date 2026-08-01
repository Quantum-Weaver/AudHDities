// =====================================================
// UTILITIES: AdminActions
// DEITY: themis-governance
// GENERATED: 2026-08-01T16:03:06.184Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { AdminActionsInsertSchema, AdminActionsUpdateSchema } from '@/lib/validators/generated/themis-governance/admin_actions';
import type { AdminActionsInsert, AdminActionsRow, AdminActionsUpdate } from '@/types/generated/themis-governance/admin_actions';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new admin_actions record
 */
export async function createAdminActions(data: AdminActionsInsert): Promise<AdminActionsRow> {
  const validated = AdminActionsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('admin_actions')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single admin_actions record by ID
 */
export async function getAdminActions(id: string): Promise<AdminActionsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('admin_actions')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of admin_actions records with pagination
 */
export async function listAdminActions(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: AdminActionsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('admin_actions').select('*', { count: 'exact' });
  
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
 * Update a admin_actions record
 */
export async function updateAdminActions(id: string, data: AdminActionsUpdate): Promise<AdminActionsRow> {
  const validated = AdminActionsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('admin_actions')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a admin_actions record
 */
export async function deleteAdminActions(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('admin_actions')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
