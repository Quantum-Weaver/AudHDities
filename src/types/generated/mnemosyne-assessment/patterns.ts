// =====================================================
// FILE: types/generated/mnemosyne-assessment/patterns.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-20T04:39:10.724Z
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

export type PatternsRow = Tables<'patterns'>;
export type PatternsInsert = TablesInsert<'patterns'>;
export type PatternsUpdate = TablesUpdate<'patterns'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of patterns
 */
export interface PublicPatterns {
  created_at: string;
  created_by: string | null;
  description: string | null;
  example_output: string | null;
  id: string;
  name: string;
  pattern_config: Json | null;
  pattern_type: string | null;
  slug: string;
  status: ContentStatus;
  template_id: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for patterns
 * All fields are optional for partial updates
 */
export interface PatternsFormData {
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  example_output?: string | null;
  id?: string;
  name?: string;
  pattern_config?: Json | null;
  pattern_type?: string | null;
  slug?: string;
  status?: ContentStatus;
  template_id?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for patterns
 */
export interface PatternsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    example_output?: string;
    id?: string;
    name?: string;
    pattern_config?: string;
    pattern_type?: string;
    slug?: string;
    status?: string;
    template_id?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

