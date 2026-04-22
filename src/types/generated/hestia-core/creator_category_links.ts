// =====================================================
// FILE: types/generated/hestia-core/creator_category_links.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.777Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

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

