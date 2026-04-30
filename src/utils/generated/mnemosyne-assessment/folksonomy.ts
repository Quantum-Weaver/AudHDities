// =====================================================
// UTILITIES: Folksonomy
// DEITY: mnemosyne-assessment
// GENERATED: 2026-04-30T00:26:46.017Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { FolksonomyInsertSchema, FolksonomyUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/folksonomy';
import type { FolksonomyInsert, FolksonomyRow, FolksonomyUpdate } from '@/types/generated/mnemosyne-assessment/folksonomy';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new folksonomy record
 */
export async function createFolksonomy(data: FolksonomyInsert): Promise<FolksonomyRow> {
  const validated = FolksonomyInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('folksonomy')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single folksonomy record by ID
 */
export async function getFolksonomy(id: string): Promise<FolksonomyRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('folksonomy')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of folksonomy records with pagination
 */
export async function listFolksonomy(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: FolksonomyRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('folksonomy').select('*', { count: 'exact' });
  
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
 * Update a folksonomy record
 */
export async function updateFolksonomy(id: string, data: FolksonomyUpdate): Promise<FolksonomyRow> {
  const validated = FolksonomyUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('folksonomy')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a folksonomy record
 */
export async function deleteFolksonomy(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('folksonomy')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
