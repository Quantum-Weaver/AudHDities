// =====================================================
// UTILITIES: Applications
// DEITY: themis-governance
// GENERATED: 2026-08-01T18:34:04.326Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ApplicationsInsertSchema, ApplicationsUpdateSchema } from '@/lib/validators/generated/themis-governance/applications';
import type { ApplicationsInsert, ApplicationsRow, ApplicationsUpdate } from '@/types/generated/themis-governance/applications';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new applications record
 */
export async function createApplications(data: ApplicationsInsert): Promise<ApplicationsRow> {
  const validated = ApplicationsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('applications')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single applications record by ID
 */
export async function getApplications(id: string): Promise<ApplicationsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of applications records with pagination
 */
export async function listApplications(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ApplicationsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('applications').select('*', { count: 'exact' });
  
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
 * Update a applications record
 */
export async function updateApplications(id: string, data: ApplicationsUpdate): Promise<ApplicationsRow> {
  const validated = ApplicationsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('applications')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a applications record
 */
export async function deleteApplications(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('applications')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
