// =====================================================
// FILE: types/generated/plutus-economics/products.ts
// HANDLING: full_crud
// GENERATED: 2026-04-15T19:30:35.445Z
// SOURCE: database.types.ts lines 3794-3917
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type OwnerType = Database['public']['Enums']['owner_type'];
export type ProductType = Database['public']['Enums']['product_type'];
export type RecurringInterval = Database['public']['Enums']['recurring_interval'];

// =====================================================
// CORE TYPES
// =====================================================

export type ProductsRow = Database['public']['Tables']['products']['Row'];
export type ProductsInsert = Database['public']['Tables']['products']['Insert'];
export type ProductsUpdate = Database['public']['Tables']['products']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of products
 */
export interface PublicProducts {
  active: boolean | null;
  bigot_tax_cents: number | null;
  category: string[] | null;
  channel_id: string | null;
  collaborators: string[] | null;
  created_at: string | null;
  created_by: string | null;
  creator_id: string;
  description: string | null;
  download_url: string | null;
  id: string;
  is_published: boolean | null;
  is_recurring: boolean | null;
  media_urls: string[] | null;
  owner_type: OwnerType;
  platform_fee_percent: number | null;
  price_ally: number | null;
  price_community: number | null;
  price_corporate: number | null;
  product_type: ProductType;
  residual_pool_percent: number | null;
  sanctuary_infrastructure_percent: number | null;
  slug: string;
  stripe_price_id: string | null;
  stripe_product_id: string | null;
  tags: string[] | null;
  title: string;
  updated_at: string | null;
}

/**
 * Form data for products
 * All fields are optional for partial updates
 */
export interface ProductsFormData {
  active?: boolean | null;
  bigot_tax_cents?: number | null;
  category?: string[] | null;
  channel_id?: string | null;
  collaborators?: string[] | null;
  created_at?: string | null;
  created_by?: string | null;
  creator_id?: string;
  description?: string | null;
  download_url?: string | null;
  id?: string;
  is_published?: boolean | null;
  is_recurring?: boolean | null;
  media_urls?: string[] | null;
  owner_type?: OwnerType;
  platform_fee_percent?: number | null;
  price_ally?: number | null;
  price_community?: number | null;
  price_corporate?: number | null;
  product_type?: ProductType;
  residual_pool_percent?: number | null;
  sanctuary_infrastructure_percent?: number | null;
  slug?: string;
  stripe_price_id?: string | null;
  stripe_product_id?: string | null;
  tags?: string[] | null;
  title?: string;
  updated_at?: string | null;
}

/**
 * Validation result for products
 */
export interface ProductsValidationResult {
  valid: boolean;
  errors: {
    active?: string;
    bigot_tax_cents?: string;
    category?: string;
    channel_id?: string;
    collaborators?: string;
    created_at?: string;
    created_by?: string;
    creator_id?: string;
    description?: string;
    download_url?: string;
    id?: string;
    is_published?: string;
    is_recurring?: string;
    media_urls?: string;
    owner_type?: string;
    platform_fee_percent?: string;
    price_ally?: string;
    price_community?: string;
    price_corporate?: string;
    product_type?: string;
    residual_pool_percent?: string;
    sanctuary_infrastructure_percent?: string;
    slug?: string;
    stripe_price_id?: string;
    stripe_product_id?: string;
    tags?: string;
    title?: string;
    updated_at?: string;
  };
}

