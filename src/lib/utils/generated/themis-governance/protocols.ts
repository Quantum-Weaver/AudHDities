// =====================================================
// UTILITIES: Protocols
// DEITY: themis-governance
// GENERATED: 2026-08-01T21:41:40.824Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ProtocolsInsertSchema, ProtocolsUpdateSchema } from '@/lib/validators/generated/themis-governance/protocols';
import type { ProtocolsInsert, ProtocolsRow, ProtocolsUpdate } from '@/types/generated/themis-governance/protocols';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new protocols record
 */
export async function createProtocols(data: ProtocolsInsert): Promise<ProtocolsRow> {
  const validated = ProtocolsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('protocols')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single protocols record by ID
 */
export async function getProtocols(id: string): Promise<ProtocolsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('protocols')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of protocols records with pagination
 */
export async function listProtocols(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ProtocolsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('protocols').select('*', { count: 'exact' });
  
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
 * Update a protocols record
 */
export async function updateProtocols(id: string, data: ProtocolsUpdate): Promise<ProtocolsRow> {
  const validated = ProtocolsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('protocols')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a protocols record
 */
export async function deleteProtocols(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('protocols')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
