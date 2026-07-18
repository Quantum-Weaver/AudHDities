// =====================================================
// FILE: types/generated/hermes-social/works.ts
// HANDLING: full_crud
// DEITY: hermes-social
// GENERATED: 2026-07-18T23:09:31.686Z
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
export type WorkType = Enums<'work_type'>;

export type WorksRow = Tables<'works'>;
export type WorksInsert = TablesInsert<'works'>;
export type WorksUpdate = TablesUpdate<'works'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of works
 */
export interface PublicWorks {
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
  residual_pool_percent: number | null;
  slug: string;
  status: ContentStatus;
  streaming_url: string | null;
  updated_at: string;
  updated_by: string | null;
  work_type: WorkType;
}

/**
 * Form data for works
 * All fields are optional for partial updates
 */
export interface WorksFormData {
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
  residual_pool_percent?: number | null;
  slug?: string;
  status?: ContentStatus;
  streaming_url?: string | null;
  updated_at?: string;
  updated_by?: string | null;
  work_type?: WorkType;
}

/**
 * Validation result for works
 */
export interface WorksValidationResult {
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
    residual_pool_percent?: string;
    slug?: string;
    status?: string;
    streaming_url?: string;
    updated_at?: string;
    updated_by?: string;
    work_type?: string;
  };
}

