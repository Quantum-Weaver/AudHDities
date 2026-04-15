// =====================================================
// FILE: utils/generated/plutus-economics/transactions.ts
// GENERATED: 2026-04-15T19:06:11.668Z
// SOURCE: database.types.ts
// =====================================================

import type { TransactionsRow, TransactionsInsert, TransactionsUpdate } from '@/types/generated/plutus-economics/transactions';
import { TransactionsRowSchema, TransactionsInsertSchema, TransactionsUpdateSchema } from '@/lib/validators/generated/plutus-economics/transactions';

import { errorResponse, getFilters, getPaginationParams, getSortParams, successResponse } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';

// =====================================================
// Transactions CRUD OPERATIONS
// =====================================================

/**
 * Create a new transactions record
 */
export async function createTransactions(data: TransactionsInsert): Promise<{ data: TransactionsRow | null; error: string | null }> {
  try {
    const validated = TransactionsRowSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('transactions')
      .insert(validated)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error creating transactions:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a transactions record by ID
 */
export async function getTransactions(id: string): Promise<{ data: TransactionsRow | null; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * List transactions records with pagination and filters
 */
export async function listTransactions(params: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: TransactionsRow[]; total: number; error: string | null }> {
  try {
    const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params;
    const supabase = await createApiSupabase();
    
    let query = supabase.from('transactions').select('*', { count: 'exact' });
    
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
    console.error('Error listing transactions:', error);
    return { data: [], total: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a transactions record
 */
export async function updateTransactions(id: string, data: TransactionsUpdate): Promise<{ data: TransactionsRow | null; error: string | null }> {
  try {
    const validated = TransactionsUpdateSchema.parse(data);
    const supabase = await createApiSupabase();
    
    const { data: result, error } = await supabase
      .from('transactions')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: result, error: null };
  } catch (error) {
    console.error('Error updating transactions:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Delete a transactions record
 */
export async function deleteTransactions(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createApiSupabase();
    
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting transactions:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

