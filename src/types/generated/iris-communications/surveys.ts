// =====================================================
// FILE: types/generated/iris-communications/surveys.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-05-01T03:24:42.208Z
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

export type SurveyAudienceType = Enums<'survey_audience_type'>;
export type CouncilHouse = Enums<'council_house'>;

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
  created_at: string | null;
  created_by: string;
  description: string | null;
  expires_at: string | null;
  is_active: boolean | null;
  questions: Json;
  response_count: number | null;
  slug: string | null;
  starts_at: string | null;
  surveys_id: string;
  target_audience:;
  target_house: CouncilHouse | null;
  title: string;
  updated_at: string | null;
  updated_by: string | null;
}

/**
 * Form data for surveys
 * All fields are optional for partial updates
 */
export interface SurveysFormData {
  created_at?: string | null;
  created_by?: string;
  description?: string | null;
  expires_at?: string | null;
  is_active?: boolean | null;
  questions?: Json;
  response_count?: number | null;
  slug?: string | null;
  starts_at?: string | null;
  surveys_id?: string;
  target_house?: CouncilHouse | null;
  title?: string;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for surveys
 */
export interface SurveysValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    expires_at?: string;
    is_active?: string;
    questions?: string;
    response_count?: string;
    slug?: string;
    starts_at?: string;
    surveys_id?: string;
    target_audience?: string;
    target_house?: string;
    title?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

