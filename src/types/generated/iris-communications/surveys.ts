// =====================================================
// FILE: types/generated/iris-communications/surveys.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-04-23T02:14:53.645Z
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
  id: string;
  is_active: boolean | null;
  questions: Json;
  response_count: number | null;
  starts_at: string | null;
  target_audience:;
  target_house: CouncilHouse | null;
  title: string;
  updated_at: string | null;
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
  id?: string;
  is_active?: boolean | null;
  questions?: Json;
  response_count?: number | null;
  starts_at?: string | null;
  target_house?: CouncilHouse | null;
  title?: string;
  updated_at?: string | null;
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
    id?: string;
    is_active?: string;
    questions?: string;
    response_count?: string;
    starts_at?: string;
    target_audience?: string;
    target_house?: string;
    title?: string;
    updated_at?: string;
  };
}

