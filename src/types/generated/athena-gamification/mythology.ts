// =====================================================
// FILE: types/generated/athena-gamification/mythology.ts
// HANDLING: full_crud
// GENERATED: 2026-04-15T19:06:11.497Z
// SOURCE: database.types.ts lines 3283-3352
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type CouncilHouse = Database['public']['Enums']['council_house'];
export type MythType = Database['public']['Enums']['myth_type'];

// =====================================================
// CORE TYPES
// =====================================================

export type MythologyRow = Database['public']['Tables']['mythology']['Row'];
export type MythologyInsert = Database['public']['Tables']['mythology']['Insert'];
export type MythologyUpdate = Database['public']['Tables']['mythology']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of mythology
 */
export interface PublicMythology {
  author_id: string;
  content: string;
  created_at: string | null;
  created_by: string | null;
  house: CouncilHouse | null;
  id: string;
  "is_published": "boolean | null";
  order_index: number | null;
  series_id: string | null;
  slug: string;
  title: string;
  type: MythType;
  updated_at: string | null;
}

/**
 * Form data for mythology
 * All fields are optional for partial updates
 */
export interface MythologyFormData {
  author_id?: string;
  content?: string;
  created_at?: string | null;
  created_by?: string | null;
  house?: CouncilHouse | null;
  id?: string;
  is_published?: boolean | null;
  order_index?: number | null;
  series_id?: string | null;
  slug?: string;
  title?: string;
  type?: MythType;
  updated_at?: string | null;
}

/**
 * Validation result for mythology
 */
export interface MythologyValidationResult {
  valid: boolean;
  errors: {
    author_id?: string;
    content?: string;
    created_at?: string;
    created_by?: string;
    house?: string;
    id?: string;
    is_published?: string;
    order_index?: string;
    series_id?: string;
    slug?: string;
    title?: string;
    type?: string;
    updated_at?: string;
  };
}

