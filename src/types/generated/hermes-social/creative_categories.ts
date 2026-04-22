// =====================================================
// FILE: types/generated/hermes-social/creative_categories.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.221Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type CreativeCategoriesRow = Tables<'creative_categories'>;
export type CreativeCategoriesInsert = TablesInsert<'creative_categories'>;
export type CreativeCategoriesUpdate = TablesUpdate<'creative_categories'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicCreativeCategories = Omit<CreativeCategoriesRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type CreativeCategoriesFormData = Partial<CreativeCategoriesInsert>;

