// =====================================================
// UTILITIES: Profiles
// DEITY: hestia-core
// GENERATED: 2026-04-22T05:15:35.101Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ProfilesInsertSchema, ProfilesUpdateSchema } from '@/lib/validators/generated/hestia-core/profiles';
import type { ProfilesInsert, ProfilesRow, ProfilesUpdate } from '@/types/generated/hestia-core/profiles';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new profiles record
 */
export async function createProfiles(data: ProfilesInsert): Promise<ProfilesRow> {
  const validated = ProfilesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('profiles')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single profiles record by ID
 */
export async function getProfiles(id: string): Promise<ProfilesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of profiles records with pagination
 */
export async function listProfiles(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ProfilesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('profiles').select('*', { count: 'exact' });
  
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
 * Update a profiles record
 */
export async function updateProfiles(id: string, data: ProfilesUpdate): Promise<ProfilesRow> {
  const validated = ProfilesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('profiles')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a profiles record
 */
export async function deleteProfiles(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
