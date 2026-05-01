// =====================================================
// FILE: types/generated/athena-gamification/mythology.ts
// HANDLING: full_crud
// DEITY: athena-gamification
// GENERATED: 2026-05-01T15:31:59.668Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type CouncilHouse = Enums<'council_house'>;
export type MythType = Enums<'myth_type'>;

export type MythologyRow = Tables<'mythology'>;
export type MythologyInsert = TablesInsert<'mythology'>;
export type MythologyUpdate = TablesUpdate<'mythology'>;

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
  is_published: boolean | null;
  mythology_id: string;
  order_index: number | null;
  series_id: string | null;
  slug: string;
  title: string;
  type: MythType;
  updated_at: string | null;
  updated_by: string | null;
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
  is_published?: boolean | null;
  mythology_id?: string;
  order_index?: number | null;
  series_id?: string | null;
  slug?: string;
  title?: string;
  type?: MythType;
  updated_at?: string | null;
  updated_by?: string | null;
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
    is_published?: string;
    mythology_id?: string;
    order_index?: string;
    series_id?: string;
    slug?: string;
    title?: string;
    type?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

