// =====================================================
// FILE: types/generated/hestia-core/bubbles.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-04-30T04:17:47.047Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type BubblesRow = Tables<'bubbles'>;
export type BubblesInsert = TablesInsert<'bubbles'>;
export type BubblesUpdate = TablesUpdate<'bubbles'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of bubbles
 */
export interface PublicBubbles {
  appearance_weight: number | null;
  bubbles_id: string;
  collection_name: string | null;
  collection_order: number | null;
  color: string;
  created_at: string | null;
  created_by: string | null;
  description: string | null;
  glow_color: string | null;
  is_active: boolean | null;
  name: string;
  points_value: number;
  rarity: string;
  slug: string;
  updated_at: string | null;
  updated_by: string | null;
}

/**
 * Form data for bubbles
 * All fields are optional for partial updates
 */
export interface BubblesFormData {
  appearance_weight?: number | null;
  bubbles_id?: string;
  collection_name?: string | null;
  collection_order?: number | null;
  color?: string;
  created_at?: string | null;
  created_by?: string | null;
  description?: string | null;
  glow_color?: string | null;
  is_active?: boolean | null;
  name?: string;
  points_value?: number;
  rarity?: string;
  slug?: string;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for bubbles
 */
export interface BubblesValidationResult {
  valid: boolean;
  errors: {
    appearance_weight?: string;
    bubbles_id?: string;
    collection_name?: string;
    collection_order?: string;
    color?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    glow_color?: string;
    is_active?: string;
    name?: string;
    points_value?: string;
    rarity?: string;
    slug?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

