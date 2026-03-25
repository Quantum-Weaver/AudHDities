// src/hooks/useProducts.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '../core/useAuth';
import type { Database } from '@/types/supabase/database.types';

// Product type from database
export type Product = Database['public']['Tables']['products']['Row'];
export type ProductInsert = Database['public']['Tables']['products']['Insert'];
export type ProductUpdate = Database['public']['Tables']['products']['Update'];

// Extended product with creator info (for marketplace display)
export interface ProductWithCreator extends Product {
  creator?: {
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
  };
}

interface UseProductsOptions {
  creatorId?: string;
  isPublished?: boolean;
  limit?: number;
  featured?: boolean;
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: Error | null;
  fetchProducts: () => Promise<void>;
  getProduct: (id: string) => Promise<Product | null>;
  createProduct: (product: ProductInsert) => Promise<Product | null>;
  updateProduct: (id: string, updates: ProductUpdate) => Promise<Product | null>;
  deleteProduct: (id: string) => Promise<boolean>;
  publishProduct: (id: string) => Promise<boolean>;
  unpublishProduct: (id: string) => Promise<boolean>;
}

export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
  const { creatorId, isPublished, limit = 50, featured } = options;
  const { user } = useAuth();
  const supabase = createClient();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch products based on filters
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (creatorId) {
        query = query.eq('creator_id', creatorId);
      }
      
      if (isPublished !== undefined) {
        query = query.eq('is_published', isPublished);
      }
      
      // Note: 'featured' field doesn't exist in schema yet, but keeping for future
      if (featured) {
        // query = query.eq('featured', true);
      }
      
      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      
      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch products'));
    } finally {
      setLoading(false);
    }
  }, [creatorId, isPublished, limit, featured, supabase]);

  // Get single product by ID
  const getProduct = useCallback(async (id: string): Promise<Product | null> => {
    try {
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (fetchError) throw fetchError;
      
      return data;
    } catch (err) {
      console.error('Error fetching product:', err);
      return null;
    }
  }, [supabase]);

  // Create new product
  const createProduct = useCallback(async (product: ProductInsert): Promise<Product | null> => {
    if (!user) {
      setError(new Error('You must be logged in to create a product'));
      return null;
    }
    
    try {
      // Ensure creator_id matches logged-in user
      const productData = {
        ...product,
        creator_id: user.id,
      };
      
      const { data, error: createError } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single();
      
      if (createError) throw createError;
      
      // Refresh product list
      await fetchProducts();
      
      return data;
    } catch (err) {
      console.error('Error creating product:', err);
      setError(err instanceof Error ? err : new Error('Failed to create product'));
      return null;
    }
  }, [user, supabase, fetchProducts]);

  // Update existing product
  const updateProduct = useCallback(async (id: string, updates: ProductUpdate): Promise<Product | null> => {
    if (!user) {
      setError(new Error('You must be logged in to update a product'));
      return null;
    }
    
    try {
      const { data, error: updateError } = await supabase
        .from('products')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('creator_id', user.id) // Ensure user owns the product
        .select()
        .single();
      
      if (updateError) throw updateError;
      
      // Refresh product list
      await fetchProducts();
      
      return data;
    } catch (err) {
      console.error('Error updating product:', err);
      setError(err instanceof Error ? err : new Error('Failed to update product'));
      return null;
    }
  }, [user, supabase, fetchProducts]);

  // Delete product
  const deleteProduct = useCallback(async (id: string): Promise<boolean> => {
    if (!user) {
      setError(new Error('You must be logged in to delete a product'));
      return false;
    }
    
    try {
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
        .eq('creator_id', user.id);
      
      if (deleteError) throw deleteError;
      
      // Refresh product list
      await fetchProducts();
      
      return true;
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err instanceof Error ? err : new Error('Failed to delete product'));
      return false;
    }
  }, [user, supabase, fetchProducts]);

  // Publish product (set is_published = true)
  const publishProduct = useCallback(async (id: string): Promise<boolean> => {
    if (!user) return false;
    
    const result = await updateProduct(id, { is_published: true });
    return result !== null;
  }, [updateProduct]);

  // Unpublish product (set is_published = false)
  const unpublishProduct = useCallback(async (id: string): Promise<boolean> => {
    if (!user) return false;
    
    const result = await updateProduct(id, { is_published: false });
    return result !== null;
  }, [updateProduct]);

  // Initial fetch on mount or when filters change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    publishProduct,
    unpublishProduct,
  };
}

// Hook for marketplace browsing (public products only)
export function useMarketplaceProducts(limit: number = 20) {
  const { products, loading, error, fetchProducts } = useProducts({
    isPublished: true,
    limit,
  });
  
  return { products, loading, error, fetchProducts };
}

// Hook for creator's own products
export function useCreatorProducts(creatorId?: string) {
  const { user } = useAuth();
  const effectiveCreatorId = creatorId || user?.id;
  
  const { products, loading, error, fetchProducts, createProduct, updateProduct, deleteProduct, publishProduct, unpublishProduct } = useProducts({
    creatorId: effectiveCreatorId,
  });
  
  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    publishProduct,
    unpublishProduct,
  };
}

// Hook for vendor products (same as creator for now)
export const useVendorProducts = useCreatorProducts;