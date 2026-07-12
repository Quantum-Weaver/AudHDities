// =====================================================
// UTILITIES: Domain
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.381Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { DomainInsertSchema, DomainUpdateSchema } from '@/lib/validators/generated/hestia-core/domain';
import type { DomainInsert, DomainRow, DomainUpdate } from '@/types/generated/hestia-core/domain';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new domain record
 */
export async function createDomain(data: DomainInsert): Promise<DomainRow> {
  const validated = DomainInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('domain')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single domain record by ID
 */
export async function getDomain(id: string): Promise<DomainRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('domain')
    .select('*')
    .eq('domain_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of domain records with pagination
 */
export async function listDomain(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: DomainRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('domain').select('*', { count: 'exact' });
  
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
 * Update a domain record
 */
export async function updateDomain(id: string, data: DomainUpdate): Promise<DomainRow> {
  const validated = DomainUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('domain')
    .update(validated)
    .eq('domain_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a domain record
 */
export async function deleteDomain(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('domain')
    .delete()
    .eq('domain_id', id);
  
  if (error) throw error;
  return true;
}
