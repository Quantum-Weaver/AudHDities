// =====================================================
// FILE: types/generated/mnemosyne-assessment/reference_values.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-18T23:09:31.438Z
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

export type ReferenceValuesRow = Tables<'reference_values'>;
export type ReferenceValuesInsert = TablesInsert<'reference_values'>;
export type ReferenceValuesUpdate = TablesUpdate<'reference_values'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of reference_values
 */
export interface PublicReferenceValues {
  applies_to: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  id: string;
  name: string;
  priority: number;
  reference_data: Json | null;
  reference_type: string | null;
  slug: string;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for reference_values
 * All fields are optional for partial updates
 */
export interface ReferenceValuesFormData {
  applies_to?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  name?: string;
  priority?: number;
  reference_data?: Json | null;
  reference_type?: string | null;
  slug?: string;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for reference_values
 */
export interface ReferenceValuesValidationResult {
  valid: boolean;
  errors: {
    applies_to?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    name?: string;
    priority?: string;
    reference_data?: string;
    reference_type?: string;
    slug?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

