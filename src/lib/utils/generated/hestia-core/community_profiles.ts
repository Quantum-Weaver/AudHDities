// =====================================================
// UTILITIES: CommunityProfiles
// DEITY: hestia-core
// GENERATED: 2026-08-01T18:34:04.335Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { CommunityProfilesInsertSchema, CommunityProfilesUpdateSchema } from '@/lib/validators/generated/hestia-core/community_profiles';
import type { CommunityProfilesInsert, CommunityProfilesRow, CommunityProfilesUpdate } from '@/types/generated/hestia-core/community_profiles';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new community_profiles record
 */
export async function createCommunityProfiles(data: CommunityProfilesInsert): Promise<CommunityProfilesRow> {
  const validated = CommunityProfilesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('community_profiles')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single community_profiles record by ID
 */
export async function getCommunityProfiles(id: string): Promise<CommunityProfilesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('community_profiles')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of community_profiles records with pagination
 */
export async function listCommunityProfiles(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: CommunityProfilesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('community_profiles').select('*', { count: 'exact' });
  
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
 * Update a community_profiles record
 */
export async function updateCommunityProfiles(id: string, data: CommunityProfilesUpdate): Promise<CommunityProfilesRow> {
  const validated = CommunityProfilesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('community_profiles')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a community_profiles record
 */
export async function deleteCommunityProfiles(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('community_profiles')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
