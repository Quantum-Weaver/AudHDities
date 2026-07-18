// =====================================================
// UTILITIES: ContactSubmissions
// DEITY: iris-communications
// GENERATED: 2026-07-18T21:42:54.058Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ContactSubmissionsInsertSchema, ContactSubmissionsUpdateSchema } from '@/lib/validators/generated/iris-communications/contact_submissions';
import type { ContactSubmissionsInsert, ContactSubmissionsRow, ContactSubmissionsUpdate } from '@/types/generated/iris-communications/contact_submissions';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new contact_submissions record
 */
export async function createContactSubmissions(data: ContactSubmissionsInsert): Promise<ContactSubmissionsRow> {
  const validated = ContactSubmissionsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('contact_submissions')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single contact_submissions record by ID
 */
export async function getContactSubmissions(id: string): Promise<ContactSubmissionsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of contact_submissions records with pagination
 */
export async function listContactSubmissions(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ContactSubmissionsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('contact_submissions').select('*', { count: 'exact' });
  
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
 * Update a contact_submissions record
 */
export async function updateContactSubmissions(id: string, data: ContactSubmissionsUpdate): Promise<ContactSubmissionsRow> {
  const validated = ContactSubmissionsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('contact_submissions')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a contact_submissions record
 */
export async function deleteContactSubmissions(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('contact_submissions')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
