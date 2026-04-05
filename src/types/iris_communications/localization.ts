// =====================================================
// FILE: types/iris_communications/localization.ts
// HANDLING: full_crud
// DEITY: iris_communications
// GENERATED: 2026-04-05T19:46:33.027Z
// SOURCE: database.types.ts lines 2575-2631
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type LocalizationRow = Database['public']['Tables']['localization']['Row'];
export type LocalizationInsert = Database['public']['Tables']['localization']['Insert'];
export type LocalizationUpdate = Database['public']['Tables']['localization']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of localization
 */
export interface PublicLocalization {
  approved_by: string | null
  context: string | null
  created_at: string | null
  id: string
  is_approved: boolean | null
  language_code: string
  plural_form: number | null
  resource_key: string
  translation: string
  updated_at: string | null
  version: number | null
}

/**
 * Form data for localization
 * All fields are optional for partial updates
 */
export interface LocalizationFormData {
  approved_by?: string | null;
  context?: string | null;
  created_at?: string | null;
  id?: string;
  is_approved?: boolean | null;
  language_code?: string;
  plural_form?: number | null;
  resource_key?: string;
  translation?: string;
  updated_at?: string | null;
  version?: number | null;
}

/**
 * Validation result for localization
 */
export interface LocalizationValidationResult {
  valid: boolean;
  errors: {
    approved_by?: string;
    context?: string;
    created_at?: string;
    id?: string;
    is_approved?: string;
    language_code?: string;
    plural_form?: string;
    resource_key?: string;
    translation?: string;
    updated_at?: string;
    version?: string;
  };
}

