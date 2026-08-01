// =====================================================
// FILE: types/generated/iris-communications/surveys.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-08-01T17:49:54.613Z
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

export type SurveysRow = Tables<'surveys'>;
export type SurveysInsert = TablesInsert<'surveys'>;
export type SurveysUpdate = TablesUpdate<'surveys'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of surveys
 */
export interface PublicSurveys {
  category: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  display_order: number;
  icon_url: string | null;
  id: string;
  is_anonymous: boolean;
  is_public_results: boolean;
  name: string;
  questions: Json | null;
  slug: string;
  status: ContentStatus;
  survey_type: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for surveys
 * All fields are optional for partial updates
 */
export interface SurveysFormData {
  category?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  display_order?: number;
  icon_url?: string | null;
  id?: string;
  is_anonymous?: boolean;
  is_public_results?: boolean;
  name?: string;
  questions?: Json | null;
  slug?: string;
  status?: ContentStatus;
  survey_type?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for surveys
 */
export interface SurveysValidationResult {
  valid: boolean;
  errors: {
    category?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    display_order?: string;
    icon_url?: string;
    id?: string;
    is_anonymous?: string;
    is_public_results?: string;
    name?: string;
    questions?: string;
    slug?: string;
    status?: string;
    survey_type?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

