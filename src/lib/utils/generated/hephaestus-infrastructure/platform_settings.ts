// =====================================================
// UTILITIES: PlatformSettings
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-08-01T16:03:06.810Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { PlatformSettingsInsertSchema, PlatformSettingsUpdateSchema } from '@/lib/validators/generated/hephaestus-infrastructure/platform_settings';
import type { PlatformSettingsInsert, PlatformSettingsRow, PlatformSettingsUpdate } from '@/types/generated/hephaestus-infrastructure/platform_settings';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new platform_settings record
 */
export async function createPlatformSettings(data: PlatformSettingsInsert): Promise<PlatformSettingsRow> {
  const validated = PlatformSettingsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('platform_settings')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single platform_settings record by ID
 */
export async function getPlatformSettings(id: string): Promise<PlatformSettingsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('platform_settings')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of platform_settings records with pagination
 */
export async function listPlatformSettings(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PlatformSettingsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('platform_settings').select('*', { count: 'exact' });
  
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
 * Update a platform_settings record
 */
export async function updatePlatformSettings(id: string, data: PlatformSettingsUpdate): Promise<PlatformSettingsRow> {
  const validated = PlatformSettingsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('platform_settings')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a platform_settings record
 */
export async function deletePlatformSettings(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('platform_settings')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
