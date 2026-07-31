// =====================================================
// FILE: types/generated/plutus-economics/gift_wrappings.ts
// HANDLING: full_crud
// DEITY: plutus-economics
// GENERATED: 2026-07-31T01:03:41.191Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

export type GiftWrappingsRow = Tables<'gift_wrappings'>;
export type GiftWrappingsInsert = TablesInsert<'gift_wrappings'>;
export type GiftWrappingsUpdate = TablesUpdate<'gift_wrappings'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of gift_wrappings
 */
export interface PublicGiftWrappings {
  animation_url: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  icon_url: string | null;
  id: string;
  is_limited: boolean;
  name: string;
  rarity: string | null;
  slug: string;
  status: ContentStatus;
  theme: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for gift_wrappings
 * All fields are optional for partial updates
 */
export interface GiftWrappingsFormData {
  animation_url?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  icon_url?: string | null;
  id?: string;
  is_limited?: boolean;
  name?: string;
  rarity?: string | null;
  slug?: string;
  status?: ContentStatus;
  theme?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for gift_wrappings
 */
export interface GiftWrappingsValidationResult {
  valid: boolean;
  errors: {
    animation_url?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    icon_url?: string;
    id?: string;
    is_limited?: string;
    name?: string;
    rarity?: string;
    slug?: string;
    status?: string;
    theme?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

