// =====================================================
// FILE: types/generated/plutus-economics/products.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.461Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type OwnerType = Database['public']['Enums']['owner_type'];
export type ProductType = Database['public']['Enums']['product_type'];
export type RecurringInterval = Database['public']['Enums']['recurring_interval'];
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
  recurring_interval:;
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

