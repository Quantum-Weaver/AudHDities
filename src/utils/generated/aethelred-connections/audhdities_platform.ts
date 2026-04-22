// =====================================================
// UTILITIES: AudhditiesPlatform
// DEITY: aethelred-connections
// GENERATED: 2026-04-22T18:15:09.620Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { AudhditiesPlatformInsertSchema, AudhditiesPlatformUpdateSchema } from '@/lib/validators/generated/aethelred-connections/audhdities_platform';
import type { AudhditiesPlatformInsert, AudhditiesPlatformRow, AudhditiesPlatformUpdate } from '@/types/generated/aethelred-connections/audhdities_platform';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new audhdities_platform record
 */
export async function createAudhditiesPlatform(data: AudhditiesPlatformInsert): Promise<AudhditiesPlatformRow> {
  const validated = AudhditiesPlatformInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('audhdities_platform')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single audhdities_platform record by ID
 */
export async function getAudhditiesPlatform(id: string): Promise<AudhditiesPlatformRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('audhdities_platform')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of audhdities_platform records with pagination
 */
export async function listAudhditiesPlatform(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: AudhditiesPlatformRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('audhdities_platform').select('*', { count: 'exact' });
  
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
 * Update a audhdities_platform record
 */
export async function updateAudhditiesPlatform(id: string, data: AudhditiesPlatformUpdate): Promise<AudhditiesPlatformRow> {
  const validated = AudhditiesPlatformUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('audhdities_platform')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a audhdities_platform record
 */
export async function deleteAudhditiesPlatform(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('audhdities_platform')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
