// =====================================================
// FILE: types/generated/mnemosyne-assessment/mind_traits.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-18T21:42:54.316Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type MindTraitsRow = Tables<'mind_traits'>;
export type MindTraitsInsert = TablesInsert<'mind_traits'>;
export type MindTraitsUpdate = TablesUpdate<'mind_traits'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of mind_traits
 */
export interface PublicMindTraits {
  created_at: string;
  created_by: string;
  display_order: number;
  icon_emoji: string | null;
  id: string;
  is_active: boolean;
  trait_category: string | null;
  trait_label_high: string | null;
  trait_label_low: string | null;
  trait_name: string;
  trait_notes: string | null;
  trait_value: number;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for mind_traits
 * All fields are optional for partial updates
 */
export interface MindTraitsFormData {
  created_at?: string;
  created_by?: string;
  display_order?: number;
  icon_emoji?: string | null;
  id?: string;
  is_active?: boolean;
  trait_category?: string | null;
  trait_label_high?: string | null;
  trait_label_low?: string | null;
  trait_name?: string;
  trait_notes?: string | null;
  trait_value?: number;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for mind_traits
 */
export interface MindTraitsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    display_order?: string;
    icon_emoji?: string;
    id?: string;
    is_active?: string;
    trait_category?: string;
    trait_label_high?: string;
    trait_label_low?: string;
    trait_name?: string;
    trait_notes?: string;
    trait_value?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

