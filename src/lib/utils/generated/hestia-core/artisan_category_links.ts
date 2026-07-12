// =====================================================
// UTILITIES: ArtisanCategoryLinks
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.236Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ArtisanCategoryLinksInsertSchema, ArtisanCategoryLinksUpdateSchema } from '@/lib/validators/generated/hestia-core/artisan_category_links';
import type { ArtisanCategoryLinksInsert, ArtisanCategoryLinksRow, ArtisanCategoryLinksUpdate } from '@/types/generated/hestia-core/artisan_category_links';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new artisan_category_links record
 */
export async function createArtisanCategoryLinks(data: ArtisanCategoryLinksInsert): Promise<ArtisanCategoryLinksRow> {
  const validated = ArtisanCategoryLinksInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('artisan_category_links')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single artisan_category_links record by ID
 */
export async function getArtisanCategoryLinks(id: string): Promise<ArtisanCategoryLinksRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('artisan_category_links')
    .select('*')
    .eq('artisan_category_links_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of artisan_category_links records with pagination
 */
export async function listArtisanCategoryLinks(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ArtisanCategoryLinksRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('artisan_category_links').select('*', { count: 'exact' });
  
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
 * Update a artisan_category_links record
 */
export async function updateArtisanCategoryLinks(id: string, data: ArtisanCategoryLinksUpdate): Promise<ArtisanCategoryLinksRow> {
  const validated = ArtisanCategoryLinksUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('artisan_category_links')
    .update(validated)
    .eq('artisan_category_links_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a artisan_category_links record
 */
export async function deleteArtisanCategoryLinks(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('artisan_category_links')
    .delete()
    .eq('artisan_category_links_id', id);
  
  if (error) throw error;
  return true;
}
