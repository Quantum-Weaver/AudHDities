// =====================================================
// UTILITIES: Genus
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-28T05:07:04.228Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { GenusInsertSchema, GenusUpdateSchema } from '@/lib/validators/generated/mnemosyne-assessment/genus';
import type { GenusInsert, GenusRow, GenusUpdate } from '@/types/generated/mnemosyne-assessment/genus';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new genus record
 */
export async function createGenus(data: GenusInsert): Promise<GenusRow> {
  const validated = GenusInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('genus')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single genus record by ID
 */
export async function getGenus(id: string): Promise<GenusRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('genus')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of genus records with pagination
 */
export async function listGenus(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: GenusRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('genus').select('*', { count: 'exact' });
  
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
 * Update a genus record
 */
export async function updateGenus(id: string, data: GenusUpdate): Promise<GenusRow> {
  const validated = GenusUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('genus')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a genus record
 */
export async function deleteGenus(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('genus')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
