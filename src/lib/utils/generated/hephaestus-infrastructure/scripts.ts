// =====================================================
// UTILITIES: Scripts
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-04-30T04:17:48.222Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ScriptsInsertSchema, ScriptsUpdateSchema } from '@/lib/validators/generated/hephaestus-infrastructure/scripts';
import type { ScriptsInsert, ScriptsRow, ScriptsUpdate } from '@/types/generated/hephaestus-infrastructure/scripts';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new scripts record
 */
export async function createScripts(data: ScriptsInsert): Promise<ScriptsRow> {
  const validated = ScriptsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('scripts')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single scripts record by ID
 */
export async function getScripts(id: string): Promise<ScriptsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('scripts')
    .select('*')
    .eq('scripts_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of scripts records with pagination
 */
export async function listScripts(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ScriptsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('scripts').select('*', { count: 'exact' });
  
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
 * Update a scripts record
 */
export async function updateScripts(id: string, data: ScriptsUpdate): Promise<ScriptsRow> {
  const validated = ScriptsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('scripts')
    .update(validated)
    .eq('scripts_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a scripts record
 */
export async function deleteScripts(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('scripts')
    .delete()
    .eq('scripts_id', id);
  
  if (error) throw error;
  return true;
}
