// =====================================================
// UTILITIES: Archivist
// DEITY: aethelred-connections
// GENERATED: 2026-07-29T16:16:53.567Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ArchivistInsertSchema, ArchivistUpdateSchema } from '@/lib/validators/generated/aethelred-connections/archivist';
import type { ArchivistInsert, ArchivistRow, ArchivistUpdate } from '@/types/generated/aethelred-connections/archivist';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new archivist record
 */
export async function createArchivist(data: ArchivistInsert): Promise<ArchivistRow> {
  const validated = ArchivistInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('archivist')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single archivist record by ID
 */
export async function getArchivist(id: string): Promise<ArchivistRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('archivist')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of archivist records with pagination
 */
export async function listArchivist(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ArchivistRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('archivist').select('*', { count: 'exact' });
  
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
 * Update a archivist record
 */
export async function updateArchivist(id: string, data: ArchivistUpdate): Promise<ArchivistRow> {
  const validated = ArchivistUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('archivist')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a archivist record
 */
export async function deleteArchivist(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('archivist')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
