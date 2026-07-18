// =====================================================
// FILE: types/generated/iris-communications/culturalization.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-07-18T23:17:10.723Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

export type CulturalizationRow = Tables<'culturalization'>;
export type CulturalizationInsert = TablesInsert<'culturalization'>;
export type CulturalizationUpdate = TablesUpdate<'culturalization'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of culturalization
 */
export interface PublicCulturalization {
  communication_style: string | null;
  created_at: string;
  created_by: string | null;
  customs: Json | null;
  description: string | null;
  id: string;
  is_default: boolean;
  language_id: string | null;
  name: string;
  region_code: string | null;
  slug: string;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
  visual_preferences: Json | null;
}

/**
 * Form data for culturalization
 * All fields are optional for partial updates
 */
export interface CulturalizationFormData {
  communication_style?: string | null;
  created_at?: string;
  created_by?: string | null;
  customs?: Json | null;
  description?: string | null;
  id?: string;
  is_default?: boolean;
  language_id?: string | null;
  name?: string;
  region_code?: string | null;
  slug?: string;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
  visual_preferences?: Json | null;
}

/**
 * Validation result for culturalization
 */
export interface CulturalizationValidationResult {
  valid: boolean;
  errors: {
    communication_style?: string;
    created_at?: string;
    created_by?: string;
    customs?: string;
    description?: string;
    id?: string;
    is_default?: string;
    language_id?: string;
    name?: string;
    region_code?: string;
    slug?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
    visual_preferences?: string;
  };
}

