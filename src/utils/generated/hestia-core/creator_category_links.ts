// =====================================================
// UTILITIES: CreatorCategoryLinks
// DEITY: hestia-core
// GENERATED: 2026-04-22T05:15:34.532Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { CreatorCategoryLinksInsertSchema, CreatorCategoryLinksUpdateSchema } from '@/lib/validators/generated/hestia-core/creator_category_links';
import type { CreatorCategoryLinksInsert, CreatorCategoryLinksRow, CreatorCategoryLinksUpdate } from '@/types/generated/hestia-core/creator_category_links';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new creator_category_links record
 */
export async function createCreatorCategoryLinks(data: CreatorCategoryLinksInsert): Promise<CreatorCategoryLinksRow> {
  const validated = CreatorCategoryLinksInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('creator_category_links')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single creator_category_links record by ID
 */
export async function getCreatorCategoryLinks(id: string): Promise<CreatorCategoryLinksRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('creator_category_links')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of creator_category_links records with pagination
 */
export async function listCreatorCategoryLinks(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: CreatorCategoryLinksRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('creator_category_links').select('*', { count: 'exact' });
  
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
 * Update a creator_category_links record
 */
export async function updateCreatorCategoryLinks(id: string, data: CreatorCategoryLinksUpdate): Promise<CreatorCategoryLinksRow> {
  const validated = CreatorCategoryLinksUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('creator_category_links')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a creator_category_links record
 */
export async function deleteCreatorCategoryLinks(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('creator_category_links')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
