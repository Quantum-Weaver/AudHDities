// =====================================================
// FILE: types/generated/plutus-economics/wares.ts
// HANDLING: full_crud
// DEITY: plutus-economics
// GENERATED: 2026-08-01T18:15:38.656Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type PricingModel = Enums<'pricing_model'>;
export type ContentStatus = Enums<'content_status'>;
export type WareType = Enums<'ware_type'>;

export type WaresRow = Tables<'wares'>;
export type WaresInsert = TablesInsert<'wares'>;
export type WaresUpdate = TablesUpdate<'wares'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of wares
 */
export interface PublicWares {
  cover_url: string | null;
  created_at: string;
  created_by: string;
  currency: string;
  description: string | null;
  icon_emoji: string | null;
  id: string;
  media_urls: string[] | null;
  metadata: Json | null;
  name: string;
  price: number | null;
  pricing_model: PricingModel;
  quantity_available: number | null;
  quantity_sold: number;
  requires_shipping: boolean;
  residual_pool_percent: number | null;
  shipping_info: Json | null;
  slug: string;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
  ware_type: WareType;
}

/**
 * Form data for wares
 * All fields are optional for partial updates
 */
export interface WaresFormData {
  cover_url?: string | null;
  created_at?: string;
  created_by?: string;
  currency?: string;
  description?: string | null;
  icon_emoji?: string | null;
  id?: string;
  media_urls?: string[] | null;
  metadata?: Json | null;
  name?: string;
  price?: number | null;
  pricing_model?: PricingModel;
  quantity_available?: number | null;
  quantity_sold?: number;
  requires_shipping?: boolean;
  residual_pool_percent?: number | null;
  shipping_info?: Json | null;
  slug?: string;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
  ware_type?: WareType;
}

/**
 * Validation result for wares
 */
export interface WaresValidationResult {
  valid: boolean;
  errors: {
    cover_url?: string;
    created_at?: string;
    created_by?: string;
    currency?: string;
    description?: string;
    icon_emoji?: string;
    id?: string;
    media_urls?: string;
    metadata?: string;
    name?: string;
    price?: string;
    pricing_model?: string;
    quantity_available?: string;
    quantity_sold?: string;
    requires_shipping?: string;
    residual_pool_percent?: string;
    shipping_info?: string;
    slug?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
    ware_type?: string;
  };
}

