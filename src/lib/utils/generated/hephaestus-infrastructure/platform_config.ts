// =====================================================
// UTILITIES: PlatformConfig
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-08-01T16:03:06.802Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { PlatformConfigInsertSchema, PlatformConfigUpdateSchema } from '@/lib/validators/generated/hephaestus-infrastructure/platform_config';
import type { PlatformConfigInsert, PlatformConfigRow, PlatformConfigUpdate } from '@/types/generated/hephaestus-infrastructure/platform_config';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new platform_config record
 */
export async function createPlatformConfig(data: PlatformConfigInsert): Promise<PlatformConfigRow> {
  const validated = PlatformConfigInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('platform_config')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single platform_config record by ID
 */
export async function getPlatformConfig(id: string): Promise<PlatformConfigRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('platform_config')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of platform_config records with pagination
 */
export async function listPlatformConfig(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: PlatformConfigRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('platform_config').select('*', { count: 'exact' });
  
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
 * Update a platform_config record
 */
export async function updatePlatformConfig(id: string, data: PlatformConfigUpdate): Promise<PlatformConfigRow> {
  const validated = PlatformConfigUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('platform_config')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a platform_config record
 */
export async function deletePlatformConfig(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('platform_config')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
