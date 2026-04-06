// =====================================================
// FILE: types/athena_gamification/mythology.ts
// HANDLING: full_crud
// DEITY: athena_gamification
// GENERATED: 2026-04-05T21:55:13.016Z
// SOURCE: database.types.ts lines 2818-2877
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

type CouncilHouse = Database['public']['Enums']['council_house'];
export type MythType = Database['public']['Enums']['myth_type'];

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
  house: CouncilHouse | null;
  id: string;
  is_published: boolean | null;
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

