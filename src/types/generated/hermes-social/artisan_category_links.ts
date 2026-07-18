// =====================================================
// FILE: types/generated/hermes-social/artisan_category_links.ts
// HANDLING: join_table
// DEITY: hermes-social
// GENERATED: 2026-07-18T21:42:53.953Z
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

