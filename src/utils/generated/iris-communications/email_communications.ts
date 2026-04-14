// =====================================================
// FILE: utils/generated/iris-communications/email_communications.ts
// GENERATED: 2026-04-14T21:18:08.960Z
// SOURCE: database.types.ts
// =====================================================

import type { EmailCommunicationsRow, EmailCommunicationsInsert, EmailCommunicationsUpdate } from '@/types/generated/iris-communications/email_communications.ts';
import { EmailCommunicationsInsertSchema, EmailCommunicationsUpdateSchema } from '@/lib/validators/generated/iris-communications/email_communications.ts';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// EmailCommunications CRUD OPERATIONS
// =====================================================

/**
 * Create a new email_communications record
 */
export async function createEmailCommunications(data: EmailCommunicationsInsert): Promise<{ data: EmailCommunicationsRow | null; error: string | null }> {
  try {
    const validated = EmailCommunicationsInsertSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('email_communications')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating email_communications:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a email_communications record by ID
 */
export async function getEmailCommunications(id: string): Promise<{ data: EmailCommunicationsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('email_communications')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching email_communications:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List email_communications records with pagination and filters
 */
export async function listEmailCommunications(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: EmailCommunicationsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('email_communications').select('*', { count: 'exact' });
    
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
    console.error('Error listing email_communications:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a email_communications record
 */
export async function updateEmailCommunications(id: string, data: EmailCommunicationsUpdate): Promise<{ data: EmailCommunicationsRow | null; error: string | null }> {
  try {
    const validated = EmailCommunicationsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('email_communications')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating email_communications:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a email_communications record
 */
export async function deleteEmailCommunications(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('email_communications')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting email_communications:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

