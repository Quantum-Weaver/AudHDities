// =====================================================
// UTILITIES: Relationships
// DEITY: hestia-core
// GENERATED: 2026-08-01T18:34:04.381Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { RelationshipsInsertSchema, RelationshipsUpdateSchema } from '@/lib/validators/generated/hestia-core/relationships';
import type { RelationshipsInsert, RelationshipsRow, RelationshipsUpdate } from '@/types/generated/hestia-core/relationships';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new relationships record
 */
export async function createRelationships(data: RelationshipsInsert): Promise<RelationshipsRow> {
  const validated = RelationshipsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('relationships')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single relationships record by ID
 */
export async function getRelationships(id: string): Promise<RelationshipsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('relationships')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of relationships records with pagination
 */
export async function listRelationships(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: RelationshipsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('relationships').select('*', { count: 'exact' });
  
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
 * Update a relationships record
 */
export async function updateRelationships(id: string, data: RelationshipsUpdate): Promise<RelationshipsRow> {
  const validated = RelationshipsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('relationships')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a relationships record
 */
export async function deleteRelationships(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('relationships')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
