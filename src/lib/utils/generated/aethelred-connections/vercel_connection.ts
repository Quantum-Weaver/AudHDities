// =====================================================
// UTILITIES: VercelConnection
// DEITY: aethelred-connections
// GENERATED: 2026-04-30T15:32:13.861Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { VercelConnectionInsertSchema, VercelConnectionUpdateSchema } from '@/lib/validators/generated/aethelred-connections/vercel_connection';
import type { VercelConnectionInsert, VercelConnectionRow, VercelConnectionUpdate } from '@/types/generated/aethelred-connections/vercel_connection';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new vercel_connection record
 */
export async function createVercelConnection(data: VercelConnectionInsert): Promise<VercelConnectionRow> {
  const validated = VercelConnectionInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('vercel_connection')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single vercel_connection record by ID
 */
export async function getVercelConnection(id: string): Promise<VercelConnectionRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('vercel_connection')
    .select('*')
    .eq('vercel_connection_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of vercel_connection records with pagination
 */
export async function listVercelConnection(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: VercelConnectionRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('vercel_connection').select('*', { count: 'exact' });
  
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
 * Update a vercel_connection record
 */
export async function updateVercelConnection(id: string, data: VercelConnectionUpdate): Promise<VercelConnectionRow> {
  const validated = VercelConnectionUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('vercel_connection')
    .update(validated)
    .eq('vercel_connection_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a vercel_connection record
 */
export async function deleteVercelConnection(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('vercel_connection')
    .delete()
    .eq('vercel_connection_id', id);
  
  if (error) throw error;
  return true;
}
