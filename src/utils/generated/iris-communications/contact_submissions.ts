// =====================================================
// FILE: utils/generated/iris-communications/contact_submissions.ts
// GENERATED: 2026-04-14T21:18:08.955Z
// SOURCE: database.types.ts
// =====================================================

import type { ContactSubmissionsRow, ContactSubmissionsInsert, ContactSubmissionsUpdate } from '@/types/generated/iris-communications/contact_submissions.ts';
import { ContactSubmissionsInsertSchema, ContactSubmissionsUpdateSchema } from '@/lib/validators/generated/iris-communications/contact_submissions.ts';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// ContactSubmissions CRUD OPERATIONS
// =====================================================

/**
 * Create a new contact_submissions record
 */
export async function createContactSubmissions(data: ContactSubmissionsInsert): Promise<{ data: ContactSubmissionsRow | null; error: string | null }> {
  try {
    const validated = ContactSubmissionsInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('contact_submissions')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating contact_submissions:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a contact_submissions record by ID
 */
export async function getContactSubmissions(id: string): Promise<{ data: ContactSubmissionsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching contact_submissions:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List contact_submissions records with pagination and filters
 */
export async function listContactSubmissions(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ContactSubmissionsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('contact_submissions').select('*', { count: 'exact' });
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
    
    // Apply sorting
    query = query.order(sort, { ascending: order === 'asc' });
    
    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
    
    const { data, error, count } = await query;
    
    if (error) throw error;
    
    return { data: data || [], total: count || 0, error: null };
  } catch (error) {
    console.error('Error listing contact_submissions:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a contact_submissions record
 */
export async function updateContactSubmissions(id: string, data: ContactSubmissionsUpdate): Promise<{ data: ContactSubmissionsRow | null; error: string | null }> {
  try {
    const validated = ContactSubmissionsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('contact_submissions')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating contact_submissions:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a contact_submissions record
 */
export async function deleteContactSubmissions(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting contact_submissions:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

