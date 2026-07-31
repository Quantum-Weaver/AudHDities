// =====================================================
// FILE: types/generated/athena-gamification/sigils.ts
// HANDLING: full_crud
// DEITY: athena-gamification
// GENERATED: 2026-07-31T00:35:01.765Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

export type SigilsRow = Tables<'sigils'>;
export type SigilsInsert = TablesInsert<'sigils'>;
export type SigilsUpdate = TablesUpdate<'sigils'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of sigils
 */
export interface PublicSigils {
  category: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  display_order: number;
  icon_emoji: string | null;
  icon_url: string | null;
  id: string;
  name: string;
  rarity: string | null;
  slug: string;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for sigils
 * All fields are optional for partial updates
 */
export interface SigilsFormData {
  category?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  display_order?: number;
  icon_emoji?: string | null;
  icon_url?: string | null;
  id?: string;
  name?: string;
  rarity?: string | null;
  slug?: string;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for sigils
 */
export interface SigilsValidationResult {
  valid: boolean;
  errors: {
    category?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    display_order?: string;
    icon_emoji?: string;
    icon_url?: string;
    id?: string;
    name?: string;
    rarity?: string;
    slug?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

