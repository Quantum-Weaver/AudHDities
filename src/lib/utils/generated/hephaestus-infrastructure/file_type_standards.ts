// =====================================================
// UTILITIES: FileTypeStandards
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-05-01T03:24:41.468Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { FileTypeStandardsInsertSchema, FileTypeStandardsUpdateSchema } from '@/lib/validators/generated/hephaestus-infrastructure/file_type_standards';
import type { FileTypeStandardsInsert, FileTypeStandardsRow, FileTypeStandardsUpdate } from '@/types/generated/hephaestus-infrastructure/file_type_standards';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new file_type_standards record
 */
export async function createFileTypeStandards(data: FileTypeStandardsInsert): Promise<FileTypeStandardsRow> {
  const validated = FileTypeStandardsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('file_type_standards')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single file_type_standards record by ID
 */
export async function getFileTypeStandards(id: string): Promise<FileTypeStandardsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('file_type_standards')
    .select('*')
    .eq('file_type_standards_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of file_type_standards records with pagination
 */
export async function listFileTypeStandards(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: FileTypeStandardsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('file_type_standards').select('*', { count: 'exact' });
  
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
 * Update a file_type_standards record
 */
export async function updateFileTypeStandards(id: string, data: FileTypeStandardsUpdate): Promise<FileTypeStandardsRow> {
  const validated = FileTypeStandardsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('file_type_standards')
    .update(validated)
    .eq('file_type_standards_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a file_type_standards record
 */
export async function deleteFileTypeStandards(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('file_type_standards')
    .delete()
    .eq('file_type_standards_id', id);
  
  if (error) throw error;
  return true;
}
