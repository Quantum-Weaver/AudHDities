// =====================================================
// UTILITIES: Products
// DEITY: plutus-economics
// GENERATED: 2026-04-22T05:15:35.083Z
// =====================================================


import { createClient } from '@/lib/supabase/client';
import { ProductsInsertSchema, ProductsUpdateSchema } from '@/lib/validators/generated/plutus-economics/products';
import type { ProductsInsert, ProductsRow, ProductsUpdate } from '@/types/generated/plutus-economics/products';

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Create a new products record
 */
export async function createProducts(data: ProductsInsert): Promise<ProductsRow> {
  const validated = ProductsInsertSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('products')
    .insert(validated)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Get a single products record by ID
 */
export async function getProducts(id: string): Promise<ProductsRow> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Get a list of products records with pagination
 */
export async function listProducts(params?: {
  page?: number;
  limit?: number;
  filters?: Record<string, string>;
  sort?: string;
  order?: 'asc' | 'desc';
}): Promise<{ data: ProductsRow[]; total: number }> {
  const { page = 1, limit = 20, filters = {}, sort = 'created_at', order = 'desc' } = params || {};
  const supabase = createClient();
  
  let query = supabase.from('products').select('*', { count: 'exact' });
  
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
 * Update a products record
 */
export async function updateProducts(id: string, data: ProductsUpdate): Promise<ProductsRow> {
  const validated = ProductsUpdateSchema.parse(data);
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('products')
    .update(validated)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

/**
 * Delete a products record
 */
export async function deleteProducts(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}
