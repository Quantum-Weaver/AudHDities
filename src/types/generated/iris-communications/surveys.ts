// =====================================================
// FILE: types/generated/iris-communications/surveys.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:06.395Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type SurveysRow = Tables<'surveys'>;
export type SurveysInsert = TablesInsert<'surveys'>;
export type SurveysUpdate = TablesUpdate<'surveys'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicSurveys = Omit<SurveysRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type SurveysFormData = Partial<SurveysInsert>;

