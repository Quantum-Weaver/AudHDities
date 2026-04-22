// =====================================================
// FILE: types/generated/hestia-core/creator_category_links.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.233Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type CreatorCategoryLinksRow = Tables<'creator_category_links'>;
export type CreatorCategoryLinksInsert = TablesInsert<'creator_category_links'>;
export type CreatorCategoryLinksUpdate = TablesUpdate<'creator_category_links'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicCreatorCategoryLinks = Omit<CreatorCategoryLinksRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type CreatorCategoryLinksFormData = Partial<CreatorCategoryLinksInsert>;

