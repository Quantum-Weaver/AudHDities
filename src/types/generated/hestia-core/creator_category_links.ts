// =====================================================
// FILE: types/generated/hestia-core/creator_category_links.ts
// HANDLING: full_crud
// GENERATED: 2026-04-13T15:29:50.890Z
// SOURCE: database.types.ts lines 1665-1710
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type CreatorCategoryLinksRow = Database['public']['Tables']['creator_category_links']['Row'];
export type CreatorCategoryLinksInsert = Database['public']['Tables']['creator_category_links']['Insert'];
export type CreatorCategoryLinksUpdate = Database['public']['Tables']['creator_category_links']['Update'];

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

