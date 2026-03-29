// src/hooks/entities/useProducts.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '../core/useAuth';
import type { Database } from '@/types/supabase/database.types';

// Product type from database with owner_type
export type Product = Database['public']['Tables']['products']['Row'];
export type ProductInsert = Database['public']['Tables']['products']['Insert'];
export type ProductUpdate = Database['public']['Tables']['products']['Update'];
export type Creator = Database['public']['Tables']['creator_profiles']['Update'];
export type Vendor = Database['public']['Tables']['vendor_profiles']['Update'];

export type OwnerType = 'creator' | 'vendor';

// Extended product with owner info for marketplace display
export interface ProductWithOwner extends Product {
  owner?: {
    id: string;
    username: string | null;
    display_name?: string | null;
    avatar_url: string | null;
    owner_type: OwnerType;
    creator_profile?: Creator | null;
    vendor_profile?: Vendor | null;
  };
}

interface UseProductsOptions {
  creatorId?: string;
  vendorId?: string;
  ownerType?: OwnerType;
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
  createProduct: (product: ProductInsert, ownerType?: OwnerType) => Promise<Product | null>;
  updateProduct: (id: string, updates: ProductUpdate) => Promise<Product | null>;
  deleteProduct: (id: string) => Promise<boolean>;
  publishProduct: (id: string) => Promise<boolean>;
  unpublishProduct: (id: string) => Promise<boolean>;
}

export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
  const { creatorId, vendorId, ownerType, isPublished, limit = 50, featured } = options;
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
      
      // Filter by creator ID
      if (creatorId) {
        query = query.eq('creator_id', creatorId);
      }
      
      // Filter by vendor ID (same as creator_id, but conceptually separate)
      if (vendorId) {
        query = query.eq('creator_id', vendorId);
      }
      
      // Filter by owner_type (creator or vendor)
      if (ownerType) {
        query = query.eq('owner_type', ownerType);
      }
      
      if (isPublished !== undefined) {
        query = query.eq('is_published', isPublished);
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
  }, [creatorId, vendorId, ownerType, isPublished, limit, featured, supabase]);

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

  // Determine owner_type based on user's role
  const determineOwnerType = useCallback(async (): Promise<OwnerType> => {
    if (!user) return 'creator';
    
    // Check if user is a vendor
    const { data: vendorProfile } = await supabase
      .from('vendor_profiles')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();
    
    if (vendorProfile) {
      return 'vendor';
    }
    
    // Default to creator
    return 'creator';
  }, [user, supabase]);

  // Create new product
  const createProduct = useCallback(async (product: ProductInsert, ownerType?: OwnerType): Promise<Product | null> => {
    if (!user) {
      setError(new Error('You must be logged in to create a product'));
      return null;
    }
    
    try {
      // Determine owner_type if not provided
      const finalOwnerType = ownerType || await determineOwnerType();
      
      const productData = {
        ...product,
        creator_id: user.id,
        owner_type: finalOwnerType,
      };
      
      const { data, error: createError } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single();
      
      if (createError) throw createError;
      
      // Update creator or vendor profile stats based on owner_type
      if (finalOwnerType === 'creator') {
        const { data: creatorProfile } = await supabase
          .from('creator_profiles')
          .select('total_products')
          .eq('id', user.id)
          .single();
        
        await supabase
          .from('creator_profiles')
          .update({
            total_products: (creatorProfile?.total_products || 0) + 1
          })
          .eq('id', user.id);
      } else if (finalOwnerType === 'vendor') {
        const { data: vendorProfile } = await supabase
          .from('vendor_profiles')
          .select('total_products')
          .eq('id', user.id)
          .single();
        
        await supabase
          .from('vendor_profiles')
          .update({
            total_products: (vendorProfile?.total_products || 0) + 1
          })
          .eq('id', user.id);
      }
      
      // Refresh product list
      await fetchProducts();
      
      return data;
    } catch (err) {
      console.error('Error creating product:', err);
      setError(err instanceof Error ? err : new Error('Failed to create product'));
      return null;
    }
  }, [user, supabase, fetchProducts, determineOwnerType]);

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
      // Get product info before deletion for stats update
      const { data: product } = await supabase
        .from('products')
        .select('owner_type')
        .eq('id', id)
        .single();
      
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
        .eq('creator_id', user.id);
      
      if (deleteError) throw deleteError;
      
      // Update creator or vendor profile stats based on owner_type
      if (product) {
        if (product.owner_type === 'creator') {
          const { data: creatorProfile } = await supabase
            .from('creator_profiles')
            .select('total_products')
            .eq('id', user.id)
            .single();
          
          await supabase
            .from('creator_profiles')
            .update({
              total_products: Math.max(0, (creatorProfile?.total_products || 0) - 1)
            })
            .eq('id', user.id);
        } else if (product.owner_type === 'vendor') {
          const { data: vendorProfile } = await supabase
            .from('vendor_profiles')
            .select('total_products')
            .eq('id', user.id)
            .single();
          
          await supabase
            .from('vendor_profiles')
            .update({
              total_products: Math.max(0, (vendorProfile?.total_products || 0) - 1)
            })
            .eq('id', user.id);
        }
      }
      
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

// Hook for creator's own products (explicitly owner_type = 'creator')
export function useCreatorProducts(creatorId?: string) {
  const { user } = useAuth();
  const effectiveCreatorId = creatorId || user?.id;
  
  const { products, loading, error, fetchProducts, createProduct, updateProduct, deleteProduct, publishProduct, unpublishProduct } = useProducts({
    creatorId: effectiveCreatorId,
    ownerType: 'creator',
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

// Hook for vendor's own products (explicitly owner_type = 'vendor')
export function useVendorProducts(vendorId?: string) {
  const { user } = useAuth();
  const effectiveVendorId = vendorId || user?.id;
  
  const { products, loading, error, fetchProducts, createProduct, updateProduct, deleteProduct, publishProduct, unpublishProduct } = useProducts({
    vendorId: effectiveVendorId,
    ownerType: 'vendor',
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