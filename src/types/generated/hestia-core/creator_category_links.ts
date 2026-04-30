// =====================================================
// FILE: types/generated/hestia-core/creator_category_links.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-04-30T00:26:45.838Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type CreatorCategoryLinksRow = Tables<'creator_category_links'>;
export type CreatorCategoryLinksInsert = TablesInsert<'creator_category_links'>;
export type CreatorCategoryLinksUpdate = TablesUpdate<'creator_category_links'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of creator_category_links
 */
export interface PublicCreatorCategoryLinks {
  category_id: string;
  created_at: string | null;
  created_by: string | null;
  creator_id: string;
  id: string;
}

/**
 * Form data for creator_category_links
 * All fields are optional for partial updates
 */
export interface CreatorCategoryLinksFormData {
  category_id?: string;
  created_at?: string | null;
  created_by?: string | null;
  creator_id?: string;
  id?: string;
}

/**
 * Validation result for creator_category_links
 */
export interface CreatorCategoryLinksValidationResult {
  valid: boolean;
  errors: {
    category_id?: string;
    created_at?: string;
    created_by?: string;
    creator_id?: string;
    id?: string;
  };
}

