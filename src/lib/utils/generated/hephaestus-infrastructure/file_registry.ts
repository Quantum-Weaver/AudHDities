// =====================================================
// UTILITIES: FileRegistry
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-07-20T04:39:10.525Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { FileRegistryInsertSchema, FileRegistryUpdateSchema } from '@/lib/validators/generated/hephaestus-infrastructure/file_registry';
import type { FileRegistryInsert, FileRegistryRow, FileRegistryUpdate } from '@/types/generated/hephaestus-infrastructure/file_registry';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new file_registry record
 */
export async function createFileRegistry(data: FileRegistryInsert): Promise<FileRegistryRow> {
  const validated = FileRegistryInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('file_registry')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single file_registry record by ID
 */
export async function getFileRegistry(id: string): Promise<FileRegistryRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('file_registry')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of file_registry records with pagination
 */
export async function listFileRegistry(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: FileRegistryRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('file_registry').select('*', { count: 'exact' });
  
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
 * Update a file_registry record
 */
export async function updateFileRegistry(id: string, data: FileRegistryUpdate): Promise<FileRegistryRow> {
  const validated = FileRegistryUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('file_registry')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a file_registry record
 */
export async function deleteFileRegistry(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('file_registry')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
