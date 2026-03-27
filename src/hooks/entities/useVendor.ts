// hooks/entities/useVendor.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Product } from './useProducts';
import type { VendorProfile } from '@/types/supabase/tables.ts';

export interface VendorDetail {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string | null;
  is_vendor: boolean;
  is_creator: boolean;
  is_admin: boolean;
  user_tier: string | null;
  sovereignty_score: number | null;
  primary_house: string | null;
  vendor_profiles: { 
    business_name: string;
    business_type: string | null;
    business_description: string | null;
    business_logo_url: string | null;
    verified_badge: boolean;
    verification_status: string | null;
    product_categories: string[];
    total_products: number;
    total_sales: number;
    total_earnings: number;
  } | null;
}

interface UseVendorReturn {
  vendor: VendorDetail | null;
  products: Product[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

// Helper to normalize vendor detail data
function normalizeVendorDetail(data: any): VendorDetail {
  return {
    id: data.id,
    username: data.username,
    display_name: data.display_name,
    avatar_url: data.avatar_url,
    bio: data.bio,
    created_at: data.created_at,
    is_vendor: data.is_vendor ?? false,
    is_creator: data.is_creator ?? false,
    is_admin: data.is_admin ?? false,
    user_tier: data.user_tier ?? null,
    sovereignty_score: data.sovereignty_score ?? 0,
    primary_house: data.primary_house ?? null,
    vendor_profiles: data.vendor_profiles ? {
      business_name: data.vendor_profiles.business_name ?? '',
      business_type: data.vendor_profiles.business_type ?? null,
      business_description: data.vendor_profiles.business_description ?? null,
      business_logo_url: data.vendor_profiles.business_logo_url ?? null,
      verified_badge: data.vendor_profiles.verified_badge ?? false,
      verification_status: data.vendor_profiles.verification_status ?? null,
      product_categories: data.vendor_profiles.product_categories ?? [],
      total_products: data.vendor_profiles.total_products ?? 0,
      total_sales: data.vendor_profiles.total_sales ?? 0,
      total_earnings: data.vendor_profiles.total_earnings ?? 0,
    } : null,
  };
}

// =====================================================
// useVendorByUsername - fetch vendor by username
// =====================================================
export function useVendorByUsername(username: string): UseVendorReturn {
  const [vendor, setVendor] = useState<VendorDetail | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  const fetchVendor = useCallback(async () => {
    if (!username) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Fetch vendor profile
      const { data: vendorData, error: vendorError } = await supabase
        .from('profiles')
        .select(`
          id,
          username,
          display_name,
          avatar_url,
          bio,
          created_at,
          is_vendor,
          is_creator,
          is_admin,
          user_tier,
          sovereignty_score,
          primary_house,
          vendor_profiles!vendor_profiles_id_fkey (
            business_name,
            business_type,
            business_description,
            business_logo_url,
            verified_badge,
            verification_status,
            product_categories,
            total_products,
            total_sales,
            total_earnings
          )
        `)
        .eq('username', username)
        .eq('is_vendor', true)
        .maybeSingle();
      
      if (vendorError) throw vendorError;
      
      if (!vendorData) {
        setVendor(null);
        setProducts([]);
        return;
      }
      
      const normalizedVendor = normalizeVendorDetail(vendorData);
      setVendor(normalizedVendor);
      
      // Fetch vendor's products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('creator_id', vendorData.id)
        .eq('is_published', true)
        .eq('active', true)
        .order('created_at', { ascending: false });
      
      if (productsError) throw productsError;
      
      setProducts(productsData || []);
      
    } catch (err) {
      console.error('Error fetching vendor:', err);
      setError(err instanceof Error ? err : new Error('Vendor not found'));
    } finally {
      setLoading(false);
    }
  }, [username, supabase]);

  useEffect(() => {
    fetchVendor();
  }, [fetchVendor]);

  return {
    vendor,
    products,
    loading,
    error,
    refresh: fetchVendor,
  };
}

// =====================================================
// useVendorById - fetch vendor by user ID
// =====================================================
export function useVendorById(userId: string): UseVendorReturn {
  const [vendor, setVendor] = useState<VendorDetail | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  const fetchVendor = useCallback(async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Fetch vendor profile
      const { data: vendorData, error: vendorError } = await supabase
        .from('profiles')
        .select(`
          id,
          username,
          display_name,
          avatar_url,
          bio,
          created_at,
          is_vendor,
          is_creator,
          is_admin,
          user_tier,
          sovereignty_score,
          primary_house,
          vendor_profiles!vendor_profiles_id_fkey (
            business_name,
            business_type,
            business_description,
            business_logo_url,
            verified_badge,
            verification_status,
            product_categories,
            total_products,
            total_sales,
            total_earnings
          )
        `)
        .eq('id', userId)
        .eq('is_vendor', true)
        .maybeSingle();
      
      if (vendorError) throw vendorError;
      
      if (!vendorData) {
        setVendor(null);
        setProducts([]);
        return;
      }
      
      const normalizedVendor = normalizeVendorDetail(vendorData);
      setVendor(normalizedVendor);
      
      // Fetch vendor's products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('creator_id', vendorData.id)
        .eq('is_published', true)
        .eq('active', true)
        .order('created_at', { ascending: false });
      
      if (productsError) throw productsError;
      
      setProducts(productsData || []);
      
    } catch (err) {
      console.error('Error fetching vendor:', err);
      setError(err instanceof Error ? err : new Error('Vendor not found'));
    } finally {
      setLoading(false);
    }
  }, [userId, supabase]);

  useEffect(() => {
    fetchVendor();
  }, [fetchVendor]);

  return {
    vendor,
    products,
    loading,
    error,
    refresh: fetchVendor,
  };
}

// =====================================================
// useVendor - main export (alias for useVendorByUsername)
// =====================================================
export const useVendor = useVendorByUsername;