// =====================================================
// UTILITIES: Settings
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-04-30T00:26:46.652Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { SettingsInsertSchema, SettingsUpdateSchema } from '@/lib/validators/generated/hephaestus-infrastructure/settings';
import type { SettingsInsert, SettingsRow, SettingsUpdate } from '@/types/generated/hephaestus-infrastructure/settings';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new settings record
 */
export async function createSettings(data: SettingsInsert): Promise<SettingsRow> {
  const validated = SettingsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('settings')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single settings record by ID
 */
export async function getSettings(id: string): Promise<SettingsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of settings records with pagination
 */
export async function listSettings(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: SettingsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('settings').select('*', { count: 'exact' });
  
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
 * Update a settings record
 */
export async function updateSettings(id: string, data: SettingsUpdate): Promise<SettingsRow> {
  const validated = SettingsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('settings')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a settings record
 */
export async function deleteSettings(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('settings')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
