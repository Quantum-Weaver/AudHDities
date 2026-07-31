// =====================================================
// FILE: types/generated/plutus-economics/patronage_tiers.ts
// HANDLING: full_crud
// DEITY: plutus-economics
// GENERATED: 2026-07-31T00:35:01.604Z
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

export type ContentStatus = Enums<'content_status'>;

export type PatronageTiersRow = Tables<'patronage_tiers'>;
export type PatronageTiersInsert = TablesInsert<'patronage_tiers'>;
export type PatronageTiersUpdate = TablesUpdate<'patronage_tiers'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of patronage_tiers
 */
export interface PublicPatronageTiers {
  amount: number | null;
  benefits: Json | null;
  created_at: string;
  created_by: string | null;
  currency: string;
  description: string | null;
  display_order: number;
  id: string;
  name: string;
  slug: string;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for patronage_tiers
 * All fields are optional for partial updates
 */
export interface PatronageTiersFormData {
  amount?: number | null;
  benefits?: Json | null;
  created_at?: string;
  created_by?: string | null;
  currency?: string;
  description?: string | null;
  display_order?: number;
  id?: string;
  name?: string;
  slug?: string;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for patronage_tiers
 */
export interface PatronageTiersValidationResult {
  valid: boolean;
  errors: {
    amount?: string;
    benefits?: string;
    created_at?: string;
    created_by?: string;
    currency?: string;
    description?: string;
    display_order?: string;
    id?: string;
    name?: string;
    slug?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

