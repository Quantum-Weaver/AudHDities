// =====================================================
// FILE: types/generated/iris-communications/surveys.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.968Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type SurveyAudienceType = Database['public']['Enums']['survey_audience_type'];
export type CouncilHouse = Database['public']['Enums']['council_house'];
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

