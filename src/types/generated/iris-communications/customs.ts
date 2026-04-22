// =====================================================
// FILE: types/generated/iris-communications/customs.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.823Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type CustomCategoryType = Database['public']['Enums']['custom_category_type'];
export type CustomsRow = Tables<'customs'>;
export type CustomsInsert = TablesInsert<'customs'>;
export type CustomsUpdate = TablesUpdate<'customs'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of customs
 */
export interface PublicCustoms {
  category: CustomCategoryType;
  created_at: string | null;
  created_by: string | null;
  description: string;
  guidance: string | null;
  id: string;
  is_active: boolean | null;
  is_sensitive: boolean | null;
  name: string;
  persona_id: string | null;
  region_id: string | null;
  slug: string;
  updated_at: string | null;
}

/**
 * Form data for customs
 * All fields are optional for partial updates
 */
export interface CustomsFormData {
  category?: CustomCategoryType;
  created_at?: string | null;
  created_by?: string | null;
  description?: string;
  guidance?: string | null;
  id?: string;
  is_active?: boolean | null;
  is_sensitive?: boolean | null;
  name?: string;
  persona_id?: string | null;
  region_id?: string | null;
  slug?: string;
  updated_at?: string | null;
}

