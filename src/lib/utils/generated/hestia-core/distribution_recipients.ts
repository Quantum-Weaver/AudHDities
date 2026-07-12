// =====================================================
// UTILITIES: DistributionRecipients
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.371Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { DistributionRecipientsInsertSchema, DistributionRecipientsUpdateSchema } from '@/lib/validators/generated/hestia-core/distribution_recipients';
import type { DistributionRecipientsInsert, DistributionRecipientsRow, DistributionRecipientsUpdate } from '@/types/generated/hestia-core/distribution_recipients';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new distribution_recipients record
 */
export async function createDistributionRecipients(data: DistributionRecipientsInsert): Promise<DistributionRecipientsRow> {
  const validated = DistributionRecipientsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('distribution_recipients')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single distribution_recipients record by ID
 */
export async function getDistributionRecipients(id: string): Promise<DistributionRecipientsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('distribution_recipients')
    .select('*')
    .eq('distribution_recipients_id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of distribution_recipients records with pagination
 */
export async function listDistributionRecipients(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: DistributionRecipientsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('distribution_recipients').select('*', { count: 'exact' });
  
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
 * Update a distribution_recipients record
 */
export async function updateDistributionRecipients(id: string, data: DistributionRecipientsUpdate): Promise<DistributionRecipientsRow> {
  const validated = DistributionRecipientsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('distribution_recipients')
    .update(validated)
    .eq('distribution_recipients_id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a distribution_recipients record
 */
export async function deleteDistributionRecipients(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('distribution_recipients')
    .delete()
    .eq('distribution_recipients_id', id);
  
  if (error) throw error;
  return true;
}
