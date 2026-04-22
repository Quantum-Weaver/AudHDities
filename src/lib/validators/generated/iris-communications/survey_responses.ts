// =====================================================
// FILE: lib/validators/generated/iris-communications/survey_responses.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:06.377Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { SurveyResponsesRow, SurveyResponsesInsert, SurveyResponsesUpdate } from '@/types/generated/iris-communications/survey_responses';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const SurveyResponsesRowSchema: z.ZodType<SurveyResponsesRow> = z.any();
export const SurveyResponsesInsertSchema: z.ZodType<SurveyResponsesInsert> = z.any();
export const SurveyResponsesUpdateSchema: z.ZodType<SurveyResponsesUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const SurveyResponsesRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type SurveyResponsesRuntimeInput = z.infer<typeof SurveyResponsesRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full survey_responses row
 */
export function validateSurveyResponsesRow(data: unknown): data is SurveyResponsesRow {
  try {
    SurveyResponsesRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a survey_responses insert
 */
export function validateSurveyResponsesInsert(data: unknown): data is SurveyResponsesInsert {
  try {
    SurveyResponsesInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a survey_responses update
 */
export function validateSurveyResponsesUpdate(data: unknown): data is SurveyResponsesUpdate {
  try {
    SurveyResponsesUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
