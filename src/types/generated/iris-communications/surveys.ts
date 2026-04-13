// =====================================================
// FILE: types/generated/iris-communications/surveys.ts
// HANDLING: full_crud
// GENERATED: 2026-04-13T15:29:50.905Z
// SOURCE: database.types.ts lines 5986-6047
// =====================================================

import type { Database } from '@/types/supabase/database.types';

import type { Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type SurveyAudienceType = Database['public']['Enums']['survey_audience_type'];
export type CouncilHouse = Database['public']['Enums']['council_house'];

// =====================================================
// CORE TYPES
// =====================================================

export type SurveysRow = Database['public']['Tables']['surveys']['Row'];
export type SurveysInsert = Database['public']['Tables']['surveys']['Insert'];
export type SurveysUpdate = Database['public']['Tables']['surveys']['Update'];

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

