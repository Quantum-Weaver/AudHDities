// =====================================================
// FILE: types/generated/plutus-economics/products.ts
// HANDLING: full_crud
// DEITY: plutus-economics
// GENERATED: 2026-04-30T04:17:47.821Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type OwnerType = Enums<'owner_type'>;
export type ProductType = Enums<'product_type'>;
export type RecurringInterval = Enums<'recurring_interval'>;

export type ProductsRow = Tables<'products'>;
export type ProductsInsert = TablesInsert<'products'>;
export type ProductsUpdate = TablesUpdate<'products'>;

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
  is_published: boolean | null;
  is_recurring: boolean | null;
  media_urls: string[] | null;
  owner_type: OwnerType;
  platform_fee_percent: number | null;
  price_ally: number | null;
  price_community: number | null;
  price_corporate: number | null;
  product_type: ProductType;
  products_id: string;
  recurring_interval: RecurringInterval  | null;
  residual_pool_percent: number | null;
  sanctuary_infrastructure_percent: number | null;
  slug: string;
  stripe_price_id: string | null;
  stripe_product_id: string | null;
  tags: string[] | null;
  title: string;
  updated_at: string | null;
  updated_by: string | null;
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
  is_published?: boolean | null;
  is_recurring?: boolean | null;
  media_urls?: string[] | null;
  owner_type?: OwnerType;
  platform_fee_percent?: number | null;
  price_ally?: number | null;
  price_community?: number | null;
  price_corporate?: number | null;
  product_type?: ProductType;
  products_id?: string;
  residual_pool_percent?: number | null;
  sanctuary_infrastructure_percent?: number | null;
  slug?: string;
  stripe_price_id?: string | null;
  stripe_product_id?: string | null;
  tags?: string[] | null;
  title?: string;
  updated_at?: string | null;
  updated_by?: string | null;
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
    is_published?: string;
    is_recurring?: string;
    media_urls?: string;
    owner_type?: string;
    platform_fee_percent?: string;
    price_ally?: string;
    price_community?: string;
    price_corporate?: string;
    product_type?: string;
    products_id?: string;
    recurring_interval?: string;
    residual_pool_percent?: string;
    sanctuary_infrastructure_percent?: string;
    slug?: string;
    stripe_price_id?: string;
    stripe_product_id?: string;
    tags?: string;
    title?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

