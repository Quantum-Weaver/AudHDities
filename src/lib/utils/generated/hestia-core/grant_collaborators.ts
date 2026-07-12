// =====================================================
// UTILITIES: GrantCollaborators
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.495Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { GrantCollaboratorsInsertSchema, GrantCollaboratorsUpdateSchema } from '@/lib/validators/generated/hestia-core/grant_collaborators';
import type { GrantCollaboratorsInsert, GrantCollaboratorsRow, GrantCollaboratorsUpdate } from '@/types/generated/hestia-core/grant_collaborators';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new grant_collaborators record
 */
export async function createGrantCollaborators(data: GrantCollaboratorsInsert): Promise<GrantCollaboratorsRow> {
  const validated = GrantCollaboratorsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('grant_collaborators')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single grant_collaborators record by ID
 */
export async function getGrantCollaborators(id: string): Promise<GrantCollaboratorsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('grant_collaborators')
    .select('*')
    .eq('grant_collaborators_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of grant_collaborators records with pagination
 */
export async function listGrantCollaborators(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: GrantCollaboratorsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('grant_collaborators').select('*', { count: 'exact' });
  
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
 * Update a grant_collaborators record
 */
export async function updateGrantCollaborators(id: string, data: GrantCollaboratorsUpdate): Promise<GrantCollaboratorsRow> {
  const validated = GrantCollaboratorsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('grant_collaborators')
    .update(validated)
    .eq('grant_collaborators_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a grant_collaborators record
 */
export async function deleteGrantCollaborators(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('grant_collaborators')
    .delete()
    .eq('grant_collaborators_id', id);
  
  if (error) throw error;
  return true;
}
