// =====================================================
// FILE: types/generated/hestia-core/artisan_category_links.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.231Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type ArtisanCategoryLinksRow = Tables<'artisan_category_links'>;
export type ArtisanCategoryLinksInsert = TablesInsert<'artisan_category_links'>;
export type ArtisanCategoryLinksUpdate = TablesUpdate<'artisan_category_links'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of artisan_category_links
 */
export interface PublicArtisanCategoryLinks {
  artisan_id: string;
  category_id: string;
  created_at: string;
  id: string;
  updated_at: string;
}

/**
 * Form data for artisan_category_links
 * All fields are optional for partial updates
 */
export interface ArtisanCategoryLinksFormData {
  artisan_id?: string;
  category_id?: string;
  created_at?: string;
  id?: string;
  updated_at?: string;
}

/**
 * Validation result for artisan_category_links
 */
export interface ArtisanCategoryLinksValidationResult {
  valid: boolean;
  errors: {
    artisan_id?: string;
    category_id?: string;
    created_at?: string;
    id?: string;
    updated_at?: string;
  };
}

