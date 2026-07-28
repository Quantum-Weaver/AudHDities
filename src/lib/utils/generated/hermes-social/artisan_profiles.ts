// =====================================================
// UTILITIES: ArtisanProfiles
// DEITY: hermes-social
// GENERATED: 2026-07-28T05:07:04.013Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ArtisanProfilesInsertSchema, ArtisanProfilesUpdateSchema } from '@/lib/validators/generated/hermes-social/artisan_profiles';
import type { ArtisanProfilesInsert, ArtisanProfilesRow, ArtisanProfilesUpdate } from '@/types/generated/hermes-social/artisan_profiles';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new artisan_profiles record
 */
export async function createArtisanProfiles(data: ArtisanProfilesInsert): Promise<ArtisanProfilesRow> {
  const validated = ArtisanProfilesInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('artisan_profiles')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single artisan_profiles record by ID
 */
export async function getArtisanProfiles(id: string): Promise<ArtisanProfilesRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('artisan_profiles')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of artisan_profiles records with pagination
 */
export async function listArtisanProfiles(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ArtisanProfilesRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('artisan_profiles').select('*', { count: 'exact' });
  
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
 * Update a artisan_profiles record
 */
export async function updateArtisanProfiles(id: string, data: ArtisanProfilesUpdate): Promise<ArtisanProfilesRow> {
  const validated = ArtisanProfilesUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('artisan_profiles')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a artisan_profiles record
 */
export async function deleteArtisanProfiles(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('artisan_profiles')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
